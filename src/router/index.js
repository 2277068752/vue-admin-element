import Layout from '../views/Layout/Index'

// 路由懒加载
// 区别开发环境和生产环境，只在生产环境上使用 路由懒加载 功能
const _import =
  process.env.NODE_ENV === 'development' ? file => require('@/views/' + file + '.vue').default : file => () => System.import('@/views/' + file + '.vue').then(r => r.default)
export default {
  routes: [
    {
      path: '/',
      name: '登录',
      component: _import('Login/Index')
    },
    {
      path: '/login',
      name: '登录',
      component: _import('Login/Index')
    },
    {
      path: '/layout',
      name: '框架',
      component: Layout,
      redirect: '/dashboard',
      children: [{
        path: '/dashboard',
        name: '首页',
        component: _import('Dashboard/Index')
      }, {
        path: '/icons',
        name: '图标',
        component: _import('Icons/Index')
      }, {
        path: '/table/list',
        name: '表格',
        component: _import('Table/Index')
      }]
    }
  ]
}
