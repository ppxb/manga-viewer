declare global {
  const __APP_INFO__: {
    lastBuildTime: string
  }

  interface MangaInfo {
    author: string
    title: string
    category: string
    tags: string[]
    logo: string
    episodes: MangaEpisode[]
    next_publish_at: string
    icon: string
    name: string
    path: string
    url: string
    outline: string
    caption: string
  }

  interface MangaEpisode {
    page_url: string
    list_image_url: string
    publish_start: string
    sort_volume: number
    status: string
    title: strin
    volume: string
  }
}

export { }
