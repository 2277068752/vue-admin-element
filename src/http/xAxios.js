/**
 * axios 拦截器
 */
import axios from 'axios'
import { Message } from 'element-ui'
// 超时时间
axios.defaults.timeout = 5000
// http请求拦截器
axios.interceptors.request.use(config => {
  // loading 加载
  if (config.headers.loading.load) {
    window.$globalHub.$store.commit('UPDATE_BTNLOADINGSTR', {
      str: config.headers.loading.loadMsg,
      id: config.headers.loading.load
    })
  }
  return config
}, error => {
  window.$globalHub.$store.commit('UPDATE_BTNLOADINGSTR', null)
  Message.error({
    message: '加载超时'
  })
  return Promise.reject(error)
})
// http响应拦截器
axios.interceptors.response.use(data => {
  if (data.config.headers.loading.load) {
    setTimeout(() => {
      window.$globalHub.$store.commit('UPDATE_BTNLOADINGSTR', null)
    }, 2000)
  }
  return data
}, error => {
  window.$globalHub.$store.commit('UPDATE_BTNLOADINGSTR', null)
  Message.error({
    message: '加载超时'
  })
  return Promise.reject(error)
})
export default axios
