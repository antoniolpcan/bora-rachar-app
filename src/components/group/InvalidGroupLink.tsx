import { Link } from 'react-router-dom';
import { Link2Off, ArrowLeft } from 'lucide-react';
import { Tape } from '@/components/ui/Tape';

export function InvalidGroupLink() {
  return (
    <div className="px-4 py-12">
      <section
        aria-labelledby="invalid-group-link-title"
        className="
          relative mx-auto max-w-md
          rounded-sm rounded-br-3xl
          border border-(--border)
          bg-(--surface) p-8 text-center shadow-md
        "
      >
        <Tape className="w-24 h-6" rotate="-rotate-2" />

        <div aria-hidden="true"
          className="mx-auto mb-5 flex h-14 w-14
            items-center justify-center rounded-full
            bg-(--soft) text-(--accent)"
        >
          <Link2Off className="h-7 w-7" strokeWidth={1.5} />
        </div>

        <h1 id="invalid-group-link-title" className="text-xl font-bold text-(--text)">
          Esse link está incompleto
        </h1>

        <p className="mt-3 text-sm leading-relaxed text-(--subtle)">
          Falta a chave de acesso ao grupo. Peça para quem compartilhou enviar o link completo novamente.
        </p>

        <Link
          to="/"
          className="
            mt-6 inline-flex items-center justify-center gap-2
            rounded bg-(--accent) px-5 py-3
            text-sm font-bold text-(--bg)
            transition-colors hover:bg-(--accent-hover)
            focus-visible:outline-2 focus-visible:outline-offset-4
            focus-visible:outline-(--accent)
          "
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Voltar ao início
        </Link>
      </section>
    </div>
  );
}