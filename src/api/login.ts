import { post } from './http';
import { ts_signUp, ts_login } from '../interface/user.type'
// 注册
export function signup(params: ts_signUp) {
  return post('/users/signup', params);
}

// 登录
export function login(params: ts_login) {
  return post('/users/login', params)
}

