// HubSpot CRM adapter: turns a contact-form submission into a Lead contact
// (lifecycle "lead", status "New") plus a note with the full message.
//
// Needs HUBSPOT_ACCESS_TOKEN, a HubSpot private app token with the scopes
// crm.objects.contacts.read and crm.objects.contacts.write (the note also uses
// the engagement/notes scope if the app grants it; without it the contact is
// still created). Everything here is best effort: the lead is already in the
// owner's inbox before this runs, so a CRM outage never loses a message.

import type { Lead } from "./lead.js";
import { TOPIC_LABEL } from "./emails.js";

const API = "https://api.hubapi.com";
const TIMEOUT_MS = 8000;
// HUBSPOT_DEFINED association type: note -> contact.
const NOTE_TO_CONTACT = 202;

export type CrmResult = { ok: true; id: string; created: boolean } | { ok: false; error: string };

async function hubspot(
  token: string,
  path: string,
  init: { method: string; body?: unknown },
): Promise<{ status: number; json: Record<string, unknown> }> {
  const response = await fetch(`${API}${path}`, {
    method: init.method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: init.body === undefined ? undefined : JSON.stringify(init.body),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  const json = (await response.json().catch(() => ({}))) as Record<string, unknown>;
  return { status: response.status, json };
}

const escapeHtml = (value: string): string =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function saveLeadToHubSpot(lead: Lead, token: string): Promise<CrmResult> {
  const topic = TOPIC_LABEL.es[lead.topic];
  const base: Record<string, string> = {
    firstname: lead.firstName,
    lastname: lead.lastName,
    message: lead.message,
  };
  if (lead.phone) base.phone = lead.phone;

  // First contact: create as a fresh lead.
  const created = await hubspot(token, "/crm/v3/objects/contacts", {
    method: "POST",
    body: {
      properties: {
        ...base,
        email: lead.email,
        lifecyclestage: "lead",
        hs_lead_status: "NEW",
      },
    },
  });

  let id: string | undefined;
  let wasCreated = false;

  if (created.status === 201 && typeof created.json.id === "string") {
    id = created.json.id;
    wasCreated = true;
  } else if (created.status === 409) {
    // Already in the CRM: refresh the details but never move an existing
    // contact's lifecycle backwards (a customer must not become a "lead").
    const updated = await hubspot(token, `/crm/v3/objects/contacts/${encodeURIComponent(lead.email)}?idProperty=email`, {
      method: "PATCH",
      body: { properties: base },
    });
    if (updated.status === 200 && typeof updated.json.id === "string") id = updated.json.id;
    else return { ok: false, error: `update_failed_${updated.status}` };
  } else {
    return { ok: false, error: `create_failed_${created.status}` };
  }

  if (!id) return { ok: false, error: "no_contact_id" };

  // The timeline entry keeps every message, even from repeat visitors.
  const noteBody =
    `<p><strong>Formulario del portafolio</strong></p>` +
    `<p><strong>Motivo:</strong> ${escapeHtml(topic)}<br>` +
    `<strong>Idioma:</strong> ${lead.lang === "es" ? "Español" : "English"}</p>` +
    `<p>${escapeHtml(lead.message).replace(/\r?\n/g, "<br>")}</p>`;
  const note = await hubspot(token, "/crm/v3/objects/notes", {
    method: "POST",
    body: {
      properties: { hs_timestamp: new Date().toISOString(), hs_note_body: noteBody },
      associations: [
        {
          to: { id },
          types: [{ associationCategory: "HUBSPOT_DEFINED", associationTypeId: NOTE_TO_CONTACT }],
        },
      ],
    },
  });
  if (note.status !== 201) console.error("hubspot: note not created", note.status);

  return { ok: true, id, created: wasCreated };
}
