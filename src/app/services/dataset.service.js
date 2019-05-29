(function () {
  'use strict'

  angular
    .module('discovery')
    .service('datasetService', datasetService)

  /** @ngInject */
  function datasetService(exports, ajaxService) {
    const URL = H.URL({
      GET_ALL_DATASET_LIST: 'admin/getDatasetList.do'
    })
    return exports.service({
      data: {
        all: []
      },
      created() {
        // this.getAllAsync(true).then(() => {
        // })
      },
      actions: {
        /**
         * 获得全部dataset(admin权限?)
         * @returns [promise] all widget list
         */
        getAllAsync(reload) {
          return ajaxService.getCacheList.apply(this, ['all', URL.GET_ALL_DATASET_LIST, reload])
        }
      },
      utils: {}
    })
  }
})()
