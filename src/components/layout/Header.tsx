"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import {
  LayoutDashboard,
  BarChart3,
  ShieldCheck,
  FileText,
  Settings,
  Users,
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";
import LogoImg from "./MOT ICON (2).png";

const navItems = [
  { href: "/view", label: "Dashboard", icon: BarChart3 },
  { href: "/admin", label: "จัดการข้อมูล", icon: ShieldCheck },
  { href: "/reports", label: "รายงาน", icon: FileText },
  { href: "/team", label: "ทีมงาน", icon: Users },
  { href: "/settings", label: "ตั้งค่า", icon: Settings },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/70 backdrop-blur-2xl">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/view" className="flex items-center gap-3 group">
            <div className="relative h-10 w-10 overflow-hidden rounded-xl transition-transform duration-300 group-hover:scale-110">
              <Image 
                src={LogoImg} 
                alt="MOT NGAN Logo" 
                fill
                sizes="40px"
                className="object-cover"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-base font-bold text-foreground leading-none">MOT NGAN</h1>
              <p className="text-[10px] text-muted-foreground tracking-widest uppercase">BUTSAYA MAT COMPANY LIMITED</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  )}
                >
                  <item.icon size={16} />
                  <span>{item.label}</span>
                  {/* Active indicator */}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-gradient-to-r from-primary to-blue-500" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden rounded-lg p-2 text-muted-foreground hover:bg-white/10 hover:text-foreground transition-colors"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 top-16 bg-black/40 backdrop-blur-sm md:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <nav className="absolute top-16 left-0 right-0 border-b border-border bg-background/95 backdrop-blur-xl p-3 space-y-1 md:hidden">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all",
                    isActive
                      ? "bg-primary/15 text-primary"
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
    </header>
  );
}
