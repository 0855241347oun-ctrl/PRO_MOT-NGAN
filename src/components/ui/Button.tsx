import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "danger" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:brightness-110 shadow-lg shadow-primary/25",
  danger:
    "bg-red-500 text-white hover:bg-red-400 shadow-lg shadow-red-500/25",
  ghost:
    "bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground",
  outline:
    "border border-border text-foreground hover:bg-muted hover:border-border/80",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-3 py-1.5 text-xs rounded-lg",
  md: "px-4 py-2 text-sm rounded-xl",
  lg: "px-6 py-3 text-base rounded-xl",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.97]",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        disabled={disabled}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export default Button;
