<!--
 * @Author: your name
 * @Date: 2021-11-10 22:31:41
 * @LastEditTime: 2021-11-17 17:39:09
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \lanmxvuets\src\components\register.vue
-->
<template>
<div class="register">
  <el-form
    ref="registerForm"
    :model="registerUser"
    :rules="registerrules"
    label-width="120px"
  >
    <el-form-item label="昵称" prop="name">
      <el-input type="name" v-model="registerUser.name" placeholder="请输入昵称" :prefix-icon="User"></el-input>
    </el-form-item>

    <el-form-item label="邮箱" prop="email">
      <el-input type="email" v-model="registerUser.email" placeholder="请输入邮箱" :prefix-icon="Message"></el-input>
    </el-form-item>

    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="registerUser.password" placeholder="请输入密码" :prefix-icon="Lock"></el-input>
    </el-form-item>

    <el-form-item label="确认密码" prop="checkpassword">
      <el-input type="password" v-model="registerUser.checkpassword" placeholder="请再次输入密码" :prefix-icon="Lock"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm()">注册</el-button
      >
      <el-button @click="resetForm()">重置</el-button>
    </el-form-item>
  </el-form>
</div>
</template>
<script lang="ts">
import { defineEmits, defineComponent, ref } from "vue"
import { User,Message,Lock } from '@element-plus/icons'
import { registerUser } from "@/utils/rule"
import { ElMessage } from 'element-plus'
import { signup } from '../api/login'

// defineComponent告诉有哪些属性
export default defineComponent ({
  props: {
    registerUser: {
      type: Object,
      required: true
    },
    registerrules: {
      type: Object,
      required: true
    }
  },
  setup() {
    const emit = defineEmits(['changePage']);

    // console.log(emit);
    
    let registerForm = ref<any>(null)
    const submitForm = () => {
      console.log(registerForm.value);
      registerForm.value.validate((valid:boolean) => {
        console.log(valid);
        if (valid) {
          const { name, email, password, checkpassword } = registerUser
          if (checkpassword !== password) {
            return ElMessage.info('密码不一致，请重新输入！')
          }
          const params = {
            username: name,
            email: email,
            password: password
          }
          console.log("注册接口", params);
          signup(params).then(res => {
            if (res.status === 0) {
              ElMessage.success('注册成功！即将为你跳到登录页。')
              setTimeout(() => {
                console.log(111);
                emit("changePage", true)
              }, 2000)
            } else {
              ElMessage.error('注册失败！' + res.message)
            }
            console.log(res);
          }).catch(err => {
            console.log(err);
          })
        } else {
          return false
        }
      })
    }
    const resetForm = () => {
      registerForm.value.resetFields()
    }
    return { registerForm, submitForm, resetForm, User, Message, Lock }
  },
  methods: {
  },
})
</script>
<style lang="less" scoped>
.register {
  background-color:white;
  margin: 20px;
  padding: 40px 40px 20px 10px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px #ccc;
}
.register .el-button--primary {
    --el-button-font-color: #ffffff;
    --el-button-background-color: #49dda5;
    --el-button-border-color: #49dda5;
    --el-button-hover-color: #6cf5c7;
    --el-button-active-font-color: #e6e6e6;
    --el-button-active-background-color: hsl(158, 56%, 49%);
    --el-button-active-border-color: #37c590;
}
</style>