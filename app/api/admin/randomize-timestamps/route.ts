import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// One-time admin endpoint to randomize created_at for all existing codes
// to 3-7 days ago. Protected by a simple secret key.
// DELETE THIS FILE after running once.

const ADMIN_SECRET = "nusuk-admin-2026-randomize";

const SUPABASE_URL = "https://rrmkrqogalodctqqtbbq.supabase.co";
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJybWtycW9nYWxvZGN0cXF0YmJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM4Njk3MDAsImV4cCI6MjEwOTQ0NTcwMH0.Jpi76SRjJJH-KdQFWsXJg9kwJcV-9pHKY1wemUfdvF0";

export async function POST(req: NextRequest) {
  // Validate secret
  const secret = req.headers.get("x-admin-secret");
  if (secret !== ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  try {
    // Fetch all code IDs
    const { data: allCodes, error: fetchErr } = await supabase
      .from("codes")
      .select("id")
      .limit(10000);

    if (fetchErr) {
      return NextResponse.json({ error: fetchErr.message }, { status: 500 });
    }

    if (!allCodes || allCodes.length === 0) {
      return NextResponse.json({ message: "No codes found", updated: 0 });
    }

    // Update each code with a random created_at between 3-7 days ago
    const BATCH_SIZE = 100;
    let totalUpdated = 0;
    let errors = 0;

    for (let i = 0; i < allCodes.length; i += BATCH_SIZE) {
      const batch = allCodes.slice(i, i + BATCH_SIZE);
      const updates = batch.map(({ id }) => {
        const daysAgo = 3 + Math.random() * 4; // 3 to 7
        const minutesInDay = Math.random() * 1440;
        const ms = (daysAgo * 24 * 60 + minutesInDay) * 60 * 1000;
        const newDate = new Date(Date.now() - ms).toISOString();
        return { id, created_at: newDate };
      });

      // Use upsert to bulk update
      const { error: upsertErr, count } = await supabase
        .from("codes")
        .upsert(updates, { onConflict: "id", count: "exact" });

      if (upsertErr) {
        console.error(`Batch ${i}-${i + BATCH_SIZE} error:`, upsertErr.message);
        errors++;
      } else {
        totalUpdated += count || batch.length;
      }
    }

    return NextResponse.json({
      message: "Timestamps randomized successfully",
      total: allCodes.length,
      updated: totalUpdated,
      errors,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
