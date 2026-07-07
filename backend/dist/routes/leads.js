import { Router } from "express";
import { Lead } from "../models/lead.js";
const router = Router();
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
function validate(body) {
    if (!body.name || body.name.trim().length < 2)
        return "Invalid name";
    if (!body.phone || !PHONE_RE.test(body.phone))
        return "Invalid phone number";
    if (body.email && !EMAIL_RE.test(body.email))
        return "Invalid email";
    if (!body.city || !body.city.trim())
        return "Invalid city";
    if (!body.product || !VALID_PRODUCTS.includes(body.product))
        return "Invalid product";
    return null;
}
router.post("/", async (req, res) => {
    const body = req.body ?? {};
    const error = validate(body);
    if (error) {
        return res.status(422).json({ error });
    }
    try {
        const lead = await Lead.create({
            name: body.name.trim(),
            phone: body.phone,
            email: body.email?.trim() || null,
            city: body.city.trim(),
            product: body.product,
            source: body.source ?? "website",
        });
        if (process.env.LEADS_WEBHOOK_URL) {
            fetch(process.env.LEADS_WEBHOOK_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(lead.toJSON()),
            }).catch((err) => console.error("Lead webhook forward failed:", err));
        }
        return res.status(201).json({ ok: true, id: lead.id });
    }
    catch (err) {
        console.error("Failed to save lead:", err);
        return res.status(500).json({ error: "Failed to save lead" });
    }
});
export default router;
