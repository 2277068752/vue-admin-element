/* eslint-disable no-undef */
import NotFind from '../pages/errors/404.vue'
// 生产/测试环境，使用路由懒加载
const _import = process.env.NODE_ENV === 'development'
  ? file => require(`@/pages/${file}.vue`).default
  : file => () => System.import(`@/pages/${file}.vue`).then(m => m.default)
export default [
  { path: '/', component: _import('login/Index') },
  { path: '/login', component: _import('login/Index') },
  {
    path: '/main',
    component: resolve => require(['../layout/Layout'], resolve),
    children: [
      {
        path: '/404',
        name: '404',
        component: NotFind
      }, {
        path: '/dashboard',
        name: '首页',
        component: _import('dashboard/Index')
      }, {
        path: '/table/list',
        name: '表格',
        component: _import('table/Index')
      }, {
        path: '/icons',
        name: '图标',
        component: _import('icons/Index')
      }, {
        path: '/role/list',
        name: '角色管理',
        component: _import('roles/Index')
      }, {
        path: '/user/list',
        name: '用户管理',
        component: _import('users/Index')
      }, {
        path: '/menus/list',
        name: '菜单设置',
        component: _import('menus/Index')
      }, {
        path: '/smsCode/list',
        name: '短信码',
        component: _import('smsCode/Index')
      }, {
        path: '/errorCode/list',
        name: '错误码',
        component: _import('errorCode/Index')
      }, {
        path: '/404',
        name: '404',
        component: NotFind
      }, {
        path: '/401',
        name: '401',
        component: _import('errors/401')
      }
    ]
  }
]
