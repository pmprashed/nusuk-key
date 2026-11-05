import { NextRequest, NextResponse } from "next/server";
import { recordEvent } from "@/lib/db";
import { getDeviceHash } from "@/lib/hash";
import { EventType } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const codeId = params.id;
    if (!codeId) {
      return NextResponse.json({ error: "Code ID is required" }, { status: 400 });
    }

    let type: EventType = "copy";
    try {
      const body = await req.json();
      if (body && (body.type === "copy" || body.type === "open")) {
        type = body.type;
      }
    } catch {
      // Body is optional, default to 'copy'
    }

    const deviceHash = getDeviceHash(req);
    const result = await recordEvent({
      codeId,
      type,
      deviceHash,
    });

    if (result.error === "rate_limited") {
      return NextResponse.json(
        { error: "Rate limit reached. Please wait a while before copying or opening more codes." },
        { status: 429 }
      );
    }

    return NextResponse.json({ success: true, message: `Event ${type} recorded` });
  } catch (error) {
    console.error("POST /api/codes/[id]/copy error:", error);
    return NextResponse.json({ error: "Failed to record event" }, { status: 500 });
  }
}
