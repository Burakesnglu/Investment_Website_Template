import { useState, useEffect } from 'react';
import { MarketData, getGoldData, getCurrencyData, getBistData } from '@/services/marketData.service';

interface UseMarketDataReturn {
  goldData: MarketData[];
  currencyData: MarketData[];
  bistData: MarketData[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export const useMarketData = (refreshInterval = 60000): UseMarketDataReturn => {
  const [goldData, setGoldData] = useState<MarketData[]>([]);
  const [currencyData, setCurrencyData] = useState<MarketData[]>([]);
  const [bistData, setBistData] = useState<MarketData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [gold, currency, bist] = await Promise.all([
        getGoldData(),
        getCurrencyData(),
        getBistData()
      ]);

      setGoldData(gold);
      setCurrencyData(currency);
      setBistData(bist);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Piyasa verileri alınamadı'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    if (refreshInterval > 0) {
      const interval = setInterval(fetchData, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [refreshInterval]);

  return {
    goldData,
    currencyData,
    bistData,
    loading,
    error,
    refetch: fetchData
  };
}; 