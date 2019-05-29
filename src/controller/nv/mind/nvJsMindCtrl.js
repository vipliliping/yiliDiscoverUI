discovery.controller('nvJsMindCtrl',
  function ($compile, $templateCache, $scope, $stateParams, ModalUtils,
            chartService, $uibModal, $http, $filter, $state) {
    'ngInject'

    var translate = $filter('translate')
    $scope.widgetMindList = []
    $scope.widgetList = []
    $scope.mind = null
    $scope.categoryName = null

    initMind()

    function initMind() {
      $http.get('dashboard/getWidgetList.do').success(function (response) {
        $scope.widgetList = response
        $http.get('mindmap/getMindmapData.do?id=' + $stateParams.id).
          success(function (response) {
            $scope.categoryName = response.categoryName
            $scope.mind = JSON.parse(response.json)
            $scope.mind.jsMind.data.id = response.id
            var options = {
              container: 'jsmind_container',
              editable: true,
              theme: 'warning',
              support_html: true,
              view: {
                hmargin: 100,        // 思维导图距容器外框的最小水平距离
                vmargin: 50,         // 思维导图距容器外框的最小垂直距离
                line_width: 2,       // 思维导图线条的粗细
                line_color: '#e3d9f2'   // 思维导图线条的颜色
              }
            }
            var jm = jsMind.show(options, $scope.mind.jsMind)
            setChartToMind()
            $scope.jsMind = jm
          })
      })
    }

    function setChartToMind() {
      _.each($scope.mind.widget, function (item) {
        var widget = _.find($scope.widgetList, function (w) {
          return w.id == item.widgetId
        })
        addWidget(widget, item.nodeId)
      })
    }

    $.contextMenu({
      selector: 'jmnode',
      build: function ($trigger, e) {
        return {
          callback: function (key, options) {
            var selected_node = $scope.jsMind.get_selected_node()
            $scope.nodeId = $trigger.attr('nodeid')
            switch (key) {
              case 'chart':
                jsMindAddWidgetModelOpen(selected_node)
                break
              case 'text':
                jsMindAddTextModelOpen(selected_node)
                break
              case 'delete':
                jsMindDelete(selected_node)
                break
              case 'new':
                $state.go("nv.explore_create");
                break
            }
          },
          items: {
            'chart': {name: '插入图表'},
            'text': {name: '插入文字'},
            'new': {name: '新建图表'},
            'sep1': '---------',
            'delete': {name: '删除节点'}
          }
        }
      }
    })

    function jsMindDelete(selected_node) {
      if (selected_node.children.length) {
        if (confirm('删除该节点将同时删除下属子节点，是否确认删除？')) {
          $scope.jsMind.remove_node(selected_node)
        }
      } else $scope.jsMind.remove_node(selected_node)
    }

    var jsMindAddTextModelOpen = function (selected_node) {
      var addTextModel = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'src/view/nv/dashboard/layout/modals/addJsMindNodeModel.html',
        size: 'sm',
        controller: 'addJsMindNodeCtrl'
      })

      addTextModel.result.then(function (text) {
        var nodeid = jsMind.util.uuid.newid()
        var node = $scope.jsMind.add_node(selected_node, nodeid, text)
      }, function () {//cce
        console.info('Modal dismissed at: ' + new Date())
      })
    }

    var jsMindAddWidgetModelOpen = function (selected_node) {
      var addWidgetModel = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'src/view/nv/dashboard/layout/modals/addWidgetModel.html',
        size: 'sm',
        controller: 'AddWidgetModelCtrl'
      })

      addWidgetModel.result.then(function (widget) {
        var nodeid = jsMind.util.uuid.newid()
        var topic = '图表-' + nodeid.substr(0, 5)
        var data = {
          'width': '300',
          'height': '328'
        }
        var node = $scope.jsMind.add_node(selected_node, nodeid, topic, data)
        addWidget(widget, nodeid)
      }, function () {//cce
        console.info('Modal dismissed at: ' + new Date())
      })
    }

    var appendDom = function (scope, nodeid) {
      var element = $('jmnode[nodeid="' + nodeid + '"]')
      var template = $templateCache.get('jsMindContent')
      var link = $compile(template)
      element.addClass('isChart')
      element.empty()
      element.append(link(scope))
      var title = element.find('.chart-title')
      var href = window.location.pathname + '#/nv/explore/' + scope.widget.widgetId
      title.append('<a href="' + href + '" target="_blank" style="text-decoration: underline;">' + scope.widget.name + '</a>')
      var ndWrapper = element.find('.box-body')
      scope.widget.render(ndWrapper, null, scope)
      $scope.widgetMindList.push({
        nodeId: nodeid,
        widgetId: scope.widget.widgetId
      })
      // $scope.jsMind.resize()
    }

    var addWidget = function (widget, nodeid) {
      var newWidget = {
        name: widget.name,
        widgetId: widget.id,
        widget: widget
      }
      buildRender(newWidget, false)
      appendDom($scope, nodeid)
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

    $scope.save = function () {
      var data = $scope.jsMind.get_data()
      data.meta.name = data.data.topic
      var json = {
        jsMind: data,
        widget: $scope.widgetMindList
      }

      $http.post('/mindmap/updateMindmap.do',
        {
          json: angular.toJson(json),
          name: data.data.topic,
          id: $stateParams.id,
          categoryName: $scope.categoryName
        }).success(function (response) {
        if (response.status == '1') {
          ModalUtils.alert(translate('COMMON.SUCCESS'),
            'modal-success', 'sm')
        } else {
          ModalUtils.alert(response.msg, 'modal-warning', 'lg')
        }
      })
    }

    $scope.permissionSetting = function () {
      var permissionSettingModel = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'src/view/nv/permission/setting.html',
        size: 'lg',
        controller: 'permissionSettingCtrl',
        resolve: {
          config: function () {
            return {
              type: 'brain',
              id: $stateParams.id
            }
          }
        }
      })
      permissionSettingModel.result.then(function () {
      })
    }
  })
