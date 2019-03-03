// components/epsoide/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: {
      type: String,
      // 在observer 函数中不要修改自己，所以引入新的变量 _index
      // index 和 _index 不同，因为properties 和 data 在组件中最后会被分配在同一个内存中，所以不能定义相同的变量名
      observer: function(newVal, oldVal, changePath) {
        let val = newVal < 10 ? '0'+newVal : newVal
        this.setData({
          _index: val
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    _index: '',
    month: '',
    year: 0,
    months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
  },
  attached:function() {
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth()
    this.setData({
      year,
      month: this.data.months[month]
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
