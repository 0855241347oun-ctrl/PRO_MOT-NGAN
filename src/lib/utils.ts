import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// ─── Class merge utility ────────────────────────────

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ─── Formatters ─────────────────────────────────────

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("th-TH", {
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat("th-TH", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateString));
}

export function formatShortDate(dateString: string): string {
  return new Intl.DateTimeFormat("th-TH", {
    month: "short",
    day: "numeric",
  }).format(new Date(dateString));
}
