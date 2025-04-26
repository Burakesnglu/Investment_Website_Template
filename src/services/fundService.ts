import type {
  Fund,
  FundPerformance,
  BenchmarkPerformance
} from '@/types/fund';

// Fon detaylarını getir
export const getFundDetails = async (fundId: string): Promise<Fund> => {
  // TODO: Implement actual API call
  const response = await fetch(`/api/funds/${fundId}`);
  if (!response.ok) {
    throw new Error('Fon detayları alınamadı');
  }
  return response.json();
};

// Fon performans verilerini getir
export const getFundPerformance = async (fundId: string): Promise<FundPerformance[]> => {
  // TODO: Implement actual API call
  const response = await fetch(`/api/funds/${fundId}/performance`);
  if (!response.ok) {
    throw new Error('Fon performans verileri alınamadı');
  }
  return response.json();
};

// Benchmark performans verilerini getir
export const getBenchmarkPerformance = async (benchmarkId: string): Promise<BenchmarkPerformance[]> => {
  // TODO: Implement actual API call
  const response = await fetch(`/api/benchmarks/${benchmarkId}/performance`);
  if (!response.ok) {
    throw new Error('Benchmark performans verileri alınamadı');
  }
  return response.json();
}; 