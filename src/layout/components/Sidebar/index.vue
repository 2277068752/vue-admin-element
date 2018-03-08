<template>
  <div>
    <scroll-bar class="scroll-bar">
      <el-menu mode="vertical" :default-active="$route.path" :collapse="isCollapse"
               background-color="#304156" text-color="#bfcbd9" active-text-color="#409EFF">
        <sidebar-item :routes="routes"></sidebar-item>
      </el-menu>
    </scroll-bar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '../../../components/ScrollBar'

export default {
  components: { SidebarItem, ScrollBar },
  created () {
    console.log('$route.path:', this.$route.path)
  },
  computed: {
    ...mapState([
      'menus'
    ]),
    routes () {
      // 使用poc配置菜单
      return this.menus.sidebar
    },
    isCollapse () {
      return this.menus.open === 1
    }
  }
}
</script>
<style lang="less">
.scroll-bar {
  position: fixed !important;
  top: 0;
  width: 180px !important;
}
</style>
