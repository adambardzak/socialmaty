/**
 * Ecomail integration.
 * Docs: https://ecomailappcz.docs.apiary.io/
 *
 * Strategy:
 *  - subscribeToList(email, name, tags): POST /lists/{list_id}/subscribe
 *  - on purchase: subscribe again with new tags (Ecomail merges by email)
 */

const ECOMAIL_BASE = "https://api2.ecomailapp.cz";

function getKey() {
  const raw = process.env.ECOMAIL_API_KEY;
  const key = raw?.trim();
  if (!key) {
    console.warn(
      `[ecomail] ECOMAIL_API_KEY not set – skipping API call (raw type: ${typeof raw}, raw length: ${raw?.length ?? 0})`,
    );
  } else {
    console.log(`[ecomail] key loaded (length: ${key.length}, first 4: ${key.slice(0, 4)}***)`);
  }
  return key;
}

function getListId() {
  const raw = process.env.ECOMAIL_LIST_ID;
  const id = raw?.trim();
  if (!id) {
    console.warn(
      `[ecomail] ECOMAIL_LIST_ID not set – skipping API call (raw: ${JSON.stringify(raw)})`,
    );
  } else {
    console.log(`[ecomail] list id: ${id}`);
  }
  return id;
}

export interface EcomailSubscribePayload {
  email: string;
  name?: string;
  tags?: string[];
  /**
   * Trigger automation for the contact (true = trigger welcome flows).
   * Defaults to true.
   */
  triggerAutoresponders?: boolean;
}

export async function ecomailSubscribe(payload: EcomailSubscribePayload): Promise<boolean> {
  const key = getKey();
  const listId = getListId();
  if (!key || !listId) return false;

  const body = {
    subscriber_data: {
      email: payload.email,
      name: payload.name,
      tags: payload.tags ?? [],
    },
    update_existing: true,
    resubscribe: true,
    skip_confirmation: true,
    trigger_autoresponders: payload.triggerAutoresponders ?? true,
  };

  try {
    const res = await fetch(`${ECOMAIL_BASE}/lists/${listId}/subscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        key,
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("[ecomail] subscribe failed", res.status, text);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[ecomail] subscribe error", err);
    return false;
  }
}
