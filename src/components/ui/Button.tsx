import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { mergeClasses } from '@/utils/mergeClasses';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'accent' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  rotate?: 'rotate-1' | '-rotate-1' | 'rotate-2' | '-rotate-2';
  children: ReactNode;
}

const variantStyles: Record<NonNullable<ButtonProps['variant']>, string> = {
  accent: 'bg-(--accent) hover:bg-(--accent-hover) text-(--bg) shadow-sm font-bold active:scale-95',
  ghost: 'text-(--subtle) font-bold hover:bg-(--soft) hover:text-(--text)',
  outline: 'border border-(--border) text-(--text) hover:bg-(--soft) font-medium',
};

const sizeStyles: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { variant = 'accent', size = 'md', rotate, className, disabled, children, ...props },
    ref
  ) {
    return (
      <button
        ref={ref}
        {...props}
        disabled={disabled}
        className={mergeClasses(
          'inline-flex items-center justify-center gap-2 rounded transition-all cursor-pointer select-none',
          'disabled:opacity-70 disabled:cursor-not-allowed disabled:pointer-events-none',
          variantStyles[variant],
          sizeStyles[size],
          rotate,
          className
        )}
      >
        {children}
      </button>
    );
  }
);