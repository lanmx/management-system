import axios from "axios";
import ENV from "../environment/environment";
axios.defaults.baseURL = ENV.baseUrl;

// get请求
export function get(url: string) {
  return axios.get(url)
  .then(function (response) {
    // 处理成功情况
    if (response.status === 200 || response.status === 0) {
      return response.data || {}
    }
    console.log(response);
  })
  .catch(function (error) {
    // 处理错误情况
    console.log(error);
    return error
  })
  .finally(function () {
    // 总是会执行
  });
}

// post请求
export function post(url: string, params: Object) {
  return axios.post(url, params)
  .then(function (response) {
    // 处理成功情况
    if (response.status === 200 || response.status === 0) {
      return response.data || {}
    }
    console.log(response);
  })
  .catch(function (error) {
    // 处理错误情况
    console.log(error);
    return error
  })
  .finally(function () {
    // 总是会执行
  });
}