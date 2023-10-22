<template>
  <div class="common-layout">
    <el-container class="h100">
      <el-header>
        <Header></Header>
      </el-header>
      <el-container class="h100">
        <el-aside width="auto">
          <Menu></Menu>
        </el-aside>
        <el-container class="h100">
          <el-main>
            <Tab></Tab>
            <router-view></router-view>
          </el-main>
          <el-footer>
            <Footer></Footer>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Header from './components/Header.vue'
import Menu from './components/Menu.vue'
import Tab from './components/Tab.vue'
import Footer from './components/Footer.vue'

export default defineComponent({
  components: {
    Header,
    Menu,
    Tab,
    Footer
  },
  setup() {
    
  },
})
</script>
<style lang="less">
.common-layout {
  height: 100%;
}
.h100 {
  height: 100%;
}
</style>
