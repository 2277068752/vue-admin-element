/**
 * @Author : ChangJun
 * @Date : 2019/10/18
 * @Version : 1.0
 * @Content : 路由文件
 */
const Import = (file: string) => (resolve: any) => require([`@/views/${file}.vue`], resolve); // (file: string) => import(`@/views/${ file }.vue`);
export default [
  {
    name: '默认',
    path: '/',
    redirect: '/login'
  },
  {
    name: '登录',
    path: '/login',
    component: Import('login/index')
  },
  {
    path: '/main',
    component: (resolve: any) => require(['../layout/index'], resolve),
    children: [
      {
        name: '首页',
        path: '/home',
        component: Import('home/index')
      },
      {
        name: '用户列表',
        path: '/user/list',
        component: Import('user/index')
      }
    ]
  }
];
