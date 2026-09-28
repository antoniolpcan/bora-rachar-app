import { useCallback, useEffect, useState } from "react";
import { boraRacharService } from "../services/boraRacharService";
import type { ExpenseResponseDto } from "../services/types/types";

export function useExpenses(groupId?: string | null, token?: string | null) {
  const [data, setData] = useState<ExpenseResponseDto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchExpenses = useCallback(async () => {
    if (!groupId || !token) return;
    
    setLoading(true);
    setError(null);
    try {
      const result = await boraRacharService.getExpenses(groupId, token);
      setData(result);
    } catch (err: any) {
      setError('Erro ao carregar as despesas.');
    } finally {
      setLoading(false);
    }
  }, [groupId, token]);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  return { data, loading, error, refetch: fetchExpenses };
}