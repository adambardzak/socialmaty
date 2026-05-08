import { NextResponse } from "next/server";
import { getSpotsLeft } from "@/lib/counter";
import { priceCzkForCurrentTier } from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const { sold, remaining, limit } = await getSpotsLeft();
  const { priceCzk } = priceCzkForCurrentTier(remaining);
  return NextResponse.json({ sold, remaining, limit, priceCzk });
}
