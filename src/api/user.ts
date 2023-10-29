import { get, post } from './http';
import { ts_info, ts_user, ts_userId, ts_userName } from '../interface/user.type'
// 获取个人信息
export function getUserInfo(params: ts_info) {
  return post('/users/info', params);
}

// 用户列表
export function getUserList() {
  return get('/users/list');
}

// 更新用户信息
export function userUpdate(params: ts_user) {
  return post('/users/update', params);
}

// 删除用户
export function userDelete(params: ts_userId) {
  return post('/users/delete', params);
}

// 搜索用户
export function userSearch(params: ts_userName) {
  return post('/users/search', params);
}

