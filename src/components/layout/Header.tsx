import { Link } from 'react-router-dom';
import { Logo } from '@/components/ui/Logo';
import ThemeSelector from '@/components/ThemeSelector';

export function Header() {
  return (
    <header className="sticky top-0 z-20 pt-4 px-4 pb-2">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <Link to="/" className="hover:opacity-80 transition-opacity" aria-label="Voltar para a Home">
          <Logo />
        </Link>
        <div className="flex items-center gap-4">
          <div className="text-xs font-bold text-(--subtle) rotate-2 bg-(--surface) px-2 py-1 shadow-sm border border-(--border) hidden sm:block transition-colors duration-500">
            anotações e contas
          </div>
          <ThemeSelector />
        </div>
      </div>
    </header>
  );
}