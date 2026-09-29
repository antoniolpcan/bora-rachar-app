import { Link } from 'react-router-dom';
import { FileQuestion, ArrowLeft } from 'lucide-react';
import { Tape } from '@/components/ui/Tape';

export function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="relative max-w-md w-full bg-(--surface) border border-(--border) post-it p-8 text-center -rotate-1">
        <Tape className="w-14 h-5" rotate="rotate-3" />

        <div className="mx-auto mt-2 mb-4 w-16 h-16 rounded-full bg-(--soft) flex items-center justify-center">
          <FileQuestion className="w-8 h-8 text-(--subtle)" />
        </div>

        <h1 className="text-5xl font-bold font-handwriting text-(--accent) mb-2">
          404
        </h1>

        <p className="text-lg font-handwriting text-(--text) mb-1">
          Página não encontrada
        </p>

        <p className="text-sm text-(--subtle) mb-6">
          Essa anotação deve ter se perdido entre os papéis...
        </p>

        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm rounded bg-(--accent) hover:bg-(--accent-hover) text-(--bg) font-bold shadow-sm transition-all rotate-1"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao início
        </Link>
      </div>
    </div>
  );
}