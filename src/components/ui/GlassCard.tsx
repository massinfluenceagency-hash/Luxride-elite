import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  glow?: boolean;
}

export default function GlassCard({ className, hover = false, glow = false, children, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        "bg-black-charcoal/70 backdrop-blur-md border border-gold/20 rounded-2xl",
        hover && "transition-all duration-300 hover:border-gold/50 hover:shadow-gold cursor-pointer",
        glow && "shadow-gold",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
