import Base from '../../base'

export default class extends Base {
  /**
   * 用户登录
   */
  login () {
    if (!this.vm.loginForm.phone) {
      this.vm.$message.warning('请填写登录账号！')
      return false
    }
    if (!this.vm.$utils.Validate.chkFormat(this.vm.loginForm.phone, 'phone')) {
      this.vm.$message.warning('登录手机号的格式不正确！')
      return false
    }
    if (!this.vm.loginForm.password) {
      this.vm.$message.warning('请填写登录密码！')
      return false
    }
    if (this.vm.loginForm.phone !== '17714331167' || this.vm.loginForm.password !== '123456') {
      this.vm.$message.warning('账号或密码不匹配！')
      return false
    }
    this.vm.loading = true
    // 取用户的平台权限信息，并且持久化
    this.vm.$store.dispatch('init_sidebar_data', this.vm.menus)
    // 登录成功
    this.vm.$notify.success({
      title: '登录成功',
      message: '欢迎小主回来！'
    })
    this.vm.$router.push({path: '/dashboard'})
  }
}
