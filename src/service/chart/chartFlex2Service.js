'use strict';
discovery.service('chartFlex2Service', function ($interpolate, $rootScope, $compile, $sce, uuid4, EventService, BoardParamService) {
    "ngInject";
    function getParams() {
        return BoardParamService
    }
    this.render = function (containerDom, option, scope, persist, drill) {
        if (option) {
            var sendScope = scope;
            if (sendScope == undefined)
                sendScope = $rootScope;
            // if (scope == null) scope = $rootScope;
            var uuid = uuid4.generate();
            var render = new CBoardFlex2Render(containerDom, option);
            return render.initialize(option, EventService, sendScope, uuid, $compile, getParams());
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
                template: data.chartConfig.option.flex,
                code: data.chartConfig.option.code
            };
        }
        return false;
    };
});


