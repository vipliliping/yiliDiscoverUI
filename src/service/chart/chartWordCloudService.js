/**
 * Created by Junjie.M on 2017/07/20.
 */
'use strict';
discovery.service('chartWordCloudService', function (EventService) {
    "ngInject";
    this.instance = null;

    this.render = function (containerDom, option, scope, persist, drill, themeFunList) {
        if (option == null) {
            containerDom.html("<div class=\"alert alert-danger\" role=\"alert\">No Data!</div>");
            return;
        }
        var height;
        scope ? height = scope.myheight - 20 : null;
        this.instance = new CBoardEChartRender(containerDom, option, undefined, themeFunList);
        return this.instance.chart(height, persist, EventService);
    };

    this.parseOption = function (data) {
        var names = data.keys;
        var values = data.data;
        var chartConfig = data.chartConfig;
        var casted_keys = data.keys;

        var datas = [];
        for (var i in names) {
            var eventInfo = CBoardEChartRenderEventInfo(data, undefined, i);
            datas.push({
                eventInfo: eventInfo,
                name: names[i].join("-"),
                value: values[0][i]
            })
        }

        function textStyleColors () {
            return 'rgb(' + [
              Math.round(Math.random() * 160),
              Math.round(Math.random() * 160),
              Math.round(Math.random() * 160)
            ].join(',') + ')';
        }

        var option = {
            tooltip: {
                formatter: "{b} : {c}"
            },
            toolbox: {
                show: true,
                feature: {
                    mark: {show: false},
                    dataView: {show: true, readOnly: true},
                    //magicType : {show: true, type: ['line', 'bar']},
                    restore: {show: false},
                    saveAsImage: {show: true}
                }
            },
            series: [{
                type: 'wordCloud',
                gridSize: 5,
                sizeRange: [12, 50],
                rotationRange: [-90, 90],
                rotationStep: 45,
                shape: 'circle',
                textStyle: {
                    normal: {
                        color: function () {
                          return 'rgb(' + [
                            Math.round(Math.random() * 255),
                            Math.round(Math.random() * 255),
                            Math.round(Math.random() * 255)
                          ].join(',') + ')';
                        }
                    },
                    emphasis: {
                        shadowBlur: 10,
                        shadowColor: '#333'
                    }
                },
                data: datas
            }]
        };
        return option;
    };

});
