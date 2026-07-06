import express from "express";
import { env } from "./config/env.js";
import { Page } from "./models/page.js";
import { Lead } from "./models/lead.js";

export const app = express();

app.use(express.json());

app.use((request, response, next) => {
  response.setHeader("Access-Control-Allow-Origin", env.frontendOrigin);
  response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (request.method === "OPTIONS") {
    response.sendStatus(204);
    return;
  }

  next();
});

app.get("/api/health", (_request, response) => {
  response.json({
    ok: true,
    service: "backend",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/site-config", (_request, response) => {
  response.json({
    siteName: env.siteName,
    frontendOrigin: env.frontendOrigin,
    adsEnabled: false,
  });
});

app.get("/api/pages", async (_request, response, next) => {
  try {
    const pages = await Page.findAll({
      order: [["createdAt", "DESC"]],
    });

    response.json({ pages });
  } catch (error) {
    next(error);
  }
});

app.post("/api/pages", async (request, response, next) => {
  try {
    const { title, slug, description } = request.body as {
      title?: string;
      slug?: string;
      description?: string;
    };

    if (!title || !slug || !description) {
      response.status(400).json({
        error: "title, slug, and description are required",
      });
      return;
    }

    const page = await Page.create({ title, slug, description });
    response.status(201).json({ page });
  } catch (error) {
    next(error);
  }
});

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

app.post("/api/leads", async (request, response, next) => {
  try {
    const { name, phone, email, city, product, source } = request.body as {
      name?: string;
      phone?: string;
      email?: string;
      city?: string;
      product?: string;
      source?: string;
    };

    if (!name || name.trim().length < 2) {
      response.status(422).json({ error: "Invalid name" });
      return;
    }
    if (!phone || !PHONE_RE.test(phone)) {
      response.status(422).json({ error: "Invalid phone number" });
      return;
    }
    if (email && !EMAIL_RE.test(email)) {
      response.status(422).json({ error: "Invalid email" });
      return;
    }
    if (!city || !city.trim()) {
      response.status(422).json({ error: "Invalid city" });
      return;
    }
    if (!product || !VALID_PRODUCTS.includes(product)) {
      response.status(422).json({ error: "Invalid product" });
      return;
    }

    const lead = await Lead.create({
      name: name.trim(),
      phone,
      email: email?.trim() || null,
      city: city.trim(),
      product,
      source: source ?? "website",
    });

    if (process.env.LEADS_WEBHOOK_URL) {
      fetch(process.env.LEADS_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead.toJSON()),
      }).catch((err) => console.error("Lead webhook forward failed:", err));
    }

    response.status(201).json({ ok: true, id: lead.id });
  } catch (error) {
    next(error);
  }
});

app.get("/api/leads", async (_request, response, next) => {
  try {
    const leads = await Lead.findAll({
      order: [["createdAt", "DESC"]],
    });

    response.json({ leads });
  } catch (error) {
    next(error);
  }
});

app.use(
  (
    error: unknown,
    _request: express.Request,
    response: express.Response,
    _next: express.NextFunction,
  ) => {
    console.error(error);
    response.status(500).json({
      error: "Internal server error",
    });
  },
);