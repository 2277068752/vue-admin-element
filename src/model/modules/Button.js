/**
 * Button按钮对象
 */
export default class Button {
  constructor ({ type, name, key, icon, callback }) {
    this.type = type
    this.name = name
    this.key = key
    this.icon = icon
    this.callback = callback
  }
}
