import ListApi from './list'
import Mock from 'mockjs'

Mock.mock(/\/page\/list/, (options) => {
  return ListApi.getList(options)
})
export default Mock
