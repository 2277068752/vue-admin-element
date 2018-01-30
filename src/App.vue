<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    components: {},
    data () {
      return {}
    },
    created () {},
    mounted () {
      console.log('%c 深情不如久伴，真爱无需多言 ', 'background-image:-webkit-gradient( linear, left top, right top, color-stop(0, #f22), color-stop(0.15, #f2f), color-stop(0.3, #22f), color-stop(0.45, #2ff), color-stop(0.6, #2f2),color-stop(0.75, #2f2), color-stop(0.9, #ff2), color-stop(1, #f22) );color:transparent;-webkit-background-clip: text;font-size:22px;')
    },
    computed: {},
    methods: {}
  }
</script>

<style lang="scss">
  @import "./assets/styles/_common";
  @import "./assets/styles/_variable";
</style>
