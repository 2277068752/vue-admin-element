<template>
  <div class="slide-bar">
    <scroll-bar>
      <el-menu mode="vertical" :default-active="$route.path" :collapse="isCollapse" background-color="#304156"
               text-color="#bfcbd9" active-text-color="#409EFF">
        <!--判断menu级别-->
        <template v-for="(item, index) in sidebar.list">
          <!--<router-link v-if="item.children.length === 1 !item.children[0].children"></router-link>-->
        </template>
      </el-menu>
    </scroll-bar>
  </div>
</template>
<script>
  import ScrollBar from '../../../components/ScrollBar/Index'
  import { mapGetters } from 'vuex'

  export default {
    components: {ScrollBar},
    data () {
      return {}
    },
    mounted () {},
    computed: {
      ...mapGetters([
        'sidebar'
      ]),
      // 是否展开收起
      isCollapse () {
        return true
      }
    },
    methods: {}
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .MyContain {
    background-color: #fff;
  }
</style>
