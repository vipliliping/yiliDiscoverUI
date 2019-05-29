/**
 * Created by peter on 2017/8/3.
 */
var updateEchartOptions = function (tuningOpt, rawOpt) {
    if (tuningOpt) {
        //markpoint
        if (tuningOpt.markPoint) {
            if (_.isArray(rawOpt.series)) {
                var stackList = [], stackTypes = [];
                for (var i = 0; i < rawOpt.series.length; i++) {
                    var x, y, sData = [], s = rawOpt.series[i];

                    x = getAxis(s.xAxisIndex, rawOpt.xAxis);
                    y = getAxis(s.yAxisIndex, rawOpt.yAxis);

                    if (!_.isUndefined(s.stack)) {
                        stackList.push(s);
                        stackTypes.push(s.stack);
                    } else {
                        sData = getSeriesData(s.data);
                        markPointSet(x, y, sData, s);
                    }
                }

                if (stackList.length) {
                    var ustack = _.uniq(stackTypes);
                    if (ustack.length == 1) {
                        var info = getStackInfo(stackList);
                        markPointSet(info.x, info.y, info.sumData, stackList[0]);
                    } else {
                        var stackObjs = _.groupBy(stackList, 'stack');
                        for (var so in stackObjs) {
                            var info = getStackInfo(stackObjs[so]);
                            markPointSet(info.x, info.y, info.sumData, stackObjs[so][0]);
                        }
                    }

                    function getStackInfo(stackList) {
                        var x = getAxis(stackList[0].xAxisIndex, rawOpt.xAxis),
                            y = getAxis(stackList[0].yAxisIndex, rawOpt.yAxis),
                            sumData = getSeriesData(stackList[0].data);

                        if (stackList.length > 1) {
                            for (var i = 1; i < stackList.length; i++) {
                                x = getAxis(stackList[i].xAxisIndex, rawOpt.xAxis);
                                y = getAxis(stackList[i].yAxisIndex, rawOpt.yAxis);
                                var ssData = getSeriesData(stackList[i].data);
                                sumData = _.map(_.zip(sumData, ssData), function (arr) {
                                    return arr[0] + arr[1]
                                });
                            }
                        }

                        return {
                            x: x,
                            y: y,
                            sumData: sumData
                        }
                    }
                }

                function getAxis(axisIndex, axis) {
                    if (!_.isUndefined(axisIndex) && _.isArray(axis)) {
                        if (axis[axisIndex].type == 'category') {
                            return axis[axisIndex].data;
                        }
                    } else if (_.isUndefined(axisIndex) && _.isArray(axis)) {
                        if (axis[axisIndex].type == 'category') {
                            return axis[0].data;
                        }
                    } else {
                        if (axis.type == 'category') {
                            return axis.data;
                        }
                    }
                }

                function getSeriesData(data) {
                    var rtn = [];
                    for (var m = 0; m < data.length; m++) {
                        var msd = data[m];
                        if (!_.isUndefined(msd.value)) {
                            rtn.push(msd.value);
                        } else {
                            rtn.push(msd);
                        }
                    }
                    return rtn;
                }

                function markPointSet(x, y, sData, s) {
                    var coords = [];
                    if (_.isUndefined(x)) {
                        for (var j = 0; j < y.length; j++) {
                            coords.push({
                                coord: [sData[j], j, s.data[0].unit ? s.data[0].unit : '']
                            });
                        }

                        s.markPoint = {
                            symbolRotate: -90,
                            label: {
                                normal: {
                                    textStyle: {
                                        fontSize: 18
                                    },
                                    formatter: function (params) {
                                        return params.data.coord[0] + params.data.coord[2];
                                    },
                                    offset: [5, 2]
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: 'transparent'
                                }
                            },
                            data: coords
                        }
                    } else {
                        for (var j = 0; j < x.length; j++) {
                            coords.push({
                                coord: [j, sData[j], s.data[0].unit]
                            });
                        }
                        s.markPoint = {
                            label: {
                                normal: {
                                    formatter: function (params) {
                                        return params.data.coord[1] + params.data.coord[2];
                                    },
                                    textStyle: {
                                        fontSize: 18
                                    }
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: 'transparent'
                                }
                            },
                            data: coords
                        }
                    }
                }
            }
        }

        // legend
        rawOpt.grid = angular.copy(echartsBasicOption.grid);
        if (tuningOpt.legendShow == false) {
            rawOpt.grid.top = '5%';
            rawOpt.legend.show = false;
        } else {
            rawOpt.legend === undefined ? rawOpt.legend = angular.copy(echartsBasicOption.legend) : null;
            tuningOpt.legendX ? rawOpt.legend.x = tuningOpt.legendX : null;
            tuningOpt.legendY ? rawOpt.legend.y = tuningOpt.legendY : null;
            tuningOpt.legendOrient ? rawOpt.legend.orient = tuningOpt.legendOrient : null;
        }

        // grid
        rawOpt.grid === undefined ? rawOpt.grid = angular.copy(echartsBasicOption.grid) : null;
        if (tuningOpt.gridCustom == true) {
            tuningOpt.gridTop ? rawOpt.grid.top = tuningOpt.gridTop : null;
            tuningOpt.gridBottom ? rawOpt.grid.bottom = tuningOpt.gridBottom : null;
            tuningOpt.gridLeft ? rawOpt.grid.left = tuningOpt.gridLeft : null;
            tuningOpt.gridRight ? rawOpt.grid.right = tuningOpt.gridRight : null;
        } else {
            rawOpt.grid = angular.copy(echartsBasicOption.grid);
        }
    }
};
