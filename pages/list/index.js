var app = getApp()

Page({
  data: {
    list: [],
    url1: "../mobile/index",
    url2: "../form/index",
    page: 1,
    pageSize: 10,
    isHasNoMore: false,
    isLoading: false
  },
  onShow(options) {
    this.setData({
      page: 1,
      isHasNoMore: false,
      isLoading: false
    })
    wx.startPullDownRefresh()
  },

  onReachBottom() {
    if (!this.data.isHasNoMore) {
      this.setData({
        page: this.data.page + 1,
        isLoading: true
      })
      this.fetchArticleList()
    }
  }
 ,

  fetchArticleList: function () {
    var that = this
    var staff_id = wx.getStorageSync('staff_id')
    var data = {
      "staff_id": 1,
      "exhib_id": 1516,
      "op_flag": 3,
      "page": that.data.page,
      "page_size": that.data.pageSize,
      "app_id": app.globalData.appId
    }
    app.apis.list.list(data).then(res => {
      console.log('process', res);
      if (res) {
        that.setData({
          list: that.data.list.concat(res.list)
        })
        if (res.list.length < that.data.pageSize) {
          that.setData({
            isHasNoMore: true
          })
        }
        that.setData({
          isLoading: false
        })
        wx.setTabBarBadge({
          index: 0,
          text: String(that.data.list.length),
        })
      }
      wx.stopPullDownRefresh()
    })
  },

  onPullDownRefresh() {
    this.setData({
      page: 1,
      list: []
    })
    this.fetchArticleList()
  }
})
