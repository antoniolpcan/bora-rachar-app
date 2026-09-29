import { Tape } from '@/components/ui/Tape';

export function IntroBanner() {
  return (
    <div className="relative bg-(--soft) p-8 post-it transform -rotate-2 mt-8 max-w-sm mx-auto md:ml-auto">
      <Tape className="w-20 h-6" rotate="rotate-2" />
      
      <h1 className="text-3xl font-bold text-(--text) mb-4 tracking-tight">
        Chega de planilhas.
      </h1>
      <ul className="text-(--text) opacity-90 space-y-3 font-medium text-lg list-disc pl-4">
        <li>Cria um grupo</li>
        <li>Anota os gastos</li>
        <li>O app calcula o resto!</li>
      </ul>
      <p className="mt-6 text-sm text-(--subtle) font-mono">
        P.S.: É grátis e não precisa de login!!
      </p>
    </div>
  );
}
