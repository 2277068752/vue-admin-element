var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
// 主流浏览器内核
let elementStyle = document.createElement('div').style
// 格式化日期插件
let moment = require('moment')
let vendor = (() => {
  let transfromNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    ms: 'msTransform',
    O: 'OTransform',
    standard: 'transform'
  }

  for (let key in transfromNames) {
    if (elementStyle[transfromNames[key]] !== undefined) {
      return key
    }
  }

  return false
})()
export default {
  getWidthHeight () {
    let w = window
    let d = document
    let e = d.documentElement
    let g = d.getElementsByTagName('body')[0]
    let x = w.innerWidth || e.clientWidth || g.clientWidth
    let y = w.innerHeight || e.clientHeight || g.clientHeight
    return {width: x, height: y}
  },
  hasScrollBar (id) {
    id = id || 'app'
    return document.getElementById(id).scrollHeight > this.getWidthHeight().height
  },
  getImageWH (imgUrl) {
    let img = new Image()
    img.src = imgUrl
    return {w: img.width, h: img.height}
  },
  hidePhone (value) {
    if (!value) {
      return ''
    }
    value = value.toString()
    if (value.length !== 11) {
      return value
    }
    return value.substring(0, 3) + '*****' + value.substring(8)
  },
  price (value, fixed) {
    value = value || 0
    if (typeof value === 'string') {
      value = parseFloat(value)
    }
    if (!fixed) {
      fixed = 2
    }
    if (value < 0) {
      value = 0
    }
    return value.toFixed(fixed)
  },
  getParam (name, url) {
    if (!url) {
      url = window.location.href
    }
    name = name.replace(/[\[\]]/g, '\\$&') // eslint-disable-line
    let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
    let results = regex.exec(url)
    if (!results) return null
    if (!results[2]) return ''
    return decodeURIComponent(results[2].replace(/\+/g, ' '))
  },
  setTitle (title) {
    setTimeout(function () {
      // 利用iframe的onload事件刷新页面
      document.title = title
      var iframe = document.createElement('iframe')
      iframe.style.visibility = 'hidden'
      iframe.style.width = '1px'
      iframe.style.height = '1px'
      iframe.onload = function () {
        setTimeout(function () {
          document.body.removeChild(iframe)
        }, 0)
      }
      document.body.appendChild(iframe)
    }, 0)
  },
  generateMixed (n) {
    var res = ''
    for (var i = 0; i < n; i++) {
      var id = Math.ceil(Math.random() * 35)
      res += chars[id]
    }
    return res
  },
  numberToChinese (n) {
    if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n)) {
      return ''
    }
    let unit = '京亿万仟佰拾兆万仟佰拾亿仟佰拾万仟佰拾元角分'
    let str = ''
    n += '00'
    let p = n.indexOf('.')
    if (p >= 0) {
      n = n.substring(0, p) + n.substr(p + 1, 2)
      unit = unit.substr(unit.length - n.length)
      for (var i = 0; i < n.length; i++) str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i)
      return str.replace(/零(仟|佰|拾|角)/g, '零').replace(/(零)+/g, '零').replace(/零(兆|万|亿|元)/g, '$1').replace(/(兆|亿)万/g, '$1').replace(/(京|兆)亿/g, '$1').replace(/(京)兆/g, '$1').replace(/(京|兆|亿|仟|佰|拾)(万?)(.)仟/g, '$1$2零$3仟').replace(/^元零?|零分/g, '').replace(/(元|角)$/g, '$1整')
    }
  },
  hasClass (el, className) {
    // 开始或空白字符+类名+空白字符或结束
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
    // 测试元素是否有该类名，返回布尔值
    return reg.test(el.className)
  },
  addClass (el, className) {
    if (this.hasClass(el, className)) {
      return
    }
    // 以空白符为切割位置切割生成新数组
    let newClass = el.className.split(' ')
    // 数组中加入新类名
    newClass.push(className)
    // 将数组元素放入一个字符串，以空白符间隔
    el.className = newClass.join(' ')
  },
  removeClass (el, className) {
    if (el.classList) {
      el.classList.remove(className)
    } else {
      el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ')
    }
  },
  // 取标签自定义的data
  getData (el, name, val) {
    const prefix = 'data-'
    name = prefix + name
    if (val) {
      return el.setAttribute(name, val)
    } else {
      return el.getAttribute(name)
    }
  },
  // 添加样式的浏览器前缀
  prefixStyle (style) {
    if (vendor === false) {
      return false
    }
    if (vendor === 'standard') {
      return style
    }
    return vendor + style.charAt(0).toUpperCase() + style.substr(1)
  },
  dateFormat (date, type) {
    if (!date) {
      return ''
    }
    return moment(date).format(type)
  }
}
