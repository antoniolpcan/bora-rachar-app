import { useMemo } from 'react';
import { formatMoney } from '@/utils/formatters';
import { EmptyState } from '@/components/ui/EmptyState';
import type { MemberBalanceResponseDto, PaymentInstruction, MemberResponseDto } from '@/services/types/types';

interface BalancesTabProps {
  balances: MemberBalanceResponseDto[];
  settlements: PaymentInstruction[];
  members: MemberResponseDto[];
}

export function BalancesTab({ balances, settlements, members }: BalancesTabProps) {
  const memberNameMap = useMemo(() => {
    return new Map(members.map(m => [m.id, m.name]));
  }, [members]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8" role="tabpanel">
      <section className="relative bg-(--surface) p-6 rounded-sm shadow-md border-l-4 border-(--accent) transform -rotate-1 transition-colors duration-500">
        <h3 className="font-bold text-(--text) mb-4 border-b border-(--border) pb-2">
          Balanço Individual
        </h3>
        
        {balances.length === 0 ? (
          <EmptyState icon="⚖️" message="Sem saldos calculados ainda." className="py-8" />
        ) : (
          <div className="space-y-3">
            {balances.map((s) => (
              <div 
                key={s.memberId} 
                className="flex justify-between items-end border-b border-(--border) pb-1 border-dashed"
              >
                <span className="font-medium text-(--text)">{s.memberName}</span>
                <div className="text-right">
                  <span className={`font-bold block ${s.balance >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {s.balance > 0 ? '+' : ''}{formatMoney(s.balance)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="relative bg-(--surface) p-6 rounded-sm shadow-md border-l-4 border-(--warm) transform rotate-1 transition-colors duration-500">
        <h3 className="font-bold text-(--text) mb-4 border-b border-(--border) pb-2">
          Acertos Pendentes
        </h3>
        
        {!settlements || settlements.length === 0 ? (
          <EmptyState icon="🍻" message="Nada a declarar! Tudo em dia." className="py-8" />
        ) : (
          <div className="space-y-4">
            {settlements.map((item) => {
              const devedor = memberNameMap.get(item.fromMemberId) || 'Quem deve';
              const recebedor = memberNameMap.get(item.toMemberId) || 'Quem recebe';
              
              return (
                <div 
                  key={`${item.fromMemberId}-${item.toMemberId}`} 
                  className="flex justify-between items-center bg-(--soft) p-2.5 rounded border border-(--border)"
                >
                  <div className="text-sm">
                    <span className="font-bold text-rose-600">{devedor}</span>{' '}
                    <span className="opacity-60 text-xs text-(--text)">dá a</span>{' '}
                    <span className="font-bold text-emerald-600">{recebedor}</span>
                  </div>
                  <span className="font-bold text-(--text)">{formatMoney(item.amount)}</span>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
