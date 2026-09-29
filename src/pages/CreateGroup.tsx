import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { boraRacharService } from '@/services/boraRacharService';
import { Tape } from '@/components/ui/Tape';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { IntroBanner } from '@/components/create-group/IntroBanner';
import { MemberInputList, type MemberField } from '@/components/create-group/MemberInputList';
import { GroupCreatedSuccess } from '@/components/create-group/GroupCreatedSuccess';

export function CreateGroup() {
  const [groupName, setGroupName] = useState('');
  const [members, setMembers] = useState<MemberField[]>([
    { id: crypto.randomUUID(), name: '' },
    { id: crypto.randomUUID(), name: '' }
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [createdGroup, setCreatedGroup] = useState<{ id: string; accessToken: string } | null>(null);

  const handleMemberChange = (id: string, value: string) => {
    setMembers(prev => prev.map(m => m.id === id ? { ...m, name: value } : m));
  };

  const addMember = () => { 
    if (members.length < 50) {
      setMembers(prev => [...prev, { id: crypto.randomUUID(), name: '' }]);
    }
  };

  const removeMember = (id: string) => {
    setMembers(prev => prev.filter(m => m.id !== id));
  };

  const onSubmitCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const filteredMembers = members.map(m => m.name.trim()).filter(Boolean);
    
    if (filteredMembers.length < 2) {
      setError("Pssst... anota pelo menos 2 pessoas aí.");
      return;
    }

    const namesLower = filteredMembers.map(name => name.toLowerCase());
    const hasDuplicates = new Set(namesLower).size !== namesLower.length;
    if (hasDuplicates) {
      setError("Epa! Tem nomes repetidos. Diferencie com apelido ou sobrenome.");
      return;
    }

    setLoading(true);
    try {
      const response = await boraRacharService.createGroup({ 
        name: groupName.trim(), 
        members: filteredMembers 
      });
      setCreatedGroup({ id: response.id, accessToken: response.accessToken });
    } catch {
      setError("Papel rasgou. Tenta colar de novo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-12 md:py-20 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <IntroBanner />
        
        <div className="relative bg-(--surface) p-6 md:p-8 rounded-sm rounded-br-3xl shadow-[2px_4px_12px_rgba(0,0,0,0.15)] transform rotate-1 transition-colors duration-500">
          <Tape className="w-24 h-6" rotate="-rotate-1" />

          {!createdGroup ? (
            <form onSubmit={onSubmitCreate} className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-(--text) border-b-2 border-(--border) pb-2 inline-block">
                  Lembrete: Criar Grupo
                </h2>
              </div>

              {error && <Alert>{error}</Alert>}

              <div className="space-y-1">
                <label htmlFor="groupName" className="block text-sm font-bold text-(--text)">
                  Sobre o que é?
                </label>
                <Input
                  id="groupName"
                  required
                  disabled={loading}
                  type="text"
                  placeholder="Ex: Praia fim de semana"
                  className="text-lg"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                />
              </div>

              <MemberInputList 
                members={members}
                loading={loading}
                onChange={handleMemberChange}
                onAdd={addMember}
                onRemove={removeMember}
              />

              <div className="pt-6">
                <Button
                  type="submit"
                  disabled={loading}
                  size="lg"
                  className="w-full"
                >
                  {loading ? 'A colar post-it...' : 'Bora rachar?'} 
                  {!loading && <ArrowRight className="w-4 h-4" />}
                </Button>
              </div>
            </form>
          ) : (
            <GroupCreatedSuccess 
              groupId={createdGroup.id} 
              token={createdGroup.accessToken} 
            />
          )}
        </div>
      </div>
    </div>
  );
}