<template>
  <div class="slide-bar-item">
    <!--判断menu级别-->
    <template v-for="(item, index) in routes">
      <el-menu-item v-if="!item.children" :index="item.link" :class="{'submenu-title-noDropdown':!isNest}"
                    @click="sideBarPath(item)">
        <template slot="title">
          <span class="axon-icon" v-html="item.icon"></span>
          <span>{{ item.name }}</span>
        </template>
      </el-menu-item>
      <el-submenu v-else :index="item.name ||item.link" :key="item.name">
        <template slot="title">
          <span class="axon-icon" v-html="item.icon"></span>
          <span>{{ item.name }}</span>
        </template>

        <template v-for="(child, childIndex) in item.children">
          <el-menu-item :index="child.link" v-if="!child.children" @click="sideBarPath(child)">
            <template slot="title">
              <span>{{ child.name }}</span>
            </template>
          </el-menu-item>
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
    mounted () {},
    computed: {},
    methods: {
      // 路由跳转
      sideBarPath (item) {
        this.$router.push({path: item.link})
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .slide-bar-item {
    background-color: #fff;
    height: 100%;
    width: 100%;
    .el-menu {
      border: 0;
      span.axon-icon {
        color: rgb(191, 203, 217);
        font-size: 16px;
        margin-right: 16px;
      }
    }
  }
</style>
