<template>
  <div :class="sidebar.open === 1 ? 'layout-page' : 'layout-page hideSidebar'">
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <navbar></navbar>
      <main-view></main-view>
    </div>
  </div>
</template>
<script>
  import { Sidebar, MainView, Navbar } from './Commonents'
  import { mapGetters } from 'vuex'

  export default {
    components: {Sidebar, MainView, Navbar},
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
  .layout-page {
    background-color: #fff;
    height: 100%;
    position: relative;
    .sidebar-container {
      transition: width 0.28s;
      width: 180px;
      position: fixed;
      z-index: 1001;
      left: 0;
      top: 0;
    }
    .main-container {
      width: 100%;
      min-height: 100%;
      margin-left: 180px;
    }
  }
</style>
