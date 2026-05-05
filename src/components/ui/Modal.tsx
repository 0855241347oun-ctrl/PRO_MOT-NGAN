"use client";

import { cn } from "@/lib/utils";
import { ReactNode, useEffect } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  className,
}: ModalProps) {
  // ปิด modal ด้วย Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal content */}
      <div
        className={cn(
          "relative z-10 w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-2xl backdrop-blur-xl",
          "animate-in zoom-in-95 slide-in-from-bottom-4 duration-200",
          className
        )}
      >
        {/* Header */}
        {title && (
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X size={18} />
            </button>
          </div>
        )}

        {children}
      </div>
    </div>
  );
}
