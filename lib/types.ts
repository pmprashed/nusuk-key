export type CodeStatus = "active" | "removed";

export interface CodeItem {
  id: string;
  code: string;
  display_name: string | null;
  created_at: string;
  use_count: number;
  report_count: number;
  status: CodeStatus;
  last_served_at: string | null;
}

export type EventType = "copy" | "open";
export type ReportType = "already_used" | "not_correct";

export interface StatsResponse {
  codes_ready: number;
  codes_used: number;
  people_last_hour: number;
  visits_last_24h?: number;
  client_ip?: string;
}

export interface CopiedCodeLocal {
  id: string;
  code: string;
  copiedAt: number;
  reported?: boolean;
}
