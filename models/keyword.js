import {
  HTTP
} from '../utils/http-p.js'
class KeywordModel extends HTTP {
  key= 'q'
  maxLenghth = 10
  getHistory() {
    const words = wx.getStorageSync(this.key)
    return words ? words : []
  }
  getHot() {
    return this.request({
      url: '/book/hot_keyword'
    })
  }
  addToHistory(keyword) {
    let words = this.getHistory()
    // 判断是否有这个关键字，没有才加入
    // 关键字的个数不能大于10
    const has = words.includes(keyword)
    if (!has) {
      if (words.length >= this.maxLenghth) words.pop()
      words.unshift(keyword)
      wx.setStorageSync(this.key, words)
    }
  }
}
export { KeywordModel }