import { ts_add, ts_delete, ts_edit, ts_search } from '@/interface/blog.type';
import { get, post } from './http';
// 文章列表
export function getBlogs() {
  return get('/blog/list');
}
// 新增文章
export function addBlog(params: ts_add) {
  return post('/blog/add', params);
}
// 编辑文章
export function editBlog(params: ts_edit) {
  return post('/blog/edit', params);
}
// 删除文章
export function deleteBlog(params: ts_delete) {
  return post('/blog/delete', params);
}
// 搜索文章
export function searchBlog(params: ts_search) {
  return post('/blog/search', params);
}


