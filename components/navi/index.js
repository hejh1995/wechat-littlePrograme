// components/navi/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: String,
    first: Boolean,
    latest: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    disLeftSrc: 'images/triangle.dis@left.png',
    leftSrc: 'images/triangle@left.png',
    disRightSrc: 'images/triangle.dis@right.png',
    rightSrc: 'images/triangle@right.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLeft(event) {
      // 禁用某个事件
      // 组件中一版不处理复杂的逻辑，将逻辑处理给父组件
      if(!this.properties.latest) this.triggerEvent('left', {}, {})
    },
    onRight(event) {
      if(!this.properties.first) this.triggerEvent('right', {}, {})
    }
  }
})
