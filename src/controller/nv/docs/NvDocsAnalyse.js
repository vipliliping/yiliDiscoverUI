'use strict';
discovery.controller('NvDocsAnalyse', function ($scope, $stateParams, $http, $filter, $timeout, EventService) {
    "ngInject";
    var ANALYSE_URL = "screen/analyse.json";
    $scope.inputMode = true;
    $scope.sectionList = [];
    $scope.tooltipStyle = {
        display: "none"
    };
    var ajaxFunction = function (analyseStr) {
        $http.post(ANALYSE_URL, {text: analyseStr}).success(function (data) {
            $scope.infoList = data.info;
            $scope.title = data.title;
            var sectionList = [];
            for (var i = 0; i < data.text.length; i++) {
                var text = data.text[i];
                var textArray = text.split(/{{|}}/);
                var array = [];
                for (var j = 0; j < textArray.length; j++) {
                    var item = abc(textArray[j]);
                    array.push(item);
                }
                sectionList.push({
                    text: data.text[i],
                    arr: array
                })
            }
            $scope.sectionList = sectionList;
        })
    };
    $scope.analyse = function () {
        $scope.inputMode = false;
        ajaxFunction()
    };
    $scope.back = function () {
        $scope.inputMode = true;
    };
    var clearAllAction = function (section) {
        for (var i = 0; i < section.arr.length; i++) {
            section.arr.active = false;
        }
    };
    $scope.resultIt = function (section, word, $event) {
        $scope.selectedSection = section;
        $("#tooltip").hide();
        if (word.type == "M") {
            var $item = $($event.currentTarget);
            var position = {
                left: $item.position().left + $item.width() - 20,
                top: $item.position().top + $item.height() + 20
            };
            $scope.tooltipInfo = $scope.infoList[word.id];
            $scope.tooltipStyle = position;
            $("#tooltip").show();
        }
    };
    $scope.mouseOver = function () {

    };
    $scope.click = function (idList) {
        EventService.send({
            title: "3TV_route:page_change",
            addressee: "all",
            center: "preview.html#/nv/docs/result/" + idList.join(",")
        })
    };
    var abc = function (text) {
        var info = text.split("||");
        if (info[0] == "M") {
            return {
                type: "M",
                text: info[1],
                id: info[2]
            }
        } else if (info[0] == "D") {
            return {
                type: "D",
                text: info[1]
            }
        } else {
            return {
                type: "text",
                text: text
            }
        }
    };
    ajaxFunction();
    $(".textareaMode").on("scroll", function () {
        $("#tooltip").hide();
    })
});
