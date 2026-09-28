import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { boraRacharService } from '../services/boraRacharService';
import { ArrowRightIcon, TrashIcon, PlusIcon, CopyIcon } from '../components/Icons';

export function CreateGroup() {
  const [groupName, setGroupName] = useState('');
  const [members, setMembers] = useState<string[]>(['', '']);
  const [loading, setLoading] = useState(false);
  const [sharedLink, setSharedLink] = useState('');
  const [copied, setCopied] = useState(false);

  const handleMembroChange = (index: number, valor: string) => {
    const newMembers = [...members];
    newMembers[index] = valor;
    setMembers(newMembers);
  };

  const addMember = () => {
    if (members.length < 50) setMembers([...members, '']);
  };

  const removeMember = (index: number) => setMembers(members.filter((_, i) => i !== index));

  const onSubmitCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const filteredMembers = members.filter(m => m.trim() !== '');
    
    if (filteredMembers.length < 2) {
      alert("O grupo precisa de ter pelo menos 2 membros.");
      return;
    }

    setLoading(true);
    try {
      const response = await boraRacharService.createGroup({
        name: groupName,
        members: filteredMembers
      });
      
      const link = `${window.location.origin}/grupos/${response.id}?token=${response.accessToken}`;
      setSharedLink(link);
    } catch (error) {
      alert("Erro ao criar o grupo. Verifica a consola.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(sharedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto py-8 md:py-12 px-2">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* LADO ESQUERDO: HERO */}
        <div className="lg:col-span-6 space-y-8">
          <div className="space-y-4">
            <span className="text-[11px] font-bold tracking-widest text-slate-500 uppercase">
              Boas companhias. Contas em dia.
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-[#1e3d2f] leading-tight tracking-tight">
              Divida a conta. <br />
              <span className="text-[#4a7c59]">Multiplique os momentos.</span>
            </h1>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-md font-medium">
              Da viagem ao jantar de sexta: organize as despesas do grupo e descubra quem paga quanto, sem complicação.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {[
              { step: '01', text: 'Crie seu grupo' },
              { step: '02', text: 'Adicione as despesas' },
              { step: '03', text: 'Acerte as contas' },
            ].map((item) => (
              <div key={item.step} className="flex items-center gap-4 text-sm font-semibold text-slate-700">
                <span className="text-slate-400 font-mono text-xs">{item.step}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>

          <div className="bg-[#e8ede1] border border-[#d8e2cf] p-5 rounded-2xl flex items-start gap-4 max-w-md">
            <div className="p-2 bg-[#d2dec7] text-[#1e3d2f] rounded-lg font-bold">↗</div>
            <div>
              <h4 className="font-bold text-xs text-[#1e3d2f] uppercase tracking-wide">
                Mais momentos, menos planilhas.
              </h4>
              <p className="text-xs text-slate-600 mt-0.5">
                Um convite secreto conecta todo mundo. Sem cadastro.
              </p>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-6">
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-200/50 border border-slate-100/80">
            {!sharedLink ? (
              <form onSubmit={onSubmitCreate} className="space-y-6">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">Quem vai nessa?</h2>
                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    Comece com um nome e as pessoas do grupo.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">Nome do grupo</label>
                  <input
                    required
                    type="text"
                    placeholder="Ex.: Fim de semana na praia"
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1e3d2f] focus:ring-1 focus:ring-[#1e3d2f] transition-all text-sm font-medium"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                  />
                </div>

                <div className="space-y-2.5">
                  <div className="flex justify-between items-center">
                    <label className="block text-xs font-bold text-slate-700">Participantes</label>
                    <span className="text-xs font-mono text-slate-400">{members.length}/50</span>
                  </div>

                  <div className="space-y-2">
                    {members.map((member, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="flex-1 relative flex items-center">
                          <span className="absolute left-3.5 text-xs font-mono text-slate-400 select-none">
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                          <input
                            required
                            type="text"
                            placeholder={idx === 0 ? 'Seu nome' : 'Nome do participante'}
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1e3d2f] focus:ring-1 focus:ring-[#1e3d2f] transition-all text-sm font-medium"
                            value={member}
                            onChange={(e) => handleMembroChange(idx, e.target.value)}
                          />
                        </div>
                        {members.length > 2 && (
                          <button
                            type="button"
                            onClick={() => removeMember(idx)}
                            className="p-2 text-slate-400 hover:text-rose-600 rounded-lg transition-colors"
                            title="Remover"
                          >
                            <TrashIcon />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={addMember}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1e3d2f] hover:text-[#2d5c46] py-1 transition-colors"
                  >
                    <PlusIcon /> Adicionar participante
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#1e3d2f] hover:bg-[#162e23] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-[#1e3d2f]/20 transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50"
                >
                  {loading ? 'A criar...' : 'Criar meu grupo'} <ArrowRightIcon />
                </button>

                <p className="text-[11px] text-slate-400 text-center leading-relaxed">
                  O acesso fica guardado somente nesta sessão do navegador. Salve seu convite para voltar depois.
                </p>
              </form>
            ) : (
              <div className="text-center py-4 space-y-6">
                <div className="w-14 h-14 bg-[#e8ede1] text-[#1e3d2f] rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                  ✓
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Grupo criado com sucesso!</h3>
                  <p className="text-xs text-slate-500 mt-1">Partilhe o link de acesso com os participantes do grupo.</p>
                </div>

                <div className="bg-[#f0f3eb] p-2 rounded-2xl border border-slate-200/80 flex items-center gap-2">
                  <input
                    readOnly
                    value={sharedLink}
                    className="flex-1 bg-transparent px-3 text-xs text-slate-700 font-mono focus:outline-none select-all truncate"
                  />
                  <button
                    onClick={copyUrl}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all text-white ${
                      copied ? 'bg-emerald-600' : 'bg-[#1e3d2f] hover:bg-[#162e23]'
                    }`}
                  >
                    <CopyIcon /> {copied ? 'Copiado!' : 'Copiar'}
                  </button>
                </div>

                <Link
                  to={sharedLink.replace(window.location.origin, '')}
                  className="inline-flex items-center justify-center gap-2 w-full bg-[#1e3d2f] hover:bg-[#162e23] text-white font-bold py-3.5 rounded-xl transition-all text-sm"
                >
                  Aceder ao grupo agora <ArrowRightIcon />
                </Link>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}