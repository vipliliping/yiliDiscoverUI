(function () {
  'use strict'
  angular
    .module('discovery')
    .directive('adminUserResCmpt', function () {
      return {
        restrict: 'EAC',
        replace: true,
        transclude: false,
        scope: {},
        templateUrl: H.CMPT('admin/user/res'),
        controller: adminUserResCmpt
      }
    })

  /** @ngInject */
  function adminUserResCmpt($scope, $element, $attrs, $transclude,
                            exports, adminUserService) {
    const utils = {}
    exports.controller($scope, {
      service: {
        adminUserService
      },
      data: {},
      created() {
      },
      events: {},
      watch: {},
      methods: {},
      destroyed() {
      }
    })
  }
})()
