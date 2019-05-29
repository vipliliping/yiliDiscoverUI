var CBoardDataTableRender = function (jqContainer, options) {
  this.container = jqContainer // jquery object
  this.options = options
  this.chartType = 'crossTable'
}
CBoardDataTableRender.prototype.html = function (tableName, isTransposition) {
  var html = '' + '<table id = ' + tableName +
    ' class=\'display table-bordered table-inverse\' width=\'100%\'>' +
    htmlRender(this.options, tableName) +
    '</table>'
  return html
}
CBoardDataTableRender.prototype.initialize = function (
  option, scope, tableName, EventService) {
  var keyList = []
  var deleteList = []
  for (var i = 0; i < option.chartConfig.keys.length; i++) {
    var item = option.chartConfig.keys[i]
    if (item.hide != true) {
      keyList.push(item)
    } else {
      deleteList.push(item.col)
    }
  }
  if (deleteList.length > 0) {
    option.chartConfig.keys = keyList
    if (option.data.length > 0) {
      var dataList = []
      for (var i = 0; i < option.data.length; i++) {
        var data = []
        for (var j = 0; j < option.data[i].length; j++) {
          var found = false
          if (option.data[i][j] && option.data[i][j].column_header_header)
            for (var k = 0; k < deleteList.length; k++) {
              if (option.data[i][j].data == deleteList[k]) {
                found = true
                break
              }
            }
          if (!found && typeof option.data[i][j] != 'undefined') {
            data.push(option.data[i][j])
          }
        }
        dataList.push(data)
      }
      option.data = dataList
    }
  }
  var tableContainer = $('#' + tableName)
  var language = {
    'sProcessing': '处理中...',
    'sLengthMenu': '显示 _MENU_ 项结果',
    'sZeroRecords': '没有匹配的结果',
    'sInfo': '显示第 _START_ 至 _END_ 项结果,共 _TOTAL_ 项',
    'sInfoEmpty': '显示第0至0项结果,共0项',
    'sInfoFiltered': '(由 _MAX_ 项结果过滤)',
    'sInfoPostFix': '',
    'sSearch': '搜索',
    'sUrl': '',
    'sEmptyTable': '表中数据为空',
    'sLoadingRecords': '载入中...',
    'sInfoThousands': ',',
    'oPaginate': {
      'sFirst': '首页',
      'sPrevious': '上页',
      'sNext': '下页',
      'sLast': '末页'
    },
    'oAria': {
      'sSortAscending': '以升序排列此列',
      'sSortDescending': '以降序排列此列'
    }
  }
  var sDom = '<\'dt-toolbar\'<\'col-xs-12 col-sm-6\'f><\'col-sm-6 col-xs-6 hidden-xs\'C>r>t'
  var size = 10
  if (option.chartConfig.option.size)
    size = option.chartConfig.option.size
  var sWidth = []
  if (option.chartConfig.option.colWidth) {
    sWidth = option.chartConfig.option.colWidth.split(',')
    // for (var i = 0; i < columns.length; i++) {
    //   if (sWidth[i])
    //     columns[i].sWidth = sWidth[i]
    // }
  }
  var showPage = option.dataList.length > size ? true : false
  if (option.chartConfig.option.showPage)
    showPage = option.chartConfig.option.showPage
  if (showPage)
    sDom += '<\'dt-toolbar-footer\'<\'col-sm-5 col-xs-12 hidden-xs\'i><\'col-sm-7 col-xs-12\'p>>'
  var tableOption = {
    data: option.dataList,//数据
    language: language,//语言
    autoWidth: true,
    sDom: sDom,
    ordering: false,
    bFilter: false,//去掉搜索
    lengthMenu: [size],//每页显示条数
    paging: showPage,//是否分页
    bLengthChange: showPage,//去掉选择每页条数
    'headerCallback': function (thead, data, start, end, display) {
    },
    'columnDefs': [
      {
        'data': undefined,
        'defaultContent': '-',
        'targets': '_all',
        createdCell: function (td, value, data, rowIndex, cellIndex) {
          if (cellIndex == 0) {
            $(td).attr('data-type', 'key')
            $(td).attr('data-name', value)
          }
        }
      }
    ]
  }
  if (scope) tableOption.scrollY = 0
  tableContainer.DataTable(tableOption)
  var table = tableContainer.DataTable()
  var self = this
  this.table = tableName
  $('#' + tableName + ' tbody').on('resize', function (e) {
  })
  return function (option) {
    var table = $('#' + self.table)
    var db = table.dataTable()
    // $(db.api().table().header()).html(htmlRender(option, self.table))
    if (db) {
      db.api().destroy()
      table.empty()
      table.html(htmlRender(option, self.table))
      tableOption.data = option.dataList
      tableOption.aaData = option.dataList
      table.DataTable(tableOption)
      // db.api().clear()
      // db.api().rows.add(option.dataList)
      // db.api().draw()
    }
  }
}
CBoardDataTableRender.prototype.setWidget = function (widget) {
  this.widget = widget
}

function htmlRender(option, tableName) {
  var cols = option.chartConfig.values[0].cols//指标数据
  var keys = option.chartConfig.keys
  var groups = option.chartConfig.groups
  var columnsList = option.originalData.columnList
  var originalData = option.originalData.data
  var keyIndex = getIndex(keys, columnsList)
  var groupIndex = getIndex(groups, columnsList)
  var tHead = []
  for (var o = 0; o < originalData.length; o++) {
    tHead.push(originalData[o][groupIndex.index])
  }
  tHead = _.uniq(tHead)
  var header = '<thead>'
  var rowHeader = '<tr><th>' + keyIndex.name + ' \\ ' + groupIndex.name +
    '</th>'
  var valueHeader = '<tr><th></th>'
  for (var t = 0; t < tHead.length; t++) {
    rowHeader += '<th colspan="' + cols.length +
      '" data-type="group" data-name="' + tHead[t] + '">' + tHead[t] + '</th>'
    for (var c = 0; c < cols.length; c++) {
      valueHeader += '<th data-type="value">' + cols[c].alias + '</th>'
    }
  }
  rowHeader += '</tr>'
  valueHeader += '</tr>'
  header += rowHeader + valueHeader + '</thead>'
  return header
}

function getIndex(array, columnsList) {
  if (_.isUndefined(array[0])) return false
  if (!_.isUndefined(array[0].drillDown)) {
    for (var d = 0; d < array[0].drillDown.length; d++) {
      var tor = _.find(columnsList, function (col) {
        return array[0].drillDown[d].col === col.name
      })
      if (tor) {
        return tor
      }
    }
  } else {
    return _.find(columnsList, function (col) {
      return array[0].col === col.name
    })
  }
}