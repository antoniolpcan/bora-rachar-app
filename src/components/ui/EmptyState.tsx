import type { ReactNode } from 'react';

interface EmptyStateProps {
  icon?: ReactNode;
  message: string;
  className?: string;
}

export function EmptyState({ icon = "👻", message, className = "py-20" }: EmptyStateProps) {
  return (
    <div className={`text-center opacity-60 flex flex-col items-center justify-center ${className}`}>
      {typeof icon === 'string' ? <span className="text-3xl select-none">{icon}</span> : icon}
      <p className="text-(--subtle) font-bold mt-2">{message}</p>
    </div>
  );
}
