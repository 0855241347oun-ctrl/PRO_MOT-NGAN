// ─── Record Types ───────────────────────────────────

export interface RecordItem {
  id: number;
  h1: string;
  h2: string | null;
  h3: string | null;
  content1: string | null;
  content2: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface RecordFormData {
  h1: string;
  h2: string;
  h3: string;
  content1: string;
  content2: string;
}

// ─── Stats Types (สำหรับหน้า View) ─────────────────

export interface RecordStats {
  totalRecords: number;
  latestRecord: RecordItem | null;
  byDate: { date: string; count: number }[];
}

// ─── API Response ───────────────────────────────────

export interface ApiError {
  error: string;
  details?: unknown;
}
