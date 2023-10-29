<template>
  <div class="page-title">
    <el-tag
      v-for="tag in tabs"
      :key="tag.menu"
      class="mx-1"
      :class="{ 'mx-1-active': tag.menu === currentTab.menu, 'mx-1': true }"
      closable
      color="#ffffff"
      :disable-transitions="false"
      @close="handleClose(tag.menu)"
      @click="openTab(tag)"
    >
      {{ tag.menu }}
    </el-tag>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import eventBus from '@/store/event'
import { getLocalStorage, setLocalStorage } from '@/utils/storage'
import { ElMessage } from 'element-plus';
import router from '@/router';

export default defineComponent({
  name: 'Tab',
  setup() {
    // 当前选中的tab，默认首页
    const currentTab = ref({ menu: '首页', path: 'home'})
    // 打开的tab列表
    const tabs = ref([{ menu: '首页', path: 'home'}])
    const init = () => {
      if (getLocalStorage('tabs')) {
        tabs.value = getLocalStorage('tabs')
      }
      if (getLocalStorage('currentTab')) {
        currentTab.value = getLocalStorage('currentTab');
      }
      // router.push({ path: currentTab.value.path })
      console.log(1111, tabs.value, currentTab.value);
    }
    // 初始化tab
    init();
    const handleClose = (tag: string) => {
      if (tabs.value.length === 1) {
        ElMessage.info('至少保留一个页面标签。')
      } else {
        tabs.value = tabs.value.filter(item => item.menu !== tag);
        const laster = tabs.value[tabs.value.length - 1]
        currentTab.value = laster;
        setLocalStorage('tabs', tabs.value)
        setLocalStorage('currentTab', currentTab.value)
        const path = laster.path;
        router.push({ path: path });
      }
    }
    const openTab = (res: any) => {
      changeTab(res);
    }
    eventBus.on('openPersonalCenter', (res: any) => {
      changeTab(res);
    })
    eventBus.on('openHome', (res: any) => {
      changeTab(res);
    })
    eventBus.on('changeMenuPage', (res: any) => {
      changeTab(res);
    })
    const changeTab = (res: any) => {
      const data = tabs.value.find(item => item.menu === res.menu);
      if (!data) {
        tabs.value.push(res)
      }
      setLocalStorage('tabs', tabs.value)
      setLocalStorage('currentTab', res)
      currentTab.value = res;
      router.push({ path: res.path })
    }
    return {
      tabs,
      handleClose,
      currentTab,
      openTab
    }
  },
})
</script>
<style lang="less">
@active-color: #3694f6;
@default-color: #b5b6b7;
// 面包屑
.page-title {
  height: auto;
  background-color: #ffffff;
  padding: 15px 10px 10px 10px;
  border-bottom: 1px solid #dcdfe6;
}
.mx-1 {
  margin-right: 5px;
  border-width: 0px;
  color: @default-color;
  border-radius: var(--el-tag-border-radius) var(--el-tag-border-radius) 0 0 !important;
  .el-tag__close {
    color: @default-color;
  }
}
.mx-1-active {
  font-weight: bolder;
  color: @active-color;
  background-color: #ffffff !important;
  border-bottom-style: none !important;
  border-radius: var(--el-tag-border-radius) var(--el-tag-border-radius) 0 0 !important;
  box-sizing: border-box !important;
  .el-tag__close {
    color: @active-color;
  }
}
// .el-tag 
</style>
