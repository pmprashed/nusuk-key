import { CopiedCodeLocal } from "./types";

const COPIED_KEY = "nusuk_copied_codes_v1";
const REPORTED_KEY = "nusuk_reported_ids_v1";
const SUBMISSIONS_KEY = "nusuk_user_submissions_v1";

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

export function saveCopiedCode(id: string, code: string): void {
  if (typeof window === "undefined") return;
  try {
    const list = getCopiedCodes();
    // Prepend if not already in list
    const filtered = list.filter((c) => c.id !== id && c.code !== code);
    filtered.unshift({
      id,
      code,
      copiedAt: Date.now(),
    });
    // Keep max 50 recent copies
    localStorage.setItem(COPIED_KEY, JSON.stringify(filtered.slice(0, 50)));
  } catch {
    // Ignore localStorage errors
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

export function markCodeReported(id: string): void {
  if (typeof window === "undefined") return;
  try {
    const reported = getReportedIds();
    reported.add(id);
    localStorage.setItem(REPORTED_KEY, JSON.stringify(Array.from(reported)));

    // Also remove from copied codes list
    const copied = getCopiedCodes().filter((c) => c.id !== id);
    localStorage.setItem(COPIED_KEY, JSON.stringify(copied));
  } catch {
    // Ignore
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
    localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(list.slice(0, 5)));
  } catch {
    // Ignore
  }
}
