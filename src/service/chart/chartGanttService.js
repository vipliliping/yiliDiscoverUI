/**
 * Created by yfyuan on 2016/10/28.
 */
'use strict';
discovery.service('chartGanttService', function ($filter, EventService, uuid4, $rootScope) {
    "ngInject";

    this.render = function (containerDom, option, scope, persist) {
        var scope = containerDom.data("$scope");
        if (scope) {
            var render = new CBoardGanttRender(containerDom, option);
            this.instance = {
                render: render
            };
            var uuid = uuid4.generate();//定义表格需要的唯一id
            var ganttName = 'example_' + uuid + "_gantt";//定义表格名字
            var html = render.html(persist, uuid, ganttName);
            containerDom.html(html);
            return render.initialize(option, EventService, scope, uuid, ganttName);
        }
    };

    this.parseOption = function (data) {
        var chartConfig = data.chartConfig;

        var keyNameList = ["id", "parent", "start_date", "duration", "text"],
            groupNameList = ["state", "progress"],
            keyList = chartConfig.keys,
            groupList = chartConfig.groups,
            valueList = chartConfig.values[0].cols,
            dataMatrix = data.originalData.data;
        var newList = [];
        for (var i = 0; i < dataMatrix.length; i++) {
            var item = {}, dataItem = dataMatrix[i], index = 0;
            for (var j = 0; j < groupList.length; j++) {
                item[groupNameList[j]] = dataItem[index];
                index++;
            }
            for (var k = 0; k < keyList.length; k++) {
                item[keyNameList[k]] = dataItem[index];
                index++;
            }
            for (var l = 0; l < valueList.length; l++) {
                item[valueNameList[l]] = dataItem[index];
                index++;
            }
            newList.push(item);
        }

        data.newList = newList;
        return data;
    };

});

