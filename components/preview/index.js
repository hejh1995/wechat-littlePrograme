// components/preview/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    classic: {
      type: Object,
      observer: function(newValue) {
        const type = {
          100: "电影",
          200: "音乐",
          300: "句子"
        }
        this.setData({
          typeText: type[newValue.type]
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    typeText: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(event) {
      this.triggerEvent('tapping', {
        cid: this.properties.classic.id,
        type: this.properties.classic.type
      })
    }
  }
})
