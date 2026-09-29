import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface GroupHeaderProps {
  title: string;
  memberCount: number;
  onAddExpense: () => void;
}

export function GroupHeader({ title, memberCount, onAddExpense }: GroupHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
      <div className="bg-(--surface) backdrop-blur-sm px-6 py-3 border-2 border-(--border) border-dashed rounded-sm transform -rotate-1 transition-colors duration-500">
        <h1 className="text-3xl font-bold text-(--text) tracking-tight font-handwriting">
          {title}
        </h1>
        <p className="text-sm font-bold text-(--subtle) mt-1">
          📌 {memberCount} {memberCount === 1 ? 'participante' : 'participantes'}
        </p>
      </div>

      <Button 
        rotate="rotate-1" 
        size="md" 
        onClick={onAddExpense} 
        className="w-full sm:w-auto"
      >
        <Plus className="w-4 h-4" /> Anotar Gasto
      </Button>
    </div>
  );
}
