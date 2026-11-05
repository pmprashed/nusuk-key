import { createClient } from "@supabase/supabase-js";
import { CodeItem, EventType, ReportType, StatsResponse } from "./types";

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;

const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseKey &&
  !supabaseUrl.includes("placeholder")
);

function getSupabaseClient() {
  if (!isSupabaseConfigured) return null;
  return createClient(
    supabaseUrl!,
    supabaseKey!,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  );
}

// In-memory fallback store for development or before Supabase credentials are configured
interface MemoryStore {
  codes: CodeItem[];
  codeEvents: { id: string; code_id: string; type: EventType; device_hash: string; created_at: string }[];
  reports: { id: string; code_id: string; type: ReportType; reporter_hash: string; created_at: string }[];
  submissions: { id: string; submitter_hash: string; created_at: string }[];
}

const memoryStore: MemoryStore = {
  codes: [
    { id: "10000000-0000-0000-0000-000000000001", code: "NG-TEST0001", display_name: "Test Seed", created_at: new Date(Date.now() - 3600000 * 5).toISOString(), use_count: 1, report_count: 0, status: "active", last_served_at: null },
    { id: "10000000-0000-0000-0000-000000000002", code: "NG-TEST0002", display_name: "Test Seed", created_at: new Date(Date.now() - 3600000 * 4).toISOString(), use_count: 2, report_count: 0, status: "active", last_served_at: null },
    { id: "10000000-0000-0000-0000-000000000003", code: "NG-TEST0003", display_name: "Test Seed", created_at: new Date(Date.now() - 3600000 * 3).toISOString(), use_count: 0, report_count: 0, status: "active", last_served_at: null },
    { id: "10000000-0000-0000-0000-000000000004", code: "NG-TEST0004", display_name: "Test Seed", created_at: new Date(Date.now() - 3600000 * 3).toISOString(), use_count: 5, report_count: 0, status: "active", last_served_at: null },
    { id: "10000000-0000-0000-0000-000000000005", code: "NG-TEST0005", display_name: "Test Seed", created_at: new Date(Date.now() - 3600000 * 2).toISOString(), use_count: 0, report_count: 0, status: "active", last_served_at: null },
    { id: "10000000-0000-0000-0000-000000000006", code: "NG-TEST0006", display_name: "Test Seed", created_at: new Date(Date.now() - 3600000 * 2).toISOString(), use_count: 3, report_count: 0, status: "active", last_served_at: null },
    { id: "10000000-0000-0000-0000-000000000007", code: "NG-TEST0007", display_name: "Test Seed", created_at: new Date(Date.now() - 3600000 * 1).toISOString(), use_count: 1, report_count: 0, status: "active", last_served_at: null },
    { id: "10000000-0000-0000-0000-000000000008", code: "NG-TEST0008", display_name: "Test Seed", created_at: new Date(Date.now() - 3600000 * 1).toISOString(), use_count: 4, report_count: 0, status: "active", last_served_at: null },
    { id: "10000000-0000-0000-0000-000000000009", code: "NG-TEST0009", display_name: "Test Seed", created_at: new Date(Date.now() - 1800000).toISOString(), use_count: 0, report_count: 0, status: "active", last_served_at: null },
    { id: "10000000-0000-0000-0000-000000000010", code: "NG-TEST0010", display_name: "Test Seed", created_at: new Date(Date.now() - 900000).toISOString(), use_count: 2, report_count: 0, status: "active", last_served_at: null },
  ],
  codeEvents: [],
  reports: [],
  submissions: [],
};

