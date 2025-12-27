import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: 'default' | 'secondary';
}

export const Badge = ({
  className,
  children,
  variant = 'default',
  ...props
}: BadgeProps) => {
  const variantClasses = {
    default: 'bg-zinc-800 text-white',
    secondary: 'bg-zinc-700 text-zinc-300',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-1 text-xs rounded',
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};