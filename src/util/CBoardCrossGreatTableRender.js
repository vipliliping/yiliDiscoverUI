var CBoardCrossGreatRender = function (jqContainer, options) {
  this.container = jqContainer // jquery object
  this.options = options
  this.chartType = 'crossGreatTable'
}
CBoardCrossGreatRender.prototype.html = function (tableId, option) {
  var html = '' + '<table id = "' + tableId +
    '" class="display table-bordered table-inverse bootstrap_table" width="100%">'
  html += theadRender(option)
  html += '</table>'
  return html
}

CBoardCrossGreatRender.prototype.initialize = function (
  option, scope, tableId, EventService) {
  var $table = $('#' + tableId)

  $table.bootstrapTable({
    data: option.tableData
  })

  return function (option) {
    $table.bootstrapTable('destroy')
    $table.empty()
    $table.html(theadRender(option))
    $table.bootstrapTable({
      data: option.tableData
    })

    // $table.bootstrapTable('mergeCells', {
    //   index: drillIndex,
    //   field: keys[drillIndex].col,
    //   rowspan: originalData.length
    // })
  }
}

CBoardCrossGreatRender.prototype.setWidget = function (widget) {
  this.widget = widget
}

function theadRender(option) {
  var cols = option.chartConfig.values[0].cols//指标数据
  var keys = option.chartConfig.keys[0].drillDown
  var keyTier = option.chartConfig.drillTier.keyTier
  var thead = '<thead><tr>'

  _.each(keys, function (key, index) {
    if (index > keyTier) return false //如果当前项超出了当前下钻层级，则跳出
    var title = key.col
    if (key.alias) title = key.alias
    thead += '<th data-field="' + key.col + '" data-key="' + key.col + '" class="drillDown_th">' +
      title
    if (index == keyTier && index + 1 < keys.length) {//如果当前项
      thead += '<a data-index="' + index +
        '" data-key="' + key.col +
        '" style="float: right;" data-type="drillDown"><i class="glyphicon glyphicon-plus"></i></a>'
    } else if (index < keyTier && index + 1 < keys.length) {
      thead += '<a data-index="' + index + '" data-key="' + key.col +
        '" style="float: right;" data-type="drillUp"><i class="fa fa-minus"></i></a>'
    }
    thead += '</th>'
  })

  _.each(cols, function (value) {
    var title = value.col
    if (value.alias) title = value.alias
    thead += '<th data-field="' + value.col + '">' + title + '</th>'
  })

  thead += '</tr></thead>'

  return thead
}