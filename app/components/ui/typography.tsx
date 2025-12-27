import { cn } from '@/lib/utils';

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  as?: React.ElementType;
}

export const Heading1 = ({ className, children, as, ...props }: TypographyProps) => {
  const Component = (as || 'h1') as React.ElementType;
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

export const Heading2 = ({ className, children, as, ...props }: TypographyProps) => {
  const Component = (as || 'h2') as React.ElementType;
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

export const Heading3 = ({ className, children, as, ...props }: TypographyProps) => {
  const Component = (as || 'h3') as React.ElementType;
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

export const Paragraph = ({ className, children, as, ...props }: TypographyProps) => {
  const Component = (as || 'p') as React.ElementType;
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

export const Lead = ({ className, children, as, ...props }: TypographyProps) => {
  const Component = (as || 'p') as React.ElementType;
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

export const Muted = ({ className, children, as, ...props }: TypographyProps) => {
  const Component = (as || 'p') as React.ElementType;
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
};;