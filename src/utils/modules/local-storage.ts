/**
 * @Author : ChangJun
 * @Date : 2019/2/15
 * @Version : 1.0
 * @Content : 本地缓存 + 加密工具
 */
const cryptoJS = require('crypto-js');
const storage = window.localStorage;
const key = cryptoJS.enc.Utf8.parse('7e^V9FLMatcyX0kA').toString();
const ivVal = cryptoJS.enc.Utf8.parse('kr6V%xV&tQj8kH13').toString();
const config = {
	iv: ivVal,
	mode: cryptoJS.mode.CBC,
	padding: cryptoJS.pad.Pkcs7
};
export default {
	/**
	 * 设置缓存数据
	 * @param name 缓存名称
	 * @param value 需要缓存的数据
	 */
	set (name: string, value: any) {
		if (typeof (value) === 'object') {
			value = JSON.stringify(value);
		} else {
			value = JSON.stringify({ myCacheValue: value });
		}
		// DES加密
		const encValue: string = cryptoJS.TripleDES.encrypt(value.toString(), key, config).toString();
		storage.setItem(name, encValue);
	},
	/**
	 * 取缓存数据
	 * @param name 缓存名称
	 */
	get (name: string) {
		const temp: any = storage.getItem(name);
		if (!temp) {
			return null;
		}
		// DES解密
		let decValue = cryptoJS.TripleDES.decrypt(temp, key, config);
		// 转换为 UTF8 字符串
		decValue = cryptoJS.enc.Utf8.stringify(decValue) || temp;
		let obj: any = { myCacheValue: '' };
		obj = JSON.parse(decValue);
		if (obj.myCacheValue) {
			return obj.myCacheValue;
		}
		return obj;
	},
	/**
	 * 清除缓存数据
	 * @param name 缓存名称
	 */
	clear (name?: string) {
		if (name) {
			storage.removeItem(name);
		} else {
			storage.clear();
		}
	}
};
