<template>
  <!--region 基于 element UI 封装的alert插件-->
  <div v-show="isShow" class="i-alert-component animated" ref="alert">
    <el-alert
      :title="title"
      :type="type"
      :description="description"
      :center="center"
      show-icon></el-alert>
  </div>
  <!--endregion-->
</template>
<script>
  export default {
    props: {
      show: {
        type: Boolean,
        default: false
      }, // 是否显示
      title: {
        type: String,
        default: '标题'
      }, // 标题
      description: {
        type: String,
        default: ''
      }, // 细节描述
      type: {
        type: String,
        default: 'info'
      }, // 类型：success/warning/info/error
      center: {
        type: Boolean,
        default: false
      } // 是否居中
    },
    components: {},
    data () {
      return {
        isShow: false
      }
    },
    mounted () {
    },
    watch: {
      show (val) {
        if (val) {
          this.$utils.Common.removeClass(this.$refs.alert, 'fadeOutUp')
          this.$utils.Common.addClass(this.$refs.alert, 'fadeInDown')
        } else {
          this.$utils.Common.removeClass(this.$refs.alert, 'fadeInDown')
          this.$utils.Common.addClass(this.$refs.alert, 'fadeOutUp')
        }
        this.isShow = val
      }
    },
    methods: {}
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .i-alert-component {
    z-index: 1000;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
</style>
