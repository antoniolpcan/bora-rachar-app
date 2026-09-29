import { NotebookPen, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Tape } from '@/components/ui/Tape';

interface ErrorStateProps {
  title: string;
  description: string;
  onRetry: () => void;
  hint?: string;
  retryLabel?: string;
  loading?: boolean;
}

export function ErrorState({ title, description, onRetry, hint, retryLabel = 'Tentar novamente', loading = false}: ErrorStateProps) {
  return (
    <div className="px-4 py-8 sm:py-12">
      <div
        aria-busy={loading}
        className="
          relative mx-auto max-w-md
          rounded-sm rounded-br-3xl
          border border-(--border)
          bg-(--surface) px-6 py-10 sm:px-10
          text-center shadow-[2px_4px_12px_rgba(0,0,0,0.08)]
        "
      >
        <Tape className="w-24 h-6" rotate="-rotate-2" />

        <div
          aria-hidden="true"
          className="
            mx-auto mb-5 flex h-14 w-14
            items-center justify-center rounded-full
            bg-(--soft) text-(--accent)
          "
        >
          <NotebookPen className="h-7 w-7" strokeWidth={1.5} />
        </div>

        <div role="alert">
          <h3 className="text-xl font-bold text-(--text)">
            {title}
          </h3>

          <p className="mt-3 text-sm leading-relaxed text-(--subtle)">
            {description}
          </p>
        </div>

        <Button
          type="button"
          className="mt-6 w-full gap-2 sm:w-auto"
          onClick={onRetry}
          disabled={loading}
        >
          <RotateCcw
            className={`h-4 w-4 ${
              loading ? 'motion-safe:animate-spin' : ''
            }`}
            aria-hidden="true"
          />
          {loading ? 'Carregando...' : retryLabel}
        </Button>

        {hint && (
          <p className="mt-5 text-xs leading-relaxed text-(--subtle)">
            {hint}
          </p>
        )}
      </div>
    </div>
  );
}