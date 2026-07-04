import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

/**
 * POST /api/leads
 *
 * Minimal, dependency-free backend for the lead modal. Out of the box it
 * validates the payload and appends each lead as one JSON line to
 * data/leads.jsonl, so you have a working endpoint with zero setup.
 *
 * To wire it to a real destination, replace the `saveLead` call below
 * with one (or more) of:
 *   - a database insert (Prisma, Supabase, etc.)
 *   - a CRM webhook (e.g. fetch(process.env.CRM_WEBHOOK_URL, { ... }))
 *   - an email via Resend/SendGrid
 *   - a Slack/Zapier webhook for instant notification
 */

const PHONE_RE = /^[6-9]\d{9}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VALID_PRODUCTS = [
  "General Enquiry",
  "Credit Score",
  "Loans",
  "Credit Cards",
  "Investment",
  "Insurance",
  "Calculators",
];

interface LeadPayload {
  name: string;
  phone: string;
  email?: string;
  city: string;
  product: string;
  source?: string;
}

function validate(body: Partial<LeadPayload>): string | null {
  if (!body.name || body.name.trim().length < 2) return "Invalid name";
  if (!body.phone || !PHONE_RE.test(body.phone)) return "Invalid phone number";
  if (body.email && !EMAIL_RE.test(body.email)) return "Invalid email";
  if (!body.city || !body.city.trim()) return "Invalid city";
  if (!body.product || !VALID_PRODUCTS.includes(body.product)) return "Invalid product";
  return null;
}

async function saveLead(lead: LeadPayload & { receivedAt: string }) {
  // --- Default: append-only local file, good enough for early traffic / dev. ---
  const dataDir = path.join(process.cwd(), "data");
  await fs.mkdir(dataDir, { recursive: true });
  await fs.appendFile(path.join(dataDir, "leads.jsonl"), JSON.stringify(lead) + "\n", "utf8");

  // --- Optional: also forward to a webhook (Slack, Zapier, CRM) if configured. ---
  if (process.env.LEADS_WEBHOOK_URL) {
    await fetch(process.env.LEADS_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    }).catch((err) => console.error("Lead webhook forward failed:", err));
  }
}

export async function POST(req: NextRequest) {
  let body: Partial<LeadPayload>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const error = validate(body);
  if (error) {
    return NextResponse.json({ error }, { status: 422 });
  }

  try {
    await saveLead({
      name: body.name!.trim(),
      phone: body.phone!,
      email: body.email?.trim() || undefined,
      city: body.city!.trim(),
      product: body.product!,
      source: body.source ?? "website",
      receivedAt: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("Failed to save lead:", err);
    return NextResponse.json({ error: "Failed to save lead" }, { status: 500 });
  }
}