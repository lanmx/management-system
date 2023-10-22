<template>
  <!-- 头部 -->
  <div class="page-header">
    <el-row justifys="space-between">
      <el-col :span="18">
        <el-space nowrap size="medium">
          <div class="menu-logo">
            <!-- logo -->
            <div class="logo-icon-visible">
              <el-icon size="24"><sunrise /></el-icon>
            </div>
            <div class="logo-pic">
              <div :class="{ 'logo-isvisible': isCollapse }">
                <img src="@/assets/img/logo.png" alt="">
              </div>
            </div>
          </div>
          <el-icon size="28" color="#ffffff"
            style="cursor: pointer" @click="menuFlod" >
            <component :is="isCollapse ? 'fold' : 'expand'" />
          </el-icon>
          <span> {{ nowTime }} </span>
        </el-space>
      </el-col>
      <el-col :span="6" align="right">
        <el-space nowrap size="medium">
          <el-icon size="20" color="#5995fd"><refresh-right /></el-icon>
          <el-icon size="20" color="#5995fd"><full-screen /></el-icon>
          <el-icon size="20" color="indianred"><message /></el-icon>
          <el-dropdown>
            <span class="el-dropdown-link">
              <el-avatar 
                class="avatar-icon" 
                :style="{ background: bgColor }"
              > {{ username }} </el-avatar>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="goInfo">个人中心</el-dropdown-item>
                <el-dropdown-item @click="goLogin">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-space>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, getCurrentInstance } from 'vue';
import { fixInt } from '@/utils/format';
import { Router, useRoute } from 'vue-router';
import axios, { Axios } from 'axios';
import router from '@/router';
import { getLocalStorage, setLocalStorage } from '@/utils/storage';
import eventBus from '@/store/event';

export default defineComponent({
	name: "Header",
  setup(props, context) {
      // 时间
      let nowTime = ref('')
      const getNowTime = () => {
      let newDate = new Date()
      let weekday = new Array(7)
      weekday[0] = '星期日'
      weekday[1] = '星期一'
      weekday[2] = '星期二'
      weekday[3] = '星期三'
      weekday[4] = '星期四'
      weekday[5] = '星期五'
      weekday[6] = '星期六'
      let year = newDate.getFullYear()
      let month = fixInt(newDate.getMonth() + 1, 2)
      let date = fixInt(newDate.getDate(), 2)
      let day = weekday[newDate.getDay()]
      let hour = fixInt(newDate.getHours(), 2)
      let minutes = fixInt(newDate.getMinutes(), 2)
      let seconds = fixInt(newDate.getSeconds(), 2)
      nowTime.value = year + '/' + month + '/' + date + ' ' + day + ' ' + hour + ':' + minutes + ':' + seconds
    }
    setInterval(getNowTime, 1000)
    const bgColor = ref('')
    const bgColorArr = ref([
      'orangered','skyblue','lightseagreen','indianred','cornflowerblue','dodgerblue','slateblue'
    ])
    const changeAvatarColor = () => {
      let number = (Math.floor(Math.random() * 6 + 1) + 0);
      bgColor.value = bgColorArr.value[number]
    }
    // 退出登录
    const goLogin = () => {
      setLocalStorage('token', '');
      setLocalStorage('userInfo', {});
      axios.defaults.headers.common['Authorization'] = ''
      router.push({ name: 'Login'})
    }

    const goInfo = () => {
      router.replace('/user')
    }
    const username = ref('');
    // 个人中心
    const info = () => {
      const userinfo = getLocalStorage('userInfo')
      console.log(userinfo);
      if (userinfo) {
        username.value = userinfo.username
      } else {
        const route = useRoute();
        username.value = route.params.username as string
      }
      console.log(username.value);

    }
    const instance = getCurrentInstance();
    const isCollapse = ref<boolean>(false)
    const menuFlod = () => {
      isCollapse.value = !isCollapse.value;
      eventBus.emit('passCollapse', isCollapse.value)
    }
    onMounted(() => {
      getNowTime()
      info();
    })
    return {
      isCollapse,
      menuFlod,
      username,
      info,
      goInfo,
      changeAvatarColor,
      getNowTime,
      goLogin,
      bgColor,
      bgColorArr,
      nowTime
    }
  },
})
</script>
<style lang="less">
.logo-pic img {
  width: 160px;
  height: 48px;
  position: relative;
  animation: logoDisplay 0.7s ease-in-out;
}
// 展开logo-icon
.logo-icon-visible {
  display: none;
}
@keyframes logoDisplay
{
	0%   { opacity:0; display: none; }
	100%  { opacity:1; display: inline; }
}
// 固定logo的高度
.menu-logo {
  height: 40px;
}
.logo-isvisible {
  display: none;
}
.el-header {
  background-color: #132035;
}
.page-header {
  height: 40px;
  line-height: 34px;
  padding: 10px 0px 10px 6px;
  color: #ffffff;
  
  .avatar-icon {
    margin: 0 10px;
    background-color: red;
    animation: avatarColor 8s infinite;
    transition-duration: 2s;
  }
}
@keyframes avatarColor
{
	0%   { background-color: #5995fd; }
	20%  { background-color: orangered; }
  40%  { background-color: rebeccapurple; }
  60%  { background-color: skyblue; }
  80%  { background-color: lightseagreen; }
  85%  { background-color: indianred; }
  90%  { background-color: cornflowerblue; }
  95%  { background-color: dodgerblue; }
  100% { background-color: slateblue; }
}
</style>
