const app = getApp()
const toast = require('../../utils/toast')
const phoneVerify = require('../../utils/phone_verify')
const sumSeconds = 120; 
var wait = 120;
import { appId } from '../../config.js'

Page({
  data: {
    isBtnLoading: false,
    phone: null,
    second: wait
  },
  sendCode: function(){
    if (this.data.second < sumSeconds) return
    var phone = this.data.phone
    if (!phoneVerify(phone)) {
      toast('手机号输入有误')
      return
    }
    this.settime()
    toast('验证码已发送至您的手机，请注意查收')
  },
  getCode: function (res) {
    this.setData({
      code: res.detail.detail.value
    })
  },
  settime: function () {
    var that = this
    if (wait == 0) {
      wait = sumSeconds;
      that.setData({
        second: wait
      })
    } else {
      wait--;
      that.setData({
        second: wait
      })
      setTimeout(function() {
        that.settime()
      }, 1000)
    }
  },
  getPhone: function(res){
    this.setData({
      phone: res.detail.detail.value
    })
  },
  reverse: function(){
    var that = this
    that.setData({
      isBtnLoading: false
    })
    wx.reLaunch({
      url: '/pages/list/index'
    })
  },
  confirm: function(){
    var that = this
    this.setData({
      isBtnLoading: true
    })
    var phone = this.data.phone
    var verifyCode = this.data.code
    if (!phoneVerify(phone)){
      toast('手机号输入有误')
      this.setData({
        isBtnLoading: false
      })
      return
    }
    if (!verifyCode) {
      toast('验证码输入有误')
      this.setData({
        isBtnLoading: false
      })
      return
    }
    
    wx.login({
      success: res => {
        var code = res.code
        console.log("the second code:", code);
        wx.getUserInfo({
          success: function (res) {
            console.log('the second code', res.encryptedData)
            var data = {
              'code': code,
              'encryptedData': res.encryptedData,
              'iv': res.iv,
              'app_id': appId,
              'phone': phone
            }
            app.apis.bind.bind(data).then(res => {
              if (res.userId) {
                that.setData({
                  isBtnLoading: false
                })
                console.log("the second response:", res);
                wx.reLaunch({
                  url: '/pages/list/index'
                })
              }
            })
          }
        })
      }
    })
  }
});