<template>
  
</template>
<script lang="ts">
import { getUserInfo } from '@/api/user'
import router from '@/router'
import { getLocalStorage } from '@/utils/storage'
import { ElMessage } from 'element-plus'
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  setup() {
    const info = ref({})
    onMounted(() => {
      getUserinfo();
    })
    const getUserinfo = async () => {
      const userInfo = getLocalStorage('userInfo')
      if (userInfo.username) {
        const res = await getUserInfo({ username: userInfo.username })
        const { data, status } = res
        if (status === 0) {
          info.value = data;  
        }
      } else {
        ElMessage.info('登录过期，请重新登录！')
        setTimeout(() => {
          router.push({ name: 'Login' })
        }, 1500);
      }
    }
  },
})
</script>
