export const formatMoney = (value?: number | null): string => {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    return 'R$ 0,00';
  }
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};