// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import config from '../config/index'
import store from './vuex/store'
import VueParticles from 'vue-particles'
import 'normalize.css/normalize.css'
// vue-router
import { sync } from 'vuex-router-sync'
import Routers from './router'
import VueRouter from 'vue-router'
// Element UI
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// Plugins
import UtilsPlugin from './utils/index'
import AlertPlugin from './plugs/Alert'
// http
import HttpPlugin from './http/index'
import { Tag } from '../src/model/index'
// mock
import './mock'

// Vue.config 是一个对象，包含Vue的全局配置。可以在启动应用之前修改下列属性。
Vue.config.silent = true // 取消Vue所有的日志和警告
Vue.config.devtools = process.env.NODE_ENV === 'development' // 配置是否允许vue-devtools 检查代码。开发版本默认为 true，开发版本默认为false。生产版本设为 true 可以启用检查
Vue.config.productionTip = false // 设置为false以阻止vue在启动时生成生产提示

// 可以用来进行错误捕捉
Vue.config.errorHandler = function (err, vm, info) {
  console.log(err, vm, info)
} // 指定组件的渲染和观察期间未捕获错误的处理函数。这个处理函数被调用时，可获取错误信息和Vue实例

Vue.use(Element, {
  size: 'medium' // set element-ui default size
})
Vue.use(VueParticles)
Vue.use(VueRouter)
const router = new VueRouter({
  mode: '', // process.env.NODE_ENV === 'production' ? 'history' : '', // history模式
  base: config.build.assetsPublicPath,
  routes: Routers.routes
})
const dispatch = store.dispatch
router.beforeEach((to, from, next) => {
  if (to.path !== '/' && to.path !== '/login' && to.path !== '/error/404' && to.path !== '/error/401') {
    let havePath = false
    // 第一步：判断当前访问的路由是否在roter.js中
    let children = Routers.routes.find(_x => _x.path === '/layout').children // 所有的子栏目都是在 layout框架内部
    if (!children) {
      havePath = false
    }
    if (children.find(_x => _x.path === to.path) || (children.children && children.children.find(_x => _x.path === to.path))) {
      havePath = true
    }
    if (!havePath) {
      next('/error/404')
    } else {
      // let current_path =
      let tag = new Tag({ id: to.path, path: to.path, name: to.name })
      dispatch('add_tagbar', tag)
      // 每次都清空按钮操作缓存
      dispatch('empty_button')
      let limit = store.state.global.sidebar.list
      filterActionBtns(limit, to)
      next()
    }
  } else {
    next()
  }
})
// 取当前路由中的操作按钮权限
let filterActionBtns = (limit, to) => {
  for (let i = 0; i < limit.length; i++) {
    if (!limit[i].children) {
      if (limit[i].action && limit[i].link === to.path) {
        // 将当前路由下的按钮权限塞入vuex
        dispatch('set_button_action', limit[i].action)
      }
    } else {
      filterActionBtns(limit[i].children, to)
    }
  }
}
// 注册一个全局的after的钩子，不会改变导航
router.afterEach((to) => {
})
// 插件
Vue.use(UtilsPlugin)
Vue.use(AlertPlugin)
Vue.use(HttpPlugin)
sync(store, router)
/* eslint-disable no-new */
window.$globalHub = new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#root')
