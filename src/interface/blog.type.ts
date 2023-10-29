export interface ts_add {
  text: string
  link: string
  parent: string
  label: string
  description: string
  cate: string
  read_count: null | number
  good: null | number
  publish_time: string
  update_time: string
}
export interface ts_edit {
  id: null | number
  text: string
  link: string
  parent: string
  label: string
  description: string
  cate: string
  read_count: null | number
  good: null | number
  publish_time: string
  update_time: string
}
export interface ts_delete {
  id: number
}
export interface ts_search {
  search: string
}
export interface ts_order {
  good: number
  id: number
  read_count: number
  text: string
}