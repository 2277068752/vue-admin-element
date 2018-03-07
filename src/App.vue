<template>
  <div id="app" style="height:100%;">
    <!--default slot-->
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  components: { },
  data () {
    return {}
  },
  computed: {
    ...mapState({
    })
  },
  methods: {}
}
</script>

<style lang="less" rel="stylesheet/less">
#nprogress .spinner {
  display: none;
}

@import "styles/icon.css";
</style>
