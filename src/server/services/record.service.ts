import { prisma } from "@/server/db/prisma";
import type { CreateRecordInput, UpdateRecordInput } from "@/server/validators/record.validator";

// ─── READ ───────────────────────────────────────────

export async function getAllRecords() {
  return prisma.record.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getRecordById(id: number) {
  return prisma.record.findUnique({ where: { id } });
}

// ─── CREATE ─────────────────────────────────────────

export async function createRecord(data: CreateRecordInput) {
  return prisma.record.create({ data });
}

// ─── UPDATE ─────────────────────────────────────────

export async function updateRecord(id: number, data: UpdateRecordInput) {
  return prisma.record.update({
    where: { id },
    data,
  });
}

// ─── DELETE ─────────────────────────────────────────

export async function deleteRecord(id: number) {
  return prisma.record.delete({ where: { id } });
}

// ─── STATS (สำหรับหน้า View) ────────────────────────

export async function getRecordStats() {
  const [records, totalRecords] = await Promise.all([
    prisma.record.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.record.count(),
  ]);

  // จัดกลุ่มตามวันที่ (สำหรับ trend chart จำนวนบทความ/รายการที่สร้าง)
  const byDate: Record<string, number> = {};
  records.forEach((r) => {
    const dateKey = r.createdAt.toISOString().split("T")[0];
    byDate[dateKey] = (byDate[dateKey] || 0) + 1;
  });

  return {
    totalRecords,
    latestRecord: records[0] ?? null,
    byDate: Object.entries(byDate)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date)),
  };
}
