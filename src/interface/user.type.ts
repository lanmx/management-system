export type ts_signUp = {
  username: string
  email: string
  password: string
} 
export type ts_login = {
  username: string
  password: string
}
export type ts_info = {
  username: string
}
export interface ts_user {
  id: number | null,
  username: string
  email: string
  signature: string
}
export type ts_userId = {
  id: number
}
export type ts_userName = {
  username: string
}