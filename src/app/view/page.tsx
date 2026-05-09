"use client";

import SummaryCards from "./sections/SummaryCards";
import DashboardCharts from "./sections/DashboardCharts";
import { useStats } from "./hooks/useStats";
import { H1, TextSecondary } from "@/components/ui/Typography";

export default function ViewPage() {
  const { stats, loading } = useStats();

  return (
    <div className="space-y-6 pb-10">
      {/* Page header */}
      <div>
        <H1>Dashboard Overview</H1>
        <TextSecondary className="mt-1">
          ภาพรวมเนื้อหาและสถิติทั้งหมดในระบบ
        </TextSecondary>
      </div>

      {/* Summary cards */}
      <SummaryCards stats={stats} loading={loading} />

      {/* Dashboard Charts */}
      <DashboardCharts />
    </div>
  );
}
