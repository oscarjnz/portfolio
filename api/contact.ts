// POST /api/contact: validates a contact-form submission, emails the owner,
// confirms to the visitor and, when HUBSPOT_ACCESS_TOKEN is set, records the
// lead in HubSpot CRM.
//
// Required env: RESEND_API_KEY.
// Optional env: HUBSPOT_ACCESS_TOKEN (private app token), CONTACT_TO (default oscar@osnarci.online) and CONTACT_FROM
// (default Resend's test sender; set it to "Oscar Jimenez <oscar@osnarci.online>"
// once the domain is verified in Resend, which also switches on the visitor
// confirmation, since the test sender can only deliver to the account owner).

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";
import { parseLead } from "./_lib/lead.js";
import { renderOwnerEmail, renderVisitorEmail } from "./_lib/emails.js";
import { isRateLimited } from "./_lib/rateLimit.js";
import { saveLeadToHubSpot } from "./_lib/hubspot.js";

const ALLOWED_ORIGINS = new Set([
  "https://osnarci.online",
  "https://www.osnarci.online",
]);
const MIN_FILL_MS = 2500; // a human cannot fill this form faster

const isLocalOrigin = (origin: string) =>
  /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);

const clientIp = (req: VercelRequest): string => {
  const forwarded = req.headers["x-forwarded-for"];
  const first = Array.isArray(forwarded) ? forwarded[0] : forwarded?.split(",")[0];
  return (first ?? req.socket?.remoteAddress ?? "unknown").trim();
};

function safeJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "method_not_allowed" });
  }

  const origin = req.headers.origin;
  if (origin && !ALLOWED_ORIGINS.has(origin) && !isLocalOrigin(origin)) {
    return res.status(403).json({ ok: false, error: "forbidden_origin" });
  }

  const body: unknown = typeof req.body === "string" ? safeJson(req.body) : req.body;
  const data = (body && typeof body === "object" ? body : {}) as Record<string, unknown>;

  // Bots fill every field; people never see this one. Answer like a success so
  // the bot learns nothing.
  if (typeof data.website === "string" && data.website.trim() !== "") {
    return res.status(200).json({ ok: true });
  }
  const elapsed = Number(data.elapsed);
  if (Number.isFinite(elapsed) && elapsed < MIN_FILL_MS) {
    return res.status(200).json({ ok: true });
  }

  const parsed = parseLead(data);
  if (!parsed.ok) {
    return res.status(400).json({ ok: false, error: "invalid", fields: parsed.errors });
  }

  if (isRateLimited(clientIp(req))) {
    return res.status(429).json({ ok: false, error: "rate_limited" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("contact: RESEND_API_KEY is not set");
    return res.status(500).json({ ok: false, error: "not_configured" });
  }

  const lead = parsed.lead;
  const resend = new Resend(apiKey);
  const to = process.env.CONTACT_TO || "oscar@osnarci.online";
  const from = process.env.CONTACT_FROM || "Oscar Jimenez <onboarding@resend.dev>";
  const canEmailVisitors = !from.includes("@resend.dev");

  const owner = renderOwnerEmail(lead);
  const ownerResult = await resend.emails.send({
    from,
    to,
    replyTo: lead.email,
    subject: owner.subject,
    html: owner.html,
    text: owner.text,
  });
  if (ownerResult.error) {
    console.error("contact: owner email failed", ownerResult.error);
    return res.status(502).json({ ok: false, error: "send_failed" });
  }

  // The lead is already safe in the owner's inbox, so the CRM record and the
  // visitor confirmation are best effort and run side by side.
  const hubspotToken = process.env.HUBSPOT_ACCESS_TOKEN;
  const tasks: Promise<unknown>[] = [];

  if (hubspotToken) {
    tasks.push(
      saveLeadToHubSpot(lead, hubspotToken).then((result) => {
        if (!result.ok) console.error("contact: HubSpot failed", result.error);
      }),
    );
  }

  if (canEmailVisitors) {
    const visitor = renderVisitorEmail(lead);
    tasks.push(
      resend.emails
        .send({
          from,
          to: lead.email,
          replyTo: to,
          subject: visitor.subject,
          html: visitor.html,
          text: visitor.text,
        })
        .then((result) => {
          if (result.error) console.error("contact: visitor confirmation failed", result.error);
        }),
    );
  }

  const settled = await Promise.allSettled(tasks);
  settled.forEach((result) => {
    if (result.status === "rejected") console.error("contact: follow-up task crashed", result.reason);
  });

  return res.status(200).json({ ok: true });
}
