export type FundCategory =
  | 'Hisse Senedi'
  | 'Borçlanma Araçları'
  | 'Karma'
  | 'Para Piyasası'
  | 'Katılım'
  | 'Serbest'
  | 'Girişim Sermayesi'
  | 'Gayrimenkul';

export type RiskLevel = 'Düşük' | 'Orta' | 'Yüksek';

export interface Fund {
  id: string;
  name: string;
  shortName: string;
  description?: string;
  category: FundCategory;
  riskLevel: RiskLevel;
  minInvestment?: number;
  managementFee?: number;
  entryFee?: number;
  exitFee?: number;
  totalAssets?: number;
  currency: string;
  inceptionDate: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface FundManager {
  id: string;
  fundId: string;
  managerId: string;
  startDate: Date;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface FundPerformance {
  id: string;
  fundId: string;
  date: Date;
  nav: number;
  dailyReturn?: number;
  ytdReturn?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Benchmark {
  id: string;
  name: string;
  shortName: string;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface BenchmarkPerformance {
  id: string;
  benchmarkId: string;
  date: Date;
  value: number;
  dailyReturn?: number;
  ytdReturn?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface FundBenchmark {
  id: string;
  fundId: string;
  benchmarkId: string;
  weight: number;
  startDate: Date;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface FundAllocation {
  id: string;
  fundId: string;
  date: Date;
  assetType: string;
  percentage: number;
  createdAt: Date;
  updatedAt: Date;
}

// Chart veri tipleri
export interface ChartDataPoint {
  date: Date;
  value: number;
}

export interface ChartSeries {
  name: string;
  data: ChartDataPoint[];
}

export interface FundChartData {
  dates: Date[];
  series: ChartSeries[];
}

// Timeframe seçenekleri
export type TimeframeOption = 
  | '1W'  // 1 hafta
  | '1M'  // 1 ay
  | '3M'  // 3 ay
  | '6M'  // 6 ay
  | 'YTD' // Yılbaşından bugüne
  | '1Y'  // 1 yıl
  | '3Y'  // 3 yıl
  | '5Y'  // 5 yıl
  | 'MAX'; // Tüm zamanlar

// Fon karşılaştırma seçenekleri
export interface ComparisonOption {
  fundId: string;
  benchmarkId?: string;
  weight?: number;
}

// Hook seçenekleri
export interface FundPerformanceOptions {
  initialLoad?: boolean;
  comparison?: ComparisonOption[];
} 