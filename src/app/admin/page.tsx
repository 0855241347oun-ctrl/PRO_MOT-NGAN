"use client";

import RecordForm from "./sections/RecordForm";
import RecordTable from "./sections/RecordTable";
import { useRecords } from "./hooks/useRecords";
import { H1, TextSecondary } from "@/components/ui/Typography";

export default function AdminPage() {
  const { records, loading, addRecord, editRecord, removeRecord } = useRecords();

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <H1>Admin Panel</H1>
        <TextSecondary className="mt-1">
          เพิ่ม แก้ไข และจัดการเนื้อหาทั้งหมดในระบบ
        </TextSecondary>
      </div>

      {/* Form section */}
      <RecordForm onSubmit={addRecord} />

      {/* Table section */}
      <RecordTable
        records={records}
        loading={loading}
        onEdit={editRecord}
        onDelete={removeRecord}
      />
    </div>
  );
}
