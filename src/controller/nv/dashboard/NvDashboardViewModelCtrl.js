discovery

//设置图表信息模态框
  .controller('widgetConfigModalControl',
    function ($scope, isAdmin, screenList, url, tab, tabs, widget,
              widgetThemeConfigGroups, $http, $timeout, $filter,
              $uibModalInstance) {
      'ngInject'

      //自定义筛选项
      if (widget.config && widget.config.columns &&
        (typeof widget.config.columns === 'object')) {
        $scope.columnsText = widget.config.columns.join('\n')
      }
      console.log('打开widget设置modal', widget
        // , angular.toJson(widget)
      )
      if (widget.maximizeOption == undefined) {
        widget.maximizeOption = {
          col: widget.col,
          row: widget.row,
          sizeX: widget.sizeX,
          sizeY: widget.sizeY
        }
      }
      $scope.maximizeOption = widget.maximizeOption
      $scope.maximizeOption.col = widget.maximizeOption.col
      $scope.maximizeOption.row = widget.maximizeOption.row
      $scope.maximizeOption.sizeX = widget.maximizeOption.sizeX
      $scope.maximizeOption.sizeY = widget.maximizeOption.sizeY
      $scope.maximizeSelectFilterList = widget.maximizeOption.filterSelected
      if (widget.widget)
        if (_.isUndefined(widget.maximizeOption.filters))
          $scope.maximizeSelectFilterList = angular.copy(
            widget.widget.data.filterGroups)
        else {
          var filterGroup = angular.copy(widget.widget.data.filterGroups)
          for (var i = 0; i < filterGroup.length; i++) {
            for (var j = 0; j < widget.maximizeOption.filters.length; j++) {
              if (filterGroup[i].group ==
                widget.maximizeOption.filters[j].group) {
                filterGroup[i].selected = true
              } else {
                filterGroup[i].selected = false
              }
            }
          }
          $scope.maximizeSelectFilterList = filterGroup
        }
      $scope.maxFilterInit = function () {
        return
        for (var i = 0; i < $scope.maximizeSelectFilterList.length; i++) {

        }
      }
      $scope.MAXIMIZE_TYPE = [
        {
          name: '单纯最大化', value: 'default'
        }, {
          name: '调整过滤器', value: 'filter'
        }, {
          name: '切换到tab', value: 'tab'
        }]

      $scope.tabs = tabs
      if (_.isUndefined($scope.maximizeOption)) {
        $scope.maximizeOption = {
          tabSelect: {}
        }
      }
      $scope.changeTab = function (tab) {
        if ($scope.maximizeOption.tabSelect == tab.id) {
          delete($scope.maximizeOption.tabSelect)
        } else
          $scope.maximizeOption.tabSelect = tab.id
      }

      $scope.isAdmin = isAdmin
      $scope.screenList = screenList
      $scope.checkScreen = function (id) {
        if ($scope.screenAction.target != id) {
          $scope.screenAction.target = id
        } else {
          $scope.screenAction.target = ''
        }
      }
      $scope.checkRegular = function (id, action) {
        if (action.target != id) {
          action.target = id
        } else {
          action.target = ''
        }
      }
      //iframe
      var iframeWidget = {
        name: 'iframe',
        type: 'board',
        sizeX: 10,
        sizeY: 10,
        params: [],
        tab: tab
      }
      $scope.url = url
      //init
      var EVENTS = {
        chord: true,
        line: true,
        line2: true,
        line3: true,
        pie: true,
        pie2: true,
        kpi: false,
        table: false,
        dataLineTable: true,
        funnel: true,
        sankey: true,
        echart3dMap: true,
        circular: true,
        radar: true,
        map: false,
        scatter: true,
        scatter2: true,
        gauge: false,
        wordCloud: true,
        treeMap: false,
        areaMap: false,
        heatMapCalendar: false,
        heatMapTable: true,
        markLineMap: false,
        liquidFill: false,
        flex: false,
        echart3dBar: false,
        echart3dArea: false,
        echart3dMapLine: false,
        barPolarStack: false,
        pieProportion: false,
        codeFlower: false,
        barLimits: false,
        flex2: true,
        lineMap: true,
        gantt: true,
        rose: true
      }

      //点击事件action
      if (widget.widget != undefined &&
        EVENTS[widget.widget.data.config.chart_type]) {
        $scope.showActionTab = true
        $scope.boardList = []
        $http.get('admin/getBoardListUser.do').success(function (response) {
          $scope.boardList = response
        })
        $scope.selectDushboard = null
        $scope.TARGET_SELECT = [
          {
            name: '影响本页', value: 'self'
          }, {
            name: '跳转到其他面板', value: 'dashboard'
          }, {
            name: '跳转到站外链接', value: 'url'
          }]
        if (widget.action == undefined ||
          (widget.action.type == undefined && widget.action.regular ==
            undefined)) {
          widget.action = {
            regular: false,
            list: [
              {
                type: 'self',
                target: null,
                param: {}
              }
            ]
          }
        } else if (!_.isUndefined(widget.action.type) &&
          _.isUndefined(widget.action.regular)) {
          var action = angular.copy(widget.action)
          widget.action = {
            regular: false,
            list: [action]
          }
        }
        widget.actionChange = true
        $scope.action = widget.action
        if (!_.isUndefined(widget.widget.data)) {
          var params = widget.widget.data.config.keys
          if (widget.widget.data.config.events)
            params = params.concat(widget.widget.data.config.events)
          _.each(params, function (key) {
            _.each(widget.action.list, function (list) {
              if (_.isUndefined(list.param[key.col]))
                list.param[key.col] = {
                  name: key.alias ? key.alias : key.col,
                  col: key.col,
                  regular: '',
                  selected: false
                }
            })
          })
        }
        if ($scope.isAdmin) {
          //三屏跳转screenAction
          if (widget.screenAction != undefined) {
            $scope.screenAction = widget.screenAction
          } else {
            $scope.screenAction = {}
          }
          if (_.isUndefined($scope.screenAction.param)) {
            $scope.screenAction.param = angular.copy(
              $scope.action.list[0].param)
            _.each($scope.screenAction.param, function (param) {
              param.selected = false
            })
          } else {
            for (var i in $scope.action.list[0].param) {
              var param = angular.copy($scope.action.list[0].param[i]),
                found = false
              for (var j in $scope.screenAction.param) {
                // var screenParam = $scope.screenAction.param[j];
                if (i == j) {
                  found = true
                  break
                }
              }
              if (!found) {
                param.selected = false
                $scope.screenAction.param[i] = param
              }
            }
          }
        }
      }
      $scope.pushActionList = function () {
        var aList = angular.copy($scope.action.list[0])
        aList.type = 'self'
        aList.target = null
        for (var al in aList.param) {
          aList.param[al].regular = ''
          aList.param[al].selected = false
        }
        $scope.action.list.push(aList)
      }
      $scope.deleteActionList = function (index) {
        if ($scope.action.list.length == 1) return
        $scope.action.list.splice(index, 1)
      }

      //widgetThemeConfig
      $scope.widgetThemeConfigGroups = widgetThemeConfigGroups

      if (_.isUndefined($scope.maximizeOption.type)) {
        $scope.maximizeOption.type = 'default'
      }
      //widgetName
      $scope.widget = widget

      //themeConfigList
      // $scope.themeConfigList = themeConfigList;

      if (!_.isUndefined(widget.theme))
        $scope.selectTheme = widget.theme
      if (_.isUndefined($scope.selectTheme)) {
        $scope.selectTheme = {
          select: {},
          classes: [],
          options: []
        }
      }
      $scope.changePzTheme = function (groupName, classItem) {
        if ($scope.selectTheme.select[groupName] == classItem.id) {
          delete($scope.selectTheme.select[groupName])
        } else
          $scope.selectTheme.select[groupName] = classItem.id
        var classes = [], chartOptions = []
        for (var groupName in $scope.selectTheme.select) {
          //debugger;
          var id = $scope.selectTheme.select[groupName]
          // for(var i=0;i<$scope.themeConfigList[groupName].length;i++){
          //     var item = $scope.themeConfigList[groupName][i];
          // }
          _.each($scope.widgetThemeConfigGroups[groupName], function (item) {
            if (item.id == id) {
              if (item['class'])
                classes = classes.concat(item['class'])
              // if(chartOptionList&&)
              var optionName = item['option']
              if (optionName)
                chartOptions.push(optionName)
              // if (optionName && chartOptionList[optionName]) {
              //     var optionFunction = chartOptionList[optionName];
              //     chartOptions.push(optionFunction);
              // }
            }
          })
        }
        $scope.selectTheme.options = chartOptions
        $scope.selectTheme.classes = classes
      }

      //init filter
      if (widget.widget) {
        $scope.canSelectFilterList = angular.copy(
          widget.widget.data.filterGroups)
        //自动轮换过滤器
        if (widget.config && widget.config.rotateFilters &&
          widget.config.rotateFilters.enable) {
          $scope.rotateFilters = widget.config.rotateFilters
        } else {
          $scope.rotateFilters = {}
        }
        //初始化过滤器
        if (widget.config && widget.config.filters) {
          for (var i = 0; i < widget.config.filters.length; i++) {
            for (var j = 0; j < $scope.canSelectFilterList.length; j++) {
              if (widget.config.filters[i].group ==
                $scope.canSelectFilterList[j].group)
                $scope.canSelectFilterList[j].selected = true
            }
          }

          /*for (var i = 0; i < widget.maximizeOption.filterSelected.length; i++) {
           for (var j = 0; j < $scope.maximizeSelectFilterList.length; j++) {
           if (widget.maximizeOption.filterSelected[i] == $scope.maximizeSelectFilterList[j].selected)
           $scope.maximizeSelectFilterList[j].selected = true;
           }
           }*/
        }
      }

      //button
      $scope.ok = function () {
        //自定义筛选项
        if ($scope.columnsText) {
          $scope.widget.config.columns = $scope.columnsText.split('\n')
        }
        if (_.isUndefined(widget.config)) widget.config = {}
        //filter
        if (widget.widget) {
          var filterList = []
          if ($scope.canSelectFilterList)
            for (var i = 0; i < $scope.canSelectFilterList.length; i++) {
              var filter = $scope.canSelectFilterList[i]
              if (filter.selected) filterList.push(filter)
            }
          if ($scope.rotateFilters.enable) {
            widget.config.rotateFilters = $scope.rotateFilters
          }
          widget.config.filters = filterList

          filterList = []
          if ($scope.maximizeSelectFilterList) {
            for (var i = 0; i < $scope.maximizeSelectFilterList.length; i++) {
              filter = $scope.maximizeSelectFilterList[i]
              if (filter.selected) filterList.push(filter)
            }
          }
          widget.maximizeOption.filters = filterList
        }
        //theme
        widget.theme = $scope.selectTheme
        if (widget.type == 'board' && !_.isUndefined(widget.config.url)) {
          widget.config.url = $scope.url
        }
        //返回三屏跳转
        widget.screenAction = $scope.screenAction
        //返回数据
        $uibModalInstance.close()
      }
      $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel')
      }
    })
  //添加img
  .controller('AddImgWidgetCtrl',
    function ($scope, tab, Upload, $sce, $http, $timeout, $filter,
              $uibModalInstance) {
      'ngInject'
      $scope.$watch('files', function () {
        $scope.upload($scope.files)
      })
      $scope.$watch('file', function () {
        if ($scope.file != null) {
          $scope.files = [$scope.file]
        }
      })
      $scope.imgUrl = ''
      $scope.log = ''
      $scope.upload = function (files) {
        if (files && files.length) {
          for (var i = 0; i < files.length; i++) {
            var file = files[i]
            if (!file.$error) {
              Upload.upload({
                url: '/images/upload.do',
                data: {
                  file: file
                }
              }).then(function (resp) {
                $scope.imgUrl = resp.data.imgUrl
                /*$timeout(function () {
                 $scope.log = 'file: ' +
                 resp.config.data.file.name +
                 ', Response: ' + JSON.stringify(resp.data) +
                 '\n' + $scope.log;
                 });*/
              }, null, function (evt) {
                /*var progressPercentage = parseInt(100.0 *
                 evt.loaded / evt.total);
                 $scope.log = 'progress: ' + progressPercentage +
                 '% ' + evt.config.data.file.name + '\n' +
                 $scope.log;*/
              })
            }
          }
        }
      }
      var imgWidget = {
        name: '图片',
        type: 'board',
        sizeX: 10,
        sizeY: 10,
        params: [],
        config: {},
        tab: tab,
        sign: 'img'
      }
      //$scope.url = "http://";
      $scope.ok = function () {
        imgWidget.config.imgUrl = $scope.imgUrl
        $uibModalInstance.close(imgWidget)
      }
      $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel')
      }
    })
  //添加iframe
  .controller('AddIframeWidgetCtrl',
    function ($scope, tab, $sce, $http, $timeout, $filter, $uibModalInstance) {
      'ngInject'
      var iframeWidget = {
        name: 'iframe',
        type: 'board',
        sizeX: 10,
        sizeY: 10,
        params: [],
        config: {},
        tab: tab,
        sign: 'iframe'
      }
      $scope.url = 'http://'
      $scope.ok = function () {
        iframeWidget.config.url = $scope.url
        $uibModalInstance.close(iframeWidget)
      }
      $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel')
      }
    })
  //添加时间选择器
  .controller('AddTimePickerWidgetCtrl',
    function ($scope, tab, $sce, $http, $timeout, $filter, $uibModalInstance) {
      'ngInject'
      var iframeWidget = {
        name: '时间选择器',
        type: 'board',
        sizeX: 10,
        sizeY: 10,
        params: [],
        config: {},
        tab: tab,
        sign: 'timePicker',
        timeOptions: {
          year: '年',
          month: '月',
          day: '日'
        },
        showValue: ''
      }
      $scope.name = '时间选择器'
      $scope.eventName = ''
      $scope.timeType = 'year'
      $scope.ok = function () {
        iframeWidget.changeTime = $scope.changeTime
        iframeWidget.name = $scope.name
        iframeWidget.config.eventName = $scope.eventName
        iframeWidget.config.timeType = $scope.timeType
        $uibModalInstance.close(iframeWidget)
      }
      $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel')
      }
    })
  // 自定义筛选项
  .controller('AddColsWidgetCtrl',
    function ($scope, tab, $sce, $http, $timeout, $filter, $uibModalInstance) {
      'ngInject'
      var iframeWidget = {
        name: '字段',
        type: 'board',
        sizeX: 10,
        sizeY: 10,
        params: [],
        config: {},
        tab: tab,
        sign: 'columns'
      }
      $scope.name = '字段'
      // $scope.defaultValue = ''
      // $scope.calcFormula = ''
        $scope.eventName = ''
        $scope.columns = ''
        $scope.chooseType = 1
      // 字段失焦，保存默认值
      $scope.ok = function () {
        iframeWidget.name = $scope.name
        // iframeWidget.config.calcFormula = $scope.calcFormula
        iframeWidget.config.eventName = $scope.eventName
        // if ($scope.calcFormula) {
        //   let formula = $scope.calcFormula.replace('{v}', $scope.defaultValue)
        //     try {
        //         $scope.defaultValue = eval(formula)
        //     } catch (e) {
        //         alert(e)
        //     }
        // }
          if ($scope.columns) {
              iframeWidget.config.columns = $scope.columns.split('\n')
          } else {
              iframeWidget.config.columns = []
          }
          iframeWidget.config.chooseType = $scope.chooseType
        // iframeWidget.config.defaultValue = $scope.defaultValue
        $uibModalInstance.close(iframeWidget)
      }
      $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel')
      }
    })
  // 自定义输入框
  .controller('AddInputWidgetCtrl',
      function ($scope, tab, $sce, $http, $timeout, $filter, $uibModalInstance) {
            'ngInject'
            var iframeWidget = {
                name: '自定义输入框',
                type: 'board',
                sizeX: 10,
                sizeY: 10,
                params: [],
                config: {},
                tab: tab,
                sign: 'input'
            }
            $scope.name = '自定义输入框'
            $scope.defaultValue = ''
            $scope.calcFormula = ''
            $scope.eventName = ''
            // 字段失焦，保存默认值
            $scope.ok = function () {
                iframeWidget.name = $scope.name
                iframeWidget.config.calcFormula = $scope.calcFormula
                iframeWidget.config.eventName = $scope.eventName
                if ($scope.calcFormula) {
                  let formula = $scope.calcFormula.replace('{v}', $scope.defaultValue)
                    try {
                        $scope.defaultValue = eval(formula)
                    } catch (e) {
                        alert(e)
                    }
                }
                iframeWidget.config.defaultValue = $scope.defaultValue
                $uibModalInstance.close(iframeWidget)
            }
            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel')
            }
        })
  //添加动态标题
  .controller('addDynamicTitleCtrl',
    function ($scope, row, globalParamTitleMap, tab, $sce, $http, $timeout,
              $filter, $uibModalInstance) {
      'ngInject'
      if (row) {
        $scope.dynamicTitle = row.config.dynamicTitle
        $scope.dynamicDefault = row.config.dynamicDefault
      }
      var iframeWidget = {
        name: '动态标题',
        type: 'board',
        sizeX: 10,
        sizeY: 10,
        tab: tab,
        params: [],
        config: {},
        sign: 'title'
      }
      $scope.ok = function () {
        iframeWidget.config.dynamicTitle = $scope.dynamicTitle
        iframeWidget.config.dynamicDefault = $scope.dynamicDefault
        $uibModalInstance.close(iframeWidget)
      }
      $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel')
      }
    })
  //设置主题
  .controller('SetPanelCtrl',
    function ($scope, config, boardName, categoryId, $http, $uibModalInstance,
              $filter, $uibModal, $stateParams, $timeout) {
      'ngInject'

      var translate = $filter('translate')
      $scope.expAceOptJS = cbAcebaseOption
      $scope.expAceOptJS.mode = 'javascript'
      $scope.categoryList = {}
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
                type: 'board',
                id: $stateParams.id
              }
            }
          }
        })
        permissionSettingModel.result.then(function () {
        })
      }
      var getCategoryList = function () {
        $http.get('dashboard/getCategoryList.do').success(function (response) {
          $scope.categoryList = [
            {
              id: null,
              name: translate('CONFIG.DASHBOARD.MY_DASHBOARD')
            }]
          _.each(response, function (o) {
            $scope.categoryList.push(o)
          })
        })
      }
      getCategoryList()

      var initEditor = function (info) {
        var E = window.wangEditor
        var editor = new E('#alertEditor')
        editor.customConfig.menus = [
          'head',  // 标题
          'bold',  // 粗体
          'fontSize',  // 字号
          'fontName',  // 字体
          'italic',  // 斜体
          'underline',  // 下划线
          'strikeThrough',  // 删除线
          'foreColor',  // 文字颜色
          'backColor',  // 背景颜色
          'link',  // 插入链接
          'list',  // 列表
          'justify',  // 对齐方式
          'quote',  // 引用
          'emoticon',  // 表情
          'table',  // 表格
          'code'  // 插入代码
        ]
        editor.create()
        editor.txt.html(info)
        $scope.editor = editor
      }

      if (config.hasAlert) {
        $timeout(function () {
          initEditor(config.alertInfo ? config.alertInfo : '')
        }, 300)
      }

      $scope.$watch('config.hasAlert', function () {
        if (config.hasAlert) {
          $timeout(function () {
            initEditor(config.alertInfo ? config.alertInfo : '')
          }, 300)
        }
      })

      $scope.boardNname = boardName
      $scope.config = config
      $scope.dashboardType = categoryId
      $http({
        method: 'GET',
        url: 'theme/themeList.json'
      }).then(function successCallback(response) {
        $scope.themeList = response.data.theme
      }, function errorCallback(response) {
        // 请求失败执行代码
      })
      $scope.changeTheme = function (theme) {
        if ($scope.config.theme != theme.name) {
          $scope.config.theme = theme.name
        } else {
          $scope.config.theme = ''
        }
        // $scope.config.bgImg = theme.thumb;
      }
      $scope.ok = function () {
        // if ($scope.theme != undefined) {
        //     config.theme = $scope.theme;
        // }
        $scope.config.alertInfo = config.hasAlert ? $scope.editor.txt.html() : null
        $uibModalInstance.close({
          config: $scope.config,
          boardName: $scope.boardNname,
          categoryId: $scope.dashboardType
        })
      }
      $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel')
      }
    })
  //添加新图表模态框
  .controller('AddWidgetModelCtrl',
    function ($scope, $http, $timeout, $filter, $uibModalInstance) {
      'ngInject'
      var treeID = 'widgetTreeID'
      $scope.treeConfig = jsTreeConfig1
      var getWidgetList = function (callback) {
        $http.get('dashboard/getWidgetList.do').success(function (response) {
          $scope.widgetList = response
          if (callback) {
            callback()
          }
          $scope.searchNode()
        })
      }
      var getSelectedWidget = function () {
        var selectedNode = jstree_GetSelectedNodes(treeID)[0]
        return _.find($scope.widgetList, function (w) {
          return w.id == selectedNode.id
        })
      }
      $scope.editNode = $scope.ok = function () {
        $uibModalInstance.close(getSelectedWidget())
      }
      $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel')
      }
      $scope.searchNode = function () {
        var para = {wgtName: '', dsName: '', dsrName: ''}

        //map widgetList to list (add datasetName and datasourceName)
        var list = $scope.widgetList.map(function (w) {
          var ds = _.find($scope.datasetList, function (obj) {
            return obj.id == w.data.datasetId
          })
          var dsrName = ''
          var dsr
          if (ds) {
            dsr = _.find($scope.datasourceList, function (obj) {
              return obj.id == ds.data.datasource
            })
          } else if (w.data.datasource) {
            dsr = _.find($scope.datasourceList, function (obj) {
              return obj.id == w.data.datasource
            })
          }
          return {
            'id': w.id,
            'name': w.name,
            'categoryName': w.categoryName,
            'datasetName': ds ? ds.name : '',
            'datasourceName': dsr ? dsr.name : dsrName
          }
        })

        //split search keywords
        if ($scope.keywords) {
          if ($scope.keywords.indexOf(' ') == -1 &&
            $scope.keywords.indexOf(':') == -1) {
            para.wgtName = $scope.keywords
          } else {
            var keys = $scope.keywords.split(' ')
            for (var i = 0; i < keys.length; i++) {
              var w = keys[i].trim()
              if (w.split(':')[0] == 'wg') {
                para['wgtName'] = w.split(':')[1]
              }
              if (w.split(':')[0] == 'ds') {
                para['dsName'] = w.split(':')[1]
              }
              if (w.split(':')[0] == 'dsr') {
                para['dsrName'] = w.split(':')[1]
              }
            }
          }
        }
        //filter data by keywords
        originalData = jstree_CvtVPath2TreeData(
          $filter('filter')(list, {
            name: para.wgtName,
            datasetName: para.dsName,
            datasourceName: para.dsrName
          })
        )

        jstree_ReloadTree(treeID, originalData)
        /*搜索后展开文件夹*/
        if ($scope.keywords)
          _.delay(function () {
            $scope.treeInstance.jstree(true).open_all()
          }, 100)
      }
      $scope.treeEventsObj = function () {
        var baseEventObj = jstree_baseTreeEventsObj({
          ngScope: $scope, ngHttp: $http, ngTimeout: $timeout,
          treeID: treeID, listName: 'widgetList'
        })
        return baseEventObj
      }()
      //init
      getWidgetList()
    })
  //Tab设置
  .controller('tabCtrl', function ($scope, tab, tabs, $uibModalInstance) {
    'ngInject'
    $scope.ok = function () {
      if ($scope.tabName.length > 0) {
        if (tab != undefined) {
          tab.name = $scope.tabName
        } else {
          tabs.push({
            id: tabs.length,
            name: $scope.tabName
          })
        }
        $uibModalInstance.close()
      }
    }
    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel')
    }

  })
  //新建数据
  .controller('newData', function ($scope, $uibModalInstance, $http) {
    'ngInject'
    $scope.datasourceList = []
    $scope.datasource = null
    $scope.dataTables = []
    $scope.selectTable = null
    $scope.columns = []
    var vm = $scope
    $scope.changeTable = function () {
      let obj = {
        'sql': 'select * from ' + vm.selectTable
      }
      $http.post('dashboard/getColumns.do', {
        datasourceId: vm.datasource.id,
        query: JSON.stringify(obj),
        reload: false
      }).success(function (response) {
        $scope.columns = response.columns
      })
    }
    $http.get('dashboard/getDatasourceList.do').success(function (response) {
      vm.datasourceList = response
      if (vm.datasourceList.length > 0) {
        vm.datasource = vm.datasourceList[0]
        $http.get('flow/datasources/' + vm.datasource.id + '/tables.do')
          .success(function (responseTables) {
            vm.dataTables = responseTables.data
            if (vm.dataTables.length > 0) {
              vm.selectTable = vm.dataTables[0]
              $scope.changeTable()
            }
          })
      }
    })

    $scope.changeSource = function () {
      $http.get('flow/datasources/' + vm.datasource.id + '/tables.do')
        .success(function (responseTables) {
          vm.dataTables = responseTables.data
          if (vm.dataTables.length > 0) {
            vm.selectTable = vm.dataTables[0]
            $scope.changeTable()
          }
        })
    }

    $scope.ok = function () {
      var config = {
        datasource: $scope.datasource,
        selectTable: $scope.selectTable
      }
      $uibModalInstance.close(config)
    }
    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel')
    }

  })
  //添加静态文本
  .controller('addStaticTextCtrl',
    function (
      $scope, $sce, $http, $timeout, $filter, $uibModalInstance, row, tab) {
      'ngInject'
      if (row) {
        $scope.text = row.config.editor
      }
      $timeout(function () {
        var E = window.wangEditor
        var editor = new E('#editor')
        editor.customConfig.menus = [
          'head',  // 标题
          'bold',  // 粗体
          'fontSize',  // 字号
          'fontName',  // 字体
          'italic',  // 斜体
          'underline',  // 下划线
          'strikeThrough',  // 删除线
          'foreColor',  // 文字颜色
          'backColor',  // 背景颜色
          'link',  // 插入链接
          'list',  // 列表
          'justify',  // 对齐方式
          'quote',  // 引用
          'emoticon',  // 表情
          // 'image',  // 插入图片
          'table',  // 表格
          // 'video',  // 插入视频
          'code',  // 插入代码
          'undo',  // 撤销
          'redo'  // 重复
        ]
        editor.create()
        editor.txt.html($scope.text)
        $scope.editor = editor
      }, 300)
      var config = {
        name: '静态文本',
        type: 'board',
        sizeX: 10,
        sizeY: 10,
        tab: tab,
        params: [],
        config: {},
        sign: 'static'
      }
      $scope.ok = function () {
        config.config.editor = $scope.editor.txt.html()
        $uibModalInstance.close(config)
      }
      $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel')
      }
    })
  //添加脑图节点
  .controller('addJsMindNodeCtrl',
    function ($scope, $sce, $http, $timeout, $filter, $uibModalInstance) {
      'ngInject'
      $scope.jsmindNodeText = null
      $scope.ok = function () {
        $uibModalInstance.close($scope.jsmindNodeText)
      }
      $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel')
      }
    })
  // 提示信息
  .controller('alertInfoCtrl',
    function (
      $scope, $sce, $http, $timeout, $filter, $uibModalInstance, config) {
      'ngInject'
      if (config) {
        $scope.alertInfo = config.alertInfo
      }
      $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel')
      }
    })
  // 胶囊按钮
  .controller('addCapsuleCtrl',
    function (
      $scope, $sce, $http, $timeout, $filter, $uibModalInstance, tab) {
      'ngInject'
      var iframeWidget = {
        name: '胶囊',
        type: 'board',
        sizeX: 10,
        sizeY: 10,
        params: [],
        config: {},
        tab: tab,
        sign: 'capsule'
      }
      $scope.name = '按钮组'
      $scope.eventName = ''
      $scope.columns = ''
      $scope.functions = ''
      $scope.activeName = null
      // 字段失焦，保存默认值
      $scope.ok = function () {
        iframeWidget.name = $scope.name
        iframeWidget.config.activeName = $scope.activeName
        iframeWidget.config.eventName = $scope.eventName
        iframeWidget.config.functions = $scope.functions
        if ($scope.columns) {
          iframeWidget.config.columns = $scope.columns.split('\n')
        } else {
          iframeWidget.config.columns = []
        }
        $uibModalInstance.close(iframeWidget)
      }
      $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel')
      }
    })
