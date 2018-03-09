<template>
  <div class="menu-wrapper">
    <template v-for="(item, index) in routes">
      <router-link v-if="!item.children" :to="item.link" :key="index">
        <el-menu-item :index="item.link"
                      :class="{'submenu-title-noDropdown':!isNest}">
          <i class="axon-icon" v-html="item.icon"></i>
          <span v-if="item.name" slot="title">{{ item.name }}</span>
        </el-menu-item>
      </router-link>
      <el-submenu v-else :index="item.name || item.link" :key="index">
        <template slot="title">
          <i class="axon-icon" v-html="item.icon"></i>
          <span>{{ item.name }}</span>
        </template>
        <template v-for="(child, childIndex) in item.children">
          <router-link v-if="!child.children" :to="child.link" :key="index + '-' + childIndex">
            <el-menu-item :index="child.link">
              <span v-if="item.name">{{ child.name }}</span>
            </el-menu-item>
          </router-link>
          <sidebar-item v-else :is-nest="true" class="nest-menu" :routes="[child]"
                        :key="index + '-' + childIndex"></sidebar-item>
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
      type: Array
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toPath (link) {
      this.$router.push({ path: link })
    }
  }
}
</script>
<style lang="scss">
.menu-wrapper {
  .axon-icon {
    padding-right: 10px;
    font-size: 16px;
  }
  .el-tooltip {
    padding: 0 10px !important;
  }
}
</style>
