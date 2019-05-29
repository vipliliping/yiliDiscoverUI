'use strict';
discovery.service('chartFlexService', function ($interpolate, $compile, $sce, uuid4, EventService) {
    "ngInject";
    this.render = function (containerDom, option, scope, persist, drill) {
        if (option) {
            var uuid = uuid4.generate();
            var render = new CBoardFlexRender(containerDom, option);
            return render.initialize(option, EventService, scope, uuid);
        }
    };

    this.parseOption = function (data) {
        if (!_.isUndefined(data.chartConfig.option.flex)) {
            var newList = [];
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
            return {
                data: newList,
                template: data.chartConfig.option.flex
            };
            /*for (var i = 0; i < data.keys.length; i++) {
                for (var j = 0; j < data.series.length; j++) {
                    //if (data.data[j][i]) {
                        var obj = {};
                        //keys
                        for (var k = 0; k < data.chartConfig.keys.length; k++) {
                            obj[data.chartConfig.keys[k].col] = data.keys[i][k];
                        }
                        //groups
                        var seriesItem = data.series[j];
                        for (var k = 0; k < data.chartConfig.groups.length; k++) {
                            obj[data.chartConfig.groups[k].col] = seriesItem[k];
                        }
                        //values
                        var valueKey = seriesItem[seriesItem.length - 1];
                        var found = false;
                        for (var k = 0; k < newList.length; k++) {
                            var item = newList[k],
                                different = false;
                            for (var key in obj) {
                                if (item[key] != obj[key]) {
                                    different = true;
                                    break;
                                }
                            }
                            if (!different) {
                                item[valueKey] = data.data[j][i];
                                found = true;
                            }
                        }
                        if (!found) {
                            obj[valueKey] = data.data[j][i];
                            newList.push(obj);
                        }
                    //}
                }
            }*/
        }
        return false;
    };
});


