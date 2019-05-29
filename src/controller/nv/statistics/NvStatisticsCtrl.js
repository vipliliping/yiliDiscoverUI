'use strict';
discovery.controller('NvStatisticsCtrl', function ($scope, $stateParams, $http, $uibModal, $filter, ModalUtils) {
    "ngInject";
    var utils = {
        ajax: {
            getAll: function () {
                utils.ajax.getCubeAllMess();
            },
            getCubeAllMess: function () {
                return $http.get("statistics/getCubeAllMessList.do").success(function (response) {
                    $scope.cubeList = response;
                });
            },
            getWidgetAllMess: function () {
                return $http.get("statistics/getWidgetAllMessList.do").success(function (response) {
                    $scope.widgetList = response;
                });
            }
        }
    };
    utils.ajax.getAll();
});
