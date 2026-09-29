import type { ReactNode } from 'react';
import { mergeClasses } from '@/utils/mergeClasses';

interface AlertProps {
  children: ReactNode;
  className?: string;
}

export function Alert({ children, className }: AlertProps) {
  return (
    <div 
      role="alert"
      className={mergeClasses(
        'text-sm font-bold text-rose-600 bg-rose-500/10 border border-rose-500/20 p-2.5 rounded shadow-xs',
        className
      )}
    >
      {children}
    </div>
  );
}