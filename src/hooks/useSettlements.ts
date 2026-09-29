import { useState, useEffect, useCallback } from 'react';
import type { PaymentInstruction } from "@/services/types/types";
import { boraRacharService } from "@/services/boraRacharService";

export function useSettlements(groupId?: string | null, token?: string | null) {
  const [data, setData] = useState<PaymentInstruction[]>([]);
  const [loading, setLoading] = useState<boolean>(Boolean(groupId && token));
  const [error, setError] = useState<string | null>(null);

  const fetchSettlements = useCallback(async () => {
    if (!groupId || !token) return;
    setLoading(true);
    setError(null);
    try {
      const result = await boraRacharService.getSettlements(groupId, token);
      setData(result);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro ao calcular os acertos.');
    } finally {
      setLoading(false);
    }
  }, [groupId, token]);

  useEffect(() => {
    if (!groupId || !token) return;

    let ignore = false;

    boraRacharService.getSettlements(groupId, token)
      .then((result) => {
        if (!ignore) {
          setData(result);
          setError(null);
        }
      })
      .catch((err: unknown) => {
        if (!ignore) {
          setError(err instanceof Error ? err.message : 'Erro ao calcular os acertos.');
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

  return { data, loading, error, refetch: fetchSettlements };
}