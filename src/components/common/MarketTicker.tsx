'use client';

import { useMarketData } from '@/hooks/useMarketData';
import { useEffect, useState } from 'react';

export default function MarketTicker() {
  const { goldData, currencyData, bistData, loading, error } = useMarketData(30000);

  // Tüm verileri birleştir ve formatla
  const marketData = [
    // Döviz kurları
    ...(currencyData
      .filter(item => ['USD', 'EUR'].includes(item.name))
      .map(item => ({
        symbol: `${item.name}/TRY`,
        value: (item.selling || item.rate).toFixed(2),
        change: item.rate > 0 ? '+' + item.rate.toFixed(2) + '%' : item.rate.toFixed(2) + '%',
        isUp: item.rate > 0
      }))),
    // BIST100
    ...(bistData
      .filter(item => item.name.includes('BIST'))
      .map(item => ({
        symbol: 'BIST 100',
        value: item.rate.toFixed(2),
        change: item.rate > 0 ? '+' + item.rate.toFixed(2) + '%' : item.rate.toFixed(2) + '%',
        isUp: item.rate > 0
      }))),
    // Altın
    ...(goldData
      .filter(item => item.name.toLowerCase().includes('gram'))
      .map(item => ({
        symbol: 'GRAM ALTIN',
        value: (item.selling || item.rate).toFixed(2),
        change: ((item.selling || item.rate) - (item.buying || 0)).toFixed(2) + ' ₺',
        isUp: ((item.selling || item.rate) - (item.buying || 0)) > 0
      })))
  ];

  // Verileri iki kez tekrarla (sonsuz döngü için)
  const repeatedData = [...marketData, ...marketData];

  if (loading) {
    return (
      <div className="bg-secondary text-text-light py-1.5 overflow-hidden">
        <div className="flex justify-center">
          <span className="text-sm">Piyasa verileri yükleniyor...</span>
        </div>
      </div>
    );
  }

  if (error || marketData.length === 0) {
    return (
      <div className="bg-secondary text-text-light py-1.5 overflow-hidden">
        <div className="flex justify-center">
          <span className="text-sm text-red-400">Piyasa verileri geçici olarak kullanılamıyor</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-secondary text-text-light py-1.5 overflow-hidden">
      <div className="relative w-full overflow-hidden">
        <div className="animate-marquee whitespace-nowrap">
          {repeatedData.map((item, index) => (
            <div key={index} className="inline-flex items-center mx-4">
              <span className="font-medium">{item.symbol}</span>
              <span className="ml-2">{item.value}</span>
              <span className={`ml-2 ${item.isUp ? 'text-green-400' : 'text-red-400'}`}>
                {item.change}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 