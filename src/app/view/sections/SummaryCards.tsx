"use client";

import type { RecordStats } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import Card from "@/components/ui/Card";
import { Hash, Clock, Users, Eye, Share2, Layers } from "lucide-react";

interface SummaryCardsProps {
  stats: RecordStats | null;
  loading: boolean;
}

export default function SummaryCards({ stats, loading }: SummaryCardsProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <div className="h-4 w-24 bg-muted rounded mb-3" />
            <div className="h-8 w-32 bg-muted rounded" />
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* Total records card */}
      <Card hover>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">จำนวนเนื้อหาทั้งหมด</p>
            <p className="mt-2 text-2xl font-bold text-foreground">
              {stats?.totalRecords?.toLocaleString() ?? "0"}
            </p>
          </div>
          <div className="rounded-xl bg-gradient-to-br from-primary to-blue-600 p-2.5 shadow-lg shadow-primary/20">
            <Hash size={20} className="text-primary-foreground" />
          </div>
        </div>
      </Card>

      {/* Users card (Mocked for now) */}
      <Card hover>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">ผู้ใช้งานออนไลน์</p>
            <p className="mt-2 text-2xl font-bold text-foreground">
              {stats ? "0" : "0"}
            </p>
          </div>
          <div className="rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 p-2.5 shadow-lg shadow-emerald-500/20">
            <Users size={20} className="text-white" />
          </div>
        </div>
      </Card>

      {/* Views card (Mocked for now) */}
      <Card hover>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">ยอดการเข้าชมวันนี้</p>
            <p className="mt-2 text-2xl font-bold text-foreground">
              {stats ? "0" : "0"}
            </p>
          </div>
          <div className="rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 p-2.5 shadow-lg shadow-purple-500/20">
            <Eye size={20} className="text-white" />
          </div>
        </div>
      </Card>

      {/* Categories card (Mocked for now) */}
      <Card hover>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">หมวดหมู่ทั้งหมด</p>
            <p className="mt-2 text-2xl font-bold text-foreground">
              {stats ? "0" : "0"}
            </p>
          </div>
          <div className="rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 p-2.5 shadow-lg shadow-orange-500/20">
            <Layers size={20} className="text-white" />
          </div>
        </div>
      </Card>
    </div>
  );
}
