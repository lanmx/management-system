<!--
 * @Author: your name
 * @Date: 2021-11-10 20:43:48
 * @LastEditTime: 2021-11-17 19:58:29
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \lanmxvuets\src\components\login.vue
-->
<template>
  <div class="login">
   <!-- 登录 -->
     <el-form
    ref="loginForm"
    :model="loginUser"
    :rules="rules"
    label-width="120px"
  >
    <el-form-item label="昵称" prop="username">
      <el-input type="username" v-model="loginUser.username" placeholder="请输入昵称" :prefix-icon="Message"></el-input>
    </el-form-item>

    <el-form-item label="密码" prop="password" v-if="resetModel">
      <el-input type="password" v-model="loginUser.password" placeholder="请输入密码" :prefix-icon="Lock">></el-input>
    </el-form-item>

    <el-form-item label="验证码" v-if="codeModel">
      <el-input type="number" placeholder="Enter validatedcode..." :prefix-icon="Key">></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm()" v-if="resetModel">登录</el-button>
      <el-button type="primary" @click="sendEmail()" v-if="!resetModel">发送</el-button
      >
      <el-button @click="resetForm()" v-if="resetModel">重置</el-button>
    </el-form-item>
    <div class="login-tip">
      <p v-if="resetModel">忘记密码？<a @click="findpassword">立刻找回</a></p>
      <p v-if="!resetModel"><a @click="findpassword" >返回登录</a></p>
      <!-- <p><a @click="loginBack">返回登录</a></p> -->
    </div>
  </el-form>
</div>
</template>
<script lang="ts">
import { setLocalStorage, getLocalStorage } from "@/utils/storage"
import {  ref } from "vue"
import { Message,Lock,Key } from '@element-plus/icons'
import { loginUser } from "@/utils/rule"
import { login } from '../api/login'
import { ElMessage } from "element-plus"
import router from "@/router"
import axios from "axios"

export default ({
  props: {
    loginUser: {
      type: Object,
      required: true
    },
    rules: {
      type: Object,
      required: true
    }
  },
  setup() {
    let loginForm = ref<any>(null)
    // 登录
    const submitForm = () => {
      // 表单的值校验,通过则ture,否则false
      loginForm.value.validate((valid:boolean) => {
        if(valid) {
          console.log(loginUser.username,"----");
          console.log(loginUser.password,"----");
          // 格式校验
          console.log("login");
          const params = {
            username: loginUser.username,
            password: loginUser.password
          }
          
          login(params).then(res => {
            console.log(res);
            if (res.status === 0) {
              ElMessage.success('登录成功！');
              setLocalStorage('token', res.token);
              setLocalStorage('userInfo', {
                username: res.data
              })
              axios.defaults.headers.common['Authorization'] = `Bearer ${res.token}`;
              router.push({ name: 'Home', params: { username: res.data }})
            } else {
              ElMessage.error('登录失败！请检查网络。' + res.message)
            }
             
          })
        } else {
          return false
        }
      }) 
    }
    // 重置
    const resetForm = () => {
      loginForm.value.resetFields()
    }
    // 找回密码
    const resetModel = ref<boolean>(true)
    const findpassword = () => {
      resetModel.value = !resetModel.value
      codeModel.value = false
      // router.push({ name: 'ResetPassword' })
    }
    // 发送邮箱
    const codeModel = ref<boolean>(false)
    const sendEmail = () => {
      codeModel.value = !codeModel.value
      // router.push({ name: 'Login'})
    }
    return { submitForm, resetForm, loginForm, findpassword, resetModel, sendEmail, codeModel, Message, Lock, Key }
  }
})
</script>
<style scoped>
.login {
  background-color:white;
  margin: 20px;
  padding: 40px 40px 20px 10px;
  border-radius: 8px;
  box-shadow: 0 4px 10px #ccc;
}
.login-tip {
  display: flex;
  justify-content: flex-end;
  font-size: 14px;
  color: #3c474e;
}
.login-tip p a {
  color: #2da0f2;
  cursor: pointer;
}
</style>