const toast = require('../../utils/toast')
import { appId } from '../../config.js'
const app = getApp()

Page({
  data: {
    batch: null,
    num: null,
    store: null,
    scopeUserInfo: true,
    access_token: null
  },
  onShow: function() {
    var that = this
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          that.setData({ scopeUserInfo: false })
        }
      }
    })
    var staff_id = wx.getStorageSync('staff_id')
    var exhib_id = wx.getStorageSync('exhib_id')
    var store = wx.getStorageSync('exhib_name')
    var data1 = {
      'staff_id': staff_id,
      'exhib_id': exhib_id,
      'app_id': appId
    }
    app.apis.batch.batch(data1).then(res => {
      if (res) {
        console.log(res);
        that.setData({
          batch: res.batchCount,
          num: res.customerCount,
          store: store
        })
      }
    })
  }
})
