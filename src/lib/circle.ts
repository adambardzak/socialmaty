/**
 * Circle.so integration — add member to a space (Growmat Academy).
 * Uses admin v2 API (same as projektorganika).
 *
 *  POST {communityUrl}/api/admin/v2/community_members
 *  body: { email, name, space_ids: number[], send_invitation_email: true }
 */

const DEFAULT_CIRCLE_COMMUNITY_URL = "https://growmatacademy.circle.so";

function parseSpaceIds(raw: string | undefined): number[] {
  if (!raw) return [];
  return raw
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean)
    .map((v) => Number(v))
    .filter((n) => Number.isInteger(n) && n > 0);
}

export interface CircleInvitePayload {
  email: string;
  name?: string;
}

export async function circleInviteToOrganika(payload: CircleInvitePayload): Promise<boolean> {
  const token = process.env.CIRCLE_API_TOKEN;
  const communityUrl =
    process.env.CIRCLE_COMMUNITY_URL || DEFAULT_CIRCLE_COMMUNITY_URL;
  const spaceIds = parseSpaceIds(process.env.CIRCLE_SPACE_IDS);

  if (!token) {
    console.warn("[circle] CIRCLE_API_TOKEN not set – skipping invite");
    return false;
  }
  if (spaceIds.length === 0) {
    console.warn("[circle] CIRCLE_SPACE_IDS not set – skipping invite");
    return false;
  }

  const baseUrl = communityUrl.replace(/\/+$/, "");
  const fullName = payload.name ?? payload.email.split("@")[0];

  try {
    const res = await fetch(`${baseUrl}/api/admin/v2/community_members`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: payload.email,
        name: fullName,
        space_ids: spaceIds,
        send_invitation_email: true,
      }),
      cache: "no-store",
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("[circle] member create failed", res.status, text);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[circle] invite error", err);
    return false;
  }
}
