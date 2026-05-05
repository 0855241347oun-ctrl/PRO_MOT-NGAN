import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface TypographyProps {
  children: ReactNode;
  className?: string;
}

export function H1({ children, className }: TypographyProps) {
  return (
    <h1
      className={cn(
        "text-3xl font-bold tracking-tight text-foreground md:text-4xl",
        className
      )}
    >
      {children}
    </h1>
  );
}

export function H2({ children, className }: TypographyProps) {
  return (
    <h2 className={cn("text-xl font-semibold text-foreground md:text-2xl", className)}>
      {children}
    </h2>
  );
}

export function H3({ children, className }: TypographyProps) {
  return (
    <h3 className={cn("text-lg font-medium text-foreground/90 md:text-xl", className)}>
      {children}
    </h3>
  );
}

export function TextPrimary({ children, className }: TypographyProps) {
  return (
    <p className={cn("text-base leading-relaxed text-foreground/80", className)}>
      {children}
    </p>
  );
}

export function TextSecondary({ children, className }: TypographyProps) {
  return (
    <p className={cn("text-sm text-muted-foreground md:text-xs", className)}>
      {children}
    </p>
  );
}
