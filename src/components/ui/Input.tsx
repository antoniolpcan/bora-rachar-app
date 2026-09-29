import type { InputHTMLAttributes } from 'react';
import { mergeClasses } from '@/utils/mergeClasses';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export function Input({ className, error, ...props }: InputProps) {
  return (
    <input
      {...props}
      className={mergeClasses(
        'w-full px-2 py-2 bg-transparent border-b-2 text-(--text) font-medium transition-colors',
        'placeholder-(--muted) focus:outline-none focus:border-(--accent)',
        'disabled:opacity-60 disabled:cursor-not-allowed',
        error ? 'border-rose-500' : 'border-(--border)',
        className
      )}
    />
  );
}
