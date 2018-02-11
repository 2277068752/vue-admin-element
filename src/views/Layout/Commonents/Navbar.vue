<template>
  <div class="nav-bar">
    <el-menu mode="horizontal">
      <!--region 菜单栏 展开/收起-->
      <div class="show-hide-sidebar-container" @click="showHideSideBar()">
        <span :class="sidebar.open === 1 ? 'axon-icon show' : 'axon-icon hide'" v-html="'&#xe61f;'"></span>
      </div>
      <!--endregion-->
      <!--region 面包屑-->
      <el-breadcrumb separator="/" class="breadcrumb-container">
        <template v-for="(item, index) in levelList">
          <el-breadcrumb-item :key="item.path">
            <span v-if="index !== 0">{{ item.name }}</span>
            <router-link v-else :to="item.path">{{ item.name }}</router-link>
          </el-breadcrumb-item>
        </template>
      </el-breadcrumb>
      <!--endregion-->
      <!--region 用户信息-->
      <div class="userInfo-container">
        <el-dropdown trigger="click">
          <div class="el-dropdown-img">
            <img src="../../../assets/images/user.gif" />
            <i class="el-icon-caret-bottom"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <span>我的信息</span>
            </el-dropdown-item>
            <el-dropdown-item>
              <span @click="loginOut()">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <!--endregion-->
    </el-menu>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

const layout = 'layout'
const dashboard = 'dashboard'
export default {
  components: {},
  data () {
    return {
      levelList: [] // 面包屑导航的数据
    }
  },
  mounted () {
    this.getlevelData()
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ])
  },
  watch: {
    $route () {
      this.getlevelData()
    }
  },
  methods: {
    // 侧边栏折叠
    showHideSideBar () {
      let temp = this.sidebar.open === 0
      this.$store.dispatch('set_sidebar_toggle', temp)
    },
    getlevelData () {
      let matched = this.$route.matched.filter(_x => _x.path !== `/${layout}` && _x.path !== `/${dashboard}`)
      this.levelList = [{ path: `/${dashboard}`, name: '首页' }].concat(matched)
    },
    // 退出登录
    loginOut () {
      this.$confirm('将要退出当前账号，是否继续？', '提示', {
        confirmButtonText: '退出登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.commit('service_init')
        this.$router.push({ path: '/login' })
      })
    }
  }
}
</script>

<style lang="scss">
@import "../../../assets/styles/_font";

.nav-bar {
  $height: 50px;
  height: $height;
  line-height: $height;
  padding: 0 12px;
  .show-hide-sidebar-container {
    display: inline-block;
    .axon-icon {
      display: inline-block;
      font-size: $font-size-xxl;
      &.hide {
        transform-origin: 50% 50%;
        transform: rotate(90deg);
        transition: 0.38s;
      }
      &.show {
        transform-origin: 50% 50%;
        transition: 0.38s;
      }
    }
  }
  .breadcrumb-container {
    display: inline-block;
    font-size: 14px;
    margin-left: 10px;
    .el-breadcrumb__item {
      .el-breadcrumb__inner {
        font-weight: 400 !important;
        color: #97a8be !important;
        a {
          font-weight: 400 !important;
        }
      }
    }
  }
  .userInfo-container {
    height: $height;
    float: right;
    right: 0;
    .el-dropdown {
      .el-dropdown-img {
        height: $height;
        img {
          vertical-align: middle;
          border-radius: 6px;
          width: 40px;
        }
      }
    }
  }
}
</style>
