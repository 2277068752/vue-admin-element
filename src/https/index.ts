/**
 * @Author : ChangJun
 * @Date : 2019-10-19
 * @Version : 1.0
 * @Content : 接口请求帮助类
 */
import { VueConstructor } from 'vue';
import xHttp from './x-https';

const Config = require('../config/index.js');

export default {
	install (Vue: VueConstructor): void {
		Vue.prototype.$interfaces = Config.Interfaces;
		if (!Vue.prototype.$api) {
			Vue.prototype.$api = {
				xHttp
			};
		} else {
			Vue.prototype.$api.xHttp = xHttp;
		}
	}
};
