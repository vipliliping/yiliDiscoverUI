discovery.controller('chartCtrl',
  function ($compile, $templateCache, $scope, $stateParams, ModalUtils,
            chartService, $uibModal, $http, $filter) {
    'ngInject'

    $scope.widgetList = []

    initChart()
    function initChart() {
      $http.get('dashboard/getWidgetList.do').success(function (response) {
        $scope.widgetList = response
        setChartToMind()
      })
    }

    function setChartToMind() {
      var widget = _.find($scope.widgetList, function (w) {
        return w.id == $stateParams.wid
      })
      addWidget(widget)
    }

    var appendDom = function (scope) {
      var height = $(document).outerHeight() + ' !important'
      var width = $(document).outerWidth()
      var element = $('#inner-container')
      var template = $templateCache.get('nvEchartContent')
      var link = $compile(template)
      element.append(link(scope))
      element.find('.box-body').width(width - 90)
      element.find('.box-body').height(height)
      var ndWrapper = element.find('.box-body')
      scope.widget.render(ndWrapper, null, scope)
    }

    var addWidget = function (widget) {
      var newWidget = {
        name: widget.name,
        widgetId: widget.id,
        widget: widget
      }
      buildRender(newWidget, false)
      appendDom($scope)
    }

    var buildRender = function (w, reload) {
      w.render = function (content, optionFilter, scope) {
        chartService.render(content,
          w.widget.data, optionFilter, scope, reload, undefined, w.theme).
          then(function (d) {
            w.realTimeTicket = d
            w.loading = false
          })
        w.realTimeOption = {optionFilter: optionFilter, scope: scope}
      }
      w.modalRender = function (content, optionFilter, scope) {
        w.modalRealTimeTicket = chartService.render(content,
          w.widget.data, optionFilter, scope, reload, undefined, w.theme)
        w.modalRealTimeOption = {
          optionFilter: optionFilter,
          scope: scope
        }
      }
      $scope.widget = w
    }
  })
