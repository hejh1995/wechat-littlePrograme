// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like: Boolean,
    count: Number,
    readOnly: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    yesSrc: 'images/like.png',
    noSrc: 'images/likeDis.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike: function(event) {
      // appkey = AbhC31IG7ruCDp57
      // 如果不能点击，直接退出，这也是一种处理disbale 的方式
      if (this.properties.readOnly) {
        return
      }
      let like = this.properties.like
      let count = this.properties.count
      count = like ? count-1 : count+1
      this.setData({
        count: count,
        like: !like
      })
      // 自定义事件，this.triggerEvent（名称，自定义对象，参考参数）
      this.triggerEvent('like', {
        behavior: this.properties.like ? 'like' : 'canael'
      },{})
    }
  }
})
