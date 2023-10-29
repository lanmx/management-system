import { get, post } from './http';
import { ts_add, ts_delete, ts_edit, ts_search } from '../interface/music.type'
// 音乐列表
export function getMusic() {
  return get('/music/list');
}

// 新增音乐
export function addMusic(params: ts_add) {
  return post('/music/add', params);
}

// 编辑音乐
export function editMusic(params: ts_edit) {
  return post('/music/edit', params);
}

// 删除音乐
export function deleteMusic(params: ts_delete) {
  return post('/music/delete', params);
}

// 搜索音乐
export function searchMusic(params: ts_search) {
  return post('/music/search', params);
}

