<template>
	<div :class="!collapse ? 'layout-menu-wrapper' : 'hide-side-bar'">
		<el-menu mode="vertical"
		         :default-active="routePath"
		         :collapse="collapse"
		         :collapse-transition="true"
		         background-color="#191a23" text-color="#bfcbd9" active-text-color="#409EFF">
			<menu-item v-for="(r, k) in menuData" :key="k" :index="k" :menu="r"></menu-item>
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
	private menuData: Menu[] = [
		{
			id: 1,
			icon: 'home',
			name: '首页',
			path: '/home',
			sort: 1,
			status: 0,
			children: []
		},
		{
			id: 3,
			name: '用户管理',
			icon: 'menu',
			path: '/user',
			sort: 3,
			status: 0,
			children: [
				{
					id: 31,
					name: '用户列表',
					icon: '',
					path: '/car/manger',
					sort: 31,
					status: 0
				}
			]
		}
	];

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
	position: relative;
	transition: width 0.28s;
}

.hide-side-bar {
	width: 64px;
	position: relative;
	flex: 0 0 64px;
}
</style>
