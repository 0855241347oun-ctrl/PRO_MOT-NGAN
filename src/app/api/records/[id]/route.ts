import { NextResponse } from "next/server";
import {
  getRecordById,
  updateRecord,
  deleteRecord,
} from "@/server/services/record.service";
import { updateRecordSchema } from "@/server/validators/record.validator";

type Params = { params: Promise<{ id: string }> };

// PUT /api/records/:id — แก้ไข record
export async function PUT(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const numId = Number(id);
    if (isNaN(numId)) {
      return NextResponse.json({ error: "ID ไม่ถูกต้อง" }, { status: 400 });
    }

    const existing = await getRecordById(numId);
    if (!existing) {
      return NextResponse.json(
        { error: "ไม่พบข้อมูล" },
        { status: 404 }
      );
    }

    const body = await request.json();
    const parsed = updateRecordSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "ข้อมูลไม่ถูกต้อง", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const record = await updateRecord(numId, parsed.data);
    return NextResponse.json(record);
  } catch (error) {
    console.error("PUT /api/records/:id error:", error);
    return NextResponse.json(
      { error: "ไม่สามารถแก้ไขข้อมูลได้" },
      { status: 500 }
    );
  }
}

// DELETE /api/records/:id — ลบ record
export async function DELETE(_request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const numId = Number(id);
    if (isNaN(numId)) {
      return NextResponse.json({ error: "ID ไม่ถูกต้อง" }, { status: 400 });
    }

    const existing = await getRecordById(numId);
    if (!existing) {
      return NextResponse.json(
        { error: "ไม่พบข้อมูล" },
        { status: 404 }
      );
    }

    await deleteRecord(numId);
    return NextResponse.json({ message: "ลบข้อมูลสำเร็จ" });
  } catch (error) {
    console.error("DELETE /api/records/:id error:", error);
    return NextResponse.json(
      { error: "ไม่สามารถลบข้อมูลได้" },
      { status: 500 }
    );
  }
}
