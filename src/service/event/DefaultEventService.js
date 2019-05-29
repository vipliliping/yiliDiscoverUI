angular.module('discovery').factory("EventService", function () {
    "ngInject";
    var onEventFunc = {};
    return {
        on: function (type, f) {
            //事件绑定
            onEventFunc[type] = f;
        },
        trigger: function (type, data) {
            //触发事件
            for (var item in onEventFunc) {
                if (item == type)
                    onEventFunc[item](data);
            }
        },
        off: function (type) {
            delete onEventFunc[type]
        }
        // getQueryString: function (name) {
        //     var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        //     var r = window.location.search.substr(1).match(reg);
        //     if (r != null) return unescape(r[2]);
        //     return null;
        // }
    }
});