export async function getCodes(params: {
  limit?: number;
  exclude?: string[];
  deviceHash?: string;
}): Promise<CodeItem[]> {
  const limit = params.limit ?? 20;
  const excludeSet = new Set(params.exclude || []);
  const supabase = getSupabaseClient();

  if (supabase) {
    // 1. Find codes reported by this device
    let reportedIds: string[] = [];
    if (params.deviceHash) {
      const { data: userReports } = await supabase
        .from("reports")
        .select("code_id")
        .eq("reporter_hash", params.deviceHash);
      if (userReports) {
        reportedIds = userReports.map((r: { code_id: string }) => r.code_id);
      }
    }

    const allExcluded = [...Array.from(excludeSet), ...reportedIds];

    let query = supabase
      .from("codes")
      .select("*")
      .eq("status", "active")
      .order("use_count", { ascending: true })
      .order("created_at", { ascending: true });

    if (allExcluded.length > 0) {
      query = query.not("id", "in", `(${allExcluded.join(",")})`);
    }

    const { data, error } = await query.limit(limit * 3);
    if (error || !data) {
      console.error("Error fetching codes from Supabase:", error);
      return [];
    }

    // Fair rotation: lowest use_count first with random tie break
    const shuffled = [...data].sort((a, b) => {
      if (a.use_count !== b.use_count) return a.use_count - b.use_count;
      return 0.5 - Math.random();
    });

    const selected = shuffled.slice(0, limit);

    // Update last_served_at
    if (selected.length > 0) {
      const idsToUpdate = selected.map((c: CodeItem) => c.id);
      await supabase
        .from("codes")
        .update({ last_served_at: new Date().toISOString() })
        .in("id", idsToUpdate);
    }

    return selected;
  }

  // Memory fallback
  const reportedIds = params.deviceHash
    ? new Set(memoryStore.reports.filter((r) => r.reporter_hash === params.deviceHash).map((r) => r.code_id))
    : new Set<string>();

  const eligible = memoryStore.codes.filter(
    (c) => c.status === "active" && !excludeSet.has(c.id) && !reportedIds.has(c.id)
  );

  eligible.sort((a, b) => {
    if (a.use_count !== b.use_count) return a.use_count - b.use_count;
    return 0.5 - Math.random();
  });

  const selected = eligible.slice(0, limit);
  const now = new Date().toISOString();
  selected.forEach((c) => {
    c.last_served_at = now;
  });

  return selected;
}

export async function getNextCode(deviceHash?: string): Promise<CodeItem | null> {
  const codes = await getCodes({ limit: 1, deviceHash });
  return codes[0] || null;
}

