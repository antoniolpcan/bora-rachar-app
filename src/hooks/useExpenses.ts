import { useCallback, useEffect, useState } from "react";
import { boraRacharService } from "@/services/boraRacharService";
import type { ExpenseResponseDto } from "@/services/types/types";

export function useExpenses(groupId?: string | null, token?: string | null) {
  const [data, setData] = useState<ExpenseResponseDto[]>([]);
  const [loading, setLoading] = useState<boolean>(Boolean(groupId && token));
  const [error, setError] = useState<string | null>(null);

  const fetchExpenses = useCallback(async () => {
    if (!groupId || !token) return;
    
    setLoading(true);
    setError(null);
    try {
      const result = await boraRacharService.getExpenses(groupId, token);
      setData(result);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar as despesas.');
    } finally {
      setLoading(false);
    }
  }, [groupId, token]);

  useEffect(() => {
    if (!groupId || !token) return;

    let ignore = false;

    boraRacharService.getExpenses(groupId, token)
      .then((result) => {
        if (!ignore) {
          setData(result);
          setError(null);
        }
      })
      .catch((err: unknown) => {
        if (!ignore) {
          setError(err instanceof Error ? err.message : 'Erro ao carregar as despesas.');
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

  return { data, loading, error, refetch: fetchExpenses };
}