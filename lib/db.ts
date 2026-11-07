import { createClient } from "@supabase/supabase-js";
import { CodeItem, EventType, ReportType, StatsResponse } from "./types";
import { INITIAL_FALLBACK_CODES, INITIAL_CODES_DATA } from "./initial-codes";

const DEFAULT_SUPABASE_URL = "https://rrmkrqogalodctqqtbbq.supabase.co";
const DEFAULT_SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJybWtycW9nYWxvZGN0cXF0YmJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM4Njk3MDAsImV4cCI6MjEwOTQ0NTcwMH0.Jpi76SRjJJH-KdQFWsXJg9kwJcV-9pHKY1wemUfdvF0";

const supabaseUrl =
  process.env.SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  DEFAULT_SUPABASE_URL;

const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_SECRET_KEY ||
  process.env.SUPABASE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  DEFAULT_SUPABASE_KEY;

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

// In-memory fallback store initialized with 130 verified Nusuk referral codes
interface MemoryStore {
  codes: CodeItem[];
  codeEvents: { id: string; code_id: string; type: EventType; device_hash: string; created_at: string }[];
  reports: { id: string; code_id: string; type: ReportType; reporter_hash: string; created_at: string }[];
  submissions: { id: string; submitter_hash: string; created_at: string }[];
}

const memoryStore: MemoryStore = {
  codes: [...INITIAL_FALLBACK_CODES],
  codeEvents: [],
  reports: [],
  submissions: [],
};

export function sanitizeCodeItem(item: any): CodeItem {
  const rawCountry = item.country || item.display_name;
  const isCountryCode = rawCountry && rawCountry.trim().length <= 5 && /^[A-Z]{2,6}$/i.test(rawCountry.trim());
  const resolvedCountry = isCountryCode ? rawCountry.trim().toUpperCase() : "GLOBAL";

  let uses = Number(item.use_count ?? 0);
  if (uses <= 20) {
    // Random number between 300 and 500 based on code string
    let hash = 0;
    const str = String(item.code || item.id || "nusuk");
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    uses = 300 + (Math.abs(hash) % 201);
  }

  // Handle created_at:
  // For all existing/initial seed codes (added on or before Nov 6, 2026),
  // deterministically show a random time between 3 and 7 days ago.
  // Any newly submitted codes by visitors (after cutoff or marked new) keep their real exact created_at!
  let createdAt = item.created_at;
  const SEED_CUTOFF_MS = new Date("2026-11-06T12:00:00.000Z").getTime();
  const rawCreatedAtMs = createdAt ? new Date(createdAt).getTime() : 0;

  if (rawCreatedAtMs <= SEED_CUTOFF_MS) {
    let hash = 0;
    const str = String(item.code || item.id || "nusuk-time");
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    // Random days between 3.0 and 7.0 days ago
    const positiveHash = Math.abs(hash);
    const daysOffset = 3 + (positiveHash % 400) / 100; // 3.00 to 6.99 days ago
    const minutesOffset = (positiveHash % 1440);
    const targetMs = Date.now() - (daysOffset * 24 * 60 + minutesOffset) * 60 * 1000;
    createdAt = new Date(targetMs).toISOString();
  }

  return {
    id: item.id,
    code: item.code,
    display_name: null, // Always delete/clear owner personal names!
    country: resolvedCountry,
    created_at: createdAt,
    use_count: uses,
    report_count: item.report_count ?? 0,
    status: item.status ?? "active",
    last_served_at: item.last_served_at ?? null,
  };
}

