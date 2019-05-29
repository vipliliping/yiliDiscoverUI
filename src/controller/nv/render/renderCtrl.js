'use strict'
discovery.controller('renderCtrl', function ($scope, $state, $stateParams,
                                          $http, $uibModal, dataService,
                                          ModalUtils, updateService, $filter,
                                          chartService) {
    'ngInject'
    var getWidgetList = function (callback) {
      $http.get('dashboard/getWidgetList.do').success(function (response) {
        $scope.widgetList = response
        var widget = getSelectedWidget($stateParams.wid)
        widget = {
          widget: widget
        }
        utils.widget.rendWidget(widget, false)
        $scope.previewList[0] = widget
      })
    }
    getWidgetList()

    var getSelectedWidget = function (id) {
      return _.find($scope.widgetList, function (w) {
        return w.id == id
      })
    }

    $scope.previewList = []
    $scope.datasetFilters = {}
    $scope.widgetFilters = {}
    var utils = {
      filter: {
        injectFilter: function (widget) {
          widget.data.config.boardFilters = []
          if (_.isUndefined(widget.data.datasetId)) {
            widget.data.config.boardFilters = $scope.widgetFilters[widget.id]
          } else {
            widget.data.config.boardFilters = $scope.datasetFilters[widget.data.datasetId]
          }
          return widget
        },
      },
      widget: {
        rendWidget: function (widget, reload) {
          utils.widget.buildRender(widget, reload)
          widget.loading = true
          widget.show = true
          //real time load task
          // var w = widget.widget.data
        },
        buildRender: function (w, reload) {
          w.render = function (content, optionFilter, scope) {
            chartService.render(content, utils.filter.injectFilter(w.widget).data,
              optionFilter, scope, reload).then(function (d) {
              w.realTimeTicket = d
              w.loading = false
              $("body").append('<div class="persistFinish"></div>')
            })
            w.realTimeOption = {optionFilter: optionFilter, scope: scope}
          }
          // w.modalRender = function (content, optionFilter, scope) {
          //   w.modalRealTimeTicket = chartService.render(content,
          //     utils.filter.injectFilter(w.widget).data, optionFilter, scope)
          //   w.modalRealTimeOption = {optionFilter: optionFilter, scope: scope}
          // }
        }
      }
    }
  }
)

