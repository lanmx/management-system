<template>
  <!-- 左侧菜单栏 -->
  <div class="side-menu" :class="{ 'side-menu-close': isCollapse }">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#132035"
      text-color="#ffffff"
      :collapse="isCollapse"
      @open="menuOpen"
      @close="menuClose"
      :router="true"
      @select="openPage"
    >

      <!-- 菜单 -->
      <el-sub-menu 
        v-for="item in menuTree"
        :key="item.menu" :index="item.menu"
        >
        <template #title>
          <el-icon size="28" color="#ffffff">
            <component :is="item.icon" />
          </el-icon>
          <span>{{ item.menu }}</span>
        </template>
        <el-menu-item 
          v-for="menu in item.children"
          :key="menu.path" :index="menu.path"
          >{{ menu.menu }}
        </el-menu-item>
      </el-sub-menu>
      <el-menu-item index="setting" @click="goSetting">
        <el-icon><setting /></el-icon>
        <template #title>设置</template>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, getCurrentInstance } from 'vue';
import { Sunrise, User, Key, Setting, Folder, Star } from '@element-plus/icons';
import store from '@/store';
import router from '@/router';
import eventBus from '@/store/event';
import { getLocalStorage, setLocalStorage } from '@/utils/storage';
import { getMenus } from '@/api/menu';
import { flatToTree } from '@/utils/utils'

export default defineComponent({
	name: "Menu",
  components: {
    Sunrise, User, Key, Setting, Folder, Star
  },
  setup(props, context) {
    const menus = ref([])
    const menuTree = ref([]);
    const getMenusList = async () => {
      const res = await getMenus();
      const { status, data } = res;
      if (status === 0 && data) {
        menus.value = data;
        menuTree.value = flatToTree(data);
        // localStorage.setItem('menus', JSON.stringify(data));
      }
    }
    getMenusList();
    const menuOpen = (key:any,keyPath:any) => {
      // console.log(key,keyPath);
    }
    const menuClose = (key:any,keyPath:any) => {
      // console.log(key,keyPath);
    }
    const isCollapse = ref<boolean>(false)
    const menuFlod = () => {
      isCollapse.value = !isCollapse.value
    }
    eventBus.on('passCollapse', (res: any) => {
      isCollapse.value = res as boolean;
    })
    const openPage = (item:any) => {
      const target = menus.value.find((o: any) => o.path === item)
      if (target) {
        setLocalStorage('currentTab', target);
        eventBus.emit('changeMenuPage', target)
      }
    }
    const goSetting = () => {
      const setting = { menu: '设置', path: 'setting' }
      setLocalStorage('currentTab', setting);
      eventBus.emit('changeMenuPage', setting)
    }
    return {
      menuTree,
      openPage,
      menuOpen,
      menuClose,
      menuFlod,
      isCollapse,
      getMenusList,
      goSetting
    }
  },
})
</script>
<style lang="less">

.el-menu-item.is-active {
  background-color: dodgerblue;
  color:#ffffff;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}
.el-icon-arrow-down {
  font-size: 12px;
}

//侧菜单栏高度和背景颜色
ul.el-menu.el-menu-vertical-demo {
  height: 100%;
} 
.side-menu {
  height: 100%;
  width: 200px;
}
.side-menu /deep/ ul.el-menu.el-menu--collapse.el-menu-vertical-demo {
  height: 100%;
}
/deep/.el-sub-menu .el-menu {
  background-color: #4b576b;
}
.side-menu-close {
  width: auto !important;
}
      
</style>
