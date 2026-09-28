import { useCallback, useEffect, useState } from "react";
import type { MemberBalanceResponseDto } from "../services/types/types";
import { boraRacharService } from "../services/boraRacharService";

export function useBalances(groupId?: string | null, token?: string | null) {
  const [data, setData] = useState<MemberBalanceResponseDto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBalances = useCallback(async () => {
    if (!groupId || !token) return;
    
    setLoading(true);
    setError(null);
    try {
      const result = await boraRacharService.getBalances(groupId, token);
      setData(result);
    } catch (err: any) {
      setError('Erro ao carregar os saldos.');
    } finally {
      setLoading(false);
    }
  }, [groupId, token]);

  useEffect(() => {
    fetchBalances();
  }, [fetchBalances]);

  return { data, loading, error, refetch: fetchBalances };
}