/**
 * Created by Fine on 2016/12/4.
 */

var crossTable = {
  table: function (args) {
    var self = this
    var keyList = []
    var deleteList = []
    for (var i = 0; i < args.chartConfig.keys.length; i++) {
      var item = args.chartConfig.keys[i]
      if (item.hide != true) {
        keyList.push(item)
      } else {
        deleteList.push(item.col)
      }
    }
    if (deleteList.length > 0) {
      args.chartConfig.keys = keyList
      if (args.data.length > 0) {
        var dataList = []
        for (var i = 0; i < args.data.length; i++) {
          var data = []
          for (var j = 0; j < args.data[i].length; j++) {
            var found = false
            if (args.data[i][j] && args.data[i][j].column_header_header)
              for (var k = 0; k < deleteList.length; k++) {
                if (args.data[i][j].data == deleteList[k]) {
                  found = true
                  break
                }
              }
            if (!found && typeof args.data[i][j] != 'undefined') {
              data.push(args.data[i][j])
            }
          }
          dataList.push(data)
        }
        args.data = dataList
      }
    }
    // 处理 标为不显示的列
    for (var i = 0; i < args.data.length; i++) {
      if (args.data[i]) {
        for (var j = 0; j < args.data[i].length; j++) {
          if (args.data[i][j].showType && args.data[i][j].showType === 'hidden') {
            args.data[i][j].showType = 'hidden'
          }
        }
      }
      // if (i > 1) {   // 便利到一次数据就可以
      //   break
      // }
    }
    var data = args.data,
      chartConfig = args.chartConfig,
      tall = args.tall,
      pageDataNum = 10000,
      drill = args.drill,
      random = Math.random().toString(36).substring(2),
      container = args.container

    if (chartConfig.option.isPagenation) {
      pageDataNum = chartConfig.option.pageDataNum ? chartConfig.option.pageDataNum : 20
      pageDataNum = parseInt(pageDataNum)
    }
    var html = "<table class = 'table_wrapper'  widget='" + args.wName + "' id='tableWrapper" + random +
      "'><thead class='fixedHeader'>",
      colContent = "<tr>"
    if (_.isUndefined($.tooltipArr)) {
      $.tooltipArr = {}
    }
    $.tooltipArr[args.wName] = []

    if (chartConfig.option.isTh) {
      function parseHeader(pdata) {
        var returnData = [];
        var header = [];
        if (pdata.length > 0) {
          header = angular.copy(pdata[0])
        }
        if (header.length > 0) {
          // 转数组，求最大
          var max = 0;
          for (var i = 0; i < header.length; i++) {
            var headeri = header[i];
            headeri.arr = headeri.data.split(":");
            if (headeri.arr && headeri.arr.length > max)
              max = headeri.arr.length
          }
          for (i = 0; i < max; i++) {
            var line = [];
            var item = null;
            // rowspan
            for (var j = 0; j < header.length; j++) {
              var orgin = header[j];
              if (orgin.arr[i]) {
                item = {property: "header_key", data: orgin.arr[i], width: orgin.width, showType: orgin.showType};
                if (orgin.arr.length - 1 === i)
                  item.rowspan = max - orgin.arr.length + 1;
                line.push(item);
              }
            }
            var newLine = [];
            // colspan
            if (line.length > 0) {
              for (j = 0; j < line.length; j++) {
                var cell = line[j];
                if (cell && typeof cell.rowspan !== 'undefined') {
                  newLine.push(cell)
                } else if (j !== 0 && cell.data === line[j - 1].data) {
                } else {
                  var colspan = 1;
                  for (var k = j + 1; k <= line.length; k++) {
                    if (typeof line[k] === 'undefined' || cell.data !== line[k].data) {
                      cell.colspan = colspan;
                      break
                    } else {
                      colspan++
                    }
                  }
                  newLine.push(cell)
                }
              }
            }
            returnData.push(newLine)
          }
        }
        return returnData;
      }

      var headerData = parseHeader(data);

      for (var i = 0; i < headerData.length; i++) {
        var headerLine = headerData[i];
        for (var j = 0; j < headerLine.length; j++) {
          var headerCell = headerLine[j];

          var width = ''
          if (headerCell.width && headerCell.width.indexOf) {
            if (headerCell.width.indexOf('%') !== -1 || headerCell.width.indexOf('auto') !== -1) {
              width = headerCell.width
            }
            else {
              if(headerCell.colspan <= 1 || _.isUndefined(headerCell.colspan)) {
                width = headerCell.width + 'px'
              }
            }
          }

          var isShow = headerCell.showType === 'hidden' ? 'none' : ''
          colContent += '<th style="display:' + isShow + '"';
          if (headerCell.rowspan) colContent += 'rowspan="' + headerCell.rowspan + '" ';
          if (headerCell.colspan) colContent += 'colspan="' + headerCell.colspan + '" ';
          colContent += 'class="header_key"><div style="width:'+width+'">' + headerCell.data + '</div></th>'
        }
        colContent += "</tr>"
      }
    } else {
      for (var i = 0; i < chartConfig.groups.length; i++) {
        var groupId = chartConfig.groups[i].id
        var colspan = 1
        var colList = []
        var header_data = angular.copy(data)
        for (var t = 0; t < chartConfig.keys.length; t++) {
          colContent += "<th class=" + data[i][t].property + "><div></div></th>"
        }
        var spliceList = []
        var sn = 0
        for (var fd = 0; fd < header_data[i].length; fd++) {
          if (header_data[i][fd].showType == 'hidden') {
            spliceList.push(fd)
          }
        }
        for (var sl = 0; sl < spliceList.length; sl++) {
          header_data[i].splice(spliceList[sl] - sn, 1)
          sn++
        }
        // console.log('spliceList', header_data)
        for (var y = chartConfig.keys.length; y < header_data[i].length; y++) {
          if ((header_data[i][y + 1]) && (header_data[i][y].data == header_data[i][y + 1].data)) {
            if (i > 0) {
              var noEqual = false
              for (var s = i - 1; s > -1; s--) {
                if (header_data[s][y].data != header_data[s][y + 1].data) {
                  noEqual = true
                  break
                }
              }
              if (noEqual) {
                colList.push({
                  data: header_data[i][y].data,
                  colSpan: colspan,
                  property: header_data[i][y].property,
                  showType: header_data[i][y].showType
                })
                colspan = 1
              }
              else {
                // if (header_data[y + 1].showType != 'hidden' || header_data[y].showType != 'hidden') colspan++
                colspan++
              }
            }
            else if (i == 0) {
              colspan++
              // if (header_data[y + 1].showType != 'hidden' || header_data[y].showType != 'hidden') colspan++
            }
          }
          else {
            header_data[i][y] != header_data[i][y + 1] ? colList.push({
              data: header_data[i][y].data,
              colSpan: colspan,
              property: header_data[i][y].property
            }) : null
            colspan = 1
          }
        }
        // console.log('colList', colList)
        for (var c = 0; c < colList.length; c++) {
          var d = ""
          if (drill && drill.config[groupId] &&
            (drill.config[groupId].down || drill.config[groupId].up)) {
            d += " class='table_drill_cell'"
            if (drill.config[groupId].down) {
              d += " drill-down='" + groupId + "'"
            }
            if (drill.config[groupId].up) {
              d += " drill-up='" + groupId + "'"
            }
          }
          var value = "<div" + d + ">" + colList[c].data + "</div>"
          colContent += colList[c].colSpan > 1
            ? "<th colspan='" + colList[c].colSpan +
            "' class='" + colList[c].property + "'>" + value + "</th>"
            : "<th class='" + colList[c].property + "'>" + value + "</th>"
        }
        colContent += "</tr><tr>"
      }
    }
    self.totalIndex = undefined
    _.each(data[chartConfig.groups.length], function (d, index) {
      if (d.data === '总计') {
        self.totalIndex = index
      }
    })
    if (_.isNumber(self.totalIndex)) {
      data[chartConfig.groups.length].splice(chartConfig.keys.length, 0, data[chartConfig.groups.length][self.totalIndex])
      data[chartConfig.groups.length].splice(self.totalIndex + 1, 1)
    }

    self.foreMostIndex = undefined
    var trimForemost = $.trim(chartConfig.option.foremost)
    if (trimForemost.length) {
      _.each(data[chartConfig.groups.length], function (d, index) {
        if (d.data === trimForemost) {
          self.foreMostIndex = index
        }
      })
    }

    if (_.isNumber(self.foreMostIndex)) {
      data[chartConfig.groups.length].unshift(data[chartConfig.groups.length][self.foreMostIndex])
      data[chartConfig.groups.length].splice(self.foreMostIndex + 1, 1)
    }
    // console.log('thead', data[chartConfig.groups.length])
    if (!chartConfig.option.isValueTh && !chartConfig.option.isTh) {
      for (var k = 0; k < data[chartConfig.groups.length].length; k++) {
        var d = data[chartConfig.groups.length][k]
        var d_1 = data[chartConfig.groups.length][k + 1]
        var isDrilldown = false
        var isDrillup = false
        var drilldown, drillup

        if (drill && drill.config[d.id] && (drill.config[d.id].down || drill.config[d.id].up)) {
          if (drill.config[d.id].down) {
            drilldown = " drill-down='" + d.id + "' "
            isDrilldown = true
          }

          if (d_1) {
            if (drill.config[d_1.id] && (drill.config[d_1.id].dimensionId === drill.config[d.id].dimensionId)) {
              drillup = " drill-up='" + d_1.id + "' "
              isDrillup = true
              isDrilldown = false
            }
          }
        }

        var width = ''
        if (d.width && d.width.indexOf) {
          if (d.width.indexOf('%') !== -1 || d.width.indexOf('auto') !== -1) {
            width = d.width
          }
          else {
            width = d.width + 'px'
          }
        }
        var sort = (d.sort !== 'sort' && d.sort !== null && !_.isUndefined(d.sort)) ? 'sort-' + d.sort : 'sort'
        var isShow = d.showType === 'hidden' ? 'none' : ''
        colContent += "<th style='display:" + isShow + "' data-column='" + d.data + "' class='"
        if (!d.column_header_header && chartConfig.option.isSort) {
          colContent += " self-table-sort "
        }

        if (isDrilldown && d.column_header_header) {
          colContent += " drill-down "
        }
        if (isDrillup && d.column_header_header) {
          colContent += " drill-up "
        }

        colContent += d.property + "'" + "><div style='width: " + width + ";'>" + d.data
        if (!d.column_header_header && chartConfig.option.isSort) {
          colContent += "<i class='fa fa-" + sort + "' style='margin-left: 5px;'></i>"
        }

        if (isDrilldown && d.column_header_header) {
          colContent += "<span class='drill-plus' " + drilldown + ">+</span>"
        }
        if (isDrillup && d.column_header_header) {
          colContent += "<span class='drill-minus' " + drillup + ">-</span>"
        }

        colContent += "</div></th>"
      }
    }

    var dataColumn = data.splice(0, chartConfig.groups.length + 1)
    var sdIndex = undefined
    _.each(data, function (sData, index) {
      _.each(sData, function (d) {
        if (d.data === '总计') {
          sdIndex = index
        }
      })
    })

    if (_.isNumber(sdIndex)) {
      data.unshift(data[sdIndex])
      data.splice(sdIndex + 1, 1)
    }

    data = dataColumn.concat(data)
    var fixedHeader = colContent + '</tr>'
    html += colContent + "</tr></thead><tbody class='scrollContent self-table-tbody'>"
    var headerLines = chartConfig.groups.length + 1

    var dataPage = this.paginationProcessData(data, headerLines, pageDataNum)

    var hasPageContainer = false// 如果设置了分页，但是数据没有第二页，则不加载分页的容器
    var fullSizePages = parseInt(data.length / pageDataNum)
    if(args.chartConfig.option.isPagenation && fullSizePages > 1) hasPageContainer = true

    var colNum = data[0].length
    var rowNum = colNum ? data.length - headerLines : 0
    var trDom = this.render(dataPage[0], chartConfig, drill, data[0], args.wName)
    html = html + trDom + '</tbody></table>'
    var optionDom = '<select><option value=\'20\'>20</option><option value=\'50\'>50</option><option value=\'100\'>100</option><option value=\'150\'>150</option></select>'
    var p_class = 'p_' + random
    var PaginationDom = '<div class=\'' + p_class +
      '\'><div class=\'optionNum\'></div><div class=\'page\'><ul></ul></div></div>'
    var operate = '<div class=\'toolbar toolbar' + random +
      '\'><span class=\'info\'><b>info: </b>' + rowNum + ' x ' + colNum +
      '</span>' +
      '<span class=\'exportBnt\' title=\'export\'></span></div>'
    $(container).html(operate)
    var fixedContent = '<div class="fixed-header"><table widget="' + args.wName + '" style="width: 100%" class="table_wrapper"><thead>' + fixedHeader + '</thead></table></div>'
    var fixedBody = '<div class="fixed-container" style="height: 100% !important;">' + html + '</div>'
    var tableContainer = '<div class=\'tableView table_' + random + '\' style=\'width:100%;max-height:' + tall + 'px;overflow:auto\'>' +
      html + '</div>'
    $(container).append(tableContainer)
    // $(container)
    //     .append(fixedContent + '<div class=\'tableView table_' + random +
    //         '\' style=\'width:100%;max-height:' + tall + 'px;overflow:auto\'>' +
    //         fixedBody +
    //         '</div>')

    args.EventService.trigger('$ready', {wName: args.wName})
    if (hasPageContainer) {
      $(container).append(PaginationDom)
    }
    var dataTitle = null                                   //  表头
    if (_.isUndefined(self.dataEventList)) {             // 无数据，只有表头
      var index = data.length
      if (index > 0) {
        dataTitle = data[data.length - 1]
      }
    } else {
      for (var m = 0; m < data.length; m++) {
        var isBreak = false
        for (var n = 0; n < data[m].length; n++) {
          if (data[m][n].property.indexOf('header_') < 0) {
            isBreak = true
            break
          }
        }
        if (isBreak) {
          dataTitle = data[m - 1]
          break
        }
      }
    }
    var valueLength = args.chartConfig.values[0].cols.length     // 指标个数
    var keyLength = args.chartConfig.keys.length                  // 列维个数
    if (dataTitle) {
      for (var k = keyLength; k < dataTitle.length; k += valueLength) {
        for (var j = 0; j < valueLength; j++) {
          if (!_.isUndefined(dataTitle[k + j])) {
            dataTitle[k + j]['sameNum'] = k
          }
        }
      }
      var tooltipData = {
        isCross: args.chartConfig.groups.length > 0 ? true : false,
        title: dataTitle,
        data: data.slice(1)
      }
      $(container).find('tbody').data('tooltipData', tooltipData)
    }
    $(container).find('tbody').data('eventData', self.dataEventList)
    var pageObj = {
      data: dataPage,
      chartConfig: chartConfig,
      drill: drill
    }
    data.length ? this.renderPagination(dataPage.length, 1, pageObj,
      $('.' + p_class + ' .page>ul')[0]) : null
    this.clickPageNum(dataPage, chartConfig, drill, p_class, data[0])
    this.clickNextPrev(dataPage.length, pageObj, p_class, data[0])
    this.selectDataNum(data, chartConfig.groups.length + 1, chartConfig, drill,
      p_class, data[0])
    this.export(random, data)
    this.clickDrill('table_' + random, drill, args.render)

    // 表格一列两个上下箭头
    var tdArr = $('td.data')
    for (var i in tdArr) {
      if (tdArr[i].children && tdArr[i].children.length === 2) {
        if (tdArr[i].children[0] && tdArr[i].children[1]) {
          if (tdArr[i].children[0].tagName === 'A' && tdArr[i].children[0].tagName === tdArr[i].children[1].tagName) {
            tdArr[i].classList.add('flex-t')
            tdArr[i].children[0].classList.add('w-50-1')
            tdArr[i].children[1].classList.add('w-50-2')
          } else if (tdArr[i].children[0].tagName === 'I' && tdArr[i].children[0].tagName === tdArr[i].children[1].tagName) {
          }
        }
      }
    }

    // tooltip
    var info = {}
    var position = {
      rowIndex: null,
      colIndex: null
    }
    var formatter = function (info) {
      var html = '<ul>'
      if (chartConfig.option.tooltipCode) {
        try {
          info = (new Function('info, tooltipData, position',
            'return (' + chartConfig.option.tooltipCode + ')(info, tooltipData, position)'))
          (info, tooltipData, position)
        } catch (e) {
          console.error('tooltip自定义错误', chartConfig.option.tooltipCode, e)
        }
      }
      for (var i in info) {
        html += '<li>' + i + ':' + info[i] + '</li>'
      }
      html += '</ul>'
      return html
    }
    $(container).find('tbody')
      .data('powertip', function () {
        return formatter(info)
      })
      .powerTip({
        followMouse: true,
        fadeInTime: 1000
      })
      .on('mouseover', 'tr', function (e) {
        var trDom = null
        var trIndex = null
        if (e.target.offsetParent.parentElement.tagName === 'TR') {
          trDom = e.target.offsetParent.parentElement
          trIndex = e.target.offsetParent.parentElement.getAttribute('data-i')
        }
        if (e.target.parentElement.tagName === 'TR') {
          trDom = e.target.parentElement
          trIndex = e.target.parentElement.getAttribute('data-i')
        }
        position.rowIndex = trIndex
        var tooltipData = $(container).find('tbody').data('tooltipData')
        if (tooltipData && tooltipData.isCross) {
          var tdIndex = null
          if (e.target.offsetParent.parentElement.tagName === 'TD') {
            tdIndex = e.target.offsetParent.parentElement.getAttribute('data-j')
          }
          if (e.target.parentElement.tagName === 'TD') {
            tdIndex = e.target.parentElement.getAttribute('data-j')
          }
          if (e.target.tagName === 'TD') {
            tdIndex = e.target.getAttribute('data-j')
          }
          if (tdIndex) {
            position.colIndex = tdIndex
            for (var i = 0; i < tooltipData.title.length; i++) {
              if (tooltipData.title[tdIndex].sameNum === tooltipData.title[i].sameNum) {
                var content = trDom.childNodes[i].textContent
                var key = tooltipData.title[i].data
                var value = content === '' ? trDom.childNodes[i].getAttribute('data-value') : content
                info[key] = value
              }
            }
          }
        } else {
          var tdIndex = null
          if (e.target.offsetParent.parentElement.tagName === 'TD') {
            tdIndex = e.target.offsetParent.parentElement.getAttribute('data-j')
          }
          if (e.target.parentElement.tagName === 'TD') {
            tdIndex = e.target.parentElement.getAttribute('data-j')
          }
          if (e.target.tagName === 'TD') {
            tdIndex = e.target.getAttribute('data-j')
          }
          position.colIndex = tdIndex
          for (var i = 0; i < trDom.childNodes.length; i++) {
            var content = trDom.childNodes[i].textContent
            var key = trDom.childNodes[i].getAttribute('data-column')
            var value = content === '' ? trDom.childNodes[i].getAttribute('data-value') : content
            info[key] = value
          }
        }
        $("#powerTip").html(formatter(info))
      })

    // 表头固定
    // $(container).resize(this.resizeTable('tableWrapper' + random))
  },
  resizeTable: function (id) {
    var $target = $('#' + id)
    var height = $target.parents('.box-body')[0].scrollHeight
    var marginHeight = $target.find('thead')[0].scrollHeight
    var widthList = []
    $target.find('thead').find('th').each(function (i, dom) {
      $(dom).css('color', 'transparent')
      widthList.push($(dom).css('width'))
    })
    $target.css('margin-top', -marginHeight + 'px')
    $target.parent().css('height', height)
  },
  clickDrill: function (t_class, drill, render) {
    $('.' + t_class + ' .drill-plus[drill-down]').click(function () {
      var down = $(this).attr('drill-down')
      drill.drillDown(down, render)
    })
    $('.' + t_class + ' .drill-minus[drill-up]').click(function () {
      var up = $(this).attr('drill-up')
      drill.drillUp(up, render)
    })

    // $('.' + t_class + ' .table_drill_cell[drill-down]').click(function () {
    //   var down = $(this).attr('drill-down')
    //   var value = $(this).html()
    //   drill.drillDown(down, value, render)
    // })
    // $.contextMenu({
    //   selector: '.' + t_class + ' .table_drill_cell',
    //   build: function ($trigger, e) {
    //     var down = $trigger.attr('drill-down')
    //     var up = $trigger.attr('drill-up')
    //     var value = $trigger.html()
    //     var items = {}
    //     if (up) {
    //       items.up = {
    //         name: cboardTranslate('COMMON.ROLL_UP'),
    //         icon: 'fa-arrow-up'
    //       }
    //     }
    //     if (down) {
    //       items.down = {
    //         name: cboardTranslate('COMMON.DRILL_DOWN'),
    //         icon: 'fa-arrow-down'
    //       }
    //     }
    //     return {
    //       callback: function (key, options) {
    //         if ('up' == key) {
    //           drill.drillUp(up, render)
    //         } else if ('down' == key) {
    //           drill.drillDown(down, value, render)
    //         }
    //       },
    //       items: items
    //     }
    //   }
    // })

  },
  paginationProcessData: function (rawData, headerLines, pageSize) {
    var dataLength = rawData.length - headerLines
    var lastPageLines = dataLength % pageSize
    var fullSizePages = parseInt(dataLength / pageSize)
    var totalPages
    lastPageLines == 0
      ? totalPages = fullSizePages
      : totalPages = fullSizePages + 1
    var pageData = []
    for (var currentPage = 1; currentPage < totalPages + 1; currentPage++) {
      var startRow = (currentPage - 1) * pageSize + headerLines
      var partData = rawData.slice(startRow, startRow + pageSize)
      pageData.push(partData)
    }
    return pageData
  },
  render: function (data, chartConfig, drill, CDATA, wName) {
    var self = this
    var html = ''
    if (data === undefined) {
      return html
    }

    if (_.isNumber(self.totalIndex)) {
      _.each(data, function (sData, index) {
        sData.splice(chartConfig.keys.length, 0, sData[self.totalIndex])
        sData.splice(self.totalIndex + 1, 1)
      })
    }

    if (_.isNumber(self.foreMostIndex)) {
      _.each(data, function (sData, index) {
        sData.unshift(sData[self.foreMostIndex])
        sData.splice(self.foreMostIndex + 1, 1)
      })
    }

    for (var r = 0; r < chartConfig.keys.length; r++) {
      for (var n = 1; n < data.length; n++) {
        var node = data[n][r].data
        if (r > 0) {
          var parent = data[n][r - 1].data
          var next
          n > 0 ? next = data[n - 1][r - 1].data : null;
          (node == data[n - 1][r].data && parent == next && !chartConfig.option.showAllContent) ? data[n][r] = {
            data: data[n][r].data,
            rowSpan: 'row_null',
            property: data[n][r].property
          } : data[n][r] = {
            data: data[n][r].data,
            rowSpan: 'row',
            property: data[n][r].property
          }
        }
        else if (r == 0) {
          var preNode = n > 0 ? data[n - 1][r].data : null;
          //如果和上面内容相同且没有选中"显示所有内容"showAllContent的话隐藏
          (node == preNode && !chartConfig.option.showAllContent) ? data[n][r] = {
            data: data[n][r].data,
            rowSpan: 'row_null',
            property: data[n][r].property
          } : data[n][r] = {
            data: data[n][r].data,
            rowSpan: 'row',
            property: data[n][r].property
          }
        }
      }
    }
    self.dataEventList = []
    $.tooltipArr[wName] = []
    for (var n = 0; n < data.length; n++) {
      $.tooltipArr[wName].push(_.map(data[n], function (item) {             // 存储tooltip的data
        var result = {
          col: '',
          sameColumnNum: '',
          value: item.data,
          isKey: false
        }
        return result
      }))
      var rowContent = "<tr data-i='" + n + "'>"
      var isFirstLine = (n == 0) ? true : false
      var lineEventList = []
      for (var m = 0; m < chartConfig.keys.length; m++) {
        var currentCell = data[n][m]
        var rowParentCell = data[n][m - 1]
        var cur_data = currentCell.data ? currentCell.data : ''
        var keyId = chartConfig.keys[m].id
        var align = chartConfig.keys[m].align

        //算eventInfo
        if (data[n] && data[n][m] && data[n][m].property === 'column_key') {
          lineEventList.push({col: CDATA[m].data, value: cur_data})
        }

        if (m > 0) {
          if (currentCell.rowSpan == 'row_null' &&
            rowParentCell.rowSpan == 'row_null' && !isFirstLine) {
            rowContent += "<td class='row_null' data-column='" + CDATA[m].data + "' data-value='" + currentCell.data + "'><div></div></td>"
          } else {
            rowContent += "<td style='text-align:" + align +
              "' class='row' data-column='" + CDATA[m].data + "' data-value='" + currentCell.data + "'><div>" + cur_data + "</div></td>"
          }
        } else {
          if (currentCell.rowSpan == 'row_null' && !isFirstLine) {
            rowContent += "<td class='row_null' data-column='" + CDATA[m].data + "' data-value='" + currentCell.data + "'><div></div></td>"
          } else {
            rowContent += "<td style='text-align:" + align +
              "' class='row' data-column='" + CDATA[m].data + "' data-value='" + currentCell.data + "'><div>" + cur_data + "</div></td>"
          }
        }
      }
      for (var y = chartConfig.keys.length; y < data[n].length; y++) {
        var align = chartConfig.values[0].cols[(y - chartConfig.keys.length) %
        chartConfig.values[0].cols.length].align
        var isShow = data[n][y].showType === 'hidden' ? 'none' : ''
        rowContent += "<td data-j='" + y + "' style='text-align:" + align + "; display: " + isShow + "' class='" +
          data[n][m].property + "' data-column='" + CDATA[y].data + "' data-value='" + data[n][y].data + "'>"
        rowContent += self.dataStyleRender(data[n][y], n, y, data, CDATA)
        rowContent += "</td>"
      }
      html = html + rowContent + "</tr>"
      self.dataEventList.push(lineEventList)
    }

    // 表格一列两个上下箭头
    var tdArr = $('td.data')
    for (var i in tdArr) {
      if (tdArr[i].children && tdArr[i].children.length === 2) {
        if (tdArr[i].children[0] && tdArr[i].children[1]) {
          if (tdArr[i].children[0].tagName === 'A' && tdArr[i].children[0].tagName === tdArr[i].children[1].tagName) {
            tdArr[i].classList.add('flex-t')
            tdArr[i].children[0].classList.add('w-50-1')
            tdArr[i].children[1].classList.add('w-50-2')
          } else if (tdArr[i].children[0].tagName === 'I' && tdArr[i].children[0].tagName === tdArr[i].children[1].tagName) {
          }
        }
      }
    }
    return html
  },
  selectDataNum: function (data, num, chartConfig, drill, random, CDATA) {
    var _this = this
    $('.' + random).on('change', '.optionNum select', function (e) {
      var pageDataNum = e.target.value
      var dataPage = _this.paginationProcessData(data, num, pageDataNum)

      var dom = $(e.target.offsetParent).find('.page>ul')[0]
      var tbody = $(e.target.offsetParent).find('tbody')[0]
      tbody.innerHTML = (_this.render(dataPage[0], chartConfig, drill, CDATA))
      $(tbody).data('eventData', _this.dataEventList)
      _this.renderPagination(dataPage.length, 1, null, dom)
      $('.' + random).off('click')
      _this.clickPageNum(dataPage, chartConfig, random)
      var pageObj = {
        data: dataPage,
        chartConfig: chartConfig,
        drill: drill
      }
      _this.clickNextPrev(dataPage.length, pageObj, random, CDATA)
    })
  },
  clickPageNum: function (data, chartConfig, drill, random, CDATA) {
    var _this = this
    $('.' + random).on('click', 'a.pageLink', function (e) {
      var pageNum = e.target.innerText - 1
      var pageObj = {
        data: data,
        chartConfig: chartConfig,
        drill: drill
      }

      var dom = $(e.target.offsetParent).find('.page>ul')[0]
      var tbody = $(e.target.offsetParent).find('tbody')[0]
      tbody.innerHTML = _this.render(data[pageNum], chartConfig, drill, CDATA)
      $(tbody).data('eventData', _this.dataEventList)
      _this.renderPagination(data.length, parseInt(e.target.innerText), pageObj,
        dom)
    })
  },
  renderPagination: function (pageCount, pageNumber, pageObj, target) {
    if (pageCount == 1) return ''
    var liStr = '<li><a class="previewLink">上一页</a></li>'
    if (pageCount < 10) {
      for (var a = 0; a < pageCount; a++) {
        liStr += '<li><a class="pageLink">' + (a + 1) + '</a></li>'
      }
    }
    else {
      if (pageNumber < 6) {
        for (var a = 0; a < pageNumber + 2; a++) {
          liStr += '<li><a class="pageLink">' + (a + 1) + '</a></li>'
        }
        liStr += '<li class="disable"><span class="ellipse">...</span></li>'
        for (var i = pageCount - 2; i < pageCount; i++) {
          liStr += '<li><a class="pageLink">' + (i + 1) + '</a></li>'
        }
      } else if (pageNumber <= (pageCount - 5)) {
        for (var c = 0; c < 2; c++) {
          liStr += '<li><a class="pageLink">' + (c + 1) + '</a></li>'
        }
        liStr += '<li class="disable"><span class="ellipse">...</span></li>'
        for (var j = pageNumber - 2; j < pageNumber + 3; j++) {
          liStr += '<li><a class="pageLink">' + j + '</a></li>'
        }
        liStr += '<li class="disable"><span class="ellipse">...</span></li>'
        for (var i = pageCount - 2; i < pageCount; i++) {
          liStr += '<li><a class="pageLink">' + (i + 1) + '</a></li>'
        }
      } else {
        for (var c = 0; c < 2; c++) {
          liStr += '<li><a class="pageLink">' + (c + 1) + '</a></li>'
        }
        liStr += '<li class="disable"><span class="ellipse">...</span></li>'
        for (var i = pageNumber - 2; i < pageCount + 1; i++) {
          liStr += '<li><a class="pageLink">' + i + '</a></li>'
        }
      }
    }
    liStr += '<li><a class="nextLink">下一页</a></li>'
    if (target) {
      target.innerHTML = liStr
      if (pageNumber == 1) {
        target.childNodes[0].setAttribute('class', 'hide')
      } else if (pageNumber == pageCount) {
        target.childNodes[target.childNodes.length - 1].setAttribute('class',
          'hide')
      }
      this.buttonColor(pageNumber, target)
    }
    // else {
    //     $('.page>ul').html(liStr);
    //     if (pageNumber == 1) {
    //         $('.page a.previewLink').addClass('hide');
    //     } else if (pageNumber == pageCount) {
    //         $('.page a.nextLink').addClass('hide');
    //     }
    //     this.buttonColor(pageNumber);
    //     this.clickNextPrev(pageCount, pageObj);
    // }
    // 表格一列两个上下箭头
    var tdArr = $('td.data')
    for (var i in tdArr) {
      if (tdArr[i].children && tdArr[i].children.length === 2) {
        if (tdArr[i].children[0] && tdArr[i].children[1]) {
          if (tdArr[i].children[0].tagName === 'A' && tdArr[i].children[0].tagName === tdArr[i].children[1].tagName) {
            tdArr[i].classList.add('flex-t')
            tdArr[i].children[0].classList.add('w-50-1')
            tdArr[i].children[1].classList.add('w-50-2')
          } else if (tdArr[i].children[0].tagName === 'I' && tdArr[i].children[0].tagName === tdArr[i].children[1].tagName) {
          }
        }
      }
    }
  },
  buttonColor: function (pageNum, target) {
    if (target) {
      var buttons = target.childNodes
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].childNodes[0].innerText == pageNum ? $(
          buttons[i].childNodes[0]).addClass('current') : null
      }
    }
  },
  clickNextPrev: function (pageCount, pageObj, random, CDATA) {
    var _this = this
    $('.' + random).on('click', '.page a.previewLink', function (e) {
      var kids = e.target.parentNode.parentNode.childNodes
      var dom = e.target.parentNode.parentNode.parentNode.childNodes[0]
      var tbody = $(e.target.offsetParent).find('tbody')[0]

      for (var i = 0; i < kids.length; i++) {
        if (kids[i].childNodes[0].className.indexOf('current') > -1) {
          var pageNum = parseInt(kids[i].childNodes[0].text) - 1
        }
      }
      tbody.innerHTML = _this.render(pageObj.data[pageNum - 1],
        pageObj.chartConfig, pageObj.drill, CDATA)
      $(tbody).data('eventData', _this.dataEventList)
      _this.renderPagination(pageCount, pageNum, pageObj, dom)
      //_this.clickPageNum(pageObj.data, pageObj.chartConfig);
    })
    $('.' + random).on('click', '.page a.nextLink', function (e) {
      var kids = e.target.parentNode.parentNode.childNodes
      var dom = e.target.parentNode.parentNode.parentNode.childNodes[0]
      var tbody = $(e.target.offsetParent).find('tbody')[0]

      for (var i = 0; i < kids.length; i++) {
        if (kids[i].childNodes[0].className.indexOf('current') > -1) {
          var pageNum = parseInt(kids[i].childNodes[0].text) + 1
        }
      }
      tbody.innerHTML = _this.render(pageObj.data[pageNum - 1],
        pageObj.chartConfig, pageObj.drill, CDATA)
      $(tbody).data('eventData', _this.dataEventList)
      _this.renderPagination(pageCount, pageNum, pageObj, dom)
      //_this.clickPageNum(pageObj.data, pageObj.chartConfig);
    })
  },
  export: function (random, data) {
    $('.toolbar' + random + ' .exportBnt').on('click', function () {
      var xhr = new XMLHttpRequest()
      var formData = new FormData()
      formData.append('data', JSON.stringify({data: data, type: 'table'}))
      xhr.open('POST', 'dashboard/tableToxls.do')
      xhr.responseType = 'arraybuffer'
      xhr.onload = function (e) {
        var blob = new Blob([this.response],
          {type: 'application/vnd.ms-excel'})
        var objectUrl = URL.createObjectURL(blob)
        var aForExcel = $('<a><span class=\'forExcel\'>下载excel</span></a>')
          .attr('href', objectUrl)
        aForExcel.attr('download', 'table.xls')
        $('body').append(aForExcel)
        $('.forExcel').click()
        aForExcel.remove()
      }
      xhr.send(formData)
    })
  },
  dataStyleRender: function (data, n, y, d, CDATA) {
    var returnData = data.data
    if (_.isNaN(data.data)) returnData = '-'
    if (data.data === Infinity || data.data === -Infinity) returnData = '-'
    switch (data.showType) {
      case 'bar':
        var maxBur = _.max(d, function (item) {
          if (parseInt(item[y].data)) {
            var num = parseInt(item[y].data)
            return num
          }
        })
        var htmlBar = ''
        if (maxBur && maxBur[y])
          htmlBar += '<div class="progress" style="margin-bottom: 0px;padding: 0">'
            + '<div class="progress-bar" role="progressbar" ' +
            'aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:' +
            toPercent(data.data / maxBur[y].data) + '">' + "<span style='float: left; color: black'>" +
            +dlut.math.to2Decimal(data.data)
            + '</span></div> </div>'
        return htmlBar
        break
      case 'percent':
        var num = parseInt(data.data * data.showNum * 100)
        var htmlPercent = '' + (num / 100).toFixed(2) + '%'
        // if (toPoint(data.data, data.showNum) > data.showNum) {
        //   htmlPercent = '<a style="color: green">' + num.toFixed(1) + '%</a>'
        // }
        return htmlPercent
        break
      case 'updown':
        if (!parseInt(data.data)) {
          return data.data
        }
        var htmlUpdown = '<a>' + data.data +
          '<i class="fa fa-arrow-up" aria-hidden="true" style="color: green; margin-left: 5px"></i></a>'
        if (parseInt(data.data) < 0) {
          htmlUpdown = '<a>' + data.data +
            '<i class="fa fa-arrow-down" aria-hidden="true" style="color: red; margin-left: 5px"></i></a>'
        }
        return htmlUpdown
        break
      case 'custom':
        var result = data.data
        var customCode = data.showNum
        var autoTemp = data.temp
        var tdData = angular.copy(data.data)
        var rowData = []
        var preRowData = []

        _.each(CDATA, function (column, index) {
          rowData[column.data] = d[n][index].data
        })

        _.each(CDATA, function (column, index) {
          preRowData[column.data] = d[n - 1 < 0 ? 0 : n - 1][index].data
        })

        if (customCode) {
          // result = eval(customCode)
          var temp = ''
          try {
            temp = (new Function('serie,params,rowData,preRowData,autoTemp',
              'return (' + customCode + ')(serie,params,rowData,preRowData,autoTemp)'))
            (tdData, window.$$dlut_param, rowData, preRowData, autoTemp)
            result = temp
          } catch (e) {
            temp = 'ERROR'
            console.error('crossTable自定义计算错误', customCode, tdData, window.$$dlut_param, e)
          } finally {
            result = temp
          }
        }
        return result
      default:
        return '<div>' + returnData + '</div>'
        break
    }

    function toPercent(point) {
      var str = Number(point * 100).toFixed(1)
      str += '%'
      return str
    }

    function toPoint(percent, num) {
      var str = percent.replace('%', '')
      str = parseFloat(str * num)
      return str
    }
  }
}
