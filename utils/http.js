import {config} from '../config.js'
// import 最好使用相对路径
const tips = {
  1: '抱歉，出现了一个错误！',
  1005: 'applykey 无效，请前往 获取',
  3000: '期刊不存在'
}
class HTTP {
  request(params) {
    if (!params.method) {
      params.method = 'GET'
    }
    wx.request({
      url: config.aoi_base_url + params.url,
      method: params.method,
      data:params.data,
      header: {
        'content-type': 'application/jion',
        'appkey': config.appkey
      },
      success: (res) => {
        let code = res.statusCode.toString()
        // startWith 字符串方法
        // 遇到问题，从不同的角度去试，解决了就记录下来
        if (code.startsWith('2')) {
          params.success && params.success(res.data)
        } else {
          this._show_error(res.data.error_code)
        }
      },
      fail: (err) => {
        this._show_error(1)
      }
    })
  }
  _show_error(error_code) {
    if(!error_code) error_code = 1
    wx.showToast({
      title: tips[error_code],
      icon: 'none',
      duration: 5000
    })
  }
}
export { HTTP }