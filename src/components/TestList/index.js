import debounce from '../../utils/debounce';
Component({

  behaviors: [],

  properties: {
    testList: {
      type: Array,
      value: []
    }
  },
  data: {}, // 私有数据，可用于模版渲染

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function () { },
  moved: function () { },
  detached: function () { },
  ready: function () {
    // console.log('sss', this.data)
  },

  methods: {
    toTestActive: debounce(function (e) {
      let _eventDetail = {
        url: e.target.dataset.url,
        topColor: e.target.dataset.topColor,
        titleColor: e.target.dataset.titleColor
      };
      let _eventOption = { bubbles: true, composed: true }

      this.triggerEvent('jumpEvent', _eventDetail, _eventOption)
    }, 500)
  }

})