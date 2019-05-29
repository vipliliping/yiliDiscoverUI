/**
 * Created by yfyuan on 2016/10/28.
 */
'use strict';
discovery.service('chartKpiService', function (dataService, $compile, $filter) {
    "ngInject";

    var translate = $filter('translate');

    this.render = function (containerDom, option, scope, persist) {
        var render = new CBoardKpiRender(containerDom, option);
        var html = render.html(persist);
        if (scope) {
            containerDom.append($compile(html)(scope));
        } else {
            containerDom.html(html);
        }
        return render.realTimeTicket();
    };

    this.parseOption = function (data) {


        var option = {};
        var config = data.chartConfig;
        var casted_keys = data.keys;
        var casted_values = data.series;
        var aggregate_data = data.data;
        var newValuesConfig = data.seriesConfig;

        option.kpiValue = aggregate_data.length > 0 ? aggregate_data[0][0] : '0';
        if (config.values[0].format) {
            option.kpiValue = numbro(option.kpiValue).format(config.values[0].format);
        }
        option.kpiName = config.values[0].name;
        option.style = config.values[0].style;
        option.edit = translate("COMMON.EDIT");
        option.refresh = translate("COMMON.REFRESH");
        option.icon = config.values[0].icon;
        // option.unit = config.values[0].cols[0].unit ? config.values[0].cols[0].unit : '';
        if (config.values[0].cols[0].unit) {
            if (config.values[0].cols[0].unit == '元' || config.values[0].cols[0].unit == '万' || config.values[0].cols[0].unit == '亿') {
                if (aggregate_data.length > 0) {
                    var newNum = dlut.utils.convertMoney(option.kpiValue, config.values[0].cols[0].unit);
                    option.kpiValue = newNum.substr(0, newNum.length - 1);
                    option.unit = newNum.substr(newNum.length - 1, newNum.length);
                }
            }else{
                option.unit = config.values[0].cols[0].unit;
            }
        } else {
            option.unit = '';
        }

        option.align = config.values[0].align ? config.values[0].align : 'textLeft';
        return option;
    };
});
