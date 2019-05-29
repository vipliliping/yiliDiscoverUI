(function () {
  'use strict'

  angular
    .module('discovery')
    .service('datasourceService', datasourceService)

  /** @ngInject */
  function datasourceService(exports, ajaxService) {
    const URL = H.URL({
      GET_ALL_DATASOURCE_LIST: 'admin/getDatasourceList.do'
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
         * 获得全部datasource(admin权限?)
         * @returns [promise] all widget list
         */
        getAllAsync(reload) {
          return ajaxService.getCacheList.apply(this, ['all', URL.GET_ALL_DATASOURCE_LIST, reload])
        }
      },
      utils: {}
    })
  }
})()
