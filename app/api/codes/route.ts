import { NextRequest, NextResponse } from "next/server";
import { getCodes, addCode } from "@/lib/db";
import { getDeviceHash } from "@/lib/hash";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "20", 10);
    const excludeParam = searchParams.get("exclude");
    const exclude = excludeParam ? excludeParam.split(",").filter(Boolean) : [];
    const deviceHash = getDeviceHash(req);

    const codes = await getCodes({
      limit: Math.min(Math.max(limit, 1), 50),
      exclude,
      deviceHash,
    });

    return NextResponse.json({ codes });
  } catch (error) {
    console.error("GET /api/codes error:", error);
    return NextResponse.json({ error: "Failed to fetch codes", codes: [] }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text, name } = body;

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid 'text' field" },
        { status: 400 }
      );
    }

    const submitterHash = getDeviceHash(req);
    const result = await addCode({
      text,
      name: typeof name === "string" ? name : undefined,
      submitterHash,
    });

    if (result.error === "invalid_format") {
      return NextResponse.json(
        { error: "No valid Nusuk code found. A code must start with NG- followed by 8 letters or numbers." },
        { status: 400 }
      );
    }

    if (result.error === "duplicate") {
      return NextResponse.json(
        { error: "This code is already listed in the rotation." },
        { status: 409 }
      );
    }

    if (result.error === "limit_exceeded") {
      return NextResponse.json(
        { error: "Daily limit reached. Each user can submit up to 3 codes per 24 hours." },
        { status: 429 }
      );
    }

    if (result.error || !result.code) {
      return NextResponse.json(
        { error: "Failed to save code. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      code: result.code,
      status: "active",
      message: "Code successfully added to rotation",
    });
  } catch (error) {
    console.error("POST /api/codes error:", error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}
