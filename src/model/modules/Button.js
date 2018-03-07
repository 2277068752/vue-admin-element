/**
 * Button按钮对象
 */
export default class Button {
  constructor ({type, name, key, icon, callback}) {
    // Object.assign方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）
    Object.assign(this, {type, name, key, icon, callback})
    // this.type = type
    // this.name = name
    // this.key = key
    // this.icon = icon
    // this.callback = callback
  }
}

/**
 * 格式化 button 按钮数据
 * @param {*} list button 集合
 */
export function formatButton (list) {
  let buttonArr = []
  for (let i = 0; i < list.length; i++) {
    let button = new Button({key: list[i]}) // eslint-disable-line
    switch (list[i]) {
      case 'add':
        button.name = '新增'
        button.type = 'warning'
        button.icon = 'el-icon-plus'
        break
      case 'upload':
        button.name = '上传'
        button.type = 'primary'
        button.icon = 'el-icon-upload2'
        break
      case 'download':
        button.name = '下载'
        button.type = 'primary'
        button.icon = 'el-icon-download'
        break
      case 'reload':
        button.name = '刷新'
        button.type = 'primary'
        button.icon = 'el-icon-sort'
        break
      case 'query':
        button.name = '筛选'
        button.type = 'primary'
        button.icon = 'el-icon-search'
        break
    }
    buttonArr.push(button)
  }
  return buttonArr
}
