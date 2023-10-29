import { get, post } from './http';
import { ts_menu_add, ts_menu_edit, ts_menu_id , ts_menuName } from '../interface/menu.type'
// 菜单列表
export function getMenus() {
  return get('/menu/list');
}

// 新增菜单
export function addMenu(params: ts_menu_add) {
  return post('/menu/add', params);
}

// 编辑菜单
export function editMenu(params: ts_menu_edit) {
  return post('/menu/edit', params);
}

// 删除菜单
export function deleteMenu(params: ts_menu_id) {
  return post('/menu/delete', params);
}

// 搜索菜单
export function searchMenu(params: ts_menuName) {
  return post('/menu/search', params);
}

