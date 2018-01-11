import AlertVue from './Index.vue'
// 基于 element UI 封装的 Alert插件
let $vm
export default {
  install (Vue, options) {
    if (!$vm) {
      const AlertPlugin = Vue.extend(AlertVue)
      $vm = new AlertPlugin({
        el: document.createElement('div')
      })
      document.body.appendChild($vm.$el)
    }
    $vm.show = false
    let alert = {
      /**
       * 显示 alert
       * @param title 标题
       * @param description 细节描述
       * @param type 类型：success/warning/info/error
       * @param center 是否居中
       */
      show (title, description, type = 'info', center = false) {
        $vm.show = true
        $vm.title = title
        $vm.description = description
        $vm.type = type
        $vm.center = center
        this.timeOut = setTimeout(function () {
          $vm.show = false
          clearTimeout(this.timeOut)
        }, 3000)
      },
      /**
       * 隐藏 alert
       */
      hide () {
        $vm.show = false
      }
    }
    if (!Vue.$alert) {
      Vue.$alert = alert
    }
    Vue.mixin({
      created () {
        this.$alert = Vue.$alert
      }
    })
  }
}
