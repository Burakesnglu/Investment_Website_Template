-- contact_forms tablosunu yeniden oluşturalım

-- Önce mevcut tabloyu drop edelim (eğer varsa)
DROP TABLE IF EXISTS contact_forms;

-- Yeni tabloyu doğru yapıyla oluşturalım
CREATE TABLE contact_forms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- İndexleri ekleyelim
CREATE INDEX idx_contact_forms_created_at ON contact_forms(created_at DESC);

-- RLS'i devre dışı bırakalım (en basit çözüm)
ALTER TABLE contact_forms DISABLE ROW LEVEL SECURITY; 