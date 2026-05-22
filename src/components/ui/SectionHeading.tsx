import { cn } from "@/lib/utils/cn";

interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
  className?: string;
}

export default function SectionHeading({ label, title, subtitle, centered = true, light = false, className }: SectionHeadingProps) {
  return (
    <div className={cn("mb-12 md:mb-16", centered && "text-center", className)}>
      {label && (
        <span className="inline-block text-gold text-sm font-semibold tracking-[0.2em] uppercase mb-3">
          {label}
        </span>
      )}
      <h2 className={cn("font-display font-bold text-headline", light ? "text-white" : "text-white")}>
        {title}
      </h2>
      <div className={cn("h-0.5 w-16 bg-gold-gradient my-4", centered && "mx-auto")} />
      {subtitle && (
        <p className={cn("text-base md:text-lg max-w-2xl", centered && "mx-auto", light ? "text-cream/70" : "text-cream/60")}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
