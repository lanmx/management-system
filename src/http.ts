import axios,{ AxiosRequestConfig , AxiosResponse } from "axios";
// { AxiosRequestConfig , AxiosResponse }类型匹配，动画匹配
import { ElLoading } from 'element-plus'
let loading: any
interface options {
  lock: boolean;
  Text: string;
  background: string;
}
const startLoading = () => {
  const options:options = {
    lock: true,
    Text: '加载中',
    background: 'rgba(0,0,0,0.7)'
  }
  loading = ElLoading.service(options)
}
const endLoading = () => {
  loading.close()
}
// 请求拦截
axios.interceptors.request.use((config:AxiosRequestConfig) => {
  // loading
  startLoading();
  return config
})
// 拦截响应
axios.interceptors.response.use((response:AxiosResponse<any>) =>{
  endLoading();
  return response
},error => {
  endLoading();
  return Promise.reject(error)
})
export default axios