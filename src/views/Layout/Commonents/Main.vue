<template>
  <div class="main">
    <section class="main-app" style="min-height: 100%;">
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
    methods: {}
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .MyContain {
    background-color: #fff;
  }
</style>
