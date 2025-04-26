import type { Fund, FundPerformance, BenchmarkPerformance } from '@/types/fund';

// Basit mock veri fonksiyonları
export const getFundDetails = async (fundId: string): Promise<Fund> => {
  // TODO: Admin panel entegrasyonu sonrası gerçek API çağrısı yapılacak
  return {
    id: fundId,
    name: 'Demo Fon',
    shortName: 'DEMO',
    category: 'Hisse Senedi',
    riskLevel: 'Orta',
    currency: 'TRY',
    inceptionDate: new Date(),
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  };
};

export const getFundPerformance = async (fundId: string): Promise<FundPerformance[]> => {
  // TODO: Admin panel entegrasyonu sonrası gerçek API çağrısı yapılacak
  const today = new Date();
  const data: FundPerformance[] = [];
  
  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    data.push({
      id: `perf-${i}`,
      fundId,
      date,
      nav: 100 + Math.random() * 10,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }
  
  return data;
};

export const getBenchmarkPerformance = async (benchmarkId: string): Promise<BenchmarkPerformance[]> => {
  // TODO: Admin panel entegrasyonu sonrası gerçek API çağrısı yapılacak
  const today = new Date();
  const data: BenchmarkPerformance[] = [];
  
  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    data.push({
      id: `bench-${i}`,
      benchmarkId,
      date,
      value: 100 + Math.random() * 10,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }
  
  return data;
}; 