'use strict';
discovery.service('chartFlexChartService', function (EventService) {
    "ngInject";
    this.instance = null;

    this.render = function (containerDom, option, scope, persist, drill, themeFunList) {
        this.instance = new CBoardEChartRender(containerDom, option, undefined, themeFunList);
        return this.instance.chart(null, persist, EventService);
    };

    this.parseOption = function (data, scope) {
        var chartConfig = data.chartConfig;
        var newList = [];
        if (!_.isUndefined(data.chartConfig.option.flex)) {
            //1. keyList
            var keyNameList = [];
            for (var i = 0; i < data.chartConfig.keys.length; i++) {
                keyNameList.push(data.chartConfig.keys[i].col)
            }
            //2. keys
            for (var i = 0; i < data.keys.length; i++) {
                var obj = {};
                for (var j = 0; j < keyNameList.length; j++) {
                    obj[keyNameList[j]] = data.keys[i][j];
                }
                newList.push(obj)
            }
            //3. values
            for (var i = 0; i < data.series.length; i++) {
                for (var j = 0; j < data.keys.length; j++) {
                    var valueName = data.series[i][0];
                    var valueData = data.data[i];
                    newList[j][valueName] = valueData[j];
                }
            }
        }
        var echartOption = {};
        try {
            var draw;
            var flexChart = eval(data.chartConfig.option.flex);
            if (_.isFunction(flexChart))
                echartOption = flexChart(newList,data);
            //event


            //eventInfo end
            // delete(window.flexChart);
        } catch (e) {
            console.error('chartFlexChartService:function-this.parseOption,row-11,eval(data.chartConfig.option.flex)执行错误', e);
        }
        return echartOption;
    };
});
