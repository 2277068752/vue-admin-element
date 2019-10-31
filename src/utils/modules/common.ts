/**
 * @Author : ChangJun
 * @Date : 2019/2/18
 * @Version : 1.0
 * @Content : 常用方法工具类
 */
const Base64 = require('js-base64').Base64;
export default {
	/**
	 * 取宽高
	 */
	// 取宽高
	getWidthHeight () {
		const w = window;
		const d = document;
		const e = d.documentElement;
		const g = d.getElementsByTagName('body')[0];
		const x = w.innerWidth || e.clientWidth || g.clientWidth;
		const y = w.innerHeight || e.clientHeight || g.clientHeight;
		return { width: x, height: y };
	},
	/**
	 * 手机号码脱敏
	 * @param phone 手机号
	 */
	hidePhone (phone: string) {
		if (!phone) {
			return '';
		}
		phone = phone.toString();
		if (phone.length !== 11) {
			return phone;
		}
		return phone.substring(0, 3) + '*****' + phone.substring(8);
	},
	/**
	 * 取url参数
	 * @param name 参数名称
	 * @param url url地址
	 */
	getParam (name: string, url?: string) {
		if (!url) {
			url = window.location.href;
		}
		name = name.replace(/[\[\]]/g, '\\$&');
		const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
		const results = regex.exec(url);
		if (!results) {
			return null;
		}
		if (!results[2]) {
			return '';
		}
		return decodeURIComponent(results[2].replace(/\+/g, ' '));
	},
	/**
	 * 数字转大写
	 * @param n 数字处理
	 */
	numberToChinese (n: string) {
		if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n)) {
			return '';
		}
		let unit: string = '京亿万仟佰拾兆万仟佰拾亿仟佰拾万仟佰拾元角分';
		let str: string = '';
		n += '00';
		const p = n.indexOf('.');
		if (p >= 0) {
			n = n.substring(0, p) + n.substr(p + 1, 2);
			unit = unit.substr(unit.length - n.length);
			for (let i = 0; i < n.length; i++) {
				str += '零壹贰叁肆伍陆柒捌玖'.charAt(Number(n.charAt(i))) + unit.charAt(i);
			}
			return str.replace(/零(仟|佰|拾|角)/g, '零').replace(/(零)+/g, '零').replace(/零(兆|万|亿|元)/g, '$1').replace(/(兆|亿)万/g, '$1').replace(/(京|兆)亿/g, '$1').replace(/(京)兆/g, '$1').replace(/(京|兆|亿|仟|佰|拾)(万?)(.)仟/g, '$1$2零$3仟').replace(/^元零?|零分/g, '').replace(/(元|角)$/g, '$1整');
		}
	},
	/**
	 * base64加密
	 * @param val
	 */
	base64Encode (val: string): string {
		if (val) {
			return Base64.encode(val);
		}
		return '';
	},
	/**
	 * base64解密
	 * @param enVal
	 */
	base64Decode (enVal: string): string {
		if (enVal) {
			return Base64.decode(enVal);
		}
		return '';
	},
	/**
	 * 深度拷贝
	 * @param obj
	 */
	deepCopy (obj: any) {
		return JSON.parse(JSON.stringify(obj));
	},
	/**
	 * 从Url中解析参数
	 * @param url 当前UrL地址
	 */
	getParams (url: string) {
		const paramObj: any = {};
		if (url.indexOf('?') !== -1) {
			const keyValueArr = url.split('?')[1].split('&');
			keyValueArr.forEach((item: string) => {
				const keyValue = item.split('=');
				paramObj[keyValue[0]] = keyValue[1];
			});
		}
		return paramObj;
	}
};
