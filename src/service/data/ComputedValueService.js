/**
 * Created by xxx on 2018/9/29.
 */

discovery.service('ComputedValueService', function ($q, BoardParamService) {
  'ngInject'
  // 预计算
  this.precomputation = function (config, schema) {
    var values = config.values
    var keys = config.keys
    var groups = config.groups
    if (_.isUndefined(schema.computed) &&
      _.isUndefined(schema.computedDimension)) {
      return false
    }

    var isComputedValue = false
    var isComputedKey = false
    var isComputedGroup = false
    _.each(values, function (value) {
      _.each(value.cols, function (v) {
        if (_.find(schema.computed, function (computed) {
          return computed.column == v.column || computed.column == v.col
        })) {
          v.isComputed = true
          isComputedValue = true
        }
      })
    })

    _.each(keys, function (key) {
      if (_.find(schema.computedDimension, function (computed) {
        return computed.column == key.column || computed.column == key.col
      })) {
        key.isComputed = true
        isComputedKey = true
      }
    })

    _.each(groups, function (group) {
      if (_.find(schema.computedDimension, function (computed) {
        return computed.column == group.column || computed.column == group.col
      })) {
        group.isComputed = true
        isComputedGroup = true
      }
    })

    if (!isComputedValue && !isComputedKey && !isComputedGroup) return false

    _.each(schema.computedDimension, function (dcomputed) {// 循环计算表达式
      schemaComputedRender(dcomputed, schema.computedDimension)
    })
    _.each(schema.computed, function (computed) {// 循环计算表达式
      schemaComputedRender(computed, schema.computed)
    })

    _.each(keys, function (key) {
      if (key.isComputed) {
        computedKeys(schema.computedDimension, key)
      }
    })

    _.each(groups, function (group) {
      if (group.isComputed) {
        computedKeys(schema.computedDimension, group)
      }
    })
    config.dependOnFun = {}
    _.each(values, function (value) {// 循环指标项
      _.each(value.cols, function (v) {
        if (v.isComputed) {
          computedValues(schema.computed, v, config)
        }
      })
    })
    return config
  }

  function schemaComputedRender(computed, scomputed) {
    var regCalc = /\[&[^\]]+\]/g // 查找预计算中的变量正则
    var regFormula = /\[\$[^\]]+\]/g // 查找公式中的变量正则
    var preCalc = computed.preCalc
    var formula = computed.formula
    if (preCalc) {//如果有预计算表达式
      var regCalcArr = preCalc.match(regCalc)// 结果为array型
      _.each(regCalcArr, function (calc) {// 循环替换计算公式的值
        var value = BoardParamService.get(calc.substring(2, calc.length - 1))
        preCalc = preCalc.replace(calc, '"' + value + '"')
      })
      try {
        computed.formula2 = eval(preCalc)
      } catch (e) {
        console.log(
          '预处理公式错误:ComputedValueService:function-this.precomputation,row-8,eval(preCalc)执行错误',
          preCalc, computed.column, e)
      }
    } else if (computed.formula && computed.formula !== '') {
      computed.formula2 = computed.formula
    }
    formula = computed.formula2 ? computed.formula2 : ''
    var n = 0
    var isWhile = true
    do {
      var regFormulaArr = formula.match(regFormula)
      if (regFormulaArr) {
        isWhile = false
      }
      _.each(regFormulaArr, function (mula) {
        var formula2 = _.find(scomputed, function (computed) {
          return computed.column == mula.substring(2, mula.length - 1)
        })
        formula = formula.replace(mula, formula2.formula2)
      })

      computed.formula2 = formula
      n++
    } while (n < 100 && isWhile)
  }

  function computedKeys(scomputed, key) {
    var reg = /\[#[^\]^&^$]+/g
    _.each(scomputed, function (computed) {
      if (key.col == computed.column || key.column == computed.column) {// 从计算表达式选中对应指标的一项
        var regDependOn = computed.formula2.match(reg)
        key.dependOn = []
        key.formula2 = computed.formula2
        _.each(regDependOn, function (depend) {
          var dependArg = depend.substring(2)
          var dependArgArr = dependArg.split(':')
          var dependArgName = null
          if (dependArgArr.length > 1) {
            dependArgName = dependArgArr[1]
          } else if (dependArgArr.length === 1) {
            dependArgName = dependArgArr[0]
          } else {
            return
          }
          if (dependArgName && !_.find(key.dependOn, function (depend) {
            return depend.column == dependArgName
          }))
            key.dependOn.push({
              column: dependArgName
            })
        })
      }
    })
  }

  function computedValues(scomputed, v, config) {
    var reg = /\[#[^\]^&^$]+/g
    // var reg2 = /\'(\S*)\'/g
    var reg2 = /(TOTAL|RANK|RUNNING_SUM|MAX|MIN)\([^\(^)]+/g
    _.each(scomputed, function (computed) {
      if (v.col == computed.column || v.column == computed.column) {// 从计算表达式选中对应指标的一项
        var regDependOn = computed.formula2.match(reg)
        var funDependOn = computed.formula2.match(reg2)//TOTAL,RANK,RUNNING_SUM
        v.aggregate_type = 'sum'
        v.aggType = computed.aggType
        v.dependOn = []
        v.dependOnFun = {}
        v.formula2 = computed.formula2
        _.each(regDependOn, function (depend) {
          var dependArg = depend.substring(2)
          var dependArgArr = dependArg.split(':')
          var dependArgName = null
          var dependArgAggType = null
          if (dependArgArr.length > 1) {
            dependArgName = dependArgArr[1]
            dependArgAggType = dependArgArr[0]
          } else if (dependArgArr.length === 1) {
            dependArgName = dependArgArr[0]
            dependArgAggType = 'sum'
          } else {
            return
          }
          if (dependArgName && dependArgAggType &&
            !_.find(v.dependOn, function (depend) {
              return depend.column == dependArgName
            }))
            v.dependOn.push({
              column: dependArgName,
              aggType: dependArgAggType
            })
        })
        if (_.isArray(funDependOn)) {
          for (var i = 0; i < funDependOn.length; i++) {
            var funExp = funDependOn[i].replace(/[\'\"]/g, '')
            var funExpArr = funExp.match(/[^(^,]+/g)
            if (typeof funExpArr[2] === 'undefined')
              funExpArr[2] = 'sum'

            if (_.isUndefined(_.find(v.dependOn, function (don) {
              return don.column == funExpArr[1]
            }))) {
              v.dependOn.push({
                column: funExpArr[1],
                aggType: funExpArr[2]
              })
            }
            if (config && config.dependOnFun) {
              if (typeof config.dependOnFun[funExpArr[0]] === 'undefined') {
                config.dependOnFun[funExpArr[0]] = []
              }
              config.dependOnFun[funExpArr[0]].push({
                fun: funExpArr[0],
                column: funExpArr[1],
                aggType: funExpArr[2],
                extend: funExpArr[3]
              })
            }
          }
        }
      }
    })
  }

  // 替换显示
  this.replaceDisplay = function (data, chartConfig) {
    var columns = data.columnList
    var oData = data.data
    var columnIndexMap = {}
    var computedValue = chartConfig.computedValue
    var computedKeys = chartConfig.computedKey
    var computedGroups = chartConfig.computedGroup
    for (var i = 0; i < columns.length; i++) {
      var column = columns[i]
      var aggType = column.aggType ? (column.aggType + ':') : ''
      columnIndexMap[aggType + column.name] = column.index
      if (aggType === 'sum:') {
        columnIndexMap[column.name] = column.index
      }
    }
    //添加总计行
    if (chartConfig.option && chartConfig.option.total) {
      if (oData.length > 0) {
        var data0 = oData[0]
        var totalData = []
        var maxIndexTotalLabel = 0
        for (var i = 0; i < columns.length; i++) {
          // if ($.isNumeric(data0[i])) {
          if (columns[i].aggType !== null) {
            var total = 0
            for (var j = 0; j < oData.length; j++) {
              var d = parseFloat(oData[j][i])
              if(!_.isNaN(d))total += d
            }
            totalData.push(total)
          } else {
            maxIndexTotalLabel = i
            totalData.push("")
          }
        }
        totalData[maxIndexTotalLabel] = '总计'
        oData.push(totalData)
      }
    }

    //TOTAL,RUNNING_SUM,RANK提示信息
    funCacheMap = {
      TOTAL: {},
      RUNNING_SUM: {},
      RANK: {},
      MAX: {},
      MIN: {},
      indexMap: columnIndexMap
    }
    if (chartConfig.dependOnFun) {
      var total = chartConfig.dependOnFun.TOTAL
      if (total && total.length > 0) {
        for (var i = 0; i < total.length; i++) {
          var item = total[i]
          var index = columnIndexMap[item.aggType + ":" + item.column]
          var sum = 0
          for (var j = 0; j < oData.length; j++) {
            var d = parseFloat(oData[j][index])
            if(d)sum += d
          }
          funCacheMap.TOTAL[index] = sum
        }
      }
      var max = chartConfig.dependOnFun.MAX
      if (max && max.length > 0) {
        for (var i = 0; i < max.length; i++) {
          var item = max[i]
          var index = columnIndexMap[item.aggType + ":" + item.column]
          var maxNum = 0
          for (var j = 0; j < oData.length; j++) {
            var num = parseFloat(oData[j][index])
            if (num > maxNum) maxNum = num
          }
          funCacheMap.MAX[index] = maxNum
        }
      }
      var min = chartConfig.dependOnFun.MIN
      if (min && min.length > 0) {
        for (var i = 0; i < min.length; i++) {
          var item = min[i]
          var index = columnIndexMap[item.aggType + ":" + item.column]
          var minNum = Infinity
          for (var j = 0; j < oData.length; j++) {
            var num = parseFloat(oData[j][index])
            if (num < minNum) minNum = num
          }
          funCacheMap.MIN[index] = minNum
        }
      }
      var runningSum = chartConfig.dependOnFun.RUNNING_SUM
      if (runningSum && runningSum.length > 0) {
        for (var i = 0; i < runningSum.length; i++) {
          var item = runningSum[i]
          var index = columnIndexMap[item.aggType + ":" + item.column]
          funCacheMap.RUNNING_SUM[index] = 0
        }
      }
      var rank = chartConfig.dependOnFun.RANK
      if (rank && rank.length > 0) {
        for (var i = 0; i < rank.length; i++) {
          var item = rank[i]
          var index = columnIndexMap[item.aggType + ":" + item.column]
          var type = item.extend ? item.extend : 'desc'
          var allValuesList = []
          for (var j = 0; j < oData.length; j++) {
            allValuesList.push(parseFloat(oData[j][index]))
          }
          var sortFun = function (a, b) {
            return a < b
          }
          if (type === 'asc') {
            sortFun = function (a, b) {
              return a > b
            }
          }
          allValuesList = allValuesList.sort(sortFun)
          var rankMap = {}
          for (var j = allValuesList.length - 1; j >= 0; j--) {
            rankMap[parseFloat(allValuesList[j])] = j + 1
          }
          funCacheMap.RANK[type + index] = rankMap
        }
      }
    }

    var reg = /\[[^\]^&^$]+\]/g
    if (_.isArray(computedValue)) displayComputedValues(computedValue, columns,
      oData, columnIndexMap, reg)
    if (_.isArray(computedKeys)) displayComputedKeys(computedKeys, columns,
      oData, columnIndexMap, reg)
    if (_.isArray(computedGroups)) displayComputedKeys(computedGroups, columns,
      oData, columnIndexMap, reg)

    //
    colData = undefined
    funCacheMap = undefined

    return {
      columnList: columns,
      data: oData
    }
  }

  function displayComputedKeys(computedKeys, columns, oData, columnIndexMap, reg) {
    _.each(computedKeys, function (c) {// 循环纬度
      _.each(columns, function (column, index) {// 循环返回的数据的columnList
        var depend = _.find(c.dependOn, function (d) {
          return d.column == column.name
        })
        if (depend) {// 如果列名与依赖项相等
          if (!_.find(computedKeys, function (col) {// 在指标中查找是否有与依赖项同名的指标
            return depend == col.col || depend == col.column
          })) {// 如果指标中没有与依赖项同名的指标
            column.delete = true
          } else {
            column.delete = false
          }
        }
      })
    })

    _.each(computedKeys, function (c) {// 循环纬度

      if (!_.isUndefined(c.formula2)) {
        _.each(oData, function (data) {// 循环返回的数据的data
          var n = 0
          var isWhile = true
          var cFormula2 = c.formula2
          do {
            var regValues = cFormula2.match(reg)
            if (!regValues) {
              isWhile = false
            }
            _.each(regValues, function (value) {
              var valueName = value.substring(2, value.length - 1)
              if (!_.isUndefined(columnIndexMap[valueName]))
                cFormula2 = cFormula2.replace(value,
                  data[columnIndexMap[valueName]])
            })
            c.formula3 = cFormula2
            n++
          } while (n < 100 && isWhile)

          try {
            data.push(c.formula3)
          } catch (e) {
            console.log(
              'ComputedValueService:function-displayComputedValues,row-197,eval(c.formula3)执行错误',
              c.formula3, c.column, e)
          }
        })
        if (oData.length > 0)
          columns.push({
            index: oData[0].length - 1,//对应columnsList中的index
            aggType: null,
            name: c.col || c.column
          })
      }
    })
  }

  function displayComputedValues(computedValues, columns, oData, columnIndexMap, reg) {
    for (var i = 0; i < computedValues.length; i++) {// 循环指标项
      var cv = computedValues[i]
      for (var j = 0; j < cv.cols.length; j++) {// 循环指标
        var c = cv.cols[j]
        c.aggregate_type = c.aggType ? c.aggType : c.aggregate_type

        _.each(columns, function (column, index) {// 循环返回的数据的columnList
          var depend = _.find(c.dependOn, function (d) {
            return d.column == column.name
          })
          if (depend) {// 如果列名与依赖项相等
            if (!_.find(cv.cols, function (col) {// 在指标中查找是否有与依赖项同名的指标
              return depend == col.col || depend == col.column
            })) {// 如果指标中没有与依赖项同名的指标
              column.delete = true
            } else {
              column.delete = false
            }
          }
        })

        if (!_.isUndefined(c.formula2)) {
          for (var k = 0; k < oData.length; k++) {// 循环返回的数据的data
            var data = oData[k]
            var n = 0
            var isWhile = true
            var cFormula2 = c.formula2
            do {
              var regValues = cFormula2.match(reg)
              if (!regValues) {
                isWhile = false
              }
              _.each(regValues, function (value) {
                var valueName = value.substring(2, value.length - 1)
                if (columnIndexMap[valueName])
                  cFormula2 = cFormula2.replace(value,
                    data[columnIndexMap[valueName]])
              })
              c.formula3 = cFormula2
              n++
            } while (n < 100 && isWhile)

            try {
              colData = data
              c.formula3 = eval(c.formula3)
              data.push(c.formula3)
            } catch (e) {
              console.log(
                'ComputedValueService:function-displayComputedValues,row-197,eval(c.formula3)执行错误',
                c.formula3, c.column, e)
            }
          }
          if (oData.length > 0)
            columns.push({
              index: oData[0].length - 1,//对应columnsList中的index
              aggType: c.aggType,
              name: c.col || c.column
            })
        }
      }
    }
  }

  function TOTAL(column, aggType) {
    try {
      if (typeof aggType === 'undefined') aggType = 'sum'
      var index = this.funCacheMap.indexMap[aggType + ":" + column]
      return this.funCacheMap.TOTAL[index]
    } catch (e) {
      console.error('TOTAL ERROR')
      return 0
    }
  }

  function MAX(column, aggType) {
    try {
      if (typeof aggType === 'undefined') aggType = 'sum'
      var index = this.funCacheMap.indexMap[aggType + ":" + column]
      return this.funCacheMap.MAX[index]
    } catch (e) {
      console.error('MAX ERROR')
      return 0
    }
  }

  function MIN(column, aggType) {
    try {
      if (typeof aggType === 'undefined') aggType = 'sum'
      var index = this.funCacheMap.indexMap[aggType + ":" + column]
      return this.funCacheMap.MIN[index]
    } catch (e) {
      console.error('MIN ERROR')
      return 0
    }
  }

  function RANK(column, aggType, type) {
    try {
      if (typeof aggType === 'undefined') aggType = 'sum'
      if (typeof type === 'undefined') type = 'desc'
      var index = this.funCacheMap.indexMap[aggType + ":" + column]
      return this.funCacheMap.RANK[type + index][parseFloat(this.colData[index])]
    } catch (e) {
      console.error('RANK ERROR')
      return 0
    }

  }

  function RUNNING_SUM(column, aggType) {
    try {
      if (typeof aggType === 'undefined') aggType = 'sum'
      var index = this.funCacheMap.indexMap[aggType + ":" + column]
      this.funCacheMap.RUNNING_SUM[index] += parseFloat(colData[index])
      return this.funCacheMap.RUNNING_SUM[index]
    } catch (e) {
      console.error('RUNNING_SUM ERROR')
      return 0
    }
  }
})
