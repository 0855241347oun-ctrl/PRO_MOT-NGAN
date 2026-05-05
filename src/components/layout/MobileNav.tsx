"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X, LayoutDashboard, ShieldCheck, BarChart3 } from "lucide-react";

const navItems = [
  { href: "/view", label: "Dashboard", icon: BarChart3 },
  { href: "/admin", label: "Admin", icon: ShieldCheck },
];

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="lg:hidden">
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-border bg-background/80 px-4 py-3 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-blue-600">
            <LayoutDashboard size={16} className="text-primary-foreground" />
          </div>
          <h1 className="text-base font-bold text-foreground">Dashboard</h1>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu overlay */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <nav className="fixed top-14 left-0 right-0 z-50 border-b border-border bg-background/95 p-3 space-y-1 backdrop-blur-xl">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all",
                    isActive
                      ? "bg-primary/15 text-primary border border-primary/20"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon size={18} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </>
      )}
    </div>
  );
}
