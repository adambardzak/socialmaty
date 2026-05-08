/**
 * Circle.so integration — invite buyer to community space.
 * Docs: https://api.circle.so/
 *
 * We use the v1 admin API:
 *  POST /api/v1/community_members  -> creates member (sends invite email)
 *  POST /api/v1/space_members      -> adds member to specific space
 */

const CIRCLE_BASE = "https://app.circle.so/api/v1";

function getToken() {
  const token = process.env.CIRCLE_API_TOKEN;
  if (!token) console.warn("[circle] CIRCLE_API_TOKEN not set – skipping invite");
  return token;
}

function getCommunityId() {
  const id = process.env.CIRCLE_COMMUNITY_ID;
  if (!id) console.warn("[circle] CIRCLE_COMMUNITY_ID not set");
  return id;
}

function getSpaceId() {
  const id = process.env.CIRCLE_SPACE_ID;
  if (!id) console.warn("[circle] CIRCLE_SPACE_ID not set");
  return id;
}

export interface CircleInvitePayload {
  email: string;
  name?: string;
}

export async function circleInviteToOrganika(payload: CircleInvitePayload): Promise<boolean> {
  const token = getToken();
  const communityId = getCommunityId();
  const spaceId = getSpaceId();
  if (!token || !communityId) return false;

  try {
    // 1) Create or upsert community member
    const memberRes = await fetch(`${CIRCLE_BASE}/community_members`, {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: payload.email,
        name: payload.name ?? payload.email.split("@")[0],
        community_id: communityId,
        skip_invitation: false,
      }),
    });

    if (!memberRes.ok && memberRes.status !== 422) {
      // 422 = already exists, that's fine
      const text = await memberRes.text().catch(() => "");
      console.error("[circle] member create failed", memberRes.status, text);
    }

    // 2) Add to space (Projekt Organika)
    if (spaceId) {
      const spaceRes = await fetch(`${CIRCLE_BASE}/space_members`, {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: payload.email,
          space_id: spaceId,
          community_id: communityId,
        }),
      });
      if (!spaceRes.ok && spaceRes.status !== 422) {
        const text = await spaceRes.text().catch(() => "");
        console.error("[circle] space add failed", spaceRes.status, text);
      }
    }

    return true;
  } catch (err) {
    console.error("[circle] invite error", err);
    return false;
  }
}
