$(function () {
  if (!window.dlut)
    window.dlut = {}
  dlut.utils = {
    GetQueryString: function (name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)")
      var r = window.location.search.substr(1).match(reg)
      if (r != null) return unescape(r[2])
      return null
    },
    convertMoney: function (num, str) {
      num = parseFloat(num)
      if (str == "亿") {
        num = num * 100000000
      } else if (str == "万") {
        num = num * 10000
      }
      var value = ''
      if (num >= 100000000) {
        var newnum = (num / 100000000).toString()
        var shishu = newnum.substring(0, newnum.indexOf(".")).length - 2
        if (newnum.toString().indexOf(".") > -1 && shishu <= 0) {
          var weishu = newnum.substring(newnum.indexOf(".") + 1, newnum.toString().indexOf(".") + 3)
          if (weishu == "00") {
            value = newnum.substring(0, newnum.indexOf(".")) + "亿"
          }
          else {
            value = newnum.substring(0, newnum.indexOf(".") + 3) + "亿"
          }
        } else if (newnum.indexOf(".") == -1) {
          value = newnum + "亿"
        } else {
          value = newnum.substring(0, newnum.indexOf(".")) + "亿"
        }
      }
      else if (num > 10000) {
        var newnum = (num / 10000).toString()
        var shishu = newnum.substring(0, newnum.indexOf(".")).length - 2
        if (newnum.toString().indexOf(".") > -1 && shishu <= 0) {
          var weishu = newnum.substring(newnum.indexOf(".") + 1, newnum.toString().indexOf(".") + 3)
          if (weishu == "00") {
            value = newnum.substring(0, newnum.indexOf(".")) + "万"
          }
          else {
            value = newnum.substring(0, newnum.indexOf(".") + 3) + "万"
          }
        } else if (newnum.indexOf(".") == -1) {
          value = newnum + "万"
        } else {
          value = newnum.substring(0, newnum.indexOf(".")) + "万"
        }
      }
      else if (num.toString().indexOf(".") == -1) {
        value = num.toString() + "元"
      } else {
        var newnum = num.toString()
        value = newnum.substring(0, newnum.indexOf(".") + 3) + "元"
      }
      return value
    }
  }
  dlut.PostMan = {
    listen: function (ev, callback, context) {
      var calls = this._callbacks || (this._callbacks = {})
      if (!context) context = this
      (this._callbacks[ev] || (this._callbacks[ev] = [])).push({
        "callback": callback,
        "context": context
      })
      return this
    },
    speak: function () {
      var args = Array.prototype.slice.call(arguments, 0)
      var ev = args.shift()
      var list, calls, i, l
      if (!(calls = this._callbacks)) return this
      if (!(list = this._callbacks[ev])) return this
      for (i = 0, l = list.length; i < l; i++)
        list[i].callback.apply(list[i].context, args)
      return this
    },
    socket: null,
    lastLetter: {},
    init: function (option) {
      if (io && option && option.office) {
        this.socket = io.connect(option.office, {
          'reconnection limit': 1
        })
        this.socket.on("connect_error", function (data) {
          this.io.disconnect()
        })
        this.socket.on("letter", $.proxy(function (letter) {
          if (this.speak) this.speak(letter.title, letter)
          this.lastLetter = letter
        }, this))
      } else {
        console.error("dlut", "PostMan init must has io,option,option.office 3 parms")
      }
    },
    post: function (address, title, letter) {
      letter = $.extend(letter, {addressee: address, title: title})
//                console.log(dlut.TvRoute.role ? dlut.TvRoute.role + "[p]:" : "somebody[p]:", letter);
      if (this.socket) {
        if (letter.addressee != "page")
          this.socket.emit('letter', letter)
      }
      if (letter.addressee == "page" || letter.addressee == "all")
        if (this.speak) this.speak(letter.title, letter)
    },
    whenReceive: function (ev, callback, context) {
      this.listen(ev, callback, context)
    },
    postlastLetter: function () {
      if (this.lastLetter.title) {
        this.post("page", this.lastLetter.title, this.lastLetter)
      }
    }
  }
  dlut.html = {
    color: {
      red: function (text) {
        return '<a class="alert_text_red">' + text + '</a>'
      },
      yellow: function (text) {
        return '<a class="alert_text_yellow">' + text + '</a>'
      },
      green: function (text) {
        return '<a class="alert_text_green">' + text + '</a>'
      }
    },
    getColorClass: function (data, standard, colorStr) {
      var color = 'alert_text_yellow'
      if (colorStr === 'green')
        color = 'alert_text_green'
      else if (colorStr === 'yellow')
        color = 'alert_text_yellow'
      else if (colorStr === 'red')
        color = 'alert_text_red'
      else if (data > standard)
        color = 'alert_text_green'
      else if (data < standard)
        color = 'alert_text_red'
      return color
    },
    arrow: function (data, standard, colorStr) {
      if (data === '-') return '-'
      if (typeof standard === 'undefined') standard = 0
      var color = dlut.html.getColorClass(data, standard, colorStr)
      var arrow = 'fa-arrow-up'
      if (color = 'red') arrow = 'fa-arrow-down'
      return '<a>' + data
        + '<i class="fa ' + arrow + ' ' + color + '" aria-hidden="true" style="margin-left: 5px"></i></a>'
    },
    arrowPercent: function (data, standard, colorStr, n) {
      if (data === '-') return '-'
      if (typeof standard === 'undefined') standard = 0
      var color = dlut.html.getColorClass(data, standard, colorStr)
      var data = dlut.math.toPercent(data, n)
      if (data === '-') return '-'
      var arrow = 'fa-arrow-up'
      if (color === 'alert_text_red') arrow = 'fa-arrow-down'
      else if (color === 'alert_text_yellow') arrow = ''
      return '<a>' + data
        + '<i class="fa ' + arrow + ' ' + color + '" aria-hidden="true" style="margin-left: 5px"></i></a>'
    },
    bubble: function (data, standard, colorStr) {
      if (data === '-') return '-'
      if (typeof standard === 'undefined') standard = 0
      var color = dlut.html.getColorClass(data, standard, colorStr)
      return '<a>' + data
        + '<i class="fa fa-adjust fa-rotate-270 ' + color + '" aria-hidden="true" style="margin-left: 5px"></i></a>'
    },
    bubblePercent: function (data, standard, colorStr) {
      if (data === '-') return '<a>' + '-' + '</a>'
      if (typeof standard === 'undefined') standard = 0
      var color = dlut.html.getColorClass(data, standard, colorStr)
      var data = dlut.math.toPercent(data)
      if (data === '-') return '<a>' + '-' + '</a>'
      if (_.isNaN(data) || data.toString() === 'NaN') {
        return '<a>' + '-' + '</a>'
      }
      return '<a>' + data
        + '<i class="fa fa-adjust fa-rotate-270 ' + color + '" aria-hidden="true" style="margin-left: 5px"></i></a>'
    },
    square: function (data, standard, colorStr) {
      if (data === '-') return '-'
      if (typeof standard === 'undefined') standard = 0
      var color = dlut.html.getColorClass(data, standard, colorStr)
      return '<a>' + data
        + '<i class="fa fa-square ' + color + '" aria-hidden="true" style="margin-left: 5px"></i></a>'
    },
    squarePercent: function (data, standard, colorStr) {
      if (data === '-') return '-'
      if (typeof standard === 'undefined') standard = 0
      var color = dlut.html.getColorClass(data, standard, colorStr)
      var data = dlut.math.toPercent(data)
      if (data === '-') return '-'
      if (_.isNaN(data) || data.toString() === 'NaN') {
        return '<a>' + '-' + '</a>'
      }
      return '<a>' + data
        + '<i class="fa fa-square ' + color + '" aria-hidden="true" style="margin-left: 5px"></i></a>'
    },
    bar: {
      percentBar: function (data, percent, isPercent, n, barColor) {    // n 保留的小数位数
        if (_.isUndefined(isPercent)) isPercent = true
        if (typeof percent === 'undefined') percent = 70
        if (_.isUndefined(barColor)) barColor = '#47b9ff'
        var html = ''
        html += '<label class="percentBar" style="width:' + (_.isNaN(dlut.math.toDecimal(data)) ? 0 : dlut.math.toDecimal(data) * percent) + '%; background-color: ' + barColor + ';">'
        html += '<span class="percentBar-label" style="color: black">'
        if (isPercent === 'int') {
          html += dlut.math.toDecimal(data, 0)
        } else {
          var m = 2
          if (!_.isUndefined(n)) {
            m = n
          }
          html += isPercent ? dlut.math.toPercent(data, m) : dlut.math.toDecimal(data, m)
        }
        html += '</span></label>'

        return html
      },
      doublePercentBar: function (data, max, min, n) {//max为正,min为负
        if (_.isUndefined(n)) n = 2
        data = parseFloat(data)
        var maxNum = Math.abs(min) > max ? Math.abs(min) : max
        var html = ''
        html += '<div class="double-percent-bar">'
        html += '<div class="flex">'
        if (data < 0) {
          html += '<label>' + dlut.math.toPercent(data, n) + '<span style="width:' + parseInt((Math.abs(data) / maxNum) * 80) + '%" class="red"></span></label>'
        }
        html += '</div>'
        html += '<div class="flex">'
        if (data >= 0) {
          html += '<label><span style="width:' + parseInt((data / maxNum) * 80) + '%" class="green"></span>' + dlut.math.toPercent(data, n) + '</label>'
        }
        html += '</div>'
        return html
      }
    }
  }
  dlut.math = {
    toInt(data) {
      if (data === '-') return '-'
      if (_.isNaN(data) || data === Infinity || data === -Infinity || _.isUndefined(data) || data === 'undefined') {
        return '-'
      }
      return Math.round(data)
    },
    toDecimal(data, n) {
      if (data === '-') return '-'
      if (_.isNull(data) || _.isNaN(data) || data === Infinity || data === -Infinity || _.isUndefined(data) || data === 'undefined') {
        return '-'
      }
      if (typeof n === 'undefined') n = 2
      if (n === 0) return dlut.math.toInt(data)
      if (n < 1) n = 1
      if (typeof data === 'string') {
        data = parseFloat(data)
      }
      var pow = Math.pow(10, n)
      var value = (Math.round(data * pow) / pow).toFixed(n)
      return value
    },
    toDecimalK(data, n) {
      return dlut.math.formatThousand(dlut.math.toDecimal(data, n))
    },
    to2Decimal(data) {
      if (data === '-') return '-'
      if (typeof data === 'string') {
        data = parseFloat(data)
      }
      if (_.isNaN(data) || data === Infinity || data === -Infinity) {
        return '-'
      }
      var value = (Math.round(data * 100) / 100).toFixed(2)

      return value
    },
    to2DecimalK(data) {
      return dlut.math.formatThousand(dlut.math.to2Decimal(data))
    },
    toPercent: function (data, n) {  // n为保留小数位数
      if (data === '-') return '-'
      if (data.length === 0 || _.isNull(data) || _.isNaN(data) || data === Infinity || data === -Infinity || _.isUndefined(data) || data === 'undefined') {
        return '-'
      }
      if (typeof data === 'string') {
        data = parseFloat(data)
      }
      var m = 2
      if (!_.isUndefined(n)) {
        m = n
      }
      return dlut.math.toDecimal(data * 100, m) + '%'
    },
    toPercentK: function (data) {
      if (data === '-') return '-'
      if (_.isNaN(data) || data === Infinity || data === -Infinity || _.isUndefined(data) || data === 'undefined') {
        return '-'
      }
      if (typeof data === 'string') {
        data = parseFloat(data)
      }
      if (_.isNaN(data) || data === Infinity || data === -Infinity) {
        return '-'
      }
      return dlut.math.formatThousand(Math.round(data * 10000) / 100) + '%'
    },
    toDate: function (data, dev) {
      if (!data) return '-'
      var yearStr = '年'
      var monthStr = '月'
      var dayStr = '日'
      if (dev) {
        yearStr = monthStr = '/'
        dayStr = ''
      }
      if (data === '-') return '-'
      if (_.isNaN(data) || data === Infinity || data === -Infinity) {
        return '-'
      }
      var result = ''
      if (data)
        data = data.toString()
      if (data.length === 4) {
        result = data + yearStr
      } else if (data.length === 6) {
        var year = data.slice(0, 4)
        var month = data.slice(4)
        result = year + yearStr + month + monthStr
      } else if (data.length === 8) {
        var year = data.slice(0, 4)
        var month = data.slice(4, 6)
        var day = data.slice(6, 8)
        result = year + yearStr + month + monthStr + day + dayStr
      } else {
      }
      return result
    },
    convertNum: function (num) {
      if (typeof  num === 'string') {
        num = parseFloat(num)
      } else if (typeof  num === 'number') {
      } else {
        alert('dlut.math.convertNum 参数类型错误')
      }
      if (num > 0 && num > 1000 && num < 1000000) {
        num = dlut.math.to2Decimal(num / 1000) + 'K'
      } else if (num > 0 && num > 1000000) {
        num = dlut.math.to2Decimal(num / 1000000) + 'M'
      } else if (num < 0 && num < -1000 && num > -1000000) {
        num = dlut.math.to2Decimal(num / 1000) + 'K'
      } else if (num < 0 && num < -1000000) {
        num = dlut.math.to2Decimal(num / 1000000) + 'M'
      } else {
      }
      return num
    },
    formatThousand: function (num) {
      num = num + ''
      if (!num.indexOf('.')) {
        num += '.'
      }
      return num.replace(/(\d)(?=(\d{3})+\.)/g, function ($0, $1) {
        return $1 + ','
      }).replace(/\.$/, '')
    },
    isNum: function (data) {
      if (data === '-') return '-'
      if (data.length === 0 || _.isNull(data) || _.isNaN(data) || data === Infinity || data === -Infinity || _.isUndefined(data) || data === 'undefined') {
        return '-'
      }
      if (typeof data === 'string') {
        data = parseFloat(data)
      }
      return data
    }
  }
  dlut.echart = {
    // 两个y轴的情况时，0刻度对齐
    yAxisAlign: function (yAxis) {  // 传入echart的yAxis
      for (var i in yAxis) {
        yAxis[i].max = function (value) {
          if (Math.abs(value.max) > Math.abs(value.min)) {
            return (Math.abs(value.max) * 1.2).toFixed(2)
          } else {
            return (Math.abs(value.min) * 1.2).toFixed(2)
          }
        }
        yAxis[i].min = function (value) {
          if (Math.abs(value.max) > Math.abs(value.min)) {
            return (-Math.abs(value.max) * 1.2).toFixed(2)
          } else {
            return (-Math.abs(value.min) * 1.2).toFixed(2)
          }
        }
      }
    },
    labelFormatter: function (e) {
      var value = e.value
      var result = ''
      var formatter = e.data.laberFormatter
      if (formatter) {
        try {
          result = eval(formatter)
          return result
        } catch (e) {
          console.error('label formatterError', value, formatter)
        }
      } else {
        return value
      }
      // return result = eval(tooltipTarget[i].formatter)
    },
    // 造一个假柱图，数据为0，将label显示在x轴下方
    // formatterFunc显示的格式化
    // rotate 旋转角度
    // 位移：类型为数组
    xAxisBottom: function (option, indexArr, formatterFunc, rotate, offset) {
      var seriesArr = []
      for (var i = 0; i < indexArr.length; i++) {
        var seriesDemo = angular.copy(option.series[indexArr[i]])
        option.series[indexArr[i]].stack = indexArr[i] + 1
        seriesDemo.stack = indexArr[i] + 1
        seriesDemo.isAssist = true
        seriesDemo.name += ' ' // 避免影响图例
        seriesDemo.itemStyle = {
          normal: {
            barBorderColor: 'rgba(0,0,0,0)',
            color: 'rgba(0,0,0,0)'
          },
          emphasis: {
            barBorderColor: 'rgba(0,0,0,0)',
            color: 'rgba(0,0,0,0)'
          }
        }
        seriesDemo.data = []
        for (var j = 0; j < option.series[indexArr[i]].data.length; j++) {
          var itemData = {
            eventInfo: option.series[indexArr[i]].data[j].eventInfo,
            value: 0
          }
          seriesDemo.data.push(itemData)
        }
        seriesDemo.label = {
          show: true,
          position: 'bottom',
          rotate: rotate ? rotate : 0,
          ignore: true,
          color: 'black',
          offset: offset ? offset : [0, 0],
          formatter: formatterFunc
        }
        seriesArr.push(seriesDemo)
      }
      var seriesAll = seriesArr.concat(option.series)
      option.series = seriesAll
    },
    // seriess: option.series；index: 第几个列维；sortList:自定义排序数组
    customSort: function (seriess, sortList, kindex) {
      if (_.isUndefined(kindex)) kindex = 1

      kindex = kindex - 1
      var axis = []
      _.each(seriess, function (series) {
        var series_data = {}
        var series_final = []
        _.each(series.data, function (data) {
          series_data[data.eventInfo[kindex].value] = data
        })

        for (var sl = 0; sl < sortList.length; sl++) {
          if (series_data[sortList[sl]]) {
            series_final.push(series_data[sortList[sl]])
            if (axis.indexOf(sortList[sl]) === -1) axis.push(sortList[sl])
            delete series_data[sortList[sl]]
          }
        }

        for (var sd in series_data) {
          series_final.push(series_data[sd])
          if (axis.indexOf(sd) === -1) axis.push(sd)
        }

        series.data = series_final
      })

      return {
        axis: axis,
        series: seriess
      }
    }
  }
  dlut.table = {
    getIndex: function (option, name) {
      var data = option.data
      if (data.length > 1) {
        var headerList = data[0]
        for (var i = 0; i < headerList.length; i++) {
          if (headerList[i].data === name) {
            return i
          }
        }
      } else
        return
    },
    getRankMap: function (option, index, type) {
      if (typeof type === 'undefined') type = 'desc'
      var data = option.data
      var sortMap = {}
      var sortList = []
      for (var i = 1; i < data.length; i++) {
        var value = parseFloat(data[i][index].data)
        sortList.push(value)
      }
      if (sortList && sortList.sort) {
        var sortFun = function (a) {
          return a
        }
        if (type === 'desc')
          sortFun = function (a) {
            return -a
          }
        sortList = _.sortBy(sortList, sortFun)
      }
      for (var i = 0; i <= sortList.length; i++) {
        sortMap[sortList[i]] = i + 1
      }
      return sortMap
    },
    getTotal: function (option, index) {
      var data = option.data
      var TOTAL = 0
      if (data.length > 1)
        for (var i = 1; i < data.length; i++) {
          if (data[i][index]) {
            var value = parseFloat(data[i][index].data)
            if ($.isNumeric(data[i][index].data))
              TOTAL += value
          }
        }
      return TOTAL
    },
    // data:option.data;kindex:第几个列维；glength:行维的长度;sortList: 自定义排序数组
    customSort: function (data, sortList, kindex, glength) {
      if (_.isUndefined(kindex)) kindex = 1
      if (_.isUndefined(glength)) glength = 0
      kindex = kindex - 1

      var series_final = []
      var series_data = {}
      for (var d = 1 + glength; d < data.length; d++) {
        series_data[data[d][kindex].data] = data[d]
      }
      for (var f = 0; f < 1 + glength; f++) {
        series_final.push(data[f])
      }

      _.each(sortList, function (sort) {
        if (series_data[sort]) {
          series_final.push(series_data[sort])
          delete series_data[sort]
        }
      })

      for (var sd in series_data) {
        series_final.push(series_data[sd])
      }

      return series_final
    }
  }
  dlut.selector = {
    customSort: function (data, sortList) {
      var data_final = []
      var data_obj = {}
      _.each(data, function (_id) {
        data_obj[_id] = _id
      })

      _.each(sortList, function (item) {
        if (data_obj[item]) {
          data_final.push(item)
          delete data_obj[item]
        }
      })

      for (var sd in data_obj) {
        data_final.push(data_obj[sd])
      }
      return data_final
    }
  }
  dlut.url = {
    goTo: function (hash, params, pathname) {
      var u = ''
      if (!_.isUndefined(pathname)) {
        u = window.location.origin + pathname + '?'
      } else {
        u = window.location.origin + window.location.pathname + '?'
      }
      var win_params = window.$$dlut_param
      var token = getQueryString('yili-token')// 获取token
      var has = false
      if (token) {
        has = true
        u += 'yili-token=' + token
      }
      if (params.length) {
        var win_p_keys = [], has_keys = []
        for (var wp in win_params) {// 获取当前页所有的参数的key
          win_p_keys.push(wp)
        }
        _.each(win_p_keys, function (key) {// 循环所有key与需要传的key对比，选出需要的key
          _.each(params, function (param) {
            if (key.indexOf(param) > -1) {
              has_keys.push(key)
            }
          })
        })

        _.each(has_keys, function (key, i) {
          var key_param = angular.copy(win_params[key])
          // 如果需要传的参数是一个数组，解析为逗号分隔的字符串
          if (typeof win_params[key] === 'object' && _.isUndefined(win_params[key].length)) {
            key_param = ''
            _.each(win_params[key], function (wp, i) {
              key_param += wp
              if (i < wp.length - 1) {
                key_param += ','
              }
            })
          }
          // 拼装url字符串
          if (has && i === 0) {// 如果是第一个参数，并且有token
            u += '&' + key + '=' + key_param
          } else if (!has && i === 0) {// 如果第一个参数，并且没有token
            u += key + '=' + key_param
          } else {// 除了第一个参数之后的参数操作
            u += '&' + key + '=' + key_param
          }
        })
      }
      window.location.href = u + hash
    }
  }
})
