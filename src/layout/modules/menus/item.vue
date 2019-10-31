<template>
	<el-menu-item :index="menu.path"
	              class="submenu-title-noDropdown"
	              @click="handleMenusTap(menu)"
	              v-if="!menu.children || menu.children.length === 0">
		<i-icon :type="menu.icon"></i-icon>
		<span v-show="menu.name" slot="title" class="span-menu-name">{{ menu.name }}</span>
	</el-menu-item>
	<el-submenu v-else
	            :index="menu.path || menu.name"
	            :key="index">
		<template slot="title">
			<i-icon :type="menu.icon"></i-icon>
			<span class="span-menu-name">{{ menu.name }}</span>
		</template>
		<template v-for="(rc, k1) in menu.children">
			<el-menu-item v-if="!rc.children || rc.children.length < 1"
			              :index="rc.path"
			              @click="handleMenusTap(rc)"
			              :key="k1">
				<i-icon v-show="rc.icon" :type="rc.icon"></i-icon>
				<span class="span-menu-name" v-show="rc.name">{{ rc.name }}</span>
			</el-menu-item>
			<side-bar-item v-else :key="`${index}-${k1}`" :routers="[rc]"></side-bar-item>
		</template>
	</el-submenu>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import Vue from 'vue';
import Menu from '@/model/global/Menu';

@Component({
	name: 'SideBarItem'
})
export default class SideBarItem extends Vue {
	@Prop({
		type: Object
	})
	public menu: Menu|undefined; // 菜单项
	@Prop({
		type: Number
	})
	public index: number|undefined; // 菜单id
	@Action('addTab') public addTab: any;

	/**
	 * 菜单点击
	 * @param route
	 */
	public handleMenusTap (route: Menu): void {
		this.$router.push({ path: route.path });
		// 添加tab导航菜单
		this.addTab(route);
	}
}
</script>

<style lang="less" scoped>
.menu-icon {
	width: 18px;
	height: 18px;
}

.span-menu-name {
	max-width: 86px;
	margin-left: 4px;
	overflow-x: hidden;
	text-overflow: ellipsis;
	display: inline-block;
}
</style>
