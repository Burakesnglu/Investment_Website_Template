-- Create contact_forms table
CREATE TABLE IF NOT EXISTS contact_forms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    is_read BOOLEAN DEFAULT FALSE NOT NULL
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_contact_forms_created_at ON contact_forms(created_at DESC);

-- Enable RLS
ALTER TABLE contact_forms ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow anonymous insert to contact_forms"
    ON contact_forms
    FOR INSERT
    TO anon
    WITH CHECK (true);

CREATE POLICY "Allow authenticated users to select contact_forms"
    ON contact_forms
    FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Allow authenticated users to update contact_forms"
    ON contact_forms
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete contact_forms"
    ON contact_forms
    FOR DELETE
    TO authenticated
    USING (true); 