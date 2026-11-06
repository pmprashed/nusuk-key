import { NextRequest, NextResponse } from "next/server";
import { getStats } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    const forwardedFor = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");
    let clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : (realIp || "127.0.0.1");

    // Clean ipv6 localhost
    if (clientIp === "::1") clientIp = "127.0.0.1";

    const stats = await getStats(clientIp);
    const res = NextResponse.json(stats);
    // No caching — always fresh
    res.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
    res.headers.set("Pragma", "no-cache");
    return res;
  } catch (error) {
    console.error("GET /api/stats error:", error);
    return NextResponse.json(
      { codes_ready: 0, codes_used: 0, people_last_hour: 0, visits_last_24h: 0, client_ip: "127.0.0.1" },
      { status: 500 }
    );
  }
}
