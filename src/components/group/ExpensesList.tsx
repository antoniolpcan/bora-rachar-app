import { useMemo } from 'react';
import { ExpenseCard } from '@/components/group/ExpenseCard';
import { EmptyState } from '@/components/ui/EmptyState';
import type { ExpenseResponseDto, MemberResponseDto } from '@/services/types/types';

interface ExpensesListProps {
  expenses: ExpenseResponseDto[];
  members: MemberResponseDto[];
  loading?: boolean;
  onDeleteExpense?: (expenseId: string, version: number) => void;
}

export function ExpensesList({ expenses, members, loading, onDeleteExpense }: ExpensesListProps) {
  const memberNameMap = useMemo(() => {
    return new Map(members.map(m => [m.id, m.name]));
  }, [members]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-4 animate-pulse" role="tabpanel">
        {[1, 2, 3].map((n) => (
          <div 
            key={n} 
            className="bg-(--soft) opacity-40 p-5 rounded-sm rounded-br-3xl aspect-square border border-(--border)" 
          />
        ))}
      </div>
    );
  }

  if (!expenses || expenses.length === 0) {
    return <EmptyState icon="👻" message="Painel vazio." />;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-4" role="tabpanel">
      {expenses.map((expense, index) => {
        const payerName = memberNameMap.get(expense.paidByMemberId) || 'Alguém';
        return (
          <ExpenseCard 
            key={expense.id}
            title={expense.title}
            amount={expense.amount}
            payerName={payerName}
            index={index}
            onDelete={onDeleteExpense ? () => onDeleteExpense(expense.id, expense.version) : undefined}
          />
        );
      })}
    </div>
  );
}