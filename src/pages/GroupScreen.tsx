import { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { boraRacharService } from '@/services/boraRacharService';
import { useGroup } from '@/hooks/useGroup';
import { useExpenses } from '@/hooks/useExpenses';
import { useBalances } from '@/hooks/useBalances';
import { useSettlements } from '@/hooks/useSettlements';
import { Alert } from '@/components/ui/Alert';
import { ErrorState } from '@/components/ui/ErrorState';
import { FormNewExpense } from '@/components/FormNewExpense';
import { GroupHeader } from '@/components/group/GroupHeader';
import { GroupTabs, type GroupTab } from '@/components/group/GroupTabs';
import { ExpensesList } from '@/components/group/ExpensesList';
import { BalancesTab } from '@/components/group/BalancesTab';
import { InvalidGroupLink } from '@/components/group/InvalidGroupLink';

export function GroupScreen() {
  const { groupId } = useParams<{ groupId: string }>();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const { data: group, loading: loadingGroup, error: groupError } = useGroup(groupId, token);
  const { data: expenses, loading: loadingExpenses, error: expensesError, refetch: refetchExpenses } = useExpenses(groupId, token);
  const { data: balances, loading: loadingBalances, error: balancesError, refetch: refetchBalances } = useBalances(groupId, token);
  const { data: settlements, loading: loadingSettlements, error: settlementsError, refetch: refetchSettlements } = useSettlements(groupId, token);

  const [showNewExpense, setShowNewExpenseForm] = useState(false);
  const [activeTab, setActiveTab] = useState<GroupTab>('expenses');
  const [actionError, setActionError] = useState<string | null>(null);

  if (!groupId || !token?.trim()) {
    return <InvalidGroupLink />;
  }

  if (loadingGroup) {
    return (
      <div className="flex justify-center items-center py-32" aria-busy="true">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-(--border) border-t-(--text)"></div>
      </div>
    );
  }
  
  if (groupError) {
    return (
      <div className="max-w-md mx-auto mt-10">
        <Alert className="transform rotate-1 text-center font-bold">
          📌 Erro: {groupError}
        </Alert>
      </div>
    );
  }

  if (!group) return null;

  const refreshAll = () => {
    refetchExpenses();
    refetchBalances();
    refetchSettlements();
  };

  const handleSuccessNewExpense = () => {
    setShowNewExpenseForm(false);
    refreshAll();
  };

  const handleDeleteExpense = async (expenseId: string, version: number) => {
    if (!groupId || !token) return;
    setActionError(null);
    try {
      await boraRacharService.deleteExpense(groupId, expenseId, version, token);
      refreshAll();
    } catch {
      setActionError('Não foi possível rasgar essa anotação. Tente novamente.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 sm:py-12 space-y-8 relative">
      <GroupHeader 
        title={group.name}
        memberCount={group.members.length}
        onAddExpense={() => setShowNewExpenseForm(true)}
      />

      {actionError && (
        <Alert className="max-w-md mx-auto text-center">{actionError}</Alert>
      )}

      {showNewExpense && (
        <FormNewExpense 
          grupo={group} 
          token={token || ''} 
          onSuccess={handleSuccessNewExpense} 
          onCancel={() => setShowNewExpenseForm(false)} 
        />
      )}

      <GroupTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'expenses' ? (
        loadingExpenses ? (
          <div role="status" aria-live="polite" className="py-8 text-center text-(--text)">
            Carregando despesas...
          </div>
        ) : expensesError ? (
          <div role="tabpanel">
            <ErrorState
              title="Os recibos não carregaram"
              description="Não conseguimos consultar as despesas agora. Tente novamente em instantes."
              onRetry={() => void refetchExpenses()}
            />
          </div>
        ) : (
          <ExpensesList
            expenses={expenses}
            members={group.members}
            onDeleteExpense={handleDeleteExpense}
          />
        )
      ) : loadingBalances || loadingSettlements ? (
        <div role="status" aria-live="polite" className="py-8 text-center text-(--text)">
          Carregando saldos e acertos...
        </div>
      ) : balancesError || settlementsError ? (
        <div role="tabpanel">
          <ErrorState
            title="As contas não carregaram"
            description="Não conseguimos consultar os saldos e acertos agora. Tente carregar novamente em instantes."
            hint="Confira os valores atualizados antes de fazer um acerto."
            onRetry={() => {
              void refetchBalances();
              void refetchSettlements();
            }}
          />
        </div>
      ) : (
        <BalancesTab
          balances={balances}
          settlements={settlements}
          members={group.members}
        />
      )}
    </div>
  );
}