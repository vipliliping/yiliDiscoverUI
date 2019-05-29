(function () {
  'use strict'

  angular
    .module('discovery')
    .service('menuService', menuService)

  /** @ngInject */
  function menuService(exports, ajaxService) {
    const URL = H.URL({
      GET_ALL_MENU_LIST: 'admin/getMenuList.do'
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
         * 获得全部menu(admin权限?)
         * @returns [promise] all widget list
         */
        getAllAsync(reload) {
          return ajaxService.getCacheList.apply(this, ['all', URL.GET_ALL_MENU_LIST, reload])
        }
      },
      utils: {}
    })
  }
})()
