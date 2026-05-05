import { NextResponse } from "next/server";
import { getAllRecords, createRecord, getRecordStats } from "@/server/services/record.service";
import { createRecordSchema } from "@/server/validators/record.validator";

// GET /api/records — ดึง records ทั้งหมด (หรือ stats ถ้ามี ?stats=true)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    if (searchParams.get("stats") === "true") {
      const stats = await getRecordStats();
      return NextResponse.json(stats);
    }
    const records = await getAllRecords();
    return NextResponse.json(records);
  } catch (error) {
    console.error("GET /api/records error:", error);
    return NextResponse.json(
      { error: "ไม่สามารถดึงข้อมูลได้" },
      { status: 500 }
    );
  }
}

// POST /api/records — สร้าง record ใหม่
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = createRecordSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "ข้อมูลไม่ถูกต้อง", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const record = await createRecord(parsed.data);
    return NextResponse.json(record, { status: 201 });
  } catch (error) {
    console.error("POST /api/records error:", error);
    return NextResponse.json(
      { 
        error: "ไม่สามารถสร้างข้อมูลได้", 
        message: error instanceof Error ? error.message : String(error) 
      },
      { status: 500 }
    );
  }
}
