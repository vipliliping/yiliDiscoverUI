var CBoardSelectorRender = function (jqContainer, options) {
  this.container = jqContainer // jquery object
  this.options = options
  this.chartType = 'selector'
}

CBoardSelectorRender.prototype.html = function (option) {
  var keys = option.chartConfig.keys
  var html = '<div id="multipleSelectContainer" class="flex-row">'
  _.each(keys, function (key, index) {
    var showName = key.showName ? key.showName : (key.col ? key.col : key.column)
    var eventName = key.eventName ? key.eventName : 'event'
    //可能名称里面有点
    key.colNoDot = key.col ? key.col.replace('.', '__') : key.column.replace('.', '__')
    html +=
      '<div class="flex1">' +
      '<h5>' + showName + '</h5>' +
      '<div><select id="select_' + key.colNoDot +
      '" class="selector_multiple_simple dSelect '
    if (key.isSingle) {
      html += 'isSingle '
    }
    html += '" multiple data-eventName="' +
      eventName + '" data-key="' + key.col + '" data-index="' + index +
      '" style="width: 100%"></select></div>' +
      '</div>'
  })
  html += '</div>'
  return html
}

CBoardSelectorRender.prototype.initialize = function (options, scope, EventService) {
  var keys = options.chartConfig.keys
  var groupSelects = options.groupSelects
  var columnList = options.originalData.columnList

  selectorRender(keys, groupSelects, columnList, EventService, options)
  return function (o, s, a, d) {
    var okeys = o.chartConfig.keys
    var ogroupSelects = o.groupSelects
    var ocolumnList = o.originalData.columnList
    selectorRender(okeys, ogroupSelects, ocolumnList, EventService, o)
  }
}

function selectorRender(keys, groupSelects, columnList, EventService, options) {
  var key = keys[0]
  var target = keys[0].colNoDot ? keys[0].colNoDot : keys[0].col
  var $target = $('#select_' + target)
  var eventName = keys[0].eventName
  var targetEventName = eventName ? eventName : target
  $target.addClass('select_' + targetEventName)
  var option = ''
  _.each(options.firstSelects, function (data) {
    option += '<option value="' + data + '">' + data + '</option>'
  })

  if ($target.children().length) {
    $target.empty()
  }
  $target.append(option)
  $target.multipleSelect({
    single: key.isSingle,
    filter: options.chartConfig.isFilter,
    selectAllText: '全部',
    onClick: function (view) {
      if (view.checked) { //如果是选中
        if (key.isSingle) {
          window.$$dlut_param[$target.attr('data-eventName')] = view.value
        } else {
          if (window.$$dlut_param[$target.attr('data-eventName')].indexOf(view.value) === -1) {
            if (window.$$dlut_param[$target.attr('data-eventName')] === "-1")
              window.$$dlut_param[$target.attr('data-eventName')] = []
            window.$$dlut_param[$target.attr('data-eventName')].push(view.value)
          }
        }
      } else {
        if (key.isSingle) {
          window.$$dlut_param[$target.attr('data-eventName')] = ""
        } else {
          var selected = $target.multipleSelect('getSelects')
          if (selected.length === 0) selected = "-1"//"'none'"
          window.$$dlut_param[$target.attr('data-eventName')] = selected
        }
      }
    },
    onCheckAll: function () {
      var oLength = options.firstSelects.length,
        aLength = $target.multipleSelect('getSelects').length

      if (oLength === aLength) {
        window.$$dlut_param[$target.attr('data-eventName')] = []
      } else {
        window.$$dlut_param[$target.attr('data-eventName')] = $target.multipleSelect('getSelects')
      }
    },
    onUncheckAll: function () {
      window.$$dlut_param[$target.attr('data-eventName')] = "-1"//"'none'"
    },
    onClose: function () {
      try {
        EventService.trigger('$change', {event: key.eventName, col: key.col ? key.col : key.column})
        eval(key.change)
      } catch (e) {
        console.log('CBoardSelectorRender.js 执行eval错误', key.change, key.col, e)
      }
    }
  })

  if (!key.isSingle) {
    if (!options.chartConfig.init) {
      $target.multipleSelect('checkAll')
      window.$$dlut_param[$target.attr('data-eventName')] = 'all'
    }

    // 如果页面刚进来有带参数的话，给初始值
    if (options.chartConfig.temporaryParam) {
      if(options.chartConfig.temporaryParam === 'all') {
        $target.multipleSelect('checkAll')
        window.$$dlut_param[$target.attr('data-eventName')] = 'all'
      } else {
        if(typeof options.chartConfig.temporaryParam === 'string') {
          options.chartConfig.temporaryParam = [options.chartConfig.temporaryParam]
        }
        $target.multipleSelect('setSelects', options.chartConfig.temporaryParam)
        window.$$dlut_param[$target.attr('data-eventName')] = options.chartConfig.temporaryParam
      }
    }
    delete options.chartConfig.temporaryParam
    if ($target) {
      EventService.trigger('$ready', {wName: options.wName})
    }
  }
  else {
    //  这里是支持一个数据模型多个下拉框用的代码，这个版本注释掉，当前版本只支持一个数据模型一个筛选器
    // var selfArr = []
    // for (var g in groupSelects) {
    //   if (groupSelects[g].key == key.col) selfArr.push(g)
    // }
    if (!options.chartConfig.init) {
      var selected = options.firstSelects[0]
      if (!_.isUndefined(options.chartConfig.initSelected) && options.chartConfig.initSelected.length > 0) {
        selected = options.chartConfig.initSelected
      }
      if (!selected) {
        selected = -1
      }
      $target.multipleSelect('setSelects', [selected])
      window.$$dlut_param[$target.attr('data-eventname')] = selected
    }

    // 如果页面刚进来有带参数的话，给初始值
    if (options.chartConfig.temporaryParam) {
      $target.multipleSelect('setSelects', [options.chartConfig.temporaryParam])
      window.$$dlut_param[$target.attr('data-eventName')] = options.chartConfig.temporaryParam
    }
    delete options.chartConfig.temporaryParam
    if ($target) {
      EventService.trigger('$ready', {wName: options.wName})
    }
  }
}
