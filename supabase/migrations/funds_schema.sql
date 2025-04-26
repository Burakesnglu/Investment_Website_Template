-- Fon kategorileri için enum tipi
CREATE TYPE fund_category AS ENUM (
  'Hisse Senedi',
  'Borçlanma Araçları',
  'Karma',
  'Para Piyasası',
  'Katılım',
  'Serbest',
  'Girişim Sermayesi',
  'Gayrimenkul'
);

-- Fon risk seviyeleri için enum tipi
CREATE TYPE risk_level AS ENUM (
  'Düşük',
  'Orta',
  'Yüksek'
);

-- Fonlar tablosu
CREATE TABLE funds (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  short_name VARCHAR(50) NOT NULL,
  description TEXT,
  category fund_category NOT NULL,
  risk_level risk_level NOT NULL,
  min_investment DECIMAL(15,2),
  management_fee DECIMAL(5,2),
  entry_fee DECIMAL(5,2),
  exit_fee DECIMAL(5,2),
  total_assets DECIMAL(15,2),
  currency VARCHAR(3) DEFAULT 'TRY',
  inception_date DATE NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(short_name)
);

-- Fon yöneticileri tablosu
CREATE TABLE fund_managers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  fund_id UUID REFERENCES funds(id) ON DELETE CASCADE,
  manager_id UUID REFERENCES admin_users(id) ON DELETE CASCADE,
  start_date DATE NOT NULL,
  end_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(fund_id, manager_id, start_date)
);

-- Fon performans verileri tablosu
CREATE TABLE fund_performance (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  fund_id UUID REFERENCES funds(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  nav DECIMAL(15,4) NOT NULL, -- Net Asset Value
  daily_return DECIMAL(8,4),
  ytd_return DECIMAL(8,4),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(fund_id, date)
);

-- Karşılaştırma endeksleri tablosu
CREATE TABLE benchmarks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  short_name VARCHAR(50) NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(short_name)
);

-- Endeks performans verileri tablosu
CREATE TABLE benchmark_performance (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  benchmark_id UUID REFERENCES benchmarks(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  value DECIMAL(15,4) NOT NULL,
  daily_return DECIMAL(8,4),
  ytd_return DECIMAL(8,4),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(benchmark_id, date)
);

-- Fon-Endeks ilişki tablosu
CREATE TABLE fund_benchmarks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  fund_id UUID REFERENCES funds(id) ON DELETE CASCADE,
  benchmark_id UUID REFERENCES benchmarks(id) ON DELETE CASCADE,
  weight DECIMAL(5,2) DEFAULT 100.0,
  start_date DATE NOT NULL,
  end_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(fund_id, benchmark_id, start_date)
);

-- Fon portföy dağılımı tablosu
CREATE TABLE fund_allocation (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  fund_id UUID REFERENCES funds(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  asset_type VARCHAR(50) NOT NULL,
  percentage DECIMAL(5,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(fund_id, date, asset_type)
);

-- Otomatik updated_at güncellemesi için trigger fonksiyonu
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger'ları oluştur
CREATE TRIGGER update_funds_updated_at
  BEFORE UPDATE ON funds
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_fund_managers_updated_at
  BEFORE UPDATE ON fund_managers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_fund_performance_updated_at
  BEFORE UPDATE ON fund_performance
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_benchmarks_updated_at
  BEFORE UPDATE ON benchmarks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_benchmark_performance_updated_at
  BEFORE UPDATE ON benchmark_performance
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_fund_benchmarks_updated_at
  BEFORE UPDATE ON fund_benchmarks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_fund_allocation_updated_at
  BEFORE UPDATE ON fund_allocation
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- RLS Politikaları
ALTER TABLE funds ENABLE ROW LEVEL SECURITY;
ALTER TABLE fund_managers ENABLE ROW LEVEL SECURITY;
ALTER TABLE fund_performance ENABLE ROW LEVEL SECURITY;
ALTER TABLE benchmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE benchmark_performance ENABLE ROW LEVEL SECURITY;
ALTER TABLE fund_benchmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE fund_allocation ENABLE ROW LEVEL SECURITY;

-- Herkes aktif fonları görebilir
CREATE POLICY "Aktif fonlar herkese açık"
  ON funds FOR SELECT
  USING (is_active = true);

-- Admin kullanıcıları tüm fonları yönetebilir
CREATE POLICY "Adminler tüm fonları yönetebilir"
  ON funds FOR ALL
  USING (
    auth.uid() IN (
      SELECT user_id FROM admin_users 
      WHERE role = 'admin'
    )
  );

-- Fon yöneticileri kendi fonlarını görebilir ve güncelleyebilir
CREATE POLICY "Fon yöneticileri kendi fonlarını yönetebilir"
  ON funds FOR ALL
  USING (
    auth.uid() IN (
      SELECT user_id FROM admin_users 
      WHERE role = 'fund_manager'
      AND id IN (
        SELECT manager_id FROM fund_managers 
        WHERE fund_id = funds.id 
        AND (end_date IS NULL OR end_date >= CURRENT_DATE)
      )
    )
  );

-- Herkes aktif benchmark verilerini görebilir
CREATE POLICY "Aktif benchmark verileri herkese açık"
  ON benchmarks FOR SELECT
  USING (is_active = true);

-- Performans verilerine benzer politikalar
CREATE POLICY "Performans verileri herkese açık"
  ON fund_performance FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM funds
      WHERE funds.id = fund_performance.fund_id
      AND funds.is_active = true
    )
  );

CREATE POLICY "Benchmark performans verileri herkese açık"
  ON benchmark_performance FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM benchmarks
      WHERE benchmarks.id = benchmark_performance.benchmark_id
      AND benchmarks.is_active = true
    )
  );

-- İndeksler
CREATE INDEX idx_funds_category ON funds(category);
CREATE INDEX idx_funds_risk_level ON funds(risk_level);
CREATE INDEX idx_fund_performance_date ON fund_performance(date);
CREATE INDEX idx_fund_performance_fund_date ON fund_performance(fund_id, date);
CREATE INDEX idx_benchmark_performance_date ON benchmark_performance(date);
CREATE INDEX idx_benchmark_performance_benchmark_date ON benchmark_performance(benchmark_id, date);
CREATE INDEX idx_fund_allocation_date ON fund_allocation(date);
CREATE INDEX idx_fund_allocation_fund_date ON fund_allocation(fund_id, date); 