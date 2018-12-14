const warn = (msg, getValue) => {
  console.warn(msg);
  
};
const getTextUrl = require('../../../utils/text_util');

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
    confirm: {
      type: Boolean,
      value: false,
      description: '是否需要确认按钮'
    },
    textRefresh: {
      type : String,
      value : '',
      description: 'text对应值刷新方法'
    },
    placeholder: {
      type: String,
      value: '',
      description: 'text对应显示提示'
    },
    downArrow:{
      type:Boolean,
      value: false,
      description: '箭头是否朝下'
    },
    isBold: {
      type: Boolean,
      value: false,
      description: '是否字体加粗'
    }
  },
  data: {
    isLastCell: false,
    isShow : true
  },
  methods: {
    navigateTo(isPass) {
      const { url = '', textRefresh='' } = this.data;
      const type = typeof this.data.isLink;
      if(isPass != true){//是否被动触发
        this.triggerEvent('tap', { bubbles: false });
      }
      if (!this.data.isLink || (!url && !textRefresh) || url === 'true' || url === 'false') return;

      if (type !== 'boolean' && type !== 'string') {
        warn('isLink 属性值必须是一个字符串或布尔值', this.data.isLink);
        return;
      }

      if (['navigateTo', 'redirectTo', 'switchTab', 'reLaunch'].indexOf(this.data.linkType) === -1) {
        warn('linkType 属性可选值为 navigateTo，redirectTo，switchTab，reLaunch', this.data.linkType);
        return;
      }
      wx[this.data.linkType].call(wx, { url: textRefresh ? getTextUrl(this.data.title, this.data.value, textRefresh, this.data.placeholder, this.data.confirm) : url });
    },
    cellTap() {
      if (!this.data.onlyTapFooter) {
        this.navigateTo(true);
      }
    },

    // 用于被 cell-group 更新，标志是否是最后一个 cell
    updateIsLastCell(isLastCell) {
      this.setData(isLastCell);
    },
    updateDisplay(isShow){
      this.setData({ isShow: isShow});
    }
  }
});
