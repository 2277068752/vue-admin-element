import Vue from 'vue';
import 'babel-polyfill';
// @ts-ignore
import App from './App.vue';
// @ts-ignore
import router from './router';
import store from './store';
import {sync} from 'vuex-router-sync';
import UtilsPlugin from '@/utils/index';
import HttpPlugin from '@/https/index';
import elementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// @ts-ignore
import IIcon from '@/components/i-icon/index.vue';

Vue.component('i-icon', IIcon);
Vue.config.productionTip = true;
if (process.env.VUE_APP_CURRENTMODE === 'development') {
  Vue.use(elementUI, {size: 'small'});
}
Vue.use(UtilsPlugin);
Vue.use(HttpPlugin);
sync(store, router);
window.$globalHub = new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
