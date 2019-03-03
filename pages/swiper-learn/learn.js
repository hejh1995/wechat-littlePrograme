Page({
  data: {
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    circular: false,
    interval: 2000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0
  },
  changeProperty: function (e) {
    // 好几个地方调用同一个函数，根据 e 的不同值判断是哪里触发的事件
    console.log(e)
    var propertyName = e.currentTarget.dataset.propertyName
    var newData = {}
    newData[propertyName] = e.detail.value
    // 这里赋值的方式也很好啊
    this.setData(newData)
  },
  onChange(event) {
    console.log(event.detail)
  }
})
