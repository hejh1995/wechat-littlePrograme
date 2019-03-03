const paginationBev = Behavior({
  data: {
    dataArray: [],
    total: null,
    noresult: false,
    loading: false
  },
  methods: {
    setMoreData(data) {
      // 将新数据与就数据连接
      let dataArray = this.data.dataArray.concat(data)
      this.setData({
        dataArray
      })
    },
    hasMore() {
      return this.data.total >= this.data.dataArray.length
    },
    locked() {
      // 加锁就是把loading设置为true
      this.setData({
        loading: true
      })
    },
    isLocked() {
      // 根据有没有在加载数据,判定是否加锁
      return this.data.loading
    },
    unlocked() {
      this.setData({
        loading: false
      })
    },
    initialize() {
      this.setData({
        // dataArray 是搜索结果的列表
        dataArray: [],
        loading: false,
        noneResult: false
      })
      this.data.total = null
    }
  }
})
export { paginationBev }