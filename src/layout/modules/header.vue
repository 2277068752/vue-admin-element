<!--
* @Author : ChangJun
* @Date :  2019/10/21
* @Version : 1.0
* @Content :
-->
<template>
	<div class="layout-header">
		<i-icon :type="!collapse ? 'side-close' : 'side-open'"
		        className="header-icon"
		        @click.native="handleCollapse()"></i-icon>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

@Component({})
export default class TheHeader extends Vue {
	@Getter('collapse') public collapse!: boolean;
	@Action('setCollapse')
	private setCollapse: any;

	public handleCollapse (): void {
		this.setCollapse();
	}
}
</script>

<style lang="less">
.layout-header {
	height: 64px;
	width: 100%;
	background-color: #ffffff;
	box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
	transition: all .2s ease-in-out;
	flex: 0 0 64px;
	padding: 0 12px;
	box-sizing: border-box;
	.header-icon {
		color: #333333;
		font-size: 22px;
		line-height: 64px;
		cursor: pointer;
	}
}
</style>
