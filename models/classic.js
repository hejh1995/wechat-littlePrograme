import { HTTP } from '../utils/http.js'
class ClassicModel extends HTTP {
  getLatest(callback) {
    this.request({
      url: 'classic/latest',
      success: (res) => {
        callback(res)
        this._setLastIndex(res.index)
      }
    })
  }
  getClassic(index, nextOrPrevious, callback) {
    let key = nextOrPrevious === 'next' ? index+1 : index-1
    // 这里用到了缓存
    let classic = wx.getStorageSync(this._getKey(key))
    if (!classic) {
      this.request({
        url: `classic/${index}/${nextOrPrevious}`,
        success: res => {
          callback(res)
          wx.setStorageSync(this._getKey(res.index), res)
        }
      })
    } else {
      callback(classic)
    }
  }
  isFirst(index) {
    return index === 1 ? true : false
  }
  isLatest(index) {
    let latestIndex = this._getLatestIndex()
    return latestIndex === index ? true : false
  }
  getMyFavor(success) {
    this.request({
      url: `classic/favor`,
      success: success
    })
  }
  getById(cid,type,success) {
    this.request({
      url: `classic/${type}/${cid}`,
      success: success
    })
  }
  _getLatestIndex() {
    return wx.getStorageSync('latest')
  }
  _setLastIndex(index) {
    wx.setStorageSync('latest', index)
  }
  _getKey(index) {
    return `classic-${index}`
  }
}
export { ClassicModel }