-- contact_forms tablosunu düzeltme

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
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- İndexleri ekleyelim
CREATE INDEX idx_contact_forms_created_at ON contact_forms(created_at DESC);

-- RLS'i aktifleştirelim
ALTER TABLE contact_forms ENABLE ROW LEVEL SECURITY;

-- Politikaları ekleyelim
CREATE POLICY "Herkes contact_forms ekleyebilir"
    ON contact_forms
    FOR INSERT
    TO anon
    WITH CHECK (true);

CREATE POLICY "Sadece yetkilendirilmiş kullanıcılar formlara erişebilir"
    ON contact_forms
    FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Sadece yetkilendirilmiş kullanıcılar formları güncelleyebilir"
    ON contact_forms
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Sadece yetkilendirilmiş kullanıcılar formları silebilir"
    ON contact_forms
    FOR DELETE
    TO authenticated
    USING (true);

-- Tüm kullanıcıların form göndermesine izin veren politika
CREATE POLICY "Allow public INSERT on contact_forms"
    ON contact_forms
    FOR INSERT
    TO public
    WITH CHECK (true); 