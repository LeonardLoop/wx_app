import apis from '/apis/apis'
import { appId } from '/config.js'

App({
  onLaunch: function (options) {
    wx.getSetting({
      success: (res) => {
        if (!res.authSetting["scope.userInfo"]) {
          wx.reLaunch({
            url: '/pages/login/index'
          })
        }
      }
    })
  },
  getToken: function () {
    var that = this
    return new Promise(function (resolve, reject) {
      wx.login({
        success: res => {
          var code = res.code
          console.log("the first code:", code);
          wx.getUserInfo({
            success: function (res) {
              console.log('the first code', res.encryptedData)
              var data = {
                'code': code,
                'encryptedData': res.encryptedData,
                'iv': res.iv,
                'app_id': appId
              }
              apis.token.getToken(data).then(res => {
                wx.setStorageSync('staff_id', res.id);
                var data1 = {
                  "staff_id": 9,
                  "app_id": appId
                }
                apis.exhib.exhib(data1).then(res => {
                  console.log(res);
                  wx.setStorageSync('exhib_id', res.exhibId);
                  wx.setStorageSync('exhib_name', res.name);
                })
                resolve(res)
              })
            }
          })
        },
        fail: function (e) {
          console.log(e)
        }
      })
    })
  },

  globalData: {
    homePath: '/pages/list/index',
    appId: 1
  },
  apis,
})
