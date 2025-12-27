import { cn } from '@/lib/utils';

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
}

export const Heading1 = ({ className, children, as: Component = 'h1', ...props }: TypographyProps) => {
  return (
    <Component
      className={cn(
        'text-5xl font-bold tracking-tight sm:text-7xl',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export const Heading2 = ({ className, children, as: Component = 'h2', ...props }: TypographyProps) => {
  return (
    <Component
      className={cn(
        'text-3xl font-bold tracking-tight sm:text-4xl',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export const Heading3 = ({ className, children, as: Component = 'h3', ...props }: TypographyProps) => {
  return (
    <Component
      className={cn(
        'text-xl font-semibold',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export const Paragraph = ({ className, children, as: Component = 'p', ...props }: TypographyProps) => {
  return (
    <Component
      className={cn(
        'text-zinc-300 leading-8',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export const Lead = ({ className, children, as: Component = 'p', ...props }: TypographyProps) => {
  return (
    <Component
      className={cn(
        'text-lg leading-8 text-zinc-300 max-w-2xl mx-auto',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export const Muted = ({ className, children, as: Component = 'p', ...props }: TypographyProps) => {
  return (
    <Component
      className={cn(
        'text-zinc-400',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};