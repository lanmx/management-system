import { get, post } from './http';
// 文章阅读量图
export function getArticleStatistics(params = {}) {
  return post('/statistics/read', params);
}


