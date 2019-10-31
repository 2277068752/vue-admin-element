/**
 * @Author : ChangJun
 * @Date : 2019/10/21
 * @Version : 1.0
 * @Content : 架构配置文件
 */

const CompressionWebpackPlugin = require('compression-webpack-plugin');
const project_config = require('./src/config');
const ENV = process.env.VUE_APP_CURRENTMODE;
// 需要gzip压缩的文件后缀
const productionGzipExtensions = ['js', 'css'];
const cdn = {
  css: ['//unpkg.com/element-ui/lib/theme-chalk/index.css'],
  js: [
    '//cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.min.js',
    '//cdn.jsdelivr.net/npm/vuex@3.1.1/dist/vuex.min.js',
    '//cdn.jsdelivr.net/npm/vue-router@3.0.6/dist/vue-router.min.js',
    '//unpkg.com/element-ui/lib/index.js',
    '//cdn.jsdelivr.net/npm/moment@2.24.0/moment.min.js'
  ]
};
// proxy接口代理对象
let proxyObj = {};
project_config.Proxy.dev.forEach(v => {
  proxyObj[v] = {
    target: project_config.Proxy.domain[v][ENV],
    changeOrigin: true,
    secure: false,
    pathRewrite: {
      [`^/${ v }`]: ''
    }
  };
});
module.exports = {
  assetsDir: 'static',
  chainWebpack: config => {
    if (ENV !== 'development') {
      config.plugin('html')
        .tap(args => {
          args[0].cdn = cdn;
          return args;
        });
    }
  },
  productionSourceMap: false,
  configureWebpack: config => {
    if (ENV !== 'development') {
      config.externals = {
        'vue': 'Vue',
        'vuex': 'Vuex',
        'vue-router': 'VueRouter',
        'element-ui': 'ELEMENT',
        'moment': 'moment'
      };
    }
    config.plugins.push(
      new CompressionWebpackPlugin({
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 1024 * 30, // 30K
        minRatio: 0.8,
        exclude: /node_modules/
      })
    );
  },
  css: {},
  // webPack-dev-server的所有选项
  devServer: {
    host: '',
    port: '',
    https: false,
    open: true, // 自动启动浏览器
    proxy: proxyObj,
    before: app => {
    }
  }
};
