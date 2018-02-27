<template>
  <div class="slide-bar-item">
    <!--判断menu级别-->
    <template v-for="(item, index) in routes">
      <router-link v-if="!item.children" :to="item.link" :key="item.name">
        <el-menu-item :index="item.link" :class="{'submenu-title-noDropdown':!isNest}">
          <span class="axon-icon" v-html="item.icon"></span>
          <span v-if="item.name">{{ item.name }}</span>
        </el-menu-item>
      </router-link>
      <el-submenu v-else :index="item.name ||item.link" :key="item.name">
        <template slot="title">
          <span class="axon-icon" v-html="item.icon"></span>
          <span>{{ item.name }}</span>
        </template>
        <template v-for="(child, childIndex) in item.children">
          <router-link :to="child.link" :key="child.name" v-if="!child.children">
            <el-menu-item :index="child.link">
              <span v-if="item.name">{{ child.name }}</span>
            </el-menu-item>
          </router-link>
          <sidebar-item v-else :is-nest="true" class="nest-menu" :routes="[child]" :key="child.link"></sidebar-item>
        </template>
      </el-submenu>
    </template>
  </div>
</template>
<script>
  export default {
    name: 'SidebarItem',
    props: {
      routes: {
        type: Array,
        default: []
      },
      isNest: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {}
    },
    mounted () {
    },
    computed: {},
    methods: {
      // 路由跳转
      sideBarPath (item) {
        this.$router.push({path: item.link})
      }
    }
  }
</script>

<style lang="scss">
  @import "../../../../assets/styles/_variable.scss";
  @import "../../../../assets/styles/_font.scss";

  .slide-bar-item {
    height: 100%;
    width: 100%;
    .el-menu {
      border: 0;
      .el-menu-item {
        background-color: $bg-active-color !important;
      }
      .nest-menu {
        .el-submenu__title {
          background-color: $bg-active-color !important;
        }
        .el-menu-item {
          background-color: $bg-active-color !important;
        }
      }
      span.axon-icon {
        color: $font-color;
        font-size: $font-size-xl;
        margin-right: 4px;
      }
    }
  }
</style>
