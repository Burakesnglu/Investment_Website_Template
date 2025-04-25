import { useState, useEffect } from 'react';

export interface MarketData {
  symbol: string;
  value: string;
  change: string;
  isUp: boolean;
}

const COLLECTAPI_KEY = process.env.NEXT_PUBLIC_COLLECTAPI_KEY;
const UPDATE_INTERVAL = 1000000;

export const useMarketData = () => {
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMarketData = async () => {
    if (!COLLECTAPI_KEY) {
      setError('API anahtarı bulunamadı');
      setLoading(false);
      return;
    }

    try {
      const headers = {
        'Authorization': `apikey ${COLLECTAPI_KEY}`,
        'Content-Type': 'application/json'
      };

      // BIST100 verisi
      const bist100Response = await fetch('https://api.collectapi.com/economy/borsaIstanbul', { headers });
      const bist100Data = await bist100Response.json();

      if (!bist100Data.success) {
        throw new Error('BIST100 verisi alınamadı');
      }

      // Döviz kurları
      const currencyResponse = await fetch('https://api.collectapi.com/economy/allCurrency', { headers });
      const currencyData = await currencyResponse.json();

      if (!currencyData.success) {
        throw new Error('Döviz kurları alınamadı');
      }

      // Altın fiyatları
      const goldResponse = await fetch('https://api.collectapi.com/economy/goldPrice', { headers });
      const goldData = await goldResponse.json();

      if (!goldData.success) {
        throw new Error('Altın fiyatları alınamadı');
      }

      // Kripto para verileri
      const cryptoResponse = await fetch('https://api.collectapi.com/economy/cripto', { headers });
      const cryptoData = await cryptoResponse.json();

      if (!cryptoData.success) {
        throw new Error('Kripto para verileri alınamadı');
      }

      // Verileri birleştir ve formatla
      const formattedData: MarketData[] = [
        // USD/TRY
        {
          symbol: 'USD/TRY',
          value: currencyData.result.find((c: any) => c.code === 'USD')?.buying.toFixed(2) || '0.00',
          change: currencyData.result.find((c: any) => c.code === 'USD')?.rate.toFixed(2) + '%' || '0.00%',
          isUp: parseFloat(currencyData.result.find((c: any) => c.code === 'USD')?.rate || '0') > 0
        },
        // EUR/TRY
        {
          symbol: 'EUR/TRY',
          value: currencyData.result.find((c: any) => c.code === 'EUR')?.buying.toFixed(2) || '0.00',
          change: currencyData.result.find((c: any) => c.code === 'EUR')?.rate.toFixed(2) + '%' || '0.00%',
          isUp: parseFloat(currencyData.result.find((c: any) => c.code === 'EUR')?.rate || '0') > 0
        },
        // BIST 100
        {
          symbol: 'BIST 100',
          value: bist100Data.result[0].current.toFixed(2) || '0.00',
          change: bist100Data.result[0].changerate.toFixed(2) + '%' || '0.00%',
          isUp: parseFloat(bist100Data.result[0].changerate || '0') > 0
        },
        // ALTIN/ONS
        {
          symbol: 'ALTIN/ONS',
          value: goldData.result.find((g: any) => g.name === 'ONS Altın')?.buying.toFixed(2) || '0.00',
          change: goldData.result.find((g: any) => g.name === 'ONS Altın')?.rate.toFixed(2) + '%' || '0.00%',
          isUp: parseFloat(goldData.result.find((g: any) => g.name === 'ONS Altın')?.rate || '0') > 0
        },
        // BITCOIN
        {
          symbol: 'BITCOIN',
          value: cryptoData.result.find((c: any) => c.code === 'BTC')?.price.toFixed(2) || '0.00',
          change: cryptoData.result.find((c: any) => c.code === 'BTC')?.changeDay.toFixed(2) + '%' || '0.00%',
          isUp: parseFloat(cryptoData.result.find((c: any) => c.code === 'BTC')?.changeDay || '0') > 0
        }
      ];

      // Veriyi iki kez tekrarla (sonsuz döngü için)
      setMarketData([...formattedData, ...formattedData]);
      setLoading(false);
      setError(null);
    } catch (err) {
      console.error('Market data fetch error:', err);
      setError(err instanceof Error ? err.message : 'Piyasa verileri alınamadı');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketData();

    // Belirli aralıklarla güncelle
    const interval = setInterval(fetchMarketData, UPDATE_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return { marketData, loading, error };
}; 