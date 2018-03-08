import Vue from 'vue'

export default {
  getList (date, phone, page, limit) {
    return new Promise((resolve) => {
      Vue.$api.xHttp.post('admin/page/list', { date, phone, page, limit }, '', { load: true }).then(res => {
        resolve(res)
      })
    })
  }
}
