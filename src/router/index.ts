/**
 * @Author : ChangJun
 * @Date : 2019/10/21
 * @Version : 1.0
 * @Content :
 */
import Vue from 'vue';
import VueRouter, { Route } from 'vue-router';
import routes from './routes';

Vue.use(VueRouter);
const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});
// vue-router 导航前钩子
router.beforeEach((to: Route, from: Route, next: any) => {
	next();
});
// vue-router 导航后钩子
router.afterEach((to: Route, from: Route) => {
});
export default router;
