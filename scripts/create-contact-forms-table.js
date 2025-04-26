const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Supabase credentials - get from .env or replace with actual values
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Use service role key for schema modifications

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function createContactFormsTable() {
  console.log('Creating contact_forms table...');

  const { error } = await supabase.rpc('exec_sql', {
    query: `
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
    `
  });

  if (error) {
    console.error('Error creating contact_forms table:', error);
    process.exit(1);
  }

  console.log('contact_forms table created successfully!');
}

createContactFormsTable()
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  }); 