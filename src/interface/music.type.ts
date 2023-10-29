export interface ts_add {
  songname: string
  songlink: string
  author: string
  lyric: string
  cover: string
}
export interface ts_edit {
  id: null | number
  songname: string
  songlink: string
  author: string
  lyric: string
  cover: string
}
export interface ts_delete {
  id: number
}
export interface ts_search {
  search: string
}