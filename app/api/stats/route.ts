import { NextResponse } from "next/server";
import { getStats } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const stats = await getStats();
    return NextResponse.json(stats);
  } catch (error) {
    console.error("GET /api/stats error:", error);
    return NextResponse.json(
      { codes_ready: 0, codes_used: 0, people_last_hour: 0 },
      { status: 500 }
    );
  }
}
