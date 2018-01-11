let Regexs = {
  code: (/^\d{6}$/), // 验证码
  number: (/^\d*$/), // 全数字
  chinaName: (/^[\u4E00-\u9FA5]{2,6}$/), // 中文姓名
  phone: (/^1[3|4|5|7|8][0-9]\d{8}$/), // 通用手机号
  chinaMobile: (/^1(3[4-9]|4[7]|5[0-27-9]|7[08]|8[2-478])\d{8}$/), // 中国移动
  chinaUnion: (/^1(3[0-2]|4[5]|5[256]|7[016]|8[56])\d{8}$/), // 中国联通
  chinaTelcom: (/^1(3[34]|53|7[07]|8[019])\d{8}$/) // 中国电信
}

export default {
  chkFormat (str, ftype) {
    if (!str) {
      return false
    }
    if (ftype !== 'idcard') {
      var nReg = Regexs[ftype]
      return nReg.test(str)
    }
  },
  trim (str) {
    if (str) {
      return str.replace(/\s+/g, '')
    }
    return str
  }
}
