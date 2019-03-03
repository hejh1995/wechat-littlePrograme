// pages/classic/classic.js
import { ClassicModel } from '../../models/classic.js'
import { LikeModel } from '../../models/like.js'
let classsicModel = new ClassicModel()
let likeModel = new LikeModel()
Component({

  /**
   * 页面的初始数据
   */
  properties: {
    cid: Number,
    type: Number,
  },
  data: {
    // wxml 要使用的数据最好都能够在data中标识出来
    classic: null,
    latest: true,
    first: false,
    likeCount: 0,
    likeStatus: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  attached: function (options) {
    // 刚加载页面的时候，如果没有cid，直接加载最新一期，如果有，加载对应的id的信息
    const cid = this.properties.cid
    const type = this.properties.type
    if (!cid) {
      classsicModel.getLatest((res) => {
        this._getLikeStatus(res.id, res.type)
        this.setData({
          classic: res
        })
      })
    } else {
      // 通过id 获取信息
      classsicModel.getById(cid, type, res => {
        this._getLikeStatus(res.id, res.type)
        this.setData({
          classic: res
        })
      })
    }
    
  },
  methods: {
    onLike: function (event) {
      let like_or_cancel = event.detail.behavior
      likeModel.like(like_or_cancel, this.data.classic.id, this.data.classic.type)
    },
    onNext: function (event) {
      this._updataClassic('next')
    },
    onPrevious: function (event) {
      this._updataClassic('previous')
    },
    _updataClassic: function (nextOrPrevious) {
      // 私有函数一般放在最后面
      let index = this.data.classic.index
      classsicModel.getClassic(index, nextOrPrevious, (res) => {
        this.setData({
          classic: res,
          first: classsicModel.isFirst(res.index),
          latest: classsicModel.isLatest(res.index)
        })
        this._getLikeStatus(res.id, res.type)
      })
    },
    _getLikeStatus: function (artID, type) {
      likeModel.getClassicLikeStatus(artID, type, (res) => {
        this.setData({
          likeCount: res.fav_nums,
          likeStatus: res.like_status
        })
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