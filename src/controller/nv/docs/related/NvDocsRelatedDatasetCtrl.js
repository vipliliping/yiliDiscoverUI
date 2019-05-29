'use strict';
discovery.controller('NvDocsWidgetCtrl', function ($q, $state, $scope, $stateParams, chartService, $http, $filter, $timeout, EventService) {
    "ngInject";
    // $scope.test = "NvDocsWidgetCtrl";
    $scope.datasetFilters = [];
    $scope.widgetFilters = [];
    var getWidgetList = function ($stateParams) {
        var deferred = $q.defer();
        if ($stateParams.widgetList) {
            // #/nv/docs/result/104,105,107
            // var widgetList = $stateParams.widgetList.split(",");
            $scope.isWidgetList = true;
            var widgetList = $stateParams.widgetList;
            $.get("docs/result.do", {widgetList: widgetList})
                .success(function (data) {
                    deferred.resolve(data);
                });
        } else if ($stateParams.datasetId) {
            // #/nv/docs/related/dataset/105
            $scope.isWidgetList = false;
            $.get("dashboard/getWidgetListByDatasetId.do", {datasetId: $stateParams.datasetId})
                .success(function (data) {
                    deferred.resolve(data);
                });
        }
        return deferred.promise;
    };
    var utils = {
        filter: {
            injectFilter: function (widget) {
                if (widget.data.config.boardFiltersByInit) {
                    delete(widget.data.config.boardFiltersByInit);
                } else {
                    widget.data.config.boardFilters = [];
                    if (_.isUndefined(widget.data.datasetId)) {
                        widget.data.config.boardFilters = $scope.widgetFilters[widget.id];
                    } else {
                        widget.data.config.boardFilters = $scope.datasetFilters[widget.data.datasetId];
                    }
                }
                return widget;
            }
        },
        widget: {
            rendWidget: function (widget, reload) {
                utils.widget.buildRender(widget, reload);
            },
            loadWidget: function (reload) {
                if (_.isUndefined(reload)) reload = false;
                // paramToFilter();
                _.each($scope.widgetList, function (widget) {
                    if (!_.isUndefined(widget.hasRole) && !widget.hasRole) {
                        return;
                    }
                    //config
                    //utils.widget.setBoardFilter(widget);
                    utils.widget.rendWidget(widget, reload)
                });
            },
            buildRender: function (w, reload) {
                w.render = function (content, optionFilter, scope) {
                    chartService.render(content, utils.filter.injectFilter(w.widget).data,
                        optionFilter, scope, reload, undefined, w.theme)
                        .then(function (d) {
                            w.realTimeTicket = d;
                            w.loading = false;
                            //等待修改；暂时注释掉，等有问题在来查找
                            // chartService.realTimeRender(w.realTimeTicket, w.widget.data);
                        });
                    w.realTimeOption = {optionFilter: optionFilter, scope: scope};
                };
                w.modalRender = function (content, optionFilter, scope) {
                    w.modalRealTimeTicket = chartService.render(content, utils.filter.injectFilter(w.widget).data,
                        optionFilter, scope, reload, undefined, w.theme);
                    w.modalRealTimeOption = {optionFilter: optionFilter, scope: scope};
                };
            }
        }
    };
    getWidgetList($stateParams).then(function (data) {
        var widgetList = [], datasetId = false;
        for (var i = 0; i < data.length; i++) {
            datasetId = data[i].data.datasetId;
            widgetList.push({
                show: false,
                name: data[i].name,
                widget: data[i]
            })
        }
        $scope.widgetList = widgetList;
        if (datasetId && $scope.isWidgetList) {
            EventService.send({
                title: "3TV_route:page_change",
                addressee: "all",
                right: "preview.html#/nv/docs/related/dataset/" + datasetId
            })
        }
        utils.widget.loadWidget();
    });

    $scope.editDocsWidget = function (widgetId) {
        if (EventService.send) {
            EventService.send({
                title: "3TV_route:page_change",
                addressee: "all",
                right: "/#/nv/explore/" + widgetId
            })
        }
    };
});
