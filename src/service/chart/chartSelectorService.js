/**
 * Created by yfyuan on 2016/10/28.
 */
'use strict'
discovery.service('chartSelectorService',
  function (dataService, $compile, $filter, EventService) {
    'ngInject'

    var translate = $filter('translate')

    this.render = function (containerDom, option, scope, persist) {
      var render = new CBoardSelectorRender(containerDom, option)
      var html = render.html(option)
      if (scope) {
        containerDom.append($compile(html)(scope))
      } else {
        containerDom.html(html)
      }
      return render.initialize(option, scope, EventService)
    }

    this.parseOption = function (option) {
      var customCode = option.chartConfig.customCode
      var advancedOption = option.chartConfig.option.advancedOption
      var columnList = option.originalData.columnList
      var originalData = option.originalData.data

      var group = {}
      var firstSelects = []
      _.each(originalData, function (data, index) {
        if (firstSelects.indexOf(data[0]) == -1) firstSelects.push(data[0])
        _.each(data, function (d, i) {
          if (!group[d] && i <= columnList.length - 1) {
            group[d] = {}
            group[d].index = i
            group[d].key = columnList[i].name
            group[d].children = []
            group[d].isMultiple = false
          }
        })

        for (var d = 0; d < data.length; d++) {
          if (group[data[d]] && group[data[d]].children.indexOf(data[d + 1]) == -1) {
            group[data[d]].children.push(data[d + 1])
          }
        }
      })

    if(!advancedOption) {
        firstSelects = firstSelects.sort()
        var unshiftArr = [], unshiftIndex = []
        _.each(firstSelects, function (select, _i) {
            if(_.isUndefined(select) || _.isNull(select) || select === 'null'
                || select === '' || select === '缺省' || select === '-' || select === '未定义'
                || select === 'Null') {
                unshiftIndex.push(_i)
                unshiftArr.push(select)
            }
        })
        if(unshiftIndex.length) {
            var n = 0
            _.each(unshiftIndex, function (index) {
                firstSelects.splice(index - n, 1)
                n++
            })
            firstSelects = firstSelects.concat(unshiftArr)
        }
    }

      option.groupSelects = group
      option.firstSelects = firstSelects

      if (customCode) {
          var temp = []
          try {
              temp = (new Function('firstSelects',
                  'return (' + customCode + ')(firstSelects)'))
              (option.firstSelects)
              option.firstSelects = temp
          } catch (e) {
              temp = 'ERROR'
              console.error('crossTable自定义计算错误', customCode, option.firstSelects, e)
          } finally {
              option.firstSelects = temp
          }
      }

      return option
    }
  })
