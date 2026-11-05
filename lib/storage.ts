import { CopiedCodeLocal } from "./types";

const COPIED_KEY = "nusuk_copied_codes_v1";
const REPORTED_KEY = "nusuk_reported_ids_v1";
const SUBMISSIONS_KEY = "nusuk_user_submissions_v1";
const INTERACTED_IDS_KEY = "nusuk_interacted_ids_v2";
const INTERACTED_CODES_KEY = "nusuk_interacted_codes_v2";
const FIRST_VISIT_KEY = "nusuk_first_visit_done_v1";

export function getCopiedCodes(): CopiedCodeLocal[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(COPIED_KEY);
    if (!raw) return [];
    const list: CopiedCodeLocal[] = JSON.parse(raw);
    const reported = getReportedIds();
    return list.filter((item) => !reported.has(item.id));
  } catch {
    return [];
  }
}

/**
 * Permanently stores a copied/opened code so the user never sees it again.
 */
export function saveCopiedCode(id: string, code: string): void {
  if (typeof window === "undefined") return;
  try {
    // 1. Save to permanent lifetime interacted ID set
    const ids = getInteractedIds();
    ids.add(id);
    localStorage.setItem(INTERACTED_IDS_KEY, JSON.stringify(Array.from(ids)));

    // 2. Save to permanent lifetime interacted Code strings set (e.g. NG-12345678)
    const codes = getInteractedCodes();
    codes.add(code.toUpperCase());
    localStorage.setItem(INTERACTED_CODES_KEY, JSON.stringify(Array.from(codes)));

    // 3. Save to recent copies list for display in the sidebar
    const list = getCopiedCodes();
    const filtered = list.filter((c) => c.id !== id && c.code.toUpperCase() !== code.toUpperCase());
    filtered.unshift({
      id,
      code,
      copiedAt: Date.now(),
    });
    localStorage.setItem(COPIED_KEY, JSON.stringify(filtered.slice(0, 100)));

    // Dispatch custom event so components on the page react immediately
    window.dispatchEvent(new CustomEvent("nusuk:code_copied", { detail: { id, code } }));
  } catch {
    // Ignore localStorage errors
  }
}

export function getInteractedIds(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(INTERACTED_IDS_KEY);
    if (!raw) {
      // Migrate from old copied list if any
      const oldCopied = getCopiedCodes().map((c) => c.id);
      return new Set(oldCopied);
    }
    const ids: string[] = JSON.parse(raw);
    return new Set(ids);
  } catch {
    return new Set();
  }
}

export function getInteractedCodes(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(INTERACTED_CODES_KEY);
    if (!raw) {
      const oldCopied = getCopiedCodes().map((c) => c.code.toUpperCase());
      return new Set(oldCopied);
    }
    const codes: string[] = JSON.parse(raw);
    return new Set(codes.map((c) => c.toUpperCase()));
  } catch {
    return new Set();
  }
}

export function getReportedIds(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(REPORTED_KEY);
    if (!raw) return new Set();
    const ids: string[] = JSON.parse(raw);
    return new Set(ids);
  } catch {
    return new Set();
  }
}

/**
 * Returns all IDs that must never be shown to this user again (copied, opened, or reported).
 */
export function getAllExcludedIds(): string[] {
  if (typeof window === "undefined") return [];
  const set = new Set<string>();
  getInteractedIds().forEach((id) => set.add(id));
  getReportedIds().forEach((id) => set.add(id));
  return Array.from(set);
}

/**
 * Checks if a code (by ID or code string) has already been seen/copied/reported by this user.
 */
export function isCodeExcluded(id?: string, code?: string): boolean {
  if (!id && !code) return false;
  if (id && (getInteractedIds().has(id) || getReportedIds().has(id))) return true;
  if (code && getInteractedCodes().has(code.toUpperCase())) return true;
  return false;
}

export function markCodeReported(id: string): void {
  if (typeof window === "undefined") return;
  try {
    const reported = getReportedIds();
    reported.add(id);
    localStorage.setItem(REPORTED_KEY, JSON.stringify(Array.from(reported)));

    // Also add to interacted IDs so it is never shown again
    const interacted = getInteractedIds();
    interacted.add(id);
    localStorage.setItem(INTERACTED_IDS_KEY, JSON.stringify(Array.from(interacted)));

    // Remove from copied list
    const copied = getCopiedCodes().filter((c) => c.id !== id);
    localStorage.setItem(COPIED_KEY, JSON.stringify(copied));

    window.dispatchEvent(new CustomEvent("nusuk:code_reported", { detail: { id } }));
  } catch {
    // Ignore
  }
}

/**
 * Returns true if this is the user's very first visit (and marks it as visited).
 * Used to show the special first-visit code NG-CXEVbXwR exactly once per device.
 */
export function checkAndMarkFirstVisit(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const done = localStorage.getItem(FIRST_VISIT_KEY);
    if (done) return false;
    localStorage.setItem(FIRST_VISIT_KEY, "1");
    return true;
  } catch {
    return false;
  }
}

export function clearCopiedCodes(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(COPIED_KEY);
  } catch {
    // Ignore
  }
}

export interface MySubmission {
  code: string;
  submittedAt: number;
}

export function getMySubmissions(): MySubmission[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(SUBMISSIONS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveMySubmission(code: string): void {
  if (typeof window === "undefined") return;
  try {
    const list = getMySubmissions();
    list.unshift({ code, submittedAt: Date.now() });
    localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(list.slice(0, 10)));
  } catch {
    // Ignore
  }
}
