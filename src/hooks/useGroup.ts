import { useCallback, useEffect, useState } from "react";
import type { GroupResponseDto } from "@/services/types/types";
import { boraRacharService } from "@/services/boraRacharService";
import { ApiError } from "@/services/api";

export function useGroup(groupId?: string | null, token?: string | null) {
  const [data, setData] = useState<GroupResponseDto | null>(null);
  const [loading, setLoading] = useState<boolean>(Boolean(groupId && token));
  const [error, setError] = useState<string | null>(null);

  const fetchGroup = useCallback(async () => {
    if (!groupId || !token) return;
    
    setLoading(true);
    setError(null);
    try {
      const result = await boraRacharService.getGroup(groupId, token);
      setData(result);
    } catch (err: unknown) {
      const mensagem = err instanceof ApiError && err.status === 401 
        ? 'Acesso não autorizado. O token é inválido.' 
        : 'Erro ao carregar os dados do grupo.';
      setError(mensagem);
    } finally {
      setLoading(false);
    }
  }, [groupId, token]);

  useEffect(() => {
    if (!groupId || !token) return;

    let ignore = false;

    boraRacharService.getGroup(groupId, token)
      .then((result) => {
        if (!ignore) {
          setData(result);
          setError(null);
        }
      })
      .catch((err: unknown) => {
        if (!ignore) {
          const mensagem = err instanceof ApiError && err.status === 401 
            ? 'Acesso não autorizado. O token é inválido.' 
            : 'Erro ao carregar os dados do grupo.';
          setError(mensagem);
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

  return { data, loading, error, refetch: fetchGroup };
}