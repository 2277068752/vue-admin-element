// BLL基类
// 构造方法 constructor 中的 vm 在子类中必须调用，否则新建实例时会报错
export default class Base {
  constructor (vm) {
    this.vm = vm
  }
}
