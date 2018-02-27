import LocalStorage from './modules/localStorage'
import Validate from './modules/validate'
import Common from './modules/common'

export const utils = { Common, LocalStorage, Validate }

export default {
  install (Vue) {
    Vue.prototype.$utils = utils
    Vue.$utils = utils
  },
  $utils: utils
}
