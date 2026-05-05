import type { RecordItem, RecordFormData, RecordStats } from "./types";

const BASE_URL = "/api/records";

// ─── Helper ─────────────────────────────────────────

async function fetcher<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch (err) {
    // If it's not JSON (e.g. HTML error page), we just keep data undefined
    console.error("Non-JSON response:", text.substring(0, 100));
  }

  if (!res.ok) {
    throw new Error(data?.error || `HTTP ${res.status}: ${res.statusText}`);
  }
  
  return data;
}

// ─── Records CRUD ───────────────────────────────────

export function getRecords(): Promise<RecordItem[]> {
  return fetcher<RecordItem[]>(BASE_URL);
}

export function getRecordStats(): Promise<RecordStats> {
  return fetcher<RecordStats>(`${BASE_URL}?stats=true`);
}

export function createRecord(data: RecordFormData): Promise<RecordItem> {
  return fetcher<RecordItem>(BASE_URL, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateRecord(
  id: number,
  data: Partial<RecordFormData>
): Promise<RecordItem> {
  return fetcher<RecordItem>(`${BASE_URL}/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function deleteRecord(id: number): Promise<{ message: string }> {
  return fetcher<{ message: string }>(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
}
