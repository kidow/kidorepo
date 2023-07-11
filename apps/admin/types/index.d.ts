interface ReactProps {
  children?: ReactNode
}

interface Database {
  public: {
    Tables: {
      posts: {
        Row: {
          id: string
          created_at: string
          title: string
          description: string
          content: object
          tags: string[]
          cover_url: string
          updated_at: string | null
          is_published: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          title?: string
          description?: string
          content?: object
          tags?: string[]
          cover_url?: string
          updated_at?: string | null
          is_published?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          description?: string
          content?: object
          tags?: string[]
          cover_url?: string
          updated_at?: string | null
          is_published?: boolean
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
