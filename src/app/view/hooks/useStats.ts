"use client";

import { useState, useEffect, useCallback } from "react";
import type { RecordStats } from "@/lib/types";
import { getRecordStats } from "@/lib/api-client";

export function useStats() {
  const [stats, setStats] = useState<RecordStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getRecordStats();
      setStats(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "เกิดข้อผิดพลาด");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return { stats, loading, error, refetch: fetchStats };
}
