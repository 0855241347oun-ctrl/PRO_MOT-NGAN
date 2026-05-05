"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { User, Bell, Globe, Palette, Database, Camera } from "lucide-react";
import { H1, H2, TextPrimary, TextSecondary } from "@/components/ui/Typography";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <H1>ตั้งค่า</H1>
        <TextSecondary className="mt-1">
          ภาพรวมการตั้งค่าและปรับแต่งระบบ
        </TextSecondary>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Profile Card */}
        <Card className="lg:col-span-1">
          <div className="flex flex-col items-center p-4">
            <div className="relative mb-4">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary to-blue-600 shadow-xl">
                <User size={40} className="text-primary-foreground" />
              </div>
              <button className="absolute bottom-0 right-0 rounded-full bg-background p-2 text-muted-foreground shadow-lg hover:text-primary">
                <Camera size={16} />
              </button>
            </div>
            <H2 className="mb-1 text-center">Admin User</H2>
            <TextSecondary className="text-center">admin@company.com</TextSecondary>
            <Button className="mt-6 w-full" variant="outline">
              แก้ไขโปรไฟล์
            </Button>
          </div>
        </Card>

        {/* Settings Sections */}
        <div className="space-y-6 lg:col-span-2">
          {/* General */}
          <Card>
            <div className="mb-4 flex items-center gap-3 border-b border-border pb-4">
              <div className="rounded-lg bg-primary/20 p-2 text-primary">
                <Globe size={18} />
              </div>
              <H2>ทั่วไป</H2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <TextPrimary className="font-medium">ภาษาของระบบ</TextPrimary>
                  <TextSecondary>เปลี่ยนภาษาที่แสดงผลบน Dashboard</TextSecondary>
                </div>
                <select className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-foreground focus:border-primary focus:outline-none">
                  <option value="th">ไทย (TH)</option>
                  <option value="en">English (EN)</option>
                </select>
              </div>
            </div>
          </Card>

          {/* Notifications */}
          <Card>
            <div className="mb-4 flex items-center gap-3 border-b border-border pb-4">
              <div className="rounded-lg bg-red-500/20 p-2 text-red-500">
                <Bell size={18} />
              </div>
              <H2>การแจ้งเตือน</H2>
            </div>
            <div className="space-y-4">
              <ToggleRow label="แจ้งเตือนเมื่อมีการเพิ่มข้อมูลใหม่" defaultOn />
              <ToggleRow label="ส่งรายงานสรุปรายสัปดาห์ผ่านอีเมล" />
            </div>
          </Card>
          {/* Database Info */}
          <Card>
            <div className="mb-4 flex items-center gap-3 border-b border-border pb-4">
              <div className="rounded-lg bg-emerald-500/20 p-2 text-emerald-500">
                <Database size={18} />
              </div>
              <H2>ฐานข้อมูล</H2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col rounded-lg bg-muted/50 p-3">
                <TextSecondary>สถานะ</TextSecondary>
                <div className="mt-1 flex items-center gap-2 text-foreground">
                  <div className="h-2 w-2 rounded-full bg-emerald-500" />
                  Connected
                </div>
              </div>
              <div className="flex flex-col rounded-lg bg-muted/50 p-3">
                <TextSecondary>Provider</TextSecondary>
                <TextPrimary>SQLite / PostgreSQL</TextPrimary>
              </div>
              <div className="flex flex-col rounded-lg bg-muted/50 p-3">
                <TextSecondary>ORM</TextSecondary>
                <TextPrimary>Prisma</TextPrimary>
              </div>
              <div className="flex flex-col rounded-lg bg-muted/50 p-3">
                <TextSecondary>Last Backup</TextSecondary>
                <TextPrimary>1 ชั่วโมงที่แล้ว</TextPrimary>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function ToggleRow({ label, defaultOn = false }: { label: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center justify-between">
      <TextPrimary>{label}</TextPrimary>
      <button
        onClick={() => setOn(!on)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${on ? "bg-primary" : "bg-muted"
          }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${on ? "translate-x-6" : "translate-x-1"
            }`}
        />
      </button>
    </div>
  );
}
