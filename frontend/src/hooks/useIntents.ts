import { useState, useEffect, useCallback } from 'react';
import { Intent, ExecutionLog } from '../types/intent.types';
import { api } from '../integration/api';

export function useIntents(owner?: string) {
  const [intents, setIntents] = useState<Intent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const loadIntents = useCallback(async () => {
    if (!owner) return;
    
    setLoading(true);
    setError('');
    
    try {
      const data = await api.getIntents(owner);
      setIntents(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [owner]);

  useEffect(() => {
    loadIntents();
    const interval = setInterval(loadIntents, 5000);
    return () => clearInterval(interval);
  }, [loadIntents]);

  return { intents, loading, error, reload: loadIntents };
}

export function useIntentDetails(intentId: string) {
  const [intent, setIntent] = useState<Intent | null>(null);
  const [logs, setLogs] = useState<ExecutionLog[]>([]);
  const [loading, setLoading] = useState(false);

  const loadDetails = useCallback(async () => {
    if (!intentId) return;
    
    setLoading(true);
    
    try {
      const data = await api.getIntentStatus(intentId);
      setIntent(data.intent);
      setLogs(data.logs);
    } catch (err) {
      console.error('Failed to load intent details:', err);
    } finally {
      setLoading(false);
    }
  }, [intentId]);

  useEffect(() => {
    loadDetails();
    const interval = setInterval(loadDetails, 3000);
    return () => clearInterval(interval);
  }, [loadDetails]);

  return { intent, logs, loading, reload: loadDetails };
}
