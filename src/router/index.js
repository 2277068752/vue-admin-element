import Layout from '../views/Layout/Index'

// 路由懒加载
// 区别开发环境和生产环境，只在生产环境上使用 路由懒加载 功能
const _import =
  process.env.NODE_ENV === 'development' ? file => require('@/views/' + file + '.vue').default : file => () => System.import('@/views/' + file + '.vue').then(r => r.default)
export default {
  routes: [
    {
      path: '/',
      name: '默认页面',
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
      }, {
        path: '/upload/excel',
        name: 'excel文件上传解析',
        component: _import('UploadExcel/Index')
      }, {
        path: '/error/404',
        name: '404',
        component: _import('Errors/404_error')
      }, {
        path: '/error/401',
        name: '401',
        component: _import('Errors/401_error')
      }, {
        path: '*',
        name: '404',
        component: _import('Errors/404_error')
      }, {
        path: '/role/list',
        name: '角色管理',
        component: _import('Roles/Index')
      }, {
        path: '/user/list',
        name: '用户管理',
        component: _import('Users/Index')
      }, {
        path: '/menus/list',
        name: '菜单设置',
        component: _import('Menus/Index')
      }, {
        path: '/smscode_config/list',
        name: '短信码',
        component: _import('SmsCode/Index')
      }, {
        path: '/errorcode_orconfig/list',
        name: '错误码',
        component: _import('ErrorCode/Index')
      }]
    }
  ]
}
