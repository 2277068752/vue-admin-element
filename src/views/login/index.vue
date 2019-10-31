<!--
* @Author : ChangJun
* @Date :  2019/10/21
* @Version : 1.0
* @Content : 登录
-->
<template>
	<div class="login-page">
		<el-form :model="loginForm" label-width="80px" class="" label-position="top">
			<el-form-item label="登录名：">
				<el-input v-model="loginForm.userName"></el-input>
			</el-form-item>
			<el-form-item label="密码：">
				<el-input v-model="loginForm.password"></el-input>
			</el-form-item>
			<el-form-item class="button-wrap">
				<el-button type="primary" @click="handleLogin">登录</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

interface LoginFrom {
	userName: string;
	password: string;
}

@Component({})
export default class Index extends Vue {
	public loginForm: LoginFrom = {
		userName: '',
		password: ''
	};  // 登录用户

	/**
	 *
	 */
	public async handleLogin (): Promise<void> {
	}
}

</script>

<style lang="less">
.login-page {
	height: 100%;
	display: flex;
	flex-direction: column;
	background-color: #eee;
	align-items: center;
	justify-content: center;
	.el-form {
		width: 480px;
		background-color: #ffffff;
		padding: 12px 24px;
		border-radius: 4px;
		.button-wrap {
			text-align: right;
		}
	}
}
</style>
