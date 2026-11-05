import { NextRequest, NextResponse } from "next/server";
import { getNextCode } from "@/lib/db";
import { getDeviceHash } from "@/lib/hash";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const excludeParam = searchParams.get("exclude");
    const exclude = excludeParam ? excludeParam.split(",").filter(Boolean) : [];
    const deviceHash = getDeviceHash(req);

    const code = await getNextCode(deviceHash, exclude);
    return NextResponse.json({ code });
  } catch (error) {
    console.error("GET /api/codes/next error:", error);
    return NextResponse.json({ error: "Failed to fetch next code", code: null }, { status: 500 });
  }
}
