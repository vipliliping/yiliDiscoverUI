/**
 * Created by Fine on 2017/2/11.
 */
'user strict'
var chartDataProcess = function (chartConfig, casted_keys, casted_values, aggregate_data, newValuesConfig, originalData, wName) {
  var keysList = casted_keys,
    keyArr = [],
    emptyList = [],
    keyLength = chartConfig.keys.length,
    rowHeaderLength = keysList[0] ? keysList[0].length : 0,
    values = chartConfig.values[0].cols

  Array.matrix = function (numrows, numcols, initial) {
    var arr = []
    for (var a = 0; a < numrows; ++a) {
      var columns = []
      for (var s = 0; s < numcols; ++s) {
        columns[s] = initial
      }
      arr[a] = columns
    }
    return arr
  }
  var table_data = Array.matrix(keysList.length, rowHeaderLength, 0)
  for (var h = 0; h < rowHeaderLength; h++) {
    for (var k = 0; k < keysList.length; k++) {
      table_data[k][h] = {
        property: 'column_key',
        data: keysList[k][h]
      }
    }
  }

  for (var i = 0; i < casted_values.length; i++) {
    var joined_values = casted_values[i].join('-')
    var formatter = newValuesConfig[joined_values].formatter
    var dataStyle = newValuesConfig[joined_values].dataStyle
    for (var j = 0; j < casted_keys.length; j++) {
      if (!_.isUndefined(aggregate_data[i][j])) {
        var raw = aggregate_data[i][j]
        table_data[j][i + keyLength] = {
          property: 'data',
          data: formatter ? numbro(raw).format(formatter) : raw,
          raw: raw,
          showType: dataStyle ? dataStyle.type : null,
          showNum: dataStyle ? dataStyle.num : null
        }
      } else {
        table_data[j][i + keyLength] = {
          property: 'data',
          data: '',
          showType: dataStyle ? dataStyle.type : null,
          showNum: dataStyle ? dataStyle.num : null
        }
      }
    }
  }

  var column_header = Array.matrix(chartConfig.groups.length + 1,
    casted_values.length, 0)
  for (var n = 0; n < casted_values.length; n++) {
    var joined_values = casted_values[n].join('-')
    var formatter = newValuesConfig[joined_values].formatter
    var dataStyle = newValuesConfig[joined_values].dataStyle
    for (var m = 0; m < casted_values[n].length; m++) {
      column_header[m][n] = {
        property: 'header_key',
        data: casted_values[n][m],
        sort: values[n] ? values[n].sort : 'sort',
        width: values[n] ? values[n].width : null,
        showType: dataStyle ? dataStyle.type : null,
        showNum: dataStyle ? dataStyle.num : null
      }
    }
  }

  for (var y = 0; y < keyLength; y++) {
    keyArr.push({
      property: 'header_key',
      column_header_header: true,
      data: chartConfig.keys[y].alias ? chartConfig.keys[y].alias : chartConfig.keys[y].col,
      width: chartConfig.keys[y].width,
      id: chartConfig.keys[y].id
    })
    emptyList.push({
      property: 'header_empty',
      data: null
    })
  }
  for (var j = 0; j < column_header.length; j++) {
    j == column_header.length - 1 ? column_header[j] = keyArr.concat(
      column_header[j]) : column_header[j] = emptyList.concat(column_header[j])
  }

  var sortingData = column_header.concat(table_data)

  var chartData = {
    chartConfig: chartConfig,
    data: sortingData,
    originalData: originalData,
    wName: wName
  }
  table_data = null
  column_header = null

  return chartData
}
