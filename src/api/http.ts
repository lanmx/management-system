import axios from "axios";
import ENV from "../environment/environment";
import { getLocalStorage, setLocalStorage } from "@/utils/storage";
import router from "@/router";
import { ElMessage } from "element-plus";
axios.defaults.baseURL = ENV.baseUrl;

// get请求
export function get(url: string) {
  axios.defaults.headers.common['Authorization'] = getToken();
  return axios.get(url)
  .then(function (response) {
    // 处理成功情况
    if (response.status === 200 || response.status === 0) {
      const { status } = response.data
      // 身份认证过期或失败
      if (status === 401) {
        setLocalStorage('token', '')
        ElMessage.error('身份信息过期，请重新登录！即将为你跳转登录页...')
        setTimeout(() => {
         router.push({ name: 'Login'})
        }, 2000)
        return response.data || {}
      } else {
        return response.data || {}
      }
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
  axios.defaults.headers.common['Authorization'] = getToken();
  return axios.post(url, params)
  .then(function (response) {
    // 处理成功情况
    if (response.status === 200 || response.status === 0) {
      const { status } = response.data
      // 身份认证过期或失败
      if (status === 401) {
        setLocalStorage('token', '')
        ElMessage.error('身份信息过期，请重新登录！即将为你跳转登录页...')
        setTimeout(() => {
         router.push({ name: 'Login'})
        }, 1500)
        return response.data || {}
      } else {
        return response.data || {}
      }
    }
    
    console.log(response, 'response');
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

export function getToken() {
  return getLocalStorage('token') || '';
}