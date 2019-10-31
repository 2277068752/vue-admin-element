/**
 * @Author : ChangJun
 * @Date : 2019-10-19
 * @Version : 1.0
 * @Content : 登录用户
 */
export default class User {
	public id!: number;
	public userName!: string;
	public password!: string;
	public state!: number; // 1: 启用 0: 禁用
	public creatTime!: string;
}
