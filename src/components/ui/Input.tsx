import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-foreground/80"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            "w-full rounded-xl border border-border bg-input/20 px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground backdrop-blur-sm transition-all duration-200",
            "focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
            "hover:border-border/80",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-xs text-red-400">{error}</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export default Input;
