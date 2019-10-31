<!--
* @Author : ChangJun
* @Date :  2019-10-18
* @Version : 1.0
* @Content : 首页
-->
<template>
  <div class="home-page content">
    <template v-for="i in 200">
      <p :key="i">首页+ {{ i }}</p>
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import iTable from '@/components/i-table/index.vue';

@Component({
	components: {
		iTable
	}
})
export default class Home extends Vue {
}
</script>

<style lang="less">
.home-page {
}
</style>
