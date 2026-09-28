import React, { useState } from 'react';
import { boraRacharService } from '../services/boraRacharService';
import type { GroupResponseDto } from '../services/types/types';

interface FormNewExpenseProps {
  grupo: GroupResponseDto;
  token: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export function FormNewExpense({ grupo, token, onSuccess, onCancel }: FormNewExpenseProps) {
  const [titulo, setTitulo] = useState('');
  const [valor, setValor] = useState('');
  const [pagadorId, setPagadorId] = useState(grupo.members[0]?.id || '');
  const [envolvidos, setEnvolvidos] = useState<string[]>(grupo.members.map(m => m.id));
  const [loading, setLoading] = useState(false);

  const toggleEnvolvido = (id: string) => {
    setEnvolvidos(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (envolvidos.length === 0) {
      alert('Pelo menos uma pessoa tem de estar envolvida na despesa.');
      return;
    }
    
    setLoading(true);
    try {
      await boraRacharService.createExpense(grupo.id!, {
        title: titulo,
        amount: parseFloat(valor.replace(',', '.')),
        paidByMemberId: pagadorId,
        splitAmongMemberIds: envolvidos
      }, token);
      
      onSuccess();
    } catch (error) {
      alert("Erro ao registar a despesa.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 mb-8 space-y-5 transition-all">
      <div className="flex justify-between items-center border-b border-slate-100 pb-4">
        <h3 className="font-bold text-lg text-slate-900">Nova Despesa</h3>
        <span className="text-xs bg-[#e8ede1] text-[#1e3d2f] px-3 py-1 rounded-full font-bold">Adicionar</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">O quê?</label>
          <input 
            required 
            type="text" 
            placeholder="Ex: Jantar de Sexta, Uber..." 
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-[#1e3d2f] focus:bg-white text-sm" 
            value={titulo} 
            onChange={e => setTitulo(e.target.value)} 
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Quanto? (R$)</label>
          <input 
            required 
            type="number" 
            step="0.01" 
            min="0.01" 
            placeholder="0,00" 
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-[#1e3d2f] focus:bg-white text-sm font-semibold" 
            value={valor} 
            onChange={e => setValor(e.target.value)} 
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Quem pagou?</label>
        <select 
          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-[#1e3d2f] focus:bg-white text-sm font-medium cursor-pointer" 
          value={pagadorId} 
          onChange={e => setPagadorId(e.target.value)}
        >
          {grupo.members.map(m => (
            <option key={m.id} value={m.id}>{m.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Para quem foi? (Rachar com)</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {grupo.members.map(m => {
            const checked = envolvidos.includes(m.id);
            return (
              <label 
                key={m.id} 
                className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-semibold cursor-pointer select-none transition-all ${
                  checked 
                    ? 'bg-[#e8ede1] border-[#1e3d2f]/30 text-[#1e3d2f]' 
                    : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
                }`}
              >
                <input 
                  type="checkbox" 
                  checked={checked} 
                  onChange={() => toggleEnvolvido(m.id)} 
                  className="rounded border-slate-300 text-[#1e3d2f] focus:ring-[#1e3d2f] h-4 w-4" 
                />
                <span className="truncate">{m.name}</span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="flex gap-3 justify-end pt-2">
        <button 
          type="button" 
          onClick={onCancel} 
          className="px-4 py-2.5 text-slate-600 text-xs font-bold hover:bg-slate-100 rounded-xl transition-colors"
        >
          Cancelar
        </button>
        <button 
          type="submit" 
          disabled={loading} 
          className="px-5 py-2.5 bg-[#1e3d2f] hover:bg-[#162e23] text-white text-xs font-bold rounded-xl shadow-md transition-all disabled:opacity-50"
        >
          {loading ? 'A guardar...' : 'Guardar Despesa'}
        </button>
      </div>
    </form>
  );
}