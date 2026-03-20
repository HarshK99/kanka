import { cn } from '@/lib/utils';
import { Heading2, Muted } from '@/components/ui/typography';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeader({ title, subtitle, centered, className }: SectionHeaderProps) {
  return (
    <div className={cn(centered && 'text-center', className)}>
      <Heading2 className="mb-4">{title}</Heading2>
      {subtitle && <Muted className="text-base">{subtitle}</Muted>}
    </div>
  );
}
