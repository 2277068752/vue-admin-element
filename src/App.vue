<template>
	<div id="app">
		<router-view :key="$route.path"></router-view>
	</div>
</template>
<style lang="less">
@import "./assets/styles/global/common";
@import "./assets/styles/global/custom";
</style>
