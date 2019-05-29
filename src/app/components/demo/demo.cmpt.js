(function () {
  'use strict';
  angular
    .module('discovery')
    .directive('demoCmpt', function () {
      return {
        restrict: 'EAC',
        replace: true,
        transclude: true,
        scope: {
          id: "@",
          up: "&"
        },
        templateUrl: H.CMPT('demo/demo'),
        controller: testCmptCtrl
      }
    })

  /** @ngInject */
  function testCmptCtrl($scope, $element, $attrs, $transclude, exports, demoService) {
    exports.controller($scope, {
      service: {
        demo: demoService
      },
      data: {
        listCount: 0
      },
      methods: {
        reset() {
          $scope.$emit('childRest', this.demo.list)
          this.demo.reset()
        }
      },
      destroyed() {
      }
    })
  }
})();
