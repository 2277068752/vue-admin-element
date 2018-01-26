import Mock from 'mockjs'

let list = []
const count = 879

for (let i = 0; i < count; i++) {
  list.push(Mock.mock({
    id: '@increment',
    author: Mock.Random.cname(),
    address: Mock.mock('@county(true)'),
    createDate: +Mock.Random.date('T'),
    email: Mock.mock('@EMAIL()'),
    'phone|1': /^1[0-9]{10}$/,
    'count|100-10000': 1,
    'state|0-2': 1,
    title: '@title(5, 10)',
    summary: '@cparagraph'
  }))
}
export default {
  /**
   * 取列表数据
   * @param date
   * @param phone
   * @param page
   * @param limit
   * @returns {Promise<any>}
   */
  getList (option) {
    let param = JSON.parse(option.body)
    let mockList = list
    if (param.date && param.date.length > 0) {
      mockList = list.filter(_x => _x.createDate === param.date)
    }
    if (param.phone) {
      mockList = list.filter(_x => _x.phone === param.phone)
    }
    let pageList = mockList.filter((item, index) => index < param.limit * param.page && index >= param.limit * (param.page - 1))
    return {total: list.length, items: pageList}
  }
}
