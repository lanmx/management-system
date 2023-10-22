import { get, post } from './http';
import { info } from '../interface/user.type'
// 获取个人信息
export function getUserInfo(params: info) {
  return post('/users/info', params);
}

