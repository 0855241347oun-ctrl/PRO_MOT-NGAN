"use client";

import { useState, useEffect, useCallback } from "react";
import type { RecordItem, RecordFormData } from "@/lib/types";
import * as api from "@/lib/api-client";

export function useRecords() {
  const [records, setRecords] = useState<RecordItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ─── Fetch all records ───────────────────────────

  const fetchRecords = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getRecords();
      setRecords(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "เกิดข้อผิดพลาด");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  // ─── Create ──────────────────────────────────────

  const addRecord = async (data: RecordFormData) => {
    const record = await api.createRecord(data);
    setRecords((prev) => [record, ...prev]);
    return record;
  };

  // ─── Update ──────────────────────────────────────

  const editRecord = async (id: number, data: Partial<RecordFormData>) => {
    const record = await api.updateRecord(id, data);
    setRecords((prev) => prev.map((r) => (r.id === id ? record : r)));
    return record;
  };

  // ─── Delete ──────────────────────────────────────

  const removeRecord = async (id: number) => {
    await api.deleteRecord(id);
    setRecords((prev) => prev.filter((r) => r.id !== id));
  };

  return {
    records,
    loading,
    error,
    fetchRecords,
    addRecord,
    editRecord,
    removeRecord,
  };
}
