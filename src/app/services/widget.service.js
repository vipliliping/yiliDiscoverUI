(function () {
  'use strict'

  angular
    .module('discovery')
    .service('widgetService', widgetService)

  /** @ngInject */
  function widgetService(exports, ajaxService) {
    const URL = H.URL({
      GET_ALL_WIDGET_LIST: 'admin/getWidgetList.do'
    })
    return exports.service({
      data: {
        all: []
      },
      created() {
        this.getAllAsync(true).then(() => {
        })
      },
      actions: {
        /**
         * 获得全部widget(admin权限?)
         * @returns [promise] all widget list
         */
        getAllAsync(reload) {
          return ajaxService.getCacheList.apply(this, ['all', URL.GET_ALL_WIDGET_LIST, reload])
        }
      },
      utils: {}
    })
  }
})()
