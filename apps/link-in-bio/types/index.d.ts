interface ReactProps {
  children?: ReactNode
}

interface WidgetProps extends ReactProps {
  icon: ReactNode
  title: string
  size?: Argument
  description?: string
  button?: ReactNode
  className?: Argument
}

interface Track {
  track: {
    album: {
      images: Array<{ url: string }>
    }
    artists: Array<{
      name: string
    }>
    name: string
    preview_url: string
    duration_ms: number
  }
}

interface NotionItem {
  id: string
  created_time: string
  cover: { external: { url: string } }
  properties: {
    제목: {
      title: Array<{ plain_text: string }>
    }
    태그: {
      multi_select: Array<{ name: string }>
    }
    설명: {
      rich_text: Array<{ plain_text: string }>
    }
    배포: {
      checkbox: boolean
    }
    생성일: {
      created_time: string
    }
    수정일: {
      last_edited_time: string
    }
  }
}

interface NotionList {
  object: 'list'
  results: NotionItem[]
  next_cursor?: string
}

interface NotionContent {}
