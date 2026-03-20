import { cn } from '@/lib/utils';

interface BulletListProps {
  items: string[];
  dotColor?: string;
  className?: string;
}

export function BulletList({ items, dotColor = 'bg-zinc-500', className }: BulletListProps) {
  return (
    <ul className={cn('space-y-2', className)}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2 text-sm text-zinc-300">
          <span className={cn('mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full', dotColor)} />
          {item}
        </li>
      ))}
    </ul>
  );
}
