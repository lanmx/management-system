<!--
 * @Author: your name
 * @Date: 2021-11-09 20:56:51
 * @LastEditTime: 2021-11-17 20:29:13
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \lanmxvuets\src\views\home.vue
-->
<template>
  <div class="bg">
    <div>
    </div>
  </div>
  <div class="login">
      <el-row>
        <el-button round @click="goLogin">登录</el-button>
        <el-button round @click="goRegister">注册</el-button>
        <!-- <el-button round @click="goHome">首页</el-button> -->
      </el-row>
    </div>
</template>
<script lang="ts">
import router from "@/router"
import { getLocalStorage } from "@/utils/storage"
import { onMounted } from "vue"

export default({
  name: "Welcome",
  setup() {
    const goLogin = () => {
      router.push({ name: "Login" })
    }
    const goRegister = () => {
      router.push({ name: "Login" })
    }
    const goHome = () => {
      router.push({ name: "Home" })
    }
    onMounted(() => {
      const userInfo = getLocalStorage('userInfo')
      if(userInfo && userInfo.username) {
        goHome();
      } else {
        goLogin();
      }
    })
    return {
      goLogin, goRegister, goHome
    }
  }
})
</script>
<style scoped>
.bg {
  /* background-image: url(../assets/img/img.jpg); */
  background-image: url(../assets/img/image.jpg);
  background-size: cover; /* 调整背景图片的大小以覆盖整个元素 */
  background-repeat: no-repeat; /* 防止图片重复 */
  background-attachment: fixed; /* 固定背景图片 */
  height: 100%; /* 设置元素高度与屏幕高度一样 */
  margin: 0; /* 去除默认的边距 */
  padding: 0; /* 去除默认的内边距 */
  position: relative;
}
.login {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
