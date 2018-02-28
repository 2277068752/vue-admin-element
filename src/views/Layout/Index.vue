<template>
  <div :class="sidebar.open === 1 ? 'layout-page' : 'layout-page hideSidebar'">
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <navbar></navbar>
      <tagbar></tagbar>
      <div class="clearfix"></div>
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

<style lang="scss" scoped>
  @import "../../assets/styles/variable";

  .layout-page {
    background-color: #fff;
    height: 100%;
    position: relative;
    .sidebar-container {
      transition: width 0.28s;
      width: $side-bar-width;
      height: 100%;
      position: fixed;
      z-index: 1001;
      left: 0;
      bottom: 0;
      top: 0;
    }
    .main-container {
      min-height: 100%;
      margin-left: $side-bar-width;
      transition: margin-left 0.28s;
    }
  }
</style>