export async function addCode(params: {
  text: string;
  name?: string;
  submitterHash: string;
}): Promise<{ code?: CodeItem; error?: string }> {
  // Extract first match of NG-[A-Za-z0-9]{8}
  const match = params.text.match(/NG-[A-Za-z0-9]{8}/);
  if (!match) {
    return { error: "invalid_format" };
  }
  const extractedCode = match[0];
  const supabase = getSupabaseClient();
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  if (supabase) {
    // Check daily submission limit (3 per day)
    const { count: dailyCount, error: countErr } = await supabase
      .from("submissions")
      .select("*", { count: "exact", head: true })
      .eq("submitter_hash", params.submitterHash)
      .gte("created_at", oneDayAgo);

    if (countErr) {
      console.error("Error checking daily submission limit:", countErr);
    } else if ((dailyCount ?? 0) >= 3) {
      return { error: "limit_exceeded" };
    }

    // Check if code already listed
    const { data: existing } = await supabase
      .from("codes")
      .select("id")
      .eq("code", extractedCode)
      .maybeSingle();

    if (existing) {
      return { error: "duplicate" };
    }

    // Insert new code
    const { data: newCode, error: insertErr } = await supabase
      .from("codes")
      .insert({
        code: extractedCode,
        display_name: params.name ? params.name.trim().slice(0, 50) : null,
        status: "active",
        use_count: 0,
        report_count: 0,
      })
      .select()
      .single();

    if (insertErr || !newCode) {
      console.error("Error inserting code:", insertErr);
      return { error: "insert_failed" };
    }

    // Log submission
    await supabase.from("submissions").insert({
      submitter_hash: params.submitterHash,
    });

    return { code: newCode };
  }

  // Memory fallback
  const userSubmissionsLast24h = memoryStore.submissions.filter(
    (s) => s.submitter_hash === params.submitterHash && s.created_at >= oneDayAgo
  ).length;

  if (userSubmissionsLast24h >= 3) {
    return { error: "limit_exceeded" };
  }

  const existing = memoryStore.codes.find((c) => c.code === extractedCode);
  if (existing) {
    return { error: "duplicate" };
  }

  const newCode: CodeItem = {
    id: `mem-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    code: extractedCode,
    display_name: params.name ? params.name.trim().slice(0, 50) : null,
    created_at: new Date().toISOString(),
    use_count: 0,
    report_count: 0,
    status: "active",
    last_served_at: null,
  };

  memoryStore.codes.unshift(newCode);
  memoryStore.submissions.push({
    id: `sub-${Date.now()}`,
    submitter_hash: params.submitterHash,
    created_at: new Date().toISOString(),
  });

  return { code: newCode };
}

export async function recordEvent(params: {
  codeId: string;
  type: EventType;
  deviceHash: string;
}): Promise<{ success: boolean; error?: string }> {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const supabase = getSupabaseClient();

  if (supabase) {
    // Check rate limit: 60 calls per hour
    const { count: hourCount } = await supabase
      .from("code_events")
      .select("*", { count: "exact", head: true })
      .eq("device_hash", params.deviceHash)
      .gte("created_at", oneHourAgo);

    if ((hourCount ?? 0) >= 60) {
      return { success: false, error: "rate_limited" };
    }

    // Record event
    await supabase.from("code_events").insert({
      code_id: params.codeId,
      type: params.type,
      device_hash: params.deviceHash,
    });

    // Increment use_count using RPC or read-and-update
    const { data: code } = await supabase
      .from("codes")
      .select("use_count")
      .eq("id", params.codeId)
      .single();

    if (code) {
      await supabase
        .from("codes")
        .update({ use_count: (code.use_count || 0) + 1 })
        .eq("id", params.codeId);
    }

    return { success: true };
  }

  // Memory fallback
  const eventsInHour = memoryStore.codeEvents.filter(
    (e) => e.device_hash === params.deviceHash && e.created_at >= oneHourAgo
  ).length;

  if (eventsInHour >= 60) {
    return { success: false, error: "rate_limited" };
  }

  memoryStore.codeEvents.push({
    id: `event-${Date.now()}`,
    code_id: params.codeId,
    type: params.type,
    device_hash: params.deviceHash,
    created_at: new Date().toISOString(),
  });

  const code = memoryStore.codes.find((c) => c.id === params.codeId);
  if (code) {
    code.use_count += 1;
  }

  return { success: true };
}

export async function reportCode(params: {
  codeId: string;
  type: ReportType;
  reporterHash: string;
}): Promise<{ success: boolean; removed?: boolean; error?: string }> {
  const supabase = getSupabaseClient();

  if (supabase) {
    // Insert report (unique per code_id and reporter_hash)
    const { error: insertErr } = await supabase.from("reports").upsert(
      {
        code_id: params.codeId,
        type: params.type,
        reporter_hash: params.reporterHash,
      },
      { onConflict: "code_id,reporter_hash" }
    );

    if (insertErr) {
      console.error("Error inserting report:", insertErr);
    }

    // Check count of distinct reports
    const { count: reportCount } = await supabase
      .from("reports")
      .select("*", { count: "exact", head: true })
      .eq("code_id", params.codeId);

    const totalReports = reportCount ?? 1;

    // If 2 or more reports from different people, remove code
    let removed = false;
    if (totalReports >= 2) {
      removed = true;
      await supabase
        .from("codes")
        .update({ status: "removed", report_count: totalReports })
        .eq("id", params.codeId);
    } else {
      await supabase
        .from("codes")
        .update({ report_count: totalReports })
        .eq("id", params.codeId);
    }

    return { success: true, removed };
  }

  // Memory fallback
  const existingReport = memoryStore.reports.find(
    (r) => r.code_id === params.codeId && r.reporter_hash === params.reporterHash
  );

  if (!existingReport) {
    memoryStore.reports.push({
      id: `rep-${Date.now()}`,
      code_id: params.codeId,
      type: params.type,
      reporter_hash: params.reporterHash,
      created_at: new Date().toISOString(),
    });
  }

  const distinctReports = memoryStore.reports.filter((r) => r.code_id === params.codeId).length;
  const targetCode = memoryStore.codes.find((c) => c.id === params.codeId);
  let removed = false;

  if (targetCode) {
    targetCode.report_count = distinctReports;
    if (distinctReports >= 2) {
      targetCode.status = "removed";
      removed = true;
    }
  }

  return { success: true, removed };
}

export async function getStats(): Promise<StatsResponse> {
  const supabase = getSupabaseClient();
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();

  if (supabase) {
    // 1. Codes ready (active count)
    const { count: codesReady } = await supabase
      .from("codes")
      .select("*", { count: "exact", head: true })
      .eq("status", "active");

    // 2. Codes used (sum of use_count)
    const { data: usageData } = await supabase
      .from("codes")
      .select("use_count");

    const codesUsed = usageData
      ? usageData.reduce((acc: number, item: { use_count: number }) => acc + (item.use_count || 0), 0)
      : 0;

    // 3. People in the last hour (distinct device_hash in code_events in last 60m)
    const { data: recentEvents } = await supabase
      .from("code_events")
      .select("device_hash")
      .gte("created_at", oneHourAgo);

    const distinctPeople = recentEvents
      ? new Set(recentEvents.map((e: { device_hash: string }) => e.device_hash)).size
      : 0;

    return {
      codes_ready: codesReady ?? 0,
      codes_used: codesUsed,
      people_last_hour: distinctPeople,
    };
  }

  // Memory fallback: real numbers from store
  const codesReady = memoryStore.codes.filter((c) => c.status === "active").length;
  const codesUsed = memoryStore.codes.reduce((acc, c) => acc + c.use_count, 0);
  const recentEvents = memoryStore.codeEvents.filter((e) => e.created_at >= oneHourAgo);
  const distinctPeople = new Set(recentEvents.map((e) => e.device_hash)).size;

  return {
    codes_ready: codesReady,
    codes_used: codesUsed,
    people_last_hour: distinctPeople,
  };
}
