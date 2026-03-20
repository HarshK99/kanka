import { cn } from '@/lib/utils';
import { Heading3, Paragraph } from '@/components/ui/typography';

interface InfoCardProps {
  title: string;
  body: string;
  className?: string;
}

export function InfoCard({ title, body, className }: InfoCardProps) {
  return (
    <div className={cn('rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6', className)}>
      <Heading3 className="mb-3 text-white">{title}</Heading3>
      <Paragraph className="text-sm leading-7 text-zinc-400">{body}</Paragraph>
    </div>
  );
}
