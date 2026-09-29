import { Plus, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/Input';

export type MemberField = {
  id: string;
  name: string;
};

interface MemberInputListProps {
  members: MemberField[];
  loading: boolean;
  onChange: (id: string, value: string) => void;
  onAdd: () => void;
  onRemove: (id: string) => void;
}

export function MemberInputList({ 
  members, 
  loading, 
  onChange, 
  onAdd, 
  onRemove 
}: MemberInputListProps) {
  return (
    <div className="space-y-3 pt-2">
      <label className="block text-sm font-bold text-(--text)">
        Quem vai estar? ({members.length})
      </label>
      
      <div className="space-y-2">
        {members.map((member, idx) => (
          <div key={member.id} className="flex items-center gap-2 group">
            <div className="flex-1">
              <Input
                required
                disabled={loading}
                type="text"
                placeholder={idx === 0 ? 'Eu' : 'Nome'}
                value={member.name}
                onChange={(e) => onChange(member.id, e.target.value)}
              />
            </div>
            {members.length > 2 && (
              <button
                type="button"
                disabled={loading}
                onClick={() => onRemove(member.id)}
                aria-label={`Remover participante ${member.name || idx + 1}`}
                className="p-2 text-(--subtle) hover:text-rose-600 transition-all disabled:opacity-50 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>

      {members.length < 50 && (
        <button
          type="button"
          disabled={loading}
          onClick={onAdd}
          className="inline-flex items-center gap-1 text-sm font-bold text-(--subtle) hover:text-(--text) py-2 transition-colors disabled:opacity-50 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Adicionar linha
        </button>
      )}
    </div>
  );
}
