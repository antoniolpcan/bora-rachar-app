import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Copy, Check } from 'lucide-react';

interface GroupCreatedSuccessProps {
  groupId: string;
  token: string;
}

export function GroupCreatedSuccess({ groupId, token }: GroupCreatedSuccessProps) {
  const [copied, setCopied] = useState(false);
  const relativeUrl = `/grupos/${groupId}?token=${token}`;
  const sharedLink = `${window.location.origin}${relativeUrl}`;

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(sharedLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback caso a API da área de transferência não seja permitida
    }
  };

  return (
    <div className="text-center py-6 space-y-6">
      <div className="text-5xl select-none">🎉</div>
      <div>
        <h3 className="text-2xl font-bold text-(--text)">Anotado!</h3>
        <p className="text-(--subtle) font-medium mt-1">Copia o link e manda no zap.</p>
      </div>

      <div className="bg-(--soft) p-2 rounded border border-(--border) flex items-center gap-2">
        <input
          readOnly
          value={sharedLink}
          aria-label="Link de acesso ao grupo"
          className="flex-1 bg-transparent px-2 text-sm font-medium text-(--text) focus:outline-none select-all truncate"
        />
        <button
          type="button"
          onClick={copyUrl}
          className={`px-4 py-2 rounded text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
            copied ? 'bg-emerald-600 text-white' : 'bg-(--accent) text-(--bg) hover:bg-(--accent-hover)'
          }`}
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copiado' : 'Copiar'}
        </button>
      </div>

      <Link
        to={relativeUrl}
        className="inline-flex items-center justify-center gap-2 w-full bg-(--accent) hover:bg-(--accent-hover) text-(--bg) font-bold py-3 rounded transition-all mt-2 cursor-pointer"
      >
        Ir para o painel <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
