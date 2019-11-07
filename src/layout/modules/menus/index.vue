<template>
	<div :class="!collapse ? 'layout-menu-wrapper' : 'hide-side-bar'">
		<el-menu mode="vertical"
		         :default-active="routePath"
		         :collapse="collapse"
		         :collapse-transition="false"
		         background-color="#191a23" text-color="#bfcbd9" active-text-color="#409EFF">
			<menu-item v-for="(r, k) in menus" :key="k" :index="k" :menu="r"></menu-item>
		</el-menu>
	</div>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import { Getter } from 'vuex-class';
import Vue from 'vue';
import MenuItem from './item.vue';
import Menu from '@/model/global/Menu';

@Component({
	components: { MenuItem },
	name: 'SideBar'
})
export default class TheMenu extends Vue {
	@Getter('collapse') public collapse!: boolean;
	@Getter('menus') private menus!:Menu[];

	public created () {
	}

	// 当前路径
	get routePath (): string {
		return this.$route.path;
	}
}
</script>

<style lang="less">
.layout-menu-wrapper {
	flex: 0 0 200px;
	width: 200px;
	position: relative;
	overflow: hidden;
	transition: all 0.2s ease-in-out;
}

.hide-side-bar {
	width: 64px;
	position: relative;
	flex: 0 0 64px;
	overflow: hidden;
	transition: all 0.2s ease-in-out;
}
</style>
