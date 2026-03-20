import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface TagListProps {
  tags: string[];
  variant?: 'default' | 'secondary';
  className?: string;
}

export function TagList({ tags, variant = 'default', className }: TagListProps) {
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {tags.map((t) => (
        <Badge key={t} variant={variant}>
          {t}
        </Badge>
      ))}
    </div>
  );
}
