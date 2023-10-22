import { StateType, menuTabType } from '@/interface/menu.type';
import { getUserInfo } from '@/api/user';
import { getLocalStorage, setLocalStorage } from "@/utils/storage";
import { ElMessage } from "element-plus";
import axios from "axios";

import { createStore } from 'vuex'

// 创建一个新的 store 实例
const store = createStore({
  state () {
    return {
      token: getLocalStorage('token') || '',
      userInfo: getLocalStorage('userInfo') || '',
      menuTabs: []
    }
  },
  mutations: {
    setToken: (
      state: StateType, 
      token: StateType['token']
      ) => {
      state.token = token;
    },
    setUserInfo: (
      state: StateType, 
      userInfo: StateType['userInfo']
      ) => {
			state.userInfo = userInfo;
		},
		changeMenuTabs: (
      state: StateType, 
      menuTabs: StateType['menuTabs']
      ) => {
			state.menuTabs = menuTabs;
		},
    addMenuTabs: (
      state: StateType, 
      item: menuTabType
      ) => {
      state.menuTabs.push(item);
      console.log(state.menuTabs,"6666")
    }
  },
  actions: {
    // 用户登录成功后处理token和信息
    async setLogin({ commit }, username) {
      try {
        const res = await getUserInfo({ username: username });
        const { status, token, data, message } = res
        if (status === 0) {
          ElMessage.success(message);
          setLocalStorage('token', token);
          commit("setToken", token);
          setLocalStorage('userInfo', {
            username: data
          })
          commit("setUserInfo", { username: data });
          axios.defaults.headers.common['Authorization'] = `Bearer ${res.token}`;
        } else {
          ElMessage.error('登录失败！' + res.message)
        }
        return Promise.resolve(res);
      } catch (error) {
        return Promise.reject(error);
      }
    }
  },
})

export default store