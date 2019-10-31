/**
 * @Author : ChangJun
 * @Date : 2019-10-21
 * @Version : 1.0
 * @Content : 菜单栏
 */
export default class Menu {
	public id!: number;
	public name!: string;
	public path!: string;
	public icon!: string;
	public sort!: number;
	public status!: number;
	public children?: Menu[];
}
