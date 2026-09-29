import React, { useState } from 'react';
import { boraRacharService } from '@/services/boraRacharService';
import { Tape } from '@/components/ui/Tape';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { Modal } from '@/components/ui/Modal';
import type { GroupResponseDto } from '@/services/types/types';

interface FormNewExpenseProps {
  grupo: GroupResponseDto; 
  token: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export function FormNewExpense({ grupo, token, onSuccess, onCancel }: FormNewExpenseProps) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [payerId, setPayerId] = useState(grupo.members[0]?.id || '');
  const [involvedIds, setInvolvedIds] = useState<string[]>(grupo.members.map(m => m.id));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const toggleInvolved = (id: string) => {
    setInvolvedIds(prev => prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const parsedAmount = parseFloat(amount.replace(',', '.'));
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError('Informe um valor válido maior que zero.');
      return;
    }

    if (involvedIds.length === 0) {
      setError('Anotar sem ninguém para rachar? Escolhe alguém.');
      return;
    }
    
    setLoading(true);
    try {
      await boraRacharService.createExpense(grupo.id, {
        title: title.trim(),
        amount: parsedAmount,
        paidByMemberId: payerId,
        splitAmongMemberIds: involvedIds
      }, token);
      
      onSuccess();
    } catch {
      setError("A caneta falhou. Tenta guardar outra vez.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={true} onClose={() => !loading && onCancel()}>
      <form 
        onSubmit={onSubmit} 
        className="relative bg-(--surface) p-6 md:p-8 rounded-sm rounded-br-3xl shadow-[4px_8px_20px_rgba(0,0,0,0.2)] transform rotate-1 max-w-xl mx-auto border border-(--border) transition-colors duration-500"
      >
        <Tape className="w-24 h-6" rotate="-rotate-2" />
        
        <h3 className="font-bold text-2xl text-(--text) border-b-2 border-(--border) pb-2 mb-6">
          Anotar gasto 🖊️
        </h3>

        {error && <Alert className="mb-4">{error}</Alert>}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label htmlFor="expenseTitle" className="block text-sm font-bold text-(--text)">
              O que foi comprado?
            </label>
            <Input 
              id="expenseTitle"
              required 
              disabled={loading}
              type="text" 
              placeholder="Ex: Água" 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="expenseAmount" className="block text-sm font-bold text-(--text)">
              Valor (R$)
            </label>
            <Input 
              id="expenseAmount"
              required 
              disabled={loading}
              type="number" 
              step="0.01" 
              min="0.01" 
              placeholder="0,00" 
              value={amount} 
              onChange={e => setAmount(e.target.value)} 
            />
          </div>
        </div>

        <div className="space-y-1 mt-6">
          <label htmlFor="payerId" className="block text-sm font-bold text-(--text)">
            Quem pagou?
          </label>
          <select 
            id="payerId"
            disabled={loading}
            className="w-full px-2 py-2 bg-transparent border-b-2 border-(--border) text-(--text) focus:outline-none focus:border-(--accent) font-medium cursor-pointer disabled:opacity-60 transition-colors" 
            value={payerId} 
            onChange={e => setPayerId(e.target.value)}
          >
            {grupo.members.map(m => (
              <option key={m.id} value={m.id} className="bg-(--surface)">{m.name}</option>
            ))}
          </select>
        </div>

        <div className="space-y-3 mt-6">
          <span className="block text-sm font-bold text-(--text)">
            Dividir com quem? (Marcados pagam)
          </span>
          <div className="flex flex-wrap gap-2">
            {grupo.members.map(m => {
              const isChecked = involvedIds.includes(m.id);
              return (
                <label 
                  key={m.id} 
                  className={`flex items-center px-3 py-1.5 rounded text-sm font-bold cursor-pointer select-none transition-all ${
                    loading ? 'opacity-60 cursor-not-allowed' : ''
                  } ${
                    isChecked 
                      ? 'bg-(--accent) text-(--bg) shadow-sm' 
                      : 'bg-transparent border border-(--border) text-(--subtle) hover:bg-(--soft)'
                  }`}
                >
                  <input 
                    type="checkbox" 
                    disabled={loading}
                    checked={isChecked} 
                    onChange={() => toggleInvolved(m.id)} 
                    className="sr-only" 
                  />
                  {m.name}
                </label>
              );
            })}
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-(--border)">
          <Button 
            type="button" 
            variant="ghost"
            onClick={onCancel}
            disabled={loading} 
          >
            Cancelar
          </Button>
          <Button 
            type="submit" 
            disabled={loading} 
            rotate="-rotate-1"
          >
            {loading ? 'A planejar...' : 'Ir para o painel'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}