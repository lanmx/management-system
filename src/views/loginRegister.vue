<template>
<div class="container" :class="{ 'sign-up-mode': signUpMode }">
  <div class="forms-container">
      <div class="signin-signup">
        <!-- 登录 -->
        <Login 
          :loginUser="loginUser" 
          :rules="rules" 
          v-if="!signUpMode" 
          class="show">
        </Login>
        <!-- 注册 -->
        <Register 
          :registerUser="registerUser" 
          :registerrules="registerrules" 
          @changePage="changePage"
          v-if="signUpMode" 
          class="show">
        </Register>
      </div>
  </div>

  <!-- 动画切换 -->
  <div class="panels-container">
    <div class="panels">
      <div class="content">
        <div class="content-text">
          <p>曾经沧海难为水，除却巫山不是云</p>
          <p>取次花丛懒回顾，半缘修道半缘君。</p>
          <p>望门投止思张俭，忍死须臾待杜根</p>
          <p>我自横刀向天笑，去留肝胆两昆仑</p>
          <div class="content-btn">
              <el-button round @click="signUpMode = !signUpMode" v-if="signUpMode">登录</el-button>
              <el-button round @click="signUpMode = !signUpMode" v-if="!signUpMode">注册</el-button>
              <el-button round @click="goHome">首页</el-button>
          </div>
        </div>
        <div class="content-img">
          <img src="@/assets/img/panel.png" alt="">
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script lang="ts">
import { ref } from "@vue/reactivity"
import Login from "@/components/login.vue"
import Register from "@/components/register.vue"
import { loginUser,rules,registerUser,registerrules } from "@/utils/rule"
// import { getCurrentInstance } from "@vue/runtime-core"
import router from "@/router"
import { onMounted } from "vue"
import { getLocalStorage } from "@/utils/storage"

export default({
  name: "loginRegister",
  components: { Login, Register },
  setup() {
    // @ts-ignore
    // const { ctx } = getCurrentInstance()
    // ctx拿到的就是当前实例,$ref可，但是获取路由和store会有问题
    // 不要用getCurrentInstance()获取组件实例完成一些主要功能，否则项目打包后，一定会报错
    // 登录注册隐藏 
    const signUpMode = ref<boolean>(false)
    const goHome = () => {
      router.push({ name: 'Welcome' })
    }
    const changePage = () => {
      signUpMode.value = false
    }
    onMounted(() => {
      const userInfo = getLocalStorage('userInfo');
      if (userInfo && userInfo.username) {
        router.push({ name: 'Home'});
      }
    })
    return {
      signUpMode, // 登录注册隐藏
      loginUser, //登录数据
      rules, //登录表单校验
      registerUser, //注册数据
      registerrules, // 注册表单校验
      goHome,
      changePage
    } 
  }
})
</script>
<style lang="less" scoped>
.container {
  position: relative;
  width: 100%;
  // background-color: #fff;
  height: 100vh;
  overflow: hidden;

  // 1.表单
  .forms-container {
    position: absolute;
    width: 100%;
    height: 100%;
    /* transform: translate(-50%,-50%); */
    /* transition: 1s 0.7s ease-in-out;
    display: grid;
    z-index: 1; */

    .signin-signup {
      position: absolute;
      width: 40%;
      left: 50%;
      top: 20%;
      animation: myloginsleft 1s ease-in;
    }
  }

  // 2.画板
  .panels-container {
    position: absolute;
    background-color: #5995fd;
    height: 200%;
    width: 100%;
    transform: translate(-50%,-50%);
    border-radius: 0 0 100% 100%;
    transition: all 0.5s 0.7s;
    animation: mypanelsleft 1s ease-in;

    .panels {
      position: relative;
      height: 100vh;
      width: 50%;
      left: 0;
      transform:translate(100%,100%);
      animation: mycontentleft 1s ease-in;
    }
    .content {
      position: absolute;
      width: 50%;
      left: 10%;
      top: 10%;

      .content-text {
        font-size: 18px;
        letter-spacing: 2px;
        line-height: 36px;
      }
      .content-btn{
        margin: 20px 0 0 80px;
      }
      .content-img img {
        margin: 5% 50%;
        width: 80%;
      }
    }
  }
}
// 隐藏显示样式
.sign-up-mode {
  .panels-container {
    position: absolute;
    background-color: #4cebbd;
    height: 200%;
    width: 100%;
    left: 100%;
    transform: translate(-50%,-50%);
    border-radius: 0 0 100% 100%;
    transition: all 0.5s 0.7s;
    animation: mypanels 1s ease-in;

    .panels {
      position: relative;
      height: 100vh;
      width: 50%;
      left: -50%;
      animation: mycontent 1s ease-in;
    }
  }
  .forms-container {
    .signin-signup {
      position: absolute;
      width: 40%;
      top: 15%;
      left: 10%;
      animation: mylogins 1s ease-in;
    }
  }
}
  
// 动画
@keyframes mypanels
{
	0%   { left:0px; background-color: #5995fd; }
	100% { left:100%; background-color: #4cebbd; }
}
@keyframes mypanelsleft
{
	0%   { left:100%; background-color: #4cebbd; }
  100% { left:0px; background-color: #5995fd;}
}
@keyframes mylogins
{
	0%   { left:50%; }
	100% { left:10%; }
}
@keyframes myloginsleft
{
	0%   { left:10%; }
	100% { left:50%; }
}
@keyframes mycontent
{
  0%   { left:0px; }
	100% { left:-50%; }
}
@keyframes mycontentleft
{
  0%   { left:-50%; }
	100% { left:0; }
}
@keyframes loginForm
{
  0%   { opacity: 0; }
	100% { opacity: 1; }
}
@keyframes loginFormleft
{
  0%   { opacity: 1; }
	100% { opacity: 0; }
}
// 为v-if添加动画效果
.show {
  animation: loginForm 1.5s ease-in-out;
}
</style>