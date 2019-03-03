import { config } from '../config.js'
// import 最好使用相对路径
const tips = {
  1: '抱歉，出现了一个错误！',
  1005: 'applykey 无效，请前往 获取',
  3000: '期刊不存在'
}
class HTTP {
  request({url, data, method}) {
    // 明确参数，有利于其他人阅读代码
    // 必填参数放在最前面
    // promise 会在then 里面执行resolve 和 reject，所以不用将回调函数写进来
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, data, method)
    })
  }
  _request(url, resolve, reject, data = {}, method = 'GET') {
    wx.request({
      url: config.aoi_base_url + url,
      method: method,
      data: data,
      header: {
        'content-type': 'application/jion',
        'appkey': config.appkey
      },
      success: (res) => {
        const code = res.statusCode.toString()
        // startWith 字符串方法
        // 遇到问题，从不同的角度去试，解决了就记录下来
        if (code.startsWith('2')) {
          resolve(res.data)
        } else {
          reject()
          // reject 函数不用返回任何参数
          this._show_error(res.data.error_code)
        }
      },
      fail: (err) => {
        reject()
        this._show_error(1)
      }
    })
  }
  _show_error(error_code) {
    if (!error_code) error_code = 1
    wx.showToast({
      title: tips[error_code],
      icon: 'none',
      duration: 5000
    })
  }
}
export { HTTP }