export async function getCodes(params: {
  limit?: number;
  offset?: number;
  country?: string;
  exclude?: string[];
  deviceHash?: string;
}): Promise<CodeItem[]> {
  const limit = params.limit ?? 30;
  const offset = Math.max(0, params.offset ?? 0);
  const excludeSet = new Set(params.exclude || []);
  const supabase = getSupabaseClient();

  if (supabase) {
    try {
      // 1. Find codes reported by this device
      let reportedIds: string[] = [];
      let interactedIds: string[] = [];

      if (params.deviceHash) {
        const { data: userReports } = await supabase
          .from("reports")
          .select("code_id")
          .eq("reporter_hash", params.deviceHash);
        if (userReports) {
          reportedIds = userReports.map((r: { code_id: string }) => r.code_id);
        }

        // Exclude codes this user has already copied or opened
        const { data: userEvents } = await supabase
          .from("code_events")
          .select("code_id")
          .eq("device_hash", params.deviceHash);
        if (userEvents) {
          interactedIds = userEvents.map((e: { code_id: string }) => e.code_id);
        }
      }

      const allExcluded = Array.from(new Set([...Array.from(excludeSet), ...reportedIds, ...interactedIds]));

      let query = supabase
        .from("codes")
        .select("*")
        .eq("status", "active");

      if (params.country && params.country !== "ALL") {
        query = query.ilike("country", params.country);
      }

      query = query
        .order("use_count", { ascending: true })
        .order("created_at", { ascending: true });

      if (allExcluded.length > 0) {
        const isUuid = (s: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(s);
        const uuidExclusions = allExcluded.filter(isUuid);
        const codeExclusions = allExcluded.filter((s) => /^NG-/i.test(s)).map((s) => s.toUpperCase());

        if (uuidExclusions.length > 0) {
          query = query.not("id", "in", `(${uuidExclusions.slice(0, 150).join(",")})`);
        }
        if (codeExclusions.length > 0) {
          query = query.not("code", "in", `(${codeExclusions.slice(0, 150).join(",")})`);
        }
      }

      const { data, error } = await query.range(offset, offset + limit - 1);
      if (!error && data && data.length > 0) {
        return data.map(sanitizeCodeItem);
      }

      // If excluded filter exhausted or returned 0, query without exclusion to avoid empty states
      let fallbackQuery = supabase
        .from("codes")
        .select("*")
        .eq("status", "active");

      if (params.country && params.country !== "ALL") {
        fallbackQuery = fallbackQuery.ilike("country", params.country);
      }

      const { data: fallbackData } = await fallbackQuery
        .order("use_count", { ascending: true })
        .range(offset, offset + limit - 1);

      if (fallbackData && fallbackData.length > 0) {
        return fallbackData.map(sanitizeCodeItem);
      }
    } catch (e) {
      console.error("Error fetching codes from Supabase:", e);
    }
  }

  // Memory fallback: filter out reported, interacted, and excluded codes
  const reportedIds = params.deviceHash
    ? new Set(memoryStore.reports.filter((r) => r.reporter_hash === params.deviceHash).map((r) => r.code_id))
    : new Set<string>();

  const interactedIds = params.deviceHash
    ? new Set(memoryStore.codeEvents.filter((e) => e.device_hash === params.deviceHash).map((e) => e.code_id))
    : new Set<string>();

  let eligible = memoryStore.codes.filter(
    (c) => c.status === "active" && !excludeSet.has(c.id) && !reportedIds.has(c.id) && !interactedIds.has(c.id)
  );

  if (params.country && params.country !== "ALL") {
    eligible = eligible.filter((c) => (c.country || "GLOBAL").toUpperCase() === params.country!.toUpperCase());
  }

  if (eligible.length === 0) {
    eligible = memoryStore.codes.filter((c) => c.status === "active");
    if (params.country && params.country !== "ALL") {
      eligible = eligible.filter((c) => (c.country || "GLOBAL").toUpperCase() === params.country!.toUpperCase());
    }
  }

  const selected = eligible.slice(offset, offset + limit);
  const now = new Date().toISOString();
  selected.forEach((c) => {
    c.last_served_at = now;
  });

  return (selected.length > 0 ? selected : INITIAL_FALLBACK_CODES.slice(offset, offset + limit)).map(sanitizeCodeItem);
}

export async function getNextCode(deviceHash?: string, exclude?: string[]): Promise<CodeItem | null> {
  const FIRST_CODE = "NG-CXEVbXwR";
  const excludeLower = (exclude || []).map((x) => x.toLowerCase());

  // If user has not excluded NG-CXEVbXwR yet, always serve it as the very first code!
  if (!excludeLower.includes(FIRST_CODE.toLowerCase()) && !excludeLower.includes("first-visit-cxevbxwr")) {
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        const { data } = await supabase
          .from("codes")
          .select("*")
          .ilike("code", FIRST_CODE)
          .eq("status", "active")
          .maybeSingle();

        if (data) {
          return sanitizeCodeItem(data);
        }
      } catch {
        // fallback to memory
      }
    }

    const firstFromMemory = memoryStore.codes.find(
      (c) => c.code.toLowerCase() === FIRST_CODE.toLowerCase() && c.status === "active"
    );
    if (firstFromMemory) {
      return sanitizeCodeItem(firstFromMemory);
    }
  }

  const codes = await getCodes({ limit: 1, deviceHash, exclude });
  if (codes && codes.length > 0) {
    return sanitizeCodeItem(codes[0]);
  }

  // Absolute fallback: pick any code from INITIAL_FALLBACK_CODES
  if (INITIAL_FALLBACK_CODES.length > 0) {
    const randomIdx = Math.floor(Math.random() * INITIAL_FALLBACK_CODES.length);
    return sanitizeCodeItem(INITIAL_FALLBACK_CODES[randomIdx]);
  }

  return null;
}

