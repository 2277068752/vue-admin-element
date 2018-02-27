<template>
  <div class="slide-bar">
    <scroll-bar>
      <el-menu mode="vertical" :default-active="$route.path" :collapse="isCollapse" background-color="#304156"
               text-color="#bfcbd9" active-text-color="#409EFF">
        <sidebar-item :routes="sidebar.list"></sidebar-item>
      </el-menu>
    </scroll-bar>
  </div>
</template>
<script>
  import ScrollBar from '../../../../components/ScrollBar/Index'
  import SidebarItem from './SideBarItem'
  import {mapGetters} from 'vuex'

  export default {
    components: {ScrollBar, SidebarItem},
    data () {
      return {}
    },
    mounted () {
    },
    computed: {
      ...mapGetters([
        'sidebar'
      ]),
      // 是否展开收起
      isCollapse () {
        return this.sidebar.open === 0
      }
    },
    methods: {}
  }
</script>

<style lang="scss">
  @import "./Index";

  .slide-bar {
    background-color: #fff;
    height: 100%;
    width: 100%;
    .el-menu {
      border: 0;
    }
    span.axon-icon {
      color: rgb(191, 203, 217);
      font-size: 16px;
      margin-right: 4px;
    }
  }
</style>
