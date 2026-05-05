"use client";

import { useState } from "react";
import type { RecordItem, RecordFormData } from "@/lib/types";
import { formatNumber, formatDate } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Modal from "@/components/ui/Modal";
import { Pencil, Trash2, Loader2, AlertTriangle, Inbox } from "lucide-react";

interface RecordTableProps {
  records: RecordItem[];
  loading: boolean;
  onEdit: (id: number, data: Partial<RecordFormData>) => Promise<any>;
  onDelete: (id: number) => Promise<any>;
}

export default function RecordTable({
  records,
  loading,
  onEdit,
  onDelete,
}: RecordTableProps) {
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<RecordFormData>>({});

  const handleStartEdit = (record: RecordItem) => {
    setEditingId(record.id);
    setEditForm({
      h1: record.h1,
      h2: record.h2 ?? "",
      h3: record.h3 ?? "",
      content1: record.content1 ?? "",
      content2: record.content2 ?? "",
    });
  };

  const handleSaveEdit = async (id: number) => {
    await onEdit(id, editForm);
    setEditingId(null);
    setEditForm({});
  };

  const handleConfirmDelete = async () => {
    if (deleteId === null) return;
    try {
      setDeleting(true);
      await onDelete(deleteId);
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  };

  if (loading) {
    return (
      <Card className="overflow-hidden !p-0">
        <div className="animate-pulse">
          <div className="h-12 bg-muted/20 border-b border-border" />
          <div className="p-8 flex flex-col items-center justify-center space-y-3">
            <div className="h-4 w-48 bg-muted/20 rounded" />
            <div className="h-3 w-32 bg-muted/10 rounded" />
          </div>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-16 border-b border-border/30 bg-muted/5" />
          ))}
        </div>
      </Card>
    );
  }

  if (records.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center py-16 text-center">
        <Inbox size={48} className="text-muted-foreground/50 mb-3" />
        <p className="text-muted-foreground text-lg">ยังไม่มีข้อมูล</p>
        <p className="text-muted-foreground/70 text-sm mt-1">เพิ่มข้อมูลใหม่จากฟอร์มด้านบน</p>
      </Card>
    );
  }

  return (
    <>
      <Card className="overflow-hidden !p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">หัวข้อหลัก (H1)</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground hidden sm:table-cell">
                  H2
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground hidden md:table-cell">
                  เนื้อหา 1
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground hidden lg:table-cell">
                  วันที่สร้าง
                </th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {records.map((record) => (
                <tr
                  key={record.id}
                  className="transition-colors hover:bg-muted/30"
                >
                  <td className="px-4 py-3">
                    {editingId === record.id ? (
                      <input
                        value={editForm.h1 ?? ""}
                        onChange={(e) =>
                          setEditForm((p) => ({ ...p, h1: e.target.value }))
                        }
                        className="w-full rounded-lg border border-border bg-input/20 px-2 py-1 text-sm text-foreground focus:border-primary focus:outline-none"
                      />
                    ) : (
                      <span className="font-medium text-foreground">{record.h1}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell max-w-[150px] truncate">
                    {editingId === record.id ? (
                      <input
                        value={editForm.h2 ?? ""}
                        onChange={(e) =>
                          setEditForm((p) => ({ ...p, h2: e.target.value }))
                        }
                        className="w-full rounded-lg border border-border bg-input/20 px-2 py-1 text-sm text-foreground focus:border-primary focus:outline-none"
                      />
                    ) : (
                      record.h2 || "—"
                    )}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground hidden md:table-cell max-w-[200px] truncate">
                    {editingId === record.id ? (
                      <input
                        value={editForm.content1 ?? ""}
                        onChange={(e) =>
                          setEditForm((p) => ({ ...p, content1: e.target.value }))
                        }
                        className="w-full rounded-lg border border-border bg-input/20 px-2 py-1 text-sm text-foreground focus:border-primary focus:outline-none"
                      />
                    ) : (
                      record.content1 || "—"
                    )}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground/70 hidden lg:table-cell">
                    {formatDate(record.createdAt)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      {editingId === record.id ? (
                        <>
                          <Button
                            size="sm"
                            onClick={() => handleSaveEdit(record.id)}
                          >
                            บันทึก
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setEditingId(null)}
                          >
                            ยกเลิก
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleStartEdit(record)}
                          >
                            <Pencil size={14} />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setDeleteId(record.id)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <Trash2 size={14} />
                          </Button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Delete confirmation modal */}
      <Modal
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        title="ยืนยันการลบ"
      >
        <div className="flex items-start gap-3 mb-6">
          <div className="rounded-full bg-red-500/10 p-2">
            <AlertTriangle size={20} className="text-red-500" />
          </div>
          <p className="text-foreground/80 text-sm">
            คุณต้องการลบข้อมูลนี้หรือไม่? การกระทำนี้ไม่สามารถย้อนกลับได้
          </p>
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setDeleteId(null)}>
            ยกเลิก
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete} disabled={deleting}>
            {deleting ? "กำลังลบ..." : "ลบข้อมูล"}
          </Button>
        </div>
      </Modal>
    </>
  );
}
