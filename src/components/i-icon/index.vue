<template>
	<i :class="'iconfont icon-' + type + ' '+ className"></i>
</template>

<script>
export default {
  name: 'CIcon',
  props: {
    type: {
      type: String,
      default: ''
    },
    className: {
      type: String,
      default: ''
    }
  }
};
</script>

<style
	lang="less"
	src="./index.less">
</style>
