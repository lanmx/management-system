<template>
  <div class="outer">
    <div class="item">
      <div class="label">邮箱：</div>
      <div class="value">{{ email }}</div>
    </div>
    <div class="item">
      <div class="label">昵称：</div>
      <div class="value">{{ username }}</div>
    </div>
    <div class="item">
      <div class="label">个性签名：</div>
      <div class="value">{{ signature }}</div>
    </div>
  </div>
</template>
<script lang="ts">
import { getUserInfo } from '@/api/user'
import router from '@/router'
import { getLocalStorage } from '@/utils/storage'
import { ElMessage } from 'element-plus'
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  setup() {
    const email = ref('')
    const username = ref('')
    const signature = ref('')
    const getUserinfo = async () => {
      const userInfo = getLocalStorage('userInfo')
      if (userInfo.username) {
        const res = await getUserInfo({ username: userInfo.username })
        const { data, status } = res
        if (status === 0) {
          email.value = data.email;  
          username.value = data.username;  
          signature.value = data.signature;  
        }
      } else {
        ElMessage.info('登录过期，请重新登录！')
        setTimeout(() => {
          router.push({ name: 'Login' })
        }, 1500);
      }
    }
    getUserinfo();
    return {
      email, username, signature
    }
  },
})
</script>

<style lang="less" scoped>
</style>
