<template>
  <div :class="sidebar.open === 1 ? 'layout-page' : 'layout-page hideSidebar'">
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <navbar></navbar>
      <tagbar></tagbar>
      <main-view></main-view>
    </div>
  </div>
</template>
<script>
  import { Sidebar, MainView, Navbar, Tagbar } from './Commonents'
  import { mapGetters } from 'vuex'

  export default {
    components: {Sidebar, MainView, Navbar, Tagbar},
    data () {
      return {}
    },
    mounted () {
    },
    computed: {
      ...mapGetters([
        'sidebar'
      ])
    },
    methods: {}
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "../../assets/styles/variable";

  .layout-page {
    background-color: #fff;
    height: 100%;
    position: relative;
    .sidebar-container {
      transition: width 0.28s;
      width: @side-bar-width;
      position: fixed;
      z-index: 1001;
      left: 0;
      top: 0;
    }
    .main-container {
      width: 100%;
      min-height: 100%;
      padding-left: @side-bar-width;
    }
  }
</style>
