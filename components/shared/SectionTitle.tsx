import { LucideIcon } from "lucide-react";

interface SectionTitleProps {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
}

export function SectionTitle({ icon: Icon, title, subtitle }: SectionTitleProps) {
  return (
    <div className="mb-4 sm:mb-6">
      <h2 className="flex items-center gap-1.5 sm:gap-2 text-lg sm:text-xl lg:text-2xl font-semibold">
        <Icon className="h-5 w-5 sm:h-6 sm:w-6" /> {title}
      </h2>
      {subtitle && <p className="mt-1 text-sm sm:text-base text-white/70">{subtitle}</p>}
    </div>
  );
}
