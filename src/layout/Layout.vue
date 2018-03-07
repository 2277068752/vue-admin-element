<template>
  <div class="app-wrapper" :class="{hideSidebar:menus.open === 1}">
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container" :class="{'no-tags':!tagsView.show}">
      <navbar></navbar>
      <tags-view v-if="tagsView.show"></tags-view>
      <app-main></app-main>
    </div>
  </div>
</template>

<script type="">
import {Navbar, Sidebar, AppMain, TagsView} from './components'
import {mapState} from 'vuex'

export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView
  },
  computed: {
    ...mapState([
      'tagsView', 'menus'
    ]),
    tagbar () {
      return this.tagsView.tagbar
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../styles/mixin.scss";

  .app-wrapper {
    position: relative;
    height: 100%;
    .main-container {
      height: 100%;
    }
  }
</style>
