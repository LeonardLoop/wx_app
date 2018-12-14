const toast = require('../../utils/toast')
Component({
  relations: {
    '../../pages/zanui/cell-group/index': {
      type: 'parent'
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {
    placeholder: {
      type: String
    },
    type: {
      type: String
    },
    title: {
      type: String
    },
    value: {
      type: String
    },
    change: {
      type: String,
      description: '对应值刷新方法'
    },
    acquire: {
      type: String,
      description: '用于下个页面调用的方法，比如下个页面调用此方法获取数据'
    },
    lat: {
      type: Number,
      value: 0
    },
    lon: {
      type: Number,
      value: 0
    },
    items: {
      type: Array,
      value: []
    },
    sourceType: {
      type: Array,
      value: ['album', 'camera']
    },
    urls: {
      type: Array,
      value: []
    },
    url: {
      type: String
    },
    edit: {
      type: Boolean
    },
    format: {
      type: String,
      default: 'YYYY-MM-DD HH:mm:ss',
      description: '日期和时间的格式'
    },
    imgLimitNum: {
      type: Number,
      default: 9,
      description: '限制上传图片数量'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isActionSheetShow: false,
    isShow: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    updateDisplay(isShow) {
      this.setData({
        isShow: isShow
      });
    },
    getActionSheet: function() {
      this.setData({
        isActionSheetShow: true
      });
    },
    closeActionSheet: function() {
      this.setData({
        isActionSheetShow: false
      });
    },
    handleActionClick: function({ detail }) {
      this.setData({
        value: this.data.items[detail.index].name,
        isActionSheetShow: false
      });
      this.triggerEvent('change', {
        item: this.data.items[detail.index]
      });
    },
    previewImage: function({ target }) { //图片预览
      var that = this;
      let imgHttpPath = this.data.urls.map(x => {
        return x.url
      })
      wx.previewImage({
        current: that.data.urls[target.dataset.index].url, // 当前显示图片的http链接
        urls: imgHttpPath // 需要预览的图片http链接列表
      })
    },
    delImage: function({ target }) {
      var that = this;
      this.setData({
        urls: this.data.urls.filter(function(item, index) {
          return index != target.dataset.index
        })
      });
      this.triggerEvent('change', that.data.urls);
    },
    upload: function(files, success) {
      wx.showLoading({
        title: '图片上传中...'
      })
      var that = this;
      for (var i = 0; i < files.length; i++) {
        qiniuUploader.upload(files[i], (res) => {
          res.imageURL.indexOf('undefined') == -1 ? that.setData({
            urls: that.data.urls.concat('https://' + res.imageURL)
          }) : null;
          if (i == files.length) {
            wx.hideLoading();
          }
          success(res);
        }, (error) => {
          console.log('error: ', error);
        }, {
          region: 'SCN',
          domain: 'mina-image.bayes-tech.com', // // bucket 域名，下载资源时用到。如果设置，会在 success callback 的 res 参数加上可以直接使用的 ImageURL 字段。否则需要自己拼接
          // key: 'customFileName.jpg', // [非必须]自定义文件 key。如果不设置，默认为使用微信小程序 API 的临时文件名
          // 以下方法三选一即可，优先级为：uptoken > uptokenURL > uptokenFunc
          //uptoken: 'Vwj3Ahg-XTGbvtKGgAWixKbvpe3p7lsg8t9wQ8IP:dVJ-b0yLUADCnlErMVJZd8g4F8U=:eyJzY29wZSI6Im1pbmEiLCJkZWFkbGluZSI6MTUzMDY4NDMxNH0=' // 由其他程序生成七牛 uptoken
          uptokenURL: 'http://insp.bayes-tech.com/common/token/mina.html', // 从指定 url 通过 HTTP GET 获取 uptoken，返回的格式必须是 json 且包含 uptoken 字段，例如： {"uptoken": "[yourTokenString]"}
          // uptokenFunc: function () { return '[yourTokenString]'; }
        }, (res) => {
          // that.setData({
          //   imgIndex: i + 1,
          //   imgPercent: res.progress
          // });

          // console.log('上传进度', res.progress)
          // console.log('已经上传的数据长度', res.totalBytesSent)
          // console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
        });
      }

    },
    uploadImage: function() { //图片上传
      var that = this;
      if (that.data.urls.length >= that.data.imgLimitNum) {
        toast(`照片数量不多于${that.data.imgLimitNum}张`);
        return false;
      }
      wx.chooseImage({
        sizeType: ['compressed'], // 可以指定是原图(original)还是压缩图(compressed)
        // count: that.data.imgLimitNum,
        sourceType: that.data.sourceType, // 可以指定来源是相册还是相机,album 从相册选图，camera 使用相机，默认二者都有
        success: function(res) {
          // console.log('照片地址', res.tempFilePaths);
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          // that.upload(res.tempFilePaths, function() {
          //   that.triggerEvent('change', {
          //     urls: that.data.urls
          //   });
          // });
          if (that.data.urls.length + res.tempFilePaths.length > that.data.imgLimitNum) {
            toast(`照片数量不多于${that.data.imgLimitNum}张`);
            return false;
          }
          let newImages = res.tempFilePaths.map(x => {
            return { url: x, percent: 0}
          })
          that.setData({
            urls: that.data.urls.concat(newImages)
          })
          that.triggerEvent('change', that.data.urls);
        }
      })
    },
    imageUploadProgress: function (index, percent) {
      console.log('index=', index, ',percent=', percent)
      let urls = this.data.urls
      urls[index].percent = percent
      this.setData({
        urls: urls
      })
    },
    dateChange: function({ detail }) {
      var value = detail.value;
      this.triggerEvent('change', value.slice(0, 2).join('-') + ' ' + value.slice(3, 6).join(':'));
    },
    getLocation: function() {
      var that = this;
      if (this.data.lon && this.data.lat) {
        wx.openLocation({
          latitude: this.data.lat,
          longitude: this.data.lon
        })
      } else {
        wx.chooseLocation({
          success: function(res) {
            that.triggerEvent('change', {
              lat: res.latitude,
              lon: res.longitude,
              name: res.name,
              address: res.address
            });
          },
          function(e) {
            toast('获取位置失败！' + e);
          },
        })
      }
    }
  }
})