// pages/book-detail/book-detail.js
import { BookModel } from '../../models/book.js'
const bookModel = new BookModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments: [],
    book: null,
    likeStatus: false,
    likeCount: 0,
    posting: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // options 中的参数就是页面跳转的时候的参数
    wx.showLoading()
    const bid = options.bid
    const detail = bookModel.getDetial(bid)
    const comments = bookModel.getComments(bid)
    const likeStatus = bookModel.getLikeStatus(bid)
    // Promise.all 所有的promise都正确执行,才会执行resolve 
    Promise.all([detail, comments, likeStatus])
    .then(res => {
      this.setData({
        book: res[0],
        comments: res[1].comments,
        likeStatus: res[2].like_status,
        likeCount: res[2].fav_nums
      })
      wx.hideLoading()
    })
  },
  onFakePost: function(event) {
    this.setData({
      posting: true
    })
  },
  onCancel: function(event) {
    this.setData({
      posting: false
    })
  },
  onPost: function(event) {
    console.log(event.detail)
    const comment = event.detail.text || event.detail.value
    if (!comment) {
      return
    }
    if (comment.length > 12) {
      wx.showToast({
        title: '短评最多12个字',
        icon: 'none'
      })
      return
    }
    bookModel.postComment(this.data.book.id, comment)
    .then(res => {
      wx.showToast({
        title: '+1',
        icon: 'none'
      })
      this.data.comments.unshift({
        content: comment,
        nums:1
      })
      // 先修改数据，然后提交数据
      this.setData({
        comments: this.data.comments,
        posting: false
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})