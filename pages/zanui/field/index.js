Component({
  behaviors: ['wx://form-field'],

  relations: {
    '../cell-group/index': {
      type: 'parent'
    }
  },

  properties: {
    title: String,
    type: {
      type: String,
      value: 'input'
    },
    disabled: Boolean,
    edit: Boolean,
    inputType: {
      type: String,
      value: 'text'
    },
    placeholder: String,
    focus: Boolean,
    mode: {
      type: String,
      value: 'normal'
    },
    right: Boolean,
    error: Boolean,
    maxlength: {
      type: Number,
      value: 140
    }, 
    search: {
      type: Boolean,
      value: false
    },
  },

  data : {
    isShow : true
  },

  methods: {
    handleFieldChange(event) {
      const { detail = {} } = event;
      const { value = '' } = detail;
      this.setData({ value });

      this.triggerEvent('change', event);
    },

    handleFieldFocus(event) {
      this.triggerEvent('focus', event);
    },

    handleFieldBlur(event) {
      this.triggerEvent('blur', event);
    },

    updateDisplay(isShow) {
      this.setData({ isShow: isShow });
    }
  }
});