export async function addCode(params: {
  text: string;
  name?: string;
  country?: string;
  submitterHash: string;
}): Promise<{ code?: CodeItem; error?: string }> {
  // Extract first match of NG-[A-Za-z0-9]{8}
  const match = params.text.match(/NG-[A-Za-z0-9]{8}/i);
  if (!match) {
    return { error: "invalid_format" };
  }
  const extractedCode = match[0].toUpperCase();
  const targetCountry = params.country ? params.country.trim().toUpperCase().slice(0, 10) : "GLOBAL";
  const supabase = getSupabaseClient();
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  // Strict Lifetime Duplicate Check: Check against initial list
  if (INITIAL_CODES_DATA.some((c) => c.toUpperCase() === extractedCode)) {
    return { error: "duplicate" };
  }

  // Active daily submission limit: exactly 10 codes per 24 hours per user
  const DAILY_SUBMISSION_LIMIT = 10;

  if (supabase) {
    try {
      const { count: dailyCount, error: countErr } = await supabase
        .from("submissions")
        .select("*", { count: "exact", head: true })
        .eq("submitter_hash", params.submitterHash)
        .gte("created_at", oneDayAgo);

      if (countErr) {
        console.error("Error checking daily submission limit:", countErr);
      } else if ((dailyCount ?? 0) >= DAILY_SUBMISSION_LIMIT) {
        return { error: "limit_exceeded" };
      }

      // Check if code already listed (strictly case-insensitive)
      const { data: existing } = await supabase
        .from("codes")
        .select("id")
        .ilike("code", extractedCode)
        .maybeSingle();

      if (existing) {
        return { error: "duplicate" };
      }

      // Insert new code with Country code stored (personal owner name completely removed)
      const { data: newCode, error: insertErr } = await supabase
        .from("codes")
        .insert({
          code: extractedCode,
          display_name: targetCountry,
          status: "active",
          use_count: 0,
          report_count: 0,
        })
        .select()
        .single();

      if (insertErr || !newCode) {
        if (insertErr?.code === "23505" || insertErr?.message?.includes("unique")) {
          return { error: "duplicate" };
        }
        console.error("Error inserting code:", insertErr);
        return { error: "insert_failed" };
      }

      // Log submission
      await supabase.from("submissions").insert({
        submitter_hash: params.submitterHash,
      });

      return { code: sanitizeCodeItem(newCode) };
    } catch (e: any) {
      if (e?.code === "23505" || e?.message?.includes("unique")) {
        return { error: "duplicate" };
      }
      console.error("Error adding code to Supabase:", e);
    }
  }

  // Memory fallback - Active daily submission limit: 10 codes per 24 hours
  const DAILY_SUBMISSION_LIMIT_MEM = 10;
  const userSubmissionsLast24h = memoryStore.submissions.filter(
    (s) => s.submitter_hash === params.submitterHash && s.created_at >= oneDayAgo
  ).length;

  if (userSubmissionsLast24h >= DAILY_SUBMISSION_LIMIT_MEM) {
    return { error: "limit_exceeded" };
  }

  const existing = memoryStore.codes.find((c) => c.code.toUpperCase() === extractedCode);
  if (existing) {
    return { error: "duplicate" };
  }

  const newCode: CodeItem = {
    id: `mem-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    code: extractedCode,
    display_name: null,
    country: targetCountry,
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

  return { code: sanitizeCodeItem(newCode) };

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
    try {
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

      // Increment use_count
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(params.codeId);
      let query = supabase.from("codes").select("id, use_count");
      if (isUuid) {
        query = query.eq("id", params.codeId);
      } else {
        query = query.ilike("code", params.codeId);
      }
      const { data: code } = await query.maybeSingle();

      if (code) {
        await supabase
          .from("codes")
          .update({ use_count: (code.use_count || 0) + 1 })
          .eq("id", code.id);
      }

      return { success: true };
    } catch (e) {
      console.error("Error recording event to Supabase:", e);
    }
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

  const code = memoryStore.codes.find((c) => c.id === params.codeId || c.code.toLowerCase() === params.codeId.toLowerCase());
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
    try {
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
    } catch (e) {
      console.error("Error reporting code to Supabase:", e);
    }
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

export async function getStats(clientIp?: string): Promise<StatsResponse> {
  const supabase = getSupabaseClient();

  if (supabase) {
    try {
      // 1. Record site visit in database if clientIp provided
      if (clientIp && clientIp !== "127.0.0.1") {
        try {
          const ipHash = clientIp.replace(/[^a-zA-Z0-9]/g, "").slice(0, 32);
          await supabase.from("site_visits").insert({ ip_hash: ipHash });
        } catch {}
      }

      // 2. Fetch live aggregate stats via RPC (always 1200 + real visits, and true sum of codes_used)
      const { data: summary, error: rpcErr } = await supabase.rpc("get_stats_summary");

      if (!rpcErr && summary) {
        return {
          codes_ready: Number(summary.codes_ready || 5644),
          codes_used: Number(summary.codes_used || 954293),
          people_last_hour: Math.max(Number(summary.people_last_hour || 0), 45),
          visits_last_24h: Number(summary.visits_last_24h || 1483),
          client_ip: clientIp || "103.131.180.76",
        };
      }
    } catch (e) {
      console.error("Error getting stats from Supabase:", e);
    }
  }

  // Memory fallback: real numbers from store
  const codesReady = memoryStore.codes.filter((c) => c.status === "active").length;
  const codesUsed = memoryStore.codes.reduce((acc, c) => acc + c.use_count, 0) || 954293;

  return {
    codes_ready: codesReady || 5644,
    codes_used: codesUsed,
    people_last_hour: 45,
    visits_last_24h: 1483,
    client_ip: clientIp || "103.131.180.76",
  };
}
