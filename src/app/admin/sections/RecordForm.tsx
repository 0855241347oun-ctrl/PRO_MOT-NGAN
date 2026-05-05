"use client";

import { useState } from "react";
import type { RecordFormData } from "@/lib/types";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";
import { Plus, Save } from "lucide-react";

interface RecordFormProps {
  onSubmit: (data: RecordFormData) => Promise<any>;
  initialData?: RecordFormData;
  isEditing?: boolean;
  onCancel?: () => void;
}

const emptyForm: RecordFormData = {
  h1: "",
  h2: "",
  h3: "",
  content1: "",
  content2: "",
};

export default function RecordForm({
  onSubmit,
  initialData,
  isEditing = false,
  onCancel,
}: RecordFormProps) {
  const [form, setForm] = useState<RecordFormData>(initialData ?? emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.h1.trim()) {
      setError("กรุณาระบุหัวข้อหลัก (H1)");
      return;
    }
    try {
      setSubmitting(true);
      setError(null);
      await onSubmit(form);
      if (!isEditing) setForm(emptyForm);
    } catch (err) {
      setError(err instanceof Error ? err.message : "เกิดข้อผิดพลาด");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card>
      <h2 className="mb-5 text-lg font-semibold text-foreground flex items-center gap-2">
        {isEditing ? <Save size={18} /> : <Plus size={18} />}
        {isEditing ? "แก้ไขเนื้อหา" : "เพิ่มเนื้อหาใหม่"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          id="h1"
          name="h1"
          label="หัวข้อหลัก (H1) *"
          placeholder="หัวข้อหลักของหน้า..."
          value={form.h1}
          onChange={handleChange}
        />
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input
            id="h2"
            name="h2"
            label="หัวข้อย่อยระดับ 2 (H2)"
            placeholder="หัวข้อย่อย..."
            value={form.h2}
            onChange={handleChange}
          />
          <Input
            id="h3"
            name="h3"
            label="หัวข้อย่อยระดับ 3 (H3)"
            placeholder="หัวข้อย่อย..."
            value={form.h3}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="content1" className="block text-sm font-medium text-foreground/80">
            เนื้อหา 1 (Content 1)
          </label>
          <textarea
            id="content1"
            name="content1"
            rows={4}
            value={form.content1}
            onChange={handleChange}
            placeholder="เนื้อหาหลักส่วนที่ 1..."
            className="w-full rounded-xl border border-border bg-input/20 px-4 py-2.5 text-sm text-foreground backdrop-blur-sm transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 hover:border-border/80"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="content2" className="block text-sm font-medium text-foreground/80">
            เนื้อหา 2 (Content 2)
          </label>
          <textarea
            id="content2"
            name="content2"
            rows={4}
            value={form.content2}
            onChange={handleChange}
            placeholder="เนื้อหาหลักส่วนที่ 2..."
            className="w-full rounded-xl border border-border bg-input/20 px-4 py-2.5 text-sm text-foreground backdrop-blur-sm transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 hover:border-border/80"
          />
        </div>

        {error && (
          <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        <div className="flex items-center gap-3 pt-2">
          <Button type="submit" disabled={submitting}>
            {submitting
              ? "กำลังบันทึก..."
              : isEditing
              ? "บันทึกการแก้ไข"
              : "เพิ่มเนื้อหา"}
          </Button>
          {isEditing && onCancel && (
            <Button type="button" variant="ghost" onClick={onCancel}>
              ยกเลิก
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
}
