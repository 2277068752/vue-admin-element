/* eslint-disable no-undef */
import NotFind from '../components/404.vue'
// 生产/测试环境，使用路由懒加载
const view = process.env.NODE_ENV === 'development'
  ? file => require(`@/pages/${file}.vue`).default
  : file => () => System.import(`@/pages/${file}.vue`).then(m => m.default)
export default [
  { path: '/', component: view('login/Index') },
  { path: '/login', component: view('login/Index') },
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
        component: view('dashboard/DashBoard')
      }, {
        path: '/table/list',
        name: '表格',
        component: view('Table/Index')
      }
    ]
  }
]
