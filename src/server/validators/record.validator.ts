import { z } from "zod";

export const createRecordSchema = z.object({
  h1: z.string().min(1, "กรุณาระบุหัวข้อหลัก (H1)"),
  h2: z.string().optional().default(""),
  h3: z.string().optional().default(""),
  content1: z.string().optional().default(""),
  content2: z.string().optional().default(""),
});

export const updateRecordSchema = createRecordSchema.partial();

export type CreateRecordInput = z.infer<typeof createRecordSchema>;
export type UpdateRecordInput = z.infer<typeof updateRecordSchema>;
