-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create admin_users table
CREATE TABLE admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id),
    email TEXT NOT NULL UNIQUE,
    role TEXT NOT NULL CHECK (role IN ('admin', 'editor')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(user_id)
);

-- Create documents table
CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    file_url TEXT NOT NULL,
    file_type TEXT NOT NULL,
    file_size INTEGER NOT NULL,
    category TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    is_public BOOLEAN DEFAULT false NOT NULL
);

-- Create contact_messages table
CREATE TABLE contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('new', 'read', 'replied', 'archived')) DEFAULT 'new'
);

-- Create indexes
CREATE INDEX idx_documents_category ON documents(category);
CREATE INDEX idx_contact_messages_status ON contact_messages(status);
CREATE INDEX idx_contact_messages_created_at ON contact_messages(created_at DESC);

-- Create RLS policies
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Documents policies
CREATE POLICY "Public documents are viewable by everyone" 
    ON documents FOR SELECT 
    USING (is_public = true);

CREATE POLICY "Authenticated users can manage documents" 
    ON documents FOR ALL 
    USING (EXISTS (
        SELECT 1 FROM admin_users 
        WHERE admin_users.user_id = auth.uid()
    ));

-- Contact messages policies
CREATE POLICY "Anyone can create contact messages" 
    ON contact_messages FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "Only admins can view and manage contact messages" 
    ON contact_messages FOR ALL 
    USING (EXISTS (
        SELECT 1 FROM admin_users 
        WHERE admin_users.user_id = auth.uid()
    ));

-- Admin users policies
CREATE POLICY "Only admins can view admin users" 
    ON admin_users FOR SELECT 
    USING (EXISTS (
        SELECT 1 FROM admin_users 
        WHERE admin_users.user_id = auth.uid() 
        AND admin_users.role = 'admin'
    ));

CREATE POLICY "Only admins can manage admin users" 
    ON admin_users FOR ALL 
    USING (EXISTS (
        SELECT 1 FROM admin_users 
        WHERE admin_users.user_id = auth.uid() 
        AND admin_users.role = 'admin'
    )); 