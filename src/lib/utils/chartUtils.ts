import type { ChartSeries, TimeframeOption, FundChartData, ChartDataPoint } from '@/types/fund';

// Zaman aralığına göre veriyi filtrele
export const filterDataByTimeframe = (series: ChartSeries[], timeframe: TimeframeOption): ChartSeries[] => {
  const today = new Date();
  const startDate = new Date();

  switch (timeframe) {
    case '1W':
      startDate.setDate(today.getDate() - 7);
      break;
    case '1M':
      startDate.setMonth(today.getMonth() - 1);
      break;
    case '3M':
      startDate.setMonth(today.getMonth() - 3);
      break;
    case '6M':
      startDate.setMonth(today.getMonth() - 6);
      break;
    case 'YTD':
      startDate.setMonth(0, 1); // 1 Ocak
      break;
    case '1Y':
      startDate.setFullYear(today.getFullYear() - 1);
      break;
    case '3Y':
      startDate.setFullYear(today.getFullYear() - 3);
      break;
    case '5Y':
      startDate.setFullYear(today.getFullYear() - 5);
      break;
    case 'MAX':
      return series; // Tüm veriyi döndür
  }

  return series.map(serie => ({
    name: serie.name,
    data: serie.data.filter(point => point.date >= startDate)
  }));
};

// Grafik için veriyi dönüştür
export const transformDataForChart = (series: ChartSeries[]): FundChartData => {
  // Tüm tarihleri birleştir ve sırala
  const allDates = Array.from(
    new Set(
      series.flatMap(serie => serie.data.map(point => point.date))
    )
  ).sort((a, b) => a.getTime() - b.getTime());

  // Her seri için değerleri düzenle
  const transformedSeries = series.map(serie => ({
    name: serie.name,
    data: allDates.map(date => {
      const point = serie.data.find(p => p.date.getTime() === date.getTime());
      return point ? { date, value: point.value } : { date, value: 0 };
    })
  }));

  return {
    dates: allDates,
    series: transformedSeries
  };
}; 