/**
 * axios 拦截器
 */
import axios from 'axios'
import { Message, Loading } from 'element-ui'

// 超时时间
axios.defaults.timeout = 5000
// http请求拦截器
let loadinginstance
axios.interceptors.request.use(config => {
  if (config.headers.loading.load) {
    loadinginstance = Loading.service({ fullscreen: true, text: config.headers.loading.loadMsg })
  }
  return config
}, error => {
  loadinginstance.close()
  Message.error({
    message: '加载超时'
  })
  return Promise.reject(error)
})

// http响应拦截器
axios.interceptors.response.use(data => {
  if (data.config.headers.loading.load) {
    loadinginstance.close()
  }
  return data
}, error => {
  Message.error({
    message: '加载超时'
  })
  return Promise.reject(error)
})

export default axios
