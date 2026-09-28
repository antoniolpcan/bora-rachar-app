import { useState, useEffect, useCallback } from 'react';
import type { PaymentInstruction } from '../services/types/types';
import { boraRacharService } from '../services/boraRacharService';

export function useSettlements(groupId?: string | null, token?: string | null) {
    const [data, setData] = useState<PaymentInstruction[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchSettlements = useCallback(async () => {
        if (!groupId || !token) return;
        setLoading(true);
        setError(null);
        try {
            const result = await boraRacharService.getSettlements(groupId, token);
            setData(result);
        } catch (err: any) {
            setError('Erro ao calcular os acertos.');
        } finally {
            setLoading(false);
        }
    }, [groupId, token]);

    useEffect(() => {
        fetchSettlements();
    }, [fetchSettlements]);

    return { data, loading, error, refetch: fetchSettlements };
}