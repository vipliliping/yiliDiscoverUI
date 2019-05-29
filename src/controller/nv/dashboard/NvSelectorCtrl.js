'user strict';
discovery.controller('newParamSelector', function ($scope, $http, $timeout, $interval) {
    "ngInject";
    $scope.param = $scope.$parent.param;
    $scope.param.selects = [];
    _.each($scope.param.col, function (c) {
        var p;
        if (_.isUndefined(c.datasetId)) {
            _.each($scope.datasetList, function (dataset) {
                if (c.widgetId == dataset.id) {
                    p = {
                        datasourceId: dataset.data.datasource,
                        query: angular.toJson(dataset.data.query),
                        datasetId: null
                    };
                }
            })
        } else {
            p = {datasourceId: null, query: null, datasetId: c.datasetId};
        }

        // 条件组select下拉
        // $http.post("dashboard/getDimensionValues.do", {
        //     datasourceId: p.datasourceId,
        //     query: p.query,
        //     datasetId: p.datasetId,
        //     colmunName: c.column
        // }).success(function (response) {
        //     _.each(response, function (s) {
        //         if (_.indexOf($scope.param.selects, s) < 0) {
        //             $scope.param.selects.push(s);
        //         }
        //     });
        //
        // });
    });

    //on-select="loadParme($item)" on-remove="removeParme($item)"
    // $scope.loadParme = function (param) {
    // $scope.param.values.push(param);
    // $scope.param.type = "=";
    // $scope.applyParamFilter();
    // };
    // $scope.removeParme = function(param){
    // $scope.param.values = $scope.ctrl.multipleDemo;
    // $scope.param.type = "=";
    // $scope.applyParamFilter();

    // };
    var selectedChange = function (selected) {
        if (!_.isUndefined(selected)) {
            if (!$scope.param.type)
                $scope.param.type = "=";
            $scope.applyParamFilter();
        }
    };
    // $scope.$watch('param.values', selectedChange);

    $scope.enterKeyUp = function (e) {
        var keycode = window.event ? e.keyCode : e.which;
        if (keycode == 13) {
            $scope.clickSearch();
        }
    };

    $scope.clickSearch = function (e) {
        var str = $scope.inputParam;
        if ($.trim(str) != "") {
            $scope.param.type = "like";
            $scope.param.values = ["%" + str + "%"];
        } else {
            $scope.param.type = "like";
            $scope.param.values = [];
        }
    };

    $scope.clearParams = function (e) {
        $scope.param.values = [];
    }
});

