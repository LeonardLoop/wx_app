Component({
  relations: {
    '../cell/index': {
      type: 'child',
      linked() {
        this._updateIsLastCell();
      },
      linkChanged() {
        this._updateIsLastCell();
      },
      unlinked() {
        this._updateIsLastCell();
      }
    },
    '../field/index': {
      type: 'child',
      linked() {
        this._updateIsLastCell();
      }
    },
    '../../../components/field/index': {
      type: 'child',
      linked() {
        this._updateIsLastCell();
      }
    }
  },
  properties: {
    title: {
      type: String,
      description: '内容标题'
    },
    collopse: {
      type: String,
      description: '是否伸缩'
    }
  },
  data: {
    cellUpdateTimeout: 0,
    isSpread : false
  },

  methods: {
    _updateIsLastCell() {
      // 用 setTimeout 减少计算次数
      if (this.data.cellUpdateTimeout > 0) {
        return;
      }

      const cellUpdateTimeout = setTimeout(() => {
        this.setData({ cellUpdateTimeout: 0 });
        let cells = this.getRelationNodes('../cell/index');
        let fields =  this.getRelationNodes('../field/index');
        let m_fields = this.getRelationNodes('../../../components/field/index');
        let collopse = this.data.collopse == 'true' ;
        let isShow = collopse ? this.data.isSpread :true; 
        this.setData({ isSpread: isShow });
        var that = this;

        if (cells.length > 0) {
          let lastIndex = cells.length - 1;

          cells.forEach((cell, index) => {
            cell.updateIsLastCell({
              isLastCell: that.data.collopse?false : index === lastIndex,
              isShow: isShow
              });
          });

          fields.forEach((cell, index) => {
            cell.updateDisplay(isShow);
          });
          
        }
        m_fields.length > 0 ? m_fields.forEach((cell, index) => {
          cell.updateDisplay(isShow);
        }):null;
      });

      this.setData({ cellUpdateTimeout});
    },
    titleTap(){
      this.setData({
        isSpread : !this.data.isSpread
      });
      const spread = this.data.isSpread; 
      this.getRelationNodes('../cell/index').forEach((cell,index)=> {
        cell.updateDisplay(spread);
      });
      this.getRelationNodes('../field/index').forEach((cell, index) => {
        cell.updateDisplay(spread);
      });
      this.getRelationNodes('../../../components/field/index').forEach((cell, index) => {
        cell.updateDisplay(spread);
      });
    }
  }
});
