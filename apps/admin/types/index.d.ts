interface ReactProps {
  children?: ReactNode
}

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  /**
   * @default "max-w-lg"
   */
  maxWidth?:
    | 'max-w-screen-2xl'
    | 'max-w-screen-xl'
    | 'max-w-screen-lg'
    | 'max-w-screen-md'
    | 'max-w-screen-sm'
    | 'max-w-full'
    | 'max-w-7xl'
    | 'max-w-6xl'
    | 'max-w-5xl'
    | 'max-w-4xl'
    | 'max-w-3xl'
    | 'max-w-2xl'
    | 'max-w-xl'
    | 'max-w-lg'
    | 'max-w-md'
    | 'max-w-sm'
    | 'max-w-xs'
    | string
  description?: ReactNode
  padding?: boolean
  footer?: ReactNode
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
