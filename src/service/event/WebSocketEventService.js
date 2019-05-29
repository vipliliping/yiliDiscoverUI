angular.module('discovery').factory("EventService", function (globalConfig, $rootScope) {
  "ngInject"
  var socketUrl = globalConfig.api.socket,
    onEventFunc = {},
    socket = false,
    io = window.io
  try {
      socketUrl = 'http://21.122.110.147:5051'
    socket = io.connect(socketUrl, {
      'reconnection limit': 1
    })
    socket.on("connect_error", function (data) {
      io.disconnect()
    })
    socket.on("letter", function (letter) {
      if (letter.type
        && !_.isUndefined(letter.scope)
        && onEventFunc[letter.type]) {
        if (letter.scope == $rootScope.role || letter.scope == "all") {
          onEventFunc[letter.type](letter.data)
        }
      }
    })
  } catch (e) {
    console.error("dlut", "PostMan init must has io,option,socketUrl 3 parms")
  }
  return {
    on: function (type, f) {
      //事件绑定
      onEventFunc[type] = f
    },
    trigger: function (type, data, scope) {
      //触发事件
      for (var item in onEventFunc) {
        if (item == type) {
          if (_.isUndefined(scope) || scope == "all") {
            onEventFunc[item](data)
          }
          if (!_.isUndefined(scope) && socket) {
            socket.emit('letter', {
              type: type,
              data: data,
              scope: scope
            })
          }
        }
      }
    },
    send: function (message) {
      if (socket) {
        socket.emit("letter", message)
      }
    }
    // getQueryString: function (name) {
    //     var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    //     var r = window.location.search.substr(1).match(reg);
    //     if (r != null) return unescape(r[2]);
    //     return null;
    // }
  }
})
