<template>
  <div class="main">
    <section class="main-app" :style="{height:height}">
      <transition name="fade" mode="out-in">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </section>
  </div>
</template>
<script>
  export default {
    components: {},
    data () {
      return {}
    },
    mounted () {},
    computed: {
      height () {
        return this.$utils.Common.getWidthHeight().height - 88 + 'px'
      }
    },
    methods: {}
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../assets/styles/mixins";

  .main {
    height: 100%;
    .scrollBar()
  }
</style>
