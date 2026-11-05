import { NextRequest, NextResponse } from "next/server";
import { reportCode } from "@/lib/db";
import { getDeviceHash } from "@/lib/hash";
import { ReportType } from "@/lib/types";

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

    const body = await req.json();
    const type = body?.type as ReportType;

    if (!type || (type !== "already_used" && type !== "not_correct")) {
      return NextResponse.json(
        { error: "Invalid report type. Must be 'already_used' or 'not_correct'." },
        { status: 400 }
      );
    }

    const reporterHash = getDeviceHash(req);
    const result = await reportCode({
      codeId,
      type,
      reporterHash,
    });

    return NextResponse.json({
      success: true,
      removed: result.removed || false,
      message: result.removed
        ? "Code has received 2 reports and was removed from rotation."
        : "Report recorded. Thank you for helping keep the code list clean.",
    });
  } catch (error) {
    console.error("POST /api/codes/[id]/report error:", error);
    return NextResponse.json({ error: "Failed to submit report" }, { status: 500 });
  }
}
