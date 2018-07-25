// 使用說明 https://www.jianshu.com/p/d2b202326fd9
'use strict';

var DEFAULT_DATA = {
  show: false,
  message: '',
  icon: '',
  image: '',
  mask: false
};

var SUPPORT_TYPE = ['loading', 'success', 'fail','warn'];

Component({
  data: Object.assign({}, DEFAULT_DATA),

  methods: {
    show: function show(options) {
      var toastOptions = Object.assign({}, options);

      var icon = options.icon || '';
      var image = options.image || '';
      if (SUPPORT_TYPE.indexOf(options.type) > -1) {
        icon = options.type;
        image = '';
      }

      this.setData(Object.assign({}, toastOptions, {
        icon: icon,
        image: image
      }));
    },
    clear: function clear() {
      this.setData(Object.assign({}, DEFAULT_DATA));
    }
  }
});