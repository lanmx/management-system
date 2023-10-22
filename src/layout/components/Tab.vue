<template>
  <div class="page-title">
    <el-tag
      v-for="tag in menuTabs"
      :key="tag.menu"
      class="mx-1"
      :class="{ 'mx-1-active': tag.menu === currentTab, 'mx-1': true }"
      closable
      :disable-transitions="false"
      @close="handleClose(tag.menu)"
      @click="changTab(tag)"
    >
      {{ tag.menu }}
    </el-tag>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import eventBus from '@/store/event'
import { getLocalStorage } from '@/utils/storage'
import { ElMessage } from 'element-plus';
import router from '@/router';

export default defineComponent({
  name: 'Tab',
  setup() {
    let menuTabs = ref([
      { menu: '首页', path: 'home'}
    ]);
    let currentTab = ref('');
    eventBus.on('changeTabs', (res: any) => {
      const name = getLocalStorage('menuTabs').menu;
      const tabs = menuTabs.value.map(o => o.menu)
      currentTab.value = res;
      if (!tabs.includes(name)) {
        menuTabs.value.push(getLocalStorage('menuTabs'));
      }
      console.log(getLocalStorage('menuTabs'), 'getLocalStorage menuTabs');
      console.log(menuTabs.value, 'menuTabs', currentTab.value);
    })
    const handleClose = (tag: string) => {
      console.log(tag);
      if (menuTabs.value.length === 1) {
        ElMessage.info('至少保留一个页面标签。')
      } else {
        menuTabs.value = menuTabs.value.filter(item => item.menu !== tag);
        const laster = menuTabs.value[menuTabs.value.length - 1]
        currentTab.value = laster.menu;
        const path = laster.path;
        router.push({ path: path });
      }
    }
    const changTab = (obj: any) => {
      currentTab.value = obj.menu;
      router.push({ path: obj.path });
    }
    return {
      menuTabs,
      handleClose,
      currentTab,
      changTab
    }
  },
})
</script>
<style lang="less">
// 面包屑
.page-title {
  height: auto;
  background-color: #ffffff;
  padding-top: 5px;
  border-bottom: 1px solid #dcdfe6;
  padding-bottom: 5px;
}
.mx-1 {
  margin-right: 5px;
  border-radius: var(--el-tag-border-radius) var(--el-tag-border-radius) 0 0 !important
}
.mx-1-active {
  background-color: #ffffff !important;
  border-bottom-style: none !important;
  border-radius: var(--el-tag-border-radius) var(--el-tag-border-radius) 0 0 !important;
  box-sizing: border-box !important;
}
</style>
