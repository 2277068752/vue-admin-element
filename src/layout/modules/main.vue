<!--
* @Author : ChangJun
* @Date :  2019-10-21
* @Version : 1.0
* @Content :
-->
<template>
	<div class="main-wrapper">
		<router-view :key="$route.path"></router-view>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({})
export default class TheMain extends Vue {
	public mounted () {
		console.log('main:');
	}
}
</script>

<style lang="less" scoped>
.main-wrapper {
	flex: 1;
	background-color: #ffffff;
	overflow: auto;
	box-sizing: border-box;
	height: 100%;
	padding: 16px;
}
</style>
