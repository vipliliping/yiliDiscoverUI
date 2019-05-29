'use strict';
discovery.controller('AddDashboardCtrl', function ($scope, $rootScope, $location, $http, $filter, $uibModalInstance) {
    "ngInject";
    var translate = $filter('translate');
    $scope.dashboardType = null;
    $scope.categoryList = [];
    var utils = {
        ajax: {
            addDashboard: function (dashboardName, dashboardType) {
                var param = {
                    json: angular.toJson({
                        "layout": {"rows": []},
                        "categoryId": dashboardType,
                        "name": dashboardName
                    })
                };
                $http.post("dashboard/saveNewBoard.do", param)
                    .success(function (response) {
                        var id = response.uuid;
                        if (id) $location.url("/nv/dashboard/default/" + id);
                        $uibModalInstance.close();
                        $rootScope.$broadcast("boardChange");
                        // $scope.$emit("boardChange");
                        // $state.go('nv.dashboard.view', {id: id});
                    });
            },
            getCategoryList: function () {
                $http.get("dashboard/getCategoryList.do").success(function (response) {
                    $scope.categoryList = [{id: null, name: translate('CONFIG.DASHBOARD.MY_DASHBOARD')}];
                    _.each(response, function (o) {
                        $scope.categoryList.push(o);
                    });
                });
            }
        }
    };
    $scope.ok = function () {
        if ($scope.dashboardName)
            utils.ajax.addDashboard($scope.dashboardName, $scope.dashboardType);
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
    utils.ajax.getCategoryList();

}).controller('nvHomeCtrl', function ($scope, $rootScope, $http, $uibModal, ModalUtils, $filter, $location) {
    "ngInject";
    var translate = $filter('translate');
    $scope.dashboardName = '';
    var utils = {
        ajax: {
            getAll: function () {
                utils.ajax.getBoardList();
                // utils.ajax.getDatasetList();
                // utils.ajax.getWidgetList();
                utils.ajax.getAllDemandList();
                utils.ajax.getDemandRight();
            },
            getBoardList: function () {
                return $http.get("admin/getBoardListUser.do").success(function (response) {
                    $scope.boardList = response;
                });
            },
            getDatasetList: function () {
                return $http.get("admin/getDatasetListUser.do").success(function (response) {
                    $scope.datasetList = response;
                });
            },
            getWidgetList: function () {
                return $http.get("admin/getWidgetListUser.do").success(function (response) {
                    $scope.widgetList = response;
                });
            },
            getAllDemandList: function () {
                return $http.get("dashboard/getAllDemandList.do").success(function (response) {
                    $scope.demandList = response;
                });
            },
            getDemandRight: function () {
                return $http.get("admin/getDemandRight.do").success(function (response) {
                    $scope.demandRight = response;
                });
            },
            deleteBoard: function (id, callback) {
                ModalUtils.confirm(translate("COMMON.CONFIRM_DELETE"), "modal-warning", "sm", function () {
                    $http.post("dashboard/deleteBoard.do", {id: id}).success(callback);
                });
            }
        }
    };
    utils.ajax.getAll();
    // getDemandRight(); //主页是否显示需求模块
    $scope.openDashboardModel = function () {
        $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'addDashboardModel.html',
            size: 'sm',
            controller: 'AddDashboardCtrl'
        });
    };
    $scope.removeDashboard = function (id) {
        utils.ajax.deleteBoard(id, function (serviceStatus) {
            if (serviceStatus.status == '1') {
                utils.ajax.getBoardList();
                $rootScope.$broadcast("boardChange");
                ModalUtils.alert(serviceStatus.msg, "modal-success", "sm");
            } else {
                ModalUtils.alert(serviceStatus.msg, "modal-warning", "lg");
            }
        });
    };
    $scope.updateStatus = function (id, status) {
        $http.post("dashboard/updateStatus.do", {
            id: id,
            status: status
        }).success(function (serviceStatus) {
            if (serviceStatus.status == '1') {
                utils.ajax.getAllDemandList();
                ModalUtils.alert(serviceStatus.msg, "modal-success", "sm");
            } else {
                ModalUtils.alert(serviceStatus.msg, "modal-warning", "lg");
            }
        });
    };
    $scope.goToUploadExcel = function () {
        $location.url("/nv/excel/upload");
    }
});
