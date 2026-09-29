import { useCallback, useEffect, useState } from "react";
import type { MemberBalanceResponseDto } from "@/services/types/types";
import { boraRacharService } from "@/services/boraRacharService";

export function useBalances(groupId?: string | null, token?: string | null) {
  const [data, setData] = useState<MemberBalanceResponseDto[]>([]);
  const [loading, setLoading] = useState<boolean>(Boolean(groupId && token));
  const [error, setError] = useState<string | null>(null);

  const fetchBalances = useCallback(async () => {
    if (!groupId || !token) return;
    
    setLoading(true);
    setError(null);
    try {
      const result = await boraRacharService.getBalances(groupId, token);
      setData(result);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar os saldos.');
    } finally {
      setLoading(false);
    }
  }, [groupId, token]);

  useEffect(() => {
    if (!groupId || !token) return;

    let ignore = false;

    boraRacharService.getBalances(groupId, token)
      .then((result) => {
        if (!ignore) {
          setData(result);
          setError(null);
        }
      })
      .catch((err: unknown) => {
        if (!ignore) {
          setError(err instanceof Error ? err.message : 'Erro ao carregar os saldos.');
        }
      })
      .finally(() => {
        if (!ignore) {
          setLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, [groupId, token]);

  return { data, loading, error, refetch: fetchBalances };
}