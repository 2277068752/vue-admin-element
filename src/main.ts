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
store.dispatch('setMenus', [
  {
    id: 1,
    icon: 'home',
    name: '首页',
    path: '/home',
    sort: 1,
    status: 0,
    children: []
  },
  {
    id: 3,
    name: '用户管理',
    icon: 'menu',
    path: '',
    sort: 3,
    status: 0,
    children: [
      {
        id: 31,
        name: '用户列表',
        icon: '',
        path: '/user/list',
        sort: 31,
        status: 0
      }
    ]
  }
]);
Vue.use(UtilsPlugin);
Vue.use(HttpPlugin);
sync(store, router);
window.$globalHub = new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
