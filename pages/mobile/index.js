const toast = require('../../utils/toast')
import { appId } from '../../config.js'
var app = getApp()

Page({
  data: {
    id: null,
    data: null,
    scopeUserInfo: true
  },
  onLoad: function (options) {
    var that = this
    this.id = options.id
    wx.setStorageSync("about_id", options.id)

    var data = {
      id: options.id,
      app_id: appId
    }
    app.apis.query.query(data).then(res => {
      console.log(res[0]);
      if (res[0]) {
        that.setData({
          data: res[0],
        })
      }
    })

    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          console.log(res)
          that.setData({ scopeUserInfo: false })
        }
      }
    })
  },

  handleFieldBlur: function(e) {
    var phone = e.detail.detail.value;
    let that = this
    if (/^1[34578]\d{9}$/.test(phone)) {
      wx.setStorageSync('mobile', phone)
      this.setData({
      })
    } else {
      wx.showToast({
        title: '手机号有误',
        icon: 'success',
        duration: 2000
      })
    }
  },

  nextStep: function () {
    var that = this
    wx.getStorage({
      key: 'about_id',
      success: function(res) {
        wx.getStorage({
          key: 'mobile',
          success: function(rex) {
            console.log(rex.data);
            wx.navigateTo({
              url: '../form/index?' + "id=" + res.data + "&isShow=" + "" + "&phone=" + rex.data + "&path=" + "../list/index",
            })
          },
        })
      },
    })
  },

  notReocrd: function () {
    var that = this
    var data = {
      'rcp_customer_entry_id': parseInt(that.data.data.id),
      "op_flag": 5,
      "app_id": appId
    }
    app.apis.record.record(data).then(res => {
      console.log("更改完成");
    })
    wx.navigateBack({
    })
  },

  notTa: function () {
    var that = this
    var data = {
      'rcp_customer_entry_id': parseInt(that.data.data.id),
      "op_flag": 4,
      "app_id": appId
    }
    app.apis.record.record(data).then(res => {
      console.log("更改完成");
    })
    wx.navigateBack({
    })
  },
})
