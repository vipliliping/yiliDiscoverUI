'use strict';
discovery.controller('nvExploreListCtrl', function ($scope, $state, $stateParams,
                                                 $http, $uibModal, dataService,
                                                 ModalUtils, updateService, $filter,
                                                 chartService, $timeout, $q) {
        "ngInject";
        var translate = $filter('translate');
        var updateUrl = "dashboard/updateWidget.do";
        var treeID = 'widgetTreeID'; // Set to a same value with treeDom
        var originalData = [];

        $scope.gotoDataset = function (datasetId) {
            window.open('#/nv/cube/' + datasetId, 'cube');
        }

        $scope.goToCreateChart = function () {
            $state.go("nv.explore_create");
        }
        /** js tree related start... **/
        $scope.treeConfig = jsTreeConfig1;
        var getWidgetList = function (callback) {
            $http.get("dashboard/getWidgetList.do").success(function (response) {
                $scope.widgetList = response;
                if (callback) {
                    callback();
                }
                $scope.searchNode();
            });
        };

        var getCategoryList = function () {
            $http.get("dashboard/getWidgetCategoryList.do").success(function (response) {
                $scope.categoryList = response;
                $("#widgetName").autocomplete({
                    source: $scope.categoryList
                });
            });
        };
        getWidgetList();
        getCategoryList();
        $("#" + treeID).keyup(function (e) {
            if (e.keyCode == 46) {
                $scope.deleteNode();
            }
        });

        var getSelectedWidget = function () {
            var selectedNode = jstree_GetSelectedNodes(treeID)[0];
            return _.find($scope.widgetList, function (w) {
                return w.id == selectedNode.id;
            });
        };

        var checkTreeNode = function (actionType) {
            return jstree_CheckTreeNode(actionType, treeID, ModalUtils.alert);
        };

        var switchNode = function (id) {
            $scope.ignoreChanges = false;
            var widgetTree = jstree_GetWholeTree(treeID);
            widgetTree.deselect_all();
            widgetTree.select_node(id);
        };

        $scope.applyModelChanges = function () {
            return !$scope.ignoreChanges;
        };

        $scope.copyNode = function () {
            if (!checkTreeNode("copy")) return;
            $scope.copyWgt(getSelectedWidget());
        };

        $scope.copyWgt = function (widget) {
            var o = angular.copy(widget);
            o.name = o.name + "_copy";
            $http.post("dashboard/saveNewWidget.do", {json: angular.toJson(o)}).success(function (serviceStatus) {
                if (serviceStatus.status == '1') {
                    getWidgetList();
                    ModalUtils.alert(translate("COMMON.SUCCESS"), "modal-success", "sm");
                } else {
                    ModalUtils.alert(serviceStatus.msg, "modal-warning", "lg");
                }
                $scope.optFlag == 'none';
            });
        };


        $scope.previewList = [];
        $scope.datasetFilters = {};
        $scope.widgetFilters = {};
        var utils = {
            filter: {
                injectFilter: function (widget) {
                    widget.data.config.boardFilters = [];
                    if (_.isUndefined(widget.data.datasetId)) {
                        widget.data.config.boardFilters = $scope.widgetFilters[widget.id];
                    } else {
                        widget.data.config.boardFilters = $scope.datasetFilters[widget.data.datasetId];
                    }
                    return widget;
                }
            },
            widget: {
                rendWidget: function (widget, reload) {
                    utils.widget.buildRender(widget, reload);
                    widget.loading = true;
                    widget.show = true;
                    //real time load task
                    var w = widget.widget.data;
                    var ds = _.find($scope.datasetList, function (e) {
                        return e.id == w.datasetId;
                    });
                    if (ds && ds.data.interval && ds.data.interval > 0) {
                        if (!$scope.intervalGroup[w.datasetId]) {
                            $scope.intervalGroup[w.datasetId] = [];
                            $scope.intervals.push($interval(function () {
                                // refreshParam();
                                _.each($scope.intervalGroup[w.datasetId], function (e) {
                                    e();
                                });
                            }, ds.data.interval * 1000));
                        }
                        $scope.intervalGroup[w.datasetId].push(function () {
                            try {
                                if (widget.show) {
                                    chartService.realTimeRender(widget.realTimeTicket, utils.filter.injectFilter(widget.widget).data)
                                    if (widget.modalRealTimeTicket) {
                                        chartService.realTimeRender(widget.modalRealTimeTicket, utils.filter.injectFilter(widget.widget).data, widget.modalRealTimeOption.optionFilter, null)

                                    }
                                }
                            } catch (e) {
                                console.error(e);
                            }
                        });
                    }
                },
                loadWidget: function (reload) {
                    // paramToFilter();
                    _.each($scope.board.layout.rows, function (row) {
                        _.each(row.widgets, function (widget) {
                            if (!_.isUndefined(widget.hasRole) && !widget.hasRole) {
                                return;
                            }
                            utils.widget.rendWidget(widget, reload)
                        });
                    });
                },
                buildRender: function (w, reload) {
                    w.render = function (content, optionFilter, scope) {
                        chartService.render(content, utils.filter.injectFilter(w.widget).data, optionFilter, scope, reload)
                            .then(function (d) {
                                w.realTimeTicket = d;
                                w.loading = false;
                            });
                        w.realTimeOption = {optionFilter: optionFilter, scope: scope};
                    };
                    w.modalRender = function (content, optionFilter, scope) {
                        w.modalRealTimeTicket = chartService.render(content, utils.filter.injectFilter(w.widget).data, optionFilter, scope);
                        w.modalRealTimeOption = {optionFilter: optionFilter, scope: scope};
                    };
                }
            }
        };
        $scope.editNode = function () {
            var widget = getSelectedWidget();
            $state.go("nv.explore_item", {id: widget.id});
        };
        $scope.clickNode = function () {
            var widget = getSelectedWidget();
            $http.post("dashboard/checkWidget.do", {id: widget.id}).success(function (response) {
                if (response.status == '1') {
                    widget = {
                        widget: widget
                    };
                    utils.widget.rendWidget(widget, false);
                    $scope.previewList[0] = widget;
                    if ($scope.customDs == true) $scope.doConfigParams();
                } else {
                    var d = widget.data.datasetId ? 'CONFIG.WIDGET.DATASET' : 'CONFIG.WIDGET.DATA_SOURCE';
                    ModalUtils.alert(translate("ADMIN.CONTACT_ADMIN") + "：" + translate(d) + '/' + response.msg, "modal-danger", "lg");
                }
            });
        };

        $scope.deleteNode = function () {
            if (!checkTreeNode("delete")) return;
            $scope.deleteWgt(getSelectedWidget());
        };
        $scope.deleteWgt = function (widget) {
            ModalUtils.confirm(translate("COMMON.CONFIRM_DELETE"), "modal-info", "lg", function () {
                $http.post("dashboard/deleteWidget.do", {id: widget.id}).success(function (serviceStatus) {
                    if (serviceStatus.status == '1') {
                        getWidgetList();
                    } else {
                        ModalUtils.alert(serviceStatus.msg, "modal-warning", "lg");
                    }
                    $scope.optFlag == 'none';
                });
            });
        };
        $scope.searchNode = function () {
            var para = {wgtName: '', dsName: '', dsrName: ''};

            //map widgetList to list (add datasetName and datasourceName)
            var list = $scope.widgetList.map(function (w) {
                var ds = _.find($scope.datasetList, function (obj) {
                    return obj.id == w.data.datasetId
                });
                var dsrName = '';
                var dsr;
                if (ds) {
                    dsr = _.find($scope.datasourceList, function (obj) {
                        return obj.id == ds.data.datasource
                    });
                } else if (w.data.datasource) {
                    dsr = _.find($scope.datasourceList, function (obj) {
                        return obj.id == w.data.datasource
                    });
                }
                return {
                    "id": w.id,
                    "name": w.name,
                    "categoryName": w.categoryName,
                    "datasetName": ds ? ds.name : '',
                    "datasourceName": dsr ? dsr.name : dsrName
                };
            });

            //split search keywords
            if ($scope.keywords) {
                if ($scope.keywords.indexOf(' ') == -1 && $scope.keywords.indexOf(':') == -1) {
                    para.wgtName = $scope.keywords;
                } else {
                    var keys = $scope.keywords.split(' ');
                    for (var i = 0; i < keys.length; i++) {
                        var w = keys[i].trim();
                        if (w.split(':')[0] == 'wg') {
                            para["wgtName"] = w.split(':')[1];
                        }
                        if (w.split(':')[0] == 'ds') {
                            para["dsName"] = w.split(':')[1];
                        }
                        if (w.split(':')[0] == 'dsr') {
                            para["dsrName"] = w.split(':')[1];
                        }
                    }
                }
            }
            //filter data by keywords
            originalData = jstree_CvtVPath2TreeData(
                $filter('filter')(list, {name: para.wgtName, datasetName: para.dsName, datasourceName: para.dsrName})
            );
            jstree_ReloadTree(treeID, originalData);
            if ($scope.keywords)
                _.delay(function () {
                    $scope.treeInstance.jstree(true).open_all();
                }, 100);
        };

        $scope.treeEventsObj = function () {
            var baseEventObj = jstree_baseTreeEventsObj({
                ngScope: $scope, ngHttp: $http, ngTimeout: $timeout,
                treeID: treeID, listName: "widgetList", updateUrl: updateUrl
            });
            return baseEventObj;
        }();

        $scope.doConfigParams = function () {
            $http.get('dashboard/getConfigParams.do?type=' + $scope.datasource.type + '&page=widget.html').then(function (response) {
                $scope.params = response.data;
            });
        };

        $scope.changeDs = function () {
            $scope.curWidget.query = {};
            $http.get('dashboard/getConfigParams.do?type=' + $scope.datasource.type + '&page=widget.html').then(function (response) {
                $scope.params = response.data;
                for (var i in $scope.params) {
                    var name = $scope.params[i].name;
                    var value = $scope.params[i].value;
                    var checked = $scope.params[i].checked;
                    var type = $scope.params[i].type;
                    if (type == "checkbox" && checked == true) {
                        $scope.curWidget.query[name] = true;
                    }
                    if (type == "number" && value != "" && !isNaN(value)) {
                        $scope.curWidget.query[name] = Number(value);
                    } else if (value != "") {
                        $scope.curWidget.query[name] = value;
                    }
                }
            });
        };

        $scope.setCities = function () {
            var province = _.find($scope.provinces, function (e) {
                return e.code == $scope.curWidget.config.province.code;
            });
            if (province && province.cities) {
                $scope.cities = province.cities
            } else if ($scope.curWidget.config.city && $scope.curWidget.config.city.code) {
                $scope.curWidget.config.city.code = "";
            }
        }
        /** js tree related End... **/


        /** Ace Editor Starer... **/
        // $scope.queryAceOpt = datasetEditorOptions();
        $scope.autoBuildModel = function () {
            const _vm = this
            $uibModal.open({
              templateUrl: 'src/view/config/modal/autoModel.html',
              windowTemplateUrl: 'src/view/util/modal/window.html',
              backdrop: false,
              size: 'lg',
              scope: $scope,
              controller: function ($scope, $uibModalInstance) {
                  "ngInject";
                  $scope.datasourceList = null
                  $scope.tableList = []
                  $scope.currentDatasource = null
                  $scope.currentTable = null
                  $scope.name = ''
                  $scope.searchSourceStr = ''
                  $scope.searchTableStr = ''

                  var getDatasourceList = function () {
                    $http.get("dashboard/getDatasourceList.do").success(function (response) {
                        $scope.datasourceList = response;
                    });
                  };
                  $scope.close = function () {
                    $uibModalInstance.close();
                  };
                  $scope.ok = function () {
                    if (!($scope.currentDatasource && $scope.currentTable && $scope.name)) {
                      return
                    }
                    var postData = {
                      data: {
                        expressions: [],
                        filters: [],
                        schema: {
                          dimension: [],
                          measure: []
                        },
                        datasource: $scope.currentDatasource.id + '',
                        query: {
                          sql: 'select * from ' + $scope.currentTable
                        }
                      },
                      name: $scope.name,
                      categoryName: '默认分类',
                      loadFromCache: true
                    }
                    $http.post('dashboard/saveNewDataset.do', {json: angular.toJson(postData)}).
                    success(function (serviceStatus) {
                      if (serviceStatus.status == '1') {
                        $state.go('nv.explore_create_by', {cube_id: serviceStatus.uuid});
                        ModalUtils.alert(translate('COMMON.SUCCESS'), 'modal-success',
                      'sm')
                      } else {
                          if(serviceStatus.uuid) {
                            $state.go('nv.explore_create_by', {cube_id: serviceStatus.uuid});
                          } else {
                            $scope.alerts = [{msg: serviceStatus.msg, type: 'danger'}]
                          }
                      }
                    })
                    this.close();
                  };
                  $scope.selectDataSource = function (event, item) {
                    $scope.currentDatasource = item
                    var dom = event.target;
                    var $ = window.$;
                    $('.data-active').removeClass('data-active');
                    dom.classList.add("data-active");
                    const _vm = $scope
                    $http.post("dashboard/getTableListByDatasourceId.do", {
                      id: _vm.currentDatasource.id,
                    }).success(function (response) {
                      _vm.tableList = response
                    });
                  }
                  $scope.selectTable = function (event, item) {
                    $scope.name = item
                    $scope.currentTable = item
                    var dom = event.target;
                    var $ = window.$;
                    $('.table-active').removeClass('table-active');
                    dom.classList.add("table-active");
                  }
                  getDatasourceList();
              }
            });
          }
    }
)
;
