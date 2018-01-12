<template>
  <div class="nav-bar">
    <el-menu mode="horizontal">
      <!--region 菜单栏 展开/收起-->
      <div class="show-hide-sidebar-container" @click="showHideSideBar()">
        <span :class="sidebar.open === 1 ? 'axon-icon show' : 'axon-icon hide'" v-html="'&#xe61f;'"></span>
      </div>
      <!--endregion-->
    </el-menu>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'

  export default {
    components: {},
    data () {
      return {}
    },
    mounted () {},
    computed: {
      ...mapGetters([
        'sidebar'
      ])
    },
    methods: {
      // 侧边栏折叠
      showHideSideBar () {
        let temp = this.sidebar.open === 0
        this.$store.dispatch('set_sidebar_toggle', temp)
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .nav-bar {
    @height: 50px;
    height: @height;
    line-height: @height;
    padding: 0 12px;
    .show-hide-sidebar-container {
      display: inline-block;
      .axon-icon {
        display: inline-block;
        &.hide{
          transform-origin: 50% 50%;
          transform: rotate(90deg);
          transition: 0.38s;
        }
        &.show{
          transform-origin: 50% 50%;
          transition: 0.38s;
        }
      }
    }
  }
</style>
