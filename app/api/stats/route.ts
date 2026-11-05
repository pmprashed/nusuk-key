import { NextResponse } from "next/server";
import { getStats } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const stats = await getStats();
    const res = NextResponse.json(stats);
    // No caching — always fresh
    res.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
    res.headers.set("Pragma", "no-cache");
    return res;
  } catch (error) {
    console.error("GET /api/stats error:", error);
    return NextResponse.json(
      { codes_ready: 0, codes_used: 0, people_last_hour: 0 },
      { status: 500 }
    );
  }
}
