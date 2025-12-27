import { cn } from '@/lib/utils';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  id?: string;
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  background?: 'default' | 'muted';
}

export const Section = ({
  className,
  children,
  id,
  padding = 'lg',
  background = 'default',
  ...props
}: SectionProps) => {
  const paddingClasses = {
    sm: 'py-12',
    md: 'py-16',
    lg: 'py-24',
    xl: 'py-32',
  };

  const backgroundClasses = {
    default: 'bg-black',
    muted: 'bg-zinc-900',
  };

  return (
    <section
      id={id}
      className={cn(
        paddingClasses[padding],
        backgroundClasses[background],
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
};