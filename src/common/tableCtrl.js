(function () {
  'use strict';
  angular
    .module('discovery')
    .directive('tableCtrl', function () {
      return {
        restrict: 'EAC',
        replace: true,
        transclude: true,
        scope: {
          id: "@",
          sql: "@"
        },
        templateUrl: 'src/common/table.tpl.html',
        controller: tableCmptCtrl
      }
    })

  /** @ngInject */
  function tableCmptCtrl($scope, $http, exports, $attrs) {
    exports.controller($scope,
      {
        // service: {
        //   demo: demoService
        // },
        watch: {
          ['sql']() {
            if ($scope.id && $scope.sql) {
              $http.get("dashboard/getTableListByDatasourceIdSql.do?datasourceId=" + $scope.id + '&page=' + $scope.page +'&step='+$scope.pageSize + '&sql=' + $scope.sql)
                .success(function (response) {
                  $scope.column = response.column
                  $scope.data = response.data
                  $scope.pageCount = response.pageCount
                  $scope.page = response.page
                });
            }
          }
        },
        data: {
          pageSize: 10,
          column: [],
          data: [],
          pageCount: null,
          page: 1
        },
        created() {
        },
        methods: {
          pageChanged(page) {
            $scope.page = page
            $http.get("dashboard/getTableListByDatasourceIdSql.do?datasourceId=" + $scope.id + '&page=' + $scope.page +'&step='+$scope.pageSize + '&sql=' + $scope.sql)
              .success(function (response) {
                $scope.column = response.column
                $scope.data = response.data
                $scope.pageCount = response.pageCount
                $scope.page = response.page
              });
          }
        },
        destroyed() {
        }
      })
  }
})();
