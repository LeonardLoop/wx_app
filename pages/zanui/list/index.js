const warn = (msg, getValue) => {
  console.warn(msg);
  
};

Component({
  options: {
    multipleSlots: true
  },
  relations: {
    '../cell-group/index': {
      type: 'parent'
    }
  },
  properties: {
    title: {
      type: String,
      description: '左侧标题'
    },
    label: {
      type: String,
      description: '标题下方的描述信息'
    },
    value: {
      type: String,
      description: '右侧内容'
    },
    valueBadge: {
      type: Boolean,
      default: false,
      description: '是否显示小红点'
    },
    name: {
      type: String,
      description: '用户姓名'
    },
    time: {
      type: String,
      description: '时间'
    },
    phone: {
      type: String,
      description: '电话号码'
    },
    motorcycle: {
      type: String,
      description: '意向等级'
    },
    level: {
      type: String,
      description: "用户等级"
    },
    shop_type: {
      type: String,
      description: "门店等级"
    },
    onlyTapFooter: {
      type: Boolean,
      description: '只有点击 footer 区域才触发 tab 事件'
    },
    isLink: {
      type: null,
      value: '',
      description: '是否展示右侧箭头并开启尝试以 url 跳转'
    },
    linkType: {
      type: String,
      value: 'navigateTo',
      description: '链接类型，可选值为 navigateTo，redirectTo，switchTab，reLaunch'
    },
    url: {
      type: String,
      value: ''
    },
    left:{
      type : Boolean,
      value : false,
      description:'是否向左对齐'
    },
    imageUrl: {
      type: String,
      description: '左侧图片地址'
    },
    circle: {
      type: Boolean,
      value: false,
      description: '左侧图片是否圆形'
    }
  },
  data: {
    isLastCell: false,
    isShow : true
  },
  methods: {
    navigateTo() {
      const { url = '' } = this.data;
      const type = typeof this.data.isLink;

      this.triggerEvent('tap', {});

      if (!this.data.isLink || !url || url === 'true' || url === 'false') return;

      if (type !== 'boolean' && type !== 'string') {
        warn('isLink 属性值必须是一个字符串或布尔值', this.data.isLink);
        return;
      }

      if (['navigateTo', 'redirectTo', 'switchTab', 'reLaunch'].indexOf(this.data.linkType) === -1) {
        warn('linkType 属性可选值为 navigateTo，redirectTo，switchTab，reLaunch', this.data.linkType);
        return;
      }
      wx[this.data.linkType].call(wx, { url });
    },
    cellTap() {
      if (!this.data.onlyTapFooter) {
        this.navigateTo();
      }
    },

    // 用于被 cell-group 更新，标志是否是最后一个 cell
    updateIsLastCell(isLastCell) {
      this.setData(isLastCell);
    },
    updateDisplay(isShow){
      this.setData({ isShow: isShow});
    },
    previewImage(){
      wx.previewImage({
        urls: [this.data.imageUrl]
      })
    }

  }
});
