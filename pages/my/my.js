// pages/my/my.js
import { BookModel } from '../../models/book.js'
import { ClassicModel } from '../../models/classic.js'
const bookModel = new BookModel()
const classicModel = new ClassicModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookCount: 0,
    authorized: false,
    userInfo: null,
    classic: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMyBookCount()
    this.userAuthorized()
    this.getMyFavor()
  },
  onStudy: function (event) {
    // 跳转到另一个页面
    wx.navigateTo({
      url: '/pages/course/course',
    })
  },
  onJumpToAbout: function (event) {
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },
  onJumpToDetail(event) {
    const cid = event.detail.cid
    const type = event.detail.type
    console.log('cid',cid)
    wx.navigateTo({
      url: `/pages/classic-detail/classic-detail?cid=${cid}&type=${type}`
    })
  },
  getMyBookCount() {
    bookModel.getMyBookCount().then(res => {
      this.setData({
        bookCount: res.count
      })
    })
  },
  getMyFavor() {
    classicModel.getMyFavor(res => {
      this.setData({
        classic: res
      })
    })
  },
  userAuthorized() {
    // 先判断是否授权，如果授权再获取个人信息
    wx.getSetting({
      success: data => {
        if(data.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: data => {
              this.setData({
                authorized: true,
                userInfo: data.userInfo
              })
            }
          })
        }
      }
    })
  },
  onGetUserInfo(event) {
    // 会自动弹出询问是否授权
    // 获取授权后的函数
    const userInfo = event.detail.userInfo
    if (userInfo) {
      this.setData({
        userInfo,
        authorized: true
      })
    }
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