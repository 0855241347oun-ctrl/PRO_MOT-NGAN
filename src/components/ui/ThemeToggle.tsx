"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import Button from "./Button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-9 w-9" />; // Placeholder to avoid hydration mismatch
  }

  return (
    <Button
      variant="ghost"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
      title="สลับธีม"
    >
      {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </Button>
  );
}
