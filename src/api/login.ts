import { post } from './http';
import { signUp, login } from '../interface/user.type'
// 注册
export function signup(params: signUp) {
  return post('/users/signup', params);
}

// 登录
export function login(params: login) {
  return post('/users/login', params)
}

