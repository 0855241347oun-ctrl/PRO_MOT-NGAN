import { cn } from "@/lib/utils";
import { ReactNode, CSSProperties } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  style?: CSSProperties;
}

export default function Card({ children, className, hover = false, style }: CardProps) {
  return (
    <div
      style={style}
      className={cn(
        "rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-xl text-card-foreground",
        "shadow-xl shadow-black/5",
        hover &&
        "transition-all duration-300 hover:border-border/80 hover:bg-card/80 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-0.5",
        className
      )}
    >
      {children}
    </div>
  );
}
