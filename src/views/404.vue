<!--
 * @Author: your name
 * @Date: 2021-11-09 21:22:35
 * @LastEditTime: 2021-11-17 21:39:54
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \lanmxvuets\src\views\404.vue
-->
<template>
<div class="notfind">
  <img src="../../public/404.jpeg" alt="">
  <div class="tohome">
    <el-row>
      <el-button round @click="goHome">返回首页</el-button>
      <el-button round @click="backPage">返回上一页</el-button>
    </el-row>
  </div>
</div>
</template>
<script lang="ts">
import router from "@/router"
export default({
  name: "404",
  setup() {
    const backPage = () => {
      router.go(-1);
    }
    const goHome = () => {
      router.replace('/home')
    }
    return { backPage, goHome }
  }
})
</script>
<style scoped>
.notfind img {
  width: 100%;
  height: 100vh;
  /* background-image: url(../../public/404.jpeg); */
  overflow: hidden;
  position: absolute;
}
.tohome {
  position: relative;
  padding: 60vh 0 0 72vh;
}
</style>