const toast = require('../../utils/toast')
const Toast = require('../zanui/toast/toast')
import { appId } from '../../config.js'
import { selectItems, selectlevel, selectcolor, selectmodel, selectresult } from 'data'
const app = getApp()

Page({
  data: {
    data: null,
    selectItems,
    selectlevel,
    selectmodel,
    selectcolor,
    selectresult,
    id: null,
    phone: '',
    type: '',
    name: '',
    level: '',
    car_id: '',
    color_id: '',
    price: '',
    remark: '',
    result: '',
    path: '',
    isShow: '',
    logMessage: [],
  },

  onLoad: function(options) {
    var that = this
    var data1 = {
      id: options.id,
      app_id: appId,
    }
    app.apis.query.query(data1).then(res => {
      console.log(res[0]);
      if (res[0]) {
        that.setData({
          id: options.id,
          data: res[0],
          phone: options.phone,
          path: options.path,
          isShow: options.isShow
        })
        var data2 = {
          exhib_id: 1516,
          operator: res[0].operator,
          app_id: appId,
        }
        app.apis.log.log(data2).then(res => {
          console.log("log file:", res.logMessage);
          that.setData({
            logMessage: res.logMessage
          })
        })
      }
    })
  },
  // 对输入框进行处理
  handleFieldChange1: function(e) {
    this.data.name = e.detail.detail.value.replace(/\s+/g, '')
  },
  handleFieldChange2: function (e) {
    this.data.price = e.detail.detail.value.replace(/\s+/g, '')
  },
  handleFieldChange3: function (e) {
    this.data.remark = e.detail.detail.value.replace(/\s+/g, '')
  },
  // 获取单选框的值
  handleSelectChange1: function (opt) {
    this.data.type = opt.detail.item.id
  },
  handleSelectChange2: function (opt) {
    this.data.level = opt.detail.item.id
  },
  handleSelectChange3: function (opt) {
    this.data.car_id = opt.detail.item.id
  },
  handleSelectChange4: function (opt) {
    this.data.color_id = opt.detail.item.id
  },
  handleSelectChange5: function (opt) {
    this.data.result = opt.detail.item.id
  },

  notTa: function() {
    var that = this
    var data = {
      'rcp_customer_entry_id': parseInt(that.data.id),
      "op_flag": 4,
      "app_id": appId
    }
    app.apis.record.record(data).then(res => {
      console.log("更改完成");
    })
    wx.navigateBack({
    })
  },

  confirm: function() {
    var that = this
    setTimeout(function () {
      var data1 = {
        "rcp_customer_entry_id": parseInt(that.data.id),
        "op_flag": 5,
        "entry_type": that.data.type,
        "level_id": that.data.level,
        "remark": that.data.remark,
        "result": that.data.result,
        "app_id": appId,
      }
      console.log(data1);
      var data2 = {
        "customer_entry_id": parseInt(that.data.id),
        "intent_color_id": that.data.color_id,
        "intent_car_id": that.data.car_id,
        "offer_price": that.data.price,
        "app_id": appId
      }
      console.log(data2);
      var data3 = {
        "customer_id": that.data.data.customer,
        "phone": that.data.phone? that.data.phone : that.data.data.phone,
        "name": that.data.name,
        "app_id": appId
      }
      console.log(data3);
      app.apis.receive.receive(data1).then(res => {
        app.apis.detail.detail(data2).then(res => {
          app.apis.staff.staff(data3).then(res => {
            if (that.data.path) {
              wx.navigateBack({
                delta: 2
              })
            } else {
              wx.navigateBack({
                delta: 1
              })
            }
          })
        })
      })
    }, 2000);
  }
})
