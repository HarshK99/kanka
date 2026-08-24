'use client';

import { useRef } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { SpecularGlow } from './specular-glow';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  href?: string;
}

const glowByVariant: Record<NonNullable<ButtonProps['variant']>, { lineColor: string; baseColor: string }> = {
  primary: { lineColor: '#2563eb', baseColor: '#93c5fd' },
  secondary: { lineColor: '#ffffff', baseColor: '#52525b' },
  ghost: { lineColor: '#ffffff', baseColor: '#52525b' },
  link: { lineColor: '#ffffff', baseColor: '#52525b' },
};

const getButtonClasses = (variant: ButtonProps['variant'] = 'primary', size: ButtonProps['size'] = 'md') => {
  const baseClasses = 'inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

  const variantClasses = {
    primary: 'bg-white text-black hover:bg-zinc-200 shadow-sm',
    secondary: 'border border-zinc-700 text-white hover:bg-zinc-800',
    ghost: 'text-white hover:text-zinc-300',
    link: 'text-white underline-offset-4 hover:underline',
  };

  const sizeClasses = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-10 px-4 py-2 text-sm',
    lg: 'h-11 px-8 text-base',
    xl: 'h-12 px-10 text-lg',
  };

  return cn(baseClasses, variantClasses[variant], sizeClasses[size]);
};

export const Button = ({ className, variant = 'primary', size = 'md', href, ...props }: ButtonProps) => {
  const buttonClasses = getButtonClasses(variant, size);
  const targetRef = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const glow = glowByVariant[variant];

  if (href) {
    return (
      <span className="relative inline-flex">
        <SpecularGlow targetRef={targetRef} {...glow} />
        <Link
          ref={targetRef}
          href={href}
          className={cn(buttonClasses, 'relative', className)}
        >
          {props.children}
        </Link>
      </span>
    );
  }

  return (
    <span className="relative inline-flex">
      <SpecularGlow targetRef={targetRef} {...glow} />
      <button
        ref={targetRef}
        className={cn(buttonClasses, 'relative', className)}
        {...props}
      />
    </span>
  );
};