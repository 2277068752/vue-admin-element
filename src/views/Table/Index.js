import { List } from '../../api/index'
import Base from '../../base'

export default class extends Base {
  getList () {
    List.getList(this.vm.filter.date, this.vm.filter.phone, this.vm.page, this.vm.limit).then(res => {
      this.vm.total = res.total
      this.vm.list = res.items
    })
  }
}
