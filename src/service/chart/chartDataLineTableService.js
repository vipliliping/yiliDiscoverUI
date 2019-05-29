/**
 * Created by yfyuan on 2016/10/28.
 */
'use strict';
discovery.service('chartDataLineTableService', function ($filter, EventService, uuid4) {
    "ngInject";

    var translate = $filter('translate');

    this.render = function (containerDom, option, scope, persist) {
        var render = new CBoardDataLineTableRender(containerDom, option);
        this.instance = {
            render: render
        };
        var uuid = uuid4.generate();//定义表格需要的唯一id
        var tableName = 'example_' + uuid;//定义表格名字
        var html = render.html(persist, uuid, tableName);
        // if (scope) {
        //     containerDom.append($compile(html)(scope));
        // } else {
        containerDom.html(html);
        // }
        return render.initialize(option, EventService, scope, uuid, tableName);
    };

    this.parseOption = function (option) {
        var dataList = [];
        dataList = option.keys;
        for (var j = 0; j < option.data.length; j++) {
            var newList = option.data[j];
            for (var i = 0; i < dataList.length; i++) {
                dataList[i] = dataList[i].concat(newList[i]);
            }
        }
        option.dataList = dataList;
        return option;
    };

});

