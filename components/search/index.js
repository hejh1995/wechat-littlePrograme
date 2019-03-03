// components/search/index.js
import { paginationBev } from '../behaviors/pagination.js'
import { KeywordModel } from '../../models/keyword.js'
import { BookModel } from '../../models/book.js'
const keywordModel = new KeywordModel()
const bookModel = new BookModel()
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [paginationBev],
  properties: {
    more:{
      type: String,
      // observer 对应的函数，在该参数发生变化才会发生变化
      observer: 'loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    hotWords: [],
    historyWords: [],
    q: '',
    searching: false,
    loadingCenter: false
  },
  attached() {
    this.setData({
      historyWords: keywordModel.getHistory()
    })
    keywordModel.getHot().then(res => {
      this.setData({
        hotWords: res.hot
      })
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onCancel(event) {
      this.initialize()
      this.triggerEvent('cancel',{},{})
    },
    onDelete(event) {
      this.initialize()
      this._closeResult()
    },
    onConfirm(event) {
      const q = event.detail.value || event.detail.text
      this.setData({
        q,
      })
      // 在确认搜索的时候，显示加载以及到结果页
      this._showLoadingCenter()
      this._showResult()
      bookModel.search(0,q).then(res => {
        keywordModel.addToHistory(q)
        this.setData({
          dataArray: res.books,
          total: res.total,
          noneResult: res.total === 0 ? true : false
        })
        this._hiddenLoadingCenter()
      })
    },
    loadMore() {
      // 页面触底的时候，组件中的more会变化，会触发该函数，所以需要加锁，防止多次访问。
      // 正在加载数据的时候，就不要再向服务器发送请求
      if (this.isLocked()) {
        return
      }
      // 搜索的内容为空，不发起请求
      if (!this.data.q) {
        return
      }
      // 已经加载了所有数据，不重复请求数据
      if (!this.hasMore()) {
        return
      }
      // 加载数据前加锁,加载后解锁.
      this.locked()
      let length = this.data.dataArray.length
      bookModel.search(length, this.data.q).then(res => {
        this.setMoreData(res.books)
        this.unlocked()
      }, () => {
        // 在请求失败后也要解锁
        this.unlocked()
      })
    },
    _showLoadingCenter() {
      this.setData({
        loadingCenter: true
      })
    },
    _hiddenLoadingCenter() {
      this.setData({
        loadingCenter: false
      })
    },
    _showResult() {
      this.setData({
        searching: true
      })
    },
    _closeResult() {
      this.setData({
        searching: false,
        q: ''
      })
    }
  }
})
