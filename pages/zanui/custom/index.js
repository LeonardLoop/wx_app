const toast = require('../../../utils/toast')
Component({
  relations: {
    '../cell-group/index': {
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
    // 数组的形式操作
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