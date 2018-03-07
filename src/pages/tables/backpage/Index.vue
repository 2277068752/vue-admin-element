<template>
  <div class="container">
    111
  </div>
</template>

<script>
import BLL from './Index'

export default {
  components: {
  },
  data () {
    return {}
  },
  computed: {},
  created () {
    // 初始化
    this.BLL = new BLL(this)
  },
  beforeDestroy () {},
  mounted () {},
  methods: {}
}
</script>

<style lang="less" scoped>
</style>
