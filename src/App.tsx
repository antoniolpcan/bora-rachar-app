import { Routes, Route, Link } from 'react-router-dom';
import { Logo } from './components/Icons';
import { CreateGroup } from './pages/CreateGroup';
import { GroupScreen } from './pages/GroupScreen';

export default function App() {
  return (
    <div className="min-h-screen bg-[#f4f6f1] text-slate-900 font-sans flex flex-col justify-between">
      <header className="border-b border-slate-200/60 bg-[#f4f6f1]/80 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="hover:opacity-90 transition-opacity">
            <Logo />
          </Link>
          <span className="text-xs text-slate-400 hidden sm:inline-block font-medium">
            Bom dividir com você.
          </span>
        </div>
      </header>

      <main className="px-4 flex-1 flex items-center">
        <Routes>
          <Route path="/" element={<CreateGroup />} />
          <Route path="/grupos/:groupId" element={<GroupScreen />} />
        </Routes>
      </main>

      <footer className="border-t border-slate-200/60 py-6 text-xs text-slate-400">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <span>bora rachar, bora viver.</span>
          <span>Feito para compartilhar bons momentos.</span>
        </div>
      </footer>
    </div>
  );
}