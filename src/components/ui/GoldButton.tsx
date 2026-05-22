"use client";
import { cn } from "@/lib/utils/cn";
import Link from "next/link";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface GoldButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "filled" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  loading?: boolean;
}

const GoldButton = forwardRef<HTMLButtonElement, GoldButtonProps>(
  ({ className, variant = "filled", size = "md", href, loading, children, disabled, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold/50 disabled:opacity-50 disabled:cursor-not-allowed select-none";

    const variants = {
      filled: "bg-gold-gradient text-black hover:shadow-gold hover:scale-105 active:scale-95",
      outline: "border border-gold/60 text-cream hover:border-gold hover:bg-gold/10 hover:shadow-gold-sm",
      ghost: "text-gold hover:text-gold-warm hover:bg-gold/5",
    };

    const sizes = {
      sm: "px-5 py-2 text-sm",
      md: "px-8 py-3.5 text-base",
      lg: "px-10 py-5 text-lg",
    };

    const classes = cn(base, variants[variant], sizes[size], className);

    if (href) {
      return (
        <Link href={href} className={classes}>
          {loading ? <span className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" /> : null}
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} disabled={disabled || loading} {...props}>
        {loading ? <span className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" /> : null}
        {children}
      </button>
    );
  }
);
GoldButton.displayName = "GoldButton";
export default GoldButton;
