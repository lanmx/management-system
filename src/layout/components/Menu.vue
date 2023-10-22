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
        v-for="item in menuData"
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
      <el-menu-item index="setting">
        <el-icon><setting /></el-icon>
        <template #title>设置</template>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, getCurrentInstance } from 'vue';
import { Sunrise, User, Key, Setting } from '@element-plus/icons';
import store from '@/store';
import router from '@/router';
import eventBus from '@/store/event';
import { setLocalStorage } from '@/utils/storage';

export default defineComponent({
	name: "Menu",
  components: {
    Sunrise, User, Key, Setting
  },
  setup(props, context) {
    const menus = [
      { menu: '用户列表', path: 'user' },
      { menu: '权限分配', path: 'permiss' },
      { menu: '角色管理', path: 'role' },
      { menu: '菜单列表', path: 'menu' },
      { menu: '设置', path: 'setting' }
    ]
    const menuData = ref([
      { menu: '用户管理', icon: 'user', children: [
        { menu: '用户列表', path: 'user' },
      ]},
      { menu: '权限管理', icon: 'key', children: [
        { menu: '权限分配', path: 'permiss' },
        { menu: '角色管理', path: 'role' },
      ]},
      { menu: '菜单管理', icon: 'setting', children: [
        { menu: '菜单列表', path: 'menu' }
      ]},
      // { menu: '设置', icon: 'setting', path: 'setting' }
    ]);
    const currentTab = ref('')
    localStorage.setItem('Menu', JSON.stringify(menuData));
    const menuOpen = (key:any,keyPath:any) => {
      console.log(key,keyPath);
    }
    const menuClose = (key:any,keyPath:any) => {
      console.log(key,keyPath);
    }
    const isCollapse = ref<boolean>(false)
    const menuFlod = () => {
      isCollapse.value = !isCollapse.value
    }
    eventBus.on('passCollapse', (res: any) => {
      isCollapse.value = res as boolean;
    })
    const openPage = (item:any) => {
      const target = menus.find(o => o.path === item)
      currentTab.value = target?.menu || '';
      setLocalStorage('menuTabs', target);
      eventBus.emit('changeTabs', currentTab.value);
    }
    return {
      menuData,
      openPage,
      menuOpen,
      menuClose,
      menuFlod,
      isCollapse,
      currentTab
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
