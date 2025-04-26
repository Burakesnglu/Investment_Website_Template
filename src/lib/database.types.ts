export interface Database {
  public: {
    Tables: {
      admin_users: {
        Row: {
          id: string;
          user_id: string;
          email: string;
          role: 'admin' | 'editor';
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          email: string;
          role?: 'admin' | 'editor';
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          email?: string;
          role?: 'admin' | 'editor';
          created_at?: string;
        };
      };
      documents: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          file_url: string;
          file_type: string;
          file_size: number;
          category: string;
          created_at: string;
          updated_at: string;
          is_public: boolean;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          file_url: string;
          file_type: string;
          file_size: number;
          category: string;
          created_at?: string;
          updated_at?: string;
          is_public?: boolean;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          file_url?: string;
          file_type?: string;
          file_size?: number;
          category?: string;
          created_at?: string;
          updated_at?: string;
          is_public?: boolean;
        };
      };
      contact_messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          subject: string;
          message: string;
          created_at: string;
          status: 'new' | 'read' | 'replied' | 'archived';
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone?: string | null;
          subject: string;
          message: string;
          created_at?: string;
          status?: 'new' | 'read' | 'replied' | 'archived';
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string | null;
          subject?: string;
          message?: string;
          created_at?: string;
          status?: 'new' | 'read' | 'replied' | 'archived';
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
} 