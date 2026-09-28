import { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useGroup } from '../hooks/useGroup';
import { useExpenses } from '../hooks/useExpenses';
import { useBalances } from '../hooks/useBalances';
import { useSettlements } from '../hooks/useSettlements';
import { FormNewExpense } from '../components/FormNewExpense';
import { PlusIcon } from '../components/Icons';
import { formatMoney } from '../utils/formatters';

export function GroupScreen() {
  const { groupId } = useParams<{ groupId: string }>();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const { data: group, loading: loadingGroup, error: GroupError } = useGroup(groupId, token);
  const { data: expenses, refetch: refetchExpenses } = useExpenses(groupId, token);
  const { data: balances, refetch: refetchBalances } = useBalances(groupId, token);
  const { data: settlements, refetch: refetchSettlements } = useSettlements(groupId, token);

  const [showNewExpense, setShowNewExpenseForm] = useState(false);
  const [activeTable, setActiveTable] = useState<'expenses' | 'balances'>('expenses');

  if (loadingGroup) return (
    <div className="flex justify-center items-center py-20">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1e3d2f]"></div>
    </div>
  );
  
  if (GroupError) return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl text-center text-sm font-medium">
      {GroupError}
    </div>
  );

  if (!group) return null;

  const handleSucessNewExpenses = () => {
    setShowNewExpenseForm(false);
    refetchExpenses();
    refetchBalances();
    refetchSettlements();
  };

  return (
    <div className="max-w-3xl mx-auto py-8 space-y-6">
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{group.name}</h1>
            <span className="bg-[#e8ede1] text-[#1e3d2f] text-xs font-bold px-2.5 py-0.5 rounded-full">
              {group.members.length} membros
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">Gestão de despesas do grupo</p>
        </div>
        <button 
          onClick={() => setShowNewExpenseForm(true)}
          className="bg-[#1e3d2f] hover:bg-[#162e23] text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all flex items-center gap-1.5 active:scale-95"
        >
          <PlusIcon /> Nova Despesa
        </button>
      </div>

      {showNewExpense && (
        <FormNewExpense 
          grupo={group} 
          token={token!} 
          onSuccess={handleSucessNewExpenses} 
          onCancel={() => setShowNewExpenseForm(false)} 
        />
      )}

      <div className="bg-[#f0f3eb] p-1 rounded-2xl flex gap-1">
        <button 
          className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition-all ${
            activeTable === 'expenses' 
              ? 'bg-white text-[#1e3d2f] shadow-sm' 
              : 'text-slate-500 hover:text-slate-800'
          }`}
          onClick={() => setActiveTable('expenses')}
        >
          Despesas ({expenses?.length || 0})
        </button>
        <button 
          className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition-all ${
            activeTable === 'balances' 
              ? 'bg-white text-[#1e3d2f] shadow-sm' 
              : 'text-slate-500 hover:text-slate-800'
          }`}
          onClick={() => setActiveTable('balances')}
        >
          Saldos & Acertos
        </button>
      </div>

      {activeTable === 'expenses' && (
        <div className="space-y-3">
          {expenses?.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-200">
              <p className="text-slate-400 text-sm">Nenhuma despesa registada ainda.</p>
              <button 
                onClick={() => setShowNewExpenseForm(true)} 
                className="mt-3 text-xs font-bold text-[#1e3d2f] hover:underline"
              >
                + Adicionar a primeira despesa
              </button>
            </div>
          ) : (
            expenses?.map(d => {
              const pagador = group.members.find(m => m.id === d.paidByMemberId)?.name || 'Desconhecido';
              return (
                <div key={d.id} className="bg-white p-4 rounded-2xl shadow-xs border border-slate-100 flex justify-between items-center hover:border-slate-200 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#e8ede1] text-[#1e3d2f] rounded-xl flex items-center justify-center font-black text-sm">
                      {d.title.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">{d.title}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Pago por <span className="font-semibold text-slate-600">{pagador}</span> • Dividido por {d.splitAmongMemberIds.length}
                      </p>
                    </div>
                  </div>
                  <div className="text-base font-black text-slate-900">
                    {formatMoney(d.amount)}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {activeTable === 'balances' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-xs">
            <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-4">Balanço Individual</h3>
            <div className="space-y-2.5">
              {balances?.map(s => (
                <div key={s.memberId} className="p-3 bg-[#f8faf6] rounded-xl flex justify-between items-center">
                  <span className="font-semibold text-xs text-slate-700">{s.memberName}</span>
                  <div className="text-right">
                    <span className={`font-bold text-xs block ${s.balance >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                      {s.balance > 0 ? '+' : ''}{formatMoney(s.balance)}
                    </span>
                    <span className="text-[10px] text-slate-400">Total: {formatMoney(s.totalShare)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-xs">
            <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-4">Como liquidar dívidas</h3>
            {settlements?.length === 0 ? (
              <div className="p-4 bg-[#e8ede1] text-[#1e3d2f] rounded-xl text-xs font-bold text-center">
                Tudo certo! Ninguém deve nada neste grupo. 🍻
              </div>
            ) : (
              <div className="space-y-2.5">
                {settlements?.map((a, idx) => {
                  const devedor = group.members.find(m => m.id === a.fromMemberId)?.name;
                  const recebedor = group.members.find(m => m.id === a.toMemberId)?.name;
                  return (
                    <div key={idx} className="p-3 bg-amber-50/70 border border-amber-100 rounded-xl text-xs text-amber-900 flex justify-between items-center">
                      <span><strong>{devedor}</strong> paga a <strong>{recebedor}</strong></span>
                      <span className="font-bold text-amber-950">{formatMoney(a.amount)}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}