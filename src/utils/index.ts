/**
 * @Author : ChangJun
 * @Date : 2019/10/21
 * @Version : 1.0
 * @Content :
 */
import LocalStorage from './modules/local-storage';
import Common from './modules/common';
import { VueConstructor } from 'vue';
import moment from 'moment';

export default {
	install (Vue: VueConstructor): void {
		if (!Vue.prototype.$utils) {
			Vue.prototype.$utils = {
				Moment: moment,
				LocalStorage,
				Common
			};
		} else {
			Vue.prototype.$api.$utils = {
				Moment: moment,
				LocalStorage,
				Common
			};
		}
	}
};
