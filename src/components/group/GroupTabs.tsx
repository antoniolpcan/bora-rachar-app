export type GroupTab = 'expenses' | 'balances';

interface GroupTabsProps {
  activeTab: GroupTab;
  onTabChange: (tab: GroupTab) => void;
}

export function GroupTabs({ activeTab, onTabChange }: GroupTabsProps) {
  return (
    <div className="flex gap-4 border-b-2 border-(--border)" role="tablist">
      <button 
        role="tab"
        aria-selected={activeTab === 'expenses'}
        className={`py-2 px-4 text-sm font-bold transition-all border-b-4 -mb-0.5 cursor-pointer ${
          activeTab === 'expenses' 
            ? 'border-(--text) text-(--text)' 
            : 'border-transparent text-(--subtle) hover:text-(--text)'
        }`}
        onClick={() => onTabChange('expenses')}
      >
        Recibos
      </button>
      <button 
        role="tab"
        aria-selected={activeTab === 'balances'}
        className={`py-2 px-4 text-sm font-bold transition-all border-b-4 -mb-0.5 cursor-pointer ${
          activeTab === 'balances' 
            ? 'border-(--text) text-(--text)' 
            : 'border-transparent text-(--subtle) hover:text-(--text)'
        }`}
        onClick={() => onTabChange('balances')}
      >
        Contas a pagar
      </button>
    </div>
  );
}
