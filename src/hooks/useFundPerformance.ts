import { useState, useEffect } from 'react';
import { getFundDetails, getFundPerformance, getBenchmarkPerformance } from '@/lib/services/fundService';
import { filterDataByTimeframe, transformDataForChart } from '@/lib/utils/chartUtils';
import type {
  Fund,
  FundPerformance,
  BenchmarkPerformance,
  TimeframeOption,
  FundChartData,
  ComparisonOption,
  FundPerformanceOptions,
  ChartSeries
} from '@/types/fund';

const useFundPerformance = (
  fundId: string,
  benchmarkId?: string,
  timeframe: TimeframeOption = '1Y',
  options: FundPerformanceOptions = {}
) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [fund, setFund] = useState<Fund | null>(null);
  const [chartData, setChartData] = useState<FundChartData>({ dates: [], series: [] });

  // Fon detaylarını yükle
  const loadFundDetails = async () => {
    try {
      const fundData = await getFundDetails(fundId);
      setFund(fundData);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Fon detayları yüklenirken hata oluştu'));
    }
  };

  // Tek fon için performans verilerini yükle
  const loadSingleFundData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fon performans verilerini al
      const performanceData = await getFundPerformance(fundId);
      let series: ChartSeries[] = [{
        name: fund?.shortName || 'Fon',
        data: performanceData.map((p: FundPerformance) => ({
          date: p.date,
          value: p.nav
        }))
      }];

      // Benchmark verilerini al (eğer belirtilmişse)
      if (benchmarkId) {
        const benchmarkData = await getBenchmarkPerformance(benchmarkId);
        series.push({
          name: 'Benchmark',
          data: benchmarkData.map((b: BenchmarkPerformance) => ({
            date: b.date,
            value: b.value
          }))
        });
      }

      // Zaman aralığına göre filtrele
      const filteredData = filterDataByTimeframe(series, timeframe);
      
      // Grafik için veriyi dönüştür
      const chartData = transformDataForChart(filteredData);
      setChartData(chartData);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Performans verileri yüklenirken hata oluştu'));
    } finally {
      setLoading(false);
    }
  };

  // Karşılaştırma için performans verilerini yükle
  const loadComparisonData = async () => {
    try {
      setLoading(true);
      setError(null);

      const comparisonPromises = options.comparison?.map(async (comp) => {
        const fundData = await getFundPerformance(comp.fundId);
        let series: ChartSeries = {
          name: (await getFundDetails(comp.fundId)).shortName,
          data: fundData.map((p: FundPerformance) => ({
            date: p.date,
            value: p.nav
          }))
        };

        if (comp.benchmarkId) {
          const benchmarkData = await getBenchmarkPerformance(comp.benchmarkId);
          return [
            series,
            {
              name: 'Benchmark',
              data: benchmarkData.map((b: BenchmarkPerformance) => ({
                date: b.date,
                value: b.value
              }))
            }
          ];
        }

        return [series];
      }) || [];

      const results = await Promise.all(comparisonPromises);
      const allSeries = results.flat();

      // Zaman aralığına göre filtrele
      const filteredData = filterDataByTimeframe(allSeries, timeframe);
      
      // Grafik için veriyi dönüştür
      const chartData = transformDataForChart(filteredData);
      setChartData(chartData);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Karşılaştırma verileri yüklenirken hata oluştu'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFundDetails();
  }, [fundId]);

  useEffect(() => {
    if (options.comparison?.length) {
      loadComparisonData();
    } else {
      loadSingleFundData();
    }
  }, [fundId, benchmarkId, timeframe, options.comparison]);

  return {
    fund,
    chartData,
    loading,
    error,
    reload: options.comparison?.length ? loadComparisonData : loadSingleFundData
  };
};

export default useFundPerformance; 