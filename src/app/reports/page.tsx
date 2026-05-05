"use client";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { FileText, Download, Calendar, Filter } from "lucide-react";
import { H1, TextSecondary } from "@/components/ui/Typography";

const reports = [
  {
    title: "สรุปยอดรายเดือน",
    description: "รายงานยอดรวมแยกตามหมวดหมู่ ประจำเดือนปัจจุบัน",
    date: "พ.ค. 2026",
    status: "พร้อม",
  },
  {
    title: "วิเคราะห์แนวโน้ม Q1",
    description: "การวิเคราะห์แนวโน้มข้อมูลไตรมาสที่ 1 ปี 2026",
    date: "เม.ย. 2026",
    status: "พร้อม",
  },
  {
    title: "รายงานประจำสัปดาห์",
    description: "สรุปข้อมูลที่เพิ่มเข้ามาในสัปดาห์นี้",
    date: "28 เม.ย. - 2 พ.ค.",
    status: "กำลังสร้าง",
  },
  {
    title: "เปรียบเทียบปีต่อปี",
    description: "เปรียบเทียบผลรวมข้อมูล ปี 2025 vs 2026",
    date: "2026",
    status: "รอข้อมูล",
  },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <H1>รายงาน</H1>
          <TextSecondary className="mt-1">
            ดาวน์โหลดและจัดการรายงานสรุปข้อมูล
          </TextSecondary>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter size={14} />
            กรอง
          </Button>
          <Button size="sm">
            <Calendar size={14} />
            สร้างรายงานใหม่
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {reports.map((report, i) => (
          <Card key={i} hover>
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 p-3 shadow-lg shadow-indigo-500/20">
                  <FileText size={20} className="text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{report.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    {report.description}
                  </p>
                  <div className="mt-3 flex items-center gap-3">
                    <span className="text-xs text-muted-foreground/70">{report.date}</span>
                    <span
                      className={cn(
                        "inline-block rounded-full px-2.5 py-0.5 text-xs font-medium",
                        report.status === "พร้อม"
                          ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                          : report.status === "กำลังสร้าง"
                          ? "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                          : "bg-muted text-muted-foreground border border-border"
                      )}
                    >
                      {report.status}
                    </span>
                  </div>
                </div>
              </div>
              {report.status === "พร้อม" && (
                <button className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-primary transition-colors">
                  <Download size={16} />
                </button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
