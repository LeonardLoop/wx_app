import { urlProcess, appId } from '../../config.js'
var app = getApp()

Page({
  data: {
    lst: [],
    url: "../form/index",
    argument: null,
    page: 1,
    pages: 0,
  },

  onShow(options) {
    this.setData({
      lst: []
    })
    this.fetchArticleList(1)
  },

  onReachBottom() {
    if (this.data.page < this.data.pages) {
      this.fetchArticleList(this.data.page + 1)
    }
  },

  fetchArticleList: function (pageNo) {
    var that = this
    var data = {
      "staff_id": 1,
      "exhib_id": 1516,
      "page": pageNo,
      "page_size": 10,
      "app_id": appId
    }
    app.apis.customer.customer(data).then(res => {
      console.log(res);
      if (res) {
        that.setData({
          lst: that.data.lst.concat(res.list),
          pages: res.pageCount,
          page: pageNo
        })
      }
      wx.setTabBarBadge({
        index: 1,
        text: String(res.total),
      })
    })
  },
  // 获取输入的信息
  inputChange: function (e) {
    this.setData({
      argument: e.detail.detail.value
    })
  },
  // 根据手机或姓名进行搜索
  searchBtn: function () {
    var that = this
    console.log(that.data.argument);
    setTimeout(function (res) {
      app.apis.search.search({'argument': argument}).then(res => {
        that.setData({
          lst: res.data.data.list
        })
      })
      wx.navigateBack()
    }, 2000);
  },

  onPullDownRefresh() {
    wx.showNavigationBarLoading()
    var that = this
    var data = {
      "staff_id": 1,
      "exhib_id": 1516,
      "page": 1,
      "page_size": 10,
      "app_id": appId
    }
    app.apis.customer.customer(data).then(res => {
      console.log(res.list);
      if (res.list) {
        that.setData({
          lst: res.list,
        })
      }
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    })
  }
})
