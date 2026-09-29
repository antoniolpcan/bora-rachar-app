import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { Tape } from '@/components/ui/Tape';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { formatMoney } from '@/utils/formatters';
import { mergeClasses } from '@/utils/mergeClasses';

interface ExpenseCardProps {
  title: string;
  amount: number;
  payerName: string;
  index: number;
  onDelete?: () => void;
}

const BG_STYLES = ['bg-(--surface)', 'bg-(--soft)'];
const ROTATIONS = ['rotate-1', '-rotate-1', 'rotate-2', '-rotate-2'];

export function ExpenseCard({ title, amount, payerName, index, onDelete }: ExpenseCardProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  const bgStyle = BG_STYLES[index % BG_STYLES.length];
  const rotation = ROTATIONS[index % ROTATIONS.length];

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    setShowConfirm(false);
    onDelete?.();
  };

  return (
    <>
      <article
        className={mergeClasses(
          'group relative p-5 border border-(--border) post-it flex flex-col justify-between aspect-square hover:scale-105 transition-transform',
          bgStyle,
          rotation
        )}
      >
        <Tape className="w-10 h-4" rotate="rotate-3" />

        {onDelete && (
          <button
            type="button"
            onClick={handleDeleteClick}
            aria-label={`Excluir despesa ${title}`}
            title="Excluir despesa"
            className="absolute top-2 right-2 p-1.5 text-(--subtle) hover:text-rose-600 opacity-60 hover:opacity-100 transition-all rounded-full hover:bg-(--surface) cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}

        <div>
          <h4 className="font-bold text-(--text) text-lg leading-tight mb-2 border-b border-(--border) pb-1 pr-6">
            {title}
          </h4>
          <p className="text-xs font-medium text-(--subtle)">
            Pago por: <br />
            <span className="font-bold text-(--text)">{payerName}</span>
          </p>
        </div>

        <div className="text-2xl font-bold self-end mt-4 text-(--text)">
          {formatMoney(amount)}
        </div>
      </article>

      <ConfirmDialog
        isOpen={showConfirm}
        title={`Rasgar "${title}"?`}
        description="Essa anotação será excluída permanentemente."
        confirmLabel="Rasgar"
        cancelLabel="Manter"
        onConfirm={handleConfirm}
        onCancel={() => setShowConfirm(false)}
      />
    </>
  );
}