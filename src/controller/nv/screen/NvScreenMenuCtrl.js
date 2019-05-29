'use strict'
discovery.controller('NvScreenMenuCtrl',
    function ($scope, $stateParams, $http, $uibModal, $filter, ModalUtils, $timeout) {
        'ngInject'
        var treeID = 'screenTreeID' // Set to a same value with treeDom
        var originalData = []
        var updateUrl = 'dashboard/updateBoard.do'
        $scope.TYPE_LIST = [
            {name: '左', type: 'left'},
        ]
        var translate = $filter('translate')
        $scope.screenList = [
            {
                id: 'Screen',
                text: translate('我的看板'),
                parent: '#',
                state: {disabled: true},
            },
        ]

        var getBoardList = function () {
            $http.get('admin/getBoardListUser.do').success(function (response) {
                for (var i = 0; i < response.length; i++) {
                    // if (response[i].categoryName) {
                    // }
                    response[i].resId = response[i].id
                }
                $scope.screenList = response
                $scope.searchNode()
                getScreenList()
            })
        }

        getBoardList()

        var setScreenLinkByDrop = function (menuId, type, dashboardId) {
            if (_.isUndefined(menuId) || _.isUndefined(type) ||
                _.isUndefined(dashboardId))
                return

            var dashboardInfo = _.find($scope.screenList, function (item) {
                return item.resId == dashboardId
            })
            var screen = _.find($scope.screens, function (item) {
                return item.id == menuId
            })
            screen.type[type] = {
                dashboardId: dashboardId,
                menuId: menuId,
                name: dashboardInfo.name,
                type: type,
            }
        }

        $scope.emptyBoard = function (type) {
            type.dashboardId = ''
            type.name = ''
        }

        $scope.saveScreen = function (item) {
            // var itemMenuIdList = [],
            //     itemTypeList = [],
            //     itemDashboardIdList = [];
            var menuItemList = []
            if (item.type)
                for (var type in item.type) {
                    // itemTypeList.push(type);
                    // itemMenuIdList.push(item.type[type].menuId);
                    // itemDashboardIdList.push(item.type[type].dashboardId);
                    menuItemList.push(item.type[type])
                }

            /*$http.post("screens/saveScreenList.do", {
                menuItemList: menuItemList,
                /!*id: item.id,
                title: item.title*!/
            }).success(function (result) {
                if (result.falg > 0) {
                    alert('success');
                }
            });*/
            $.ajax({
                type: 'POST',
                url: baseUrl + 'screens/saveScreenList.do',
                dataType: 'json',
                //contentType : "application/json",
                data: {
                    menuItemList: JSON.stringify(menuItemList),
                    id: item.id,
                    title: item.title,
                    status: item.status,
                },
                success: function (data) {
                    if (data.falg > 0) {
                        ModalUtils.alert('保存成功', 'modal-warning', 'sm')
                    } else {
                        ModalUtils.alert('保存失败', 'modal-warning', 'sm')
                    }
                },
            })
        }

        $scope.deleteScreen = function (item) {
            ModalUtils.confirm(translate('COMMON.CONFIRM_DELETE'), 'modal-info', 'sm',
                function () {
                    $http.post('screens/deleteScreenList.do', {id: item.id}).success(function (result) {
                        if (result.falg > 0) {
                            getScreenList()
                            ModalUtils.alert('删除成功', 'modal-warning', 'sm')
                        } else {
                            ModalUtils.alert('删除失败', 'modal-warning', 'sm')
                        }
                    })
                })
        }

        $scope.updateScreenSort = function (id, orderId, sort) {
            if (sort == 'desc')
                sort = '0'
            if (_.isUndefined(sort))
                sort = '1'
            $http.post('screens/updateScreenSort.do',
                {id: id, orderId: orderId, sortId: sort}).success(function (result) {
                if (result > 0) {
                    getScreenList()
                } else {
                }
            })
        }

        $scope.screenStatus == 1

        var getScreenList = function () {
            $scope.screenItem = []
            $http.get('screens/getScreenList.do').success(function (ScreenList) {
                ScreenList = ScreenList.result
                for (var i = 0; i < ScreenList.length; i++) {
                    var screen = ScreenList[i]
                    if (screen.dashboardScreenMenuItems) {
                        var obj = {}
                        for (var j = 0; j < screen.dashboardScreenMenuItems.length; j++) {
                            var menuItem = screen.dashboardScreenMenuItems[j]
                            obj[menuItem.type] = menuItem
                            var dashboard = _.find($scope.screenList, function (item) {
                                return item.resId == menuItem.dashboardId
                            })
                            if (dashboard) {
                                menuItem.name = dashboard.name
                            }
                        }
                        screen.type = obj
                    }
                }
                $scope.screens = ScreenList
            })
            $('#screens').sortable()
            $('#screens').disableSelection()
            $(document).on('sortdeactivate', '#screens', function (event, ui) {
                /*var target = $(event.toElement).parents('li')
                var targetId = target.attr('id');
                var prevId = null, nextId = null;
                if ($(target).next('li')[0]) {
                  nextId = $($(target).next('li')[0]).attr('id')
                }
                if ($(target).prev('li')[0]) {
                  prevId = $($(target).prev('li')[0]).attr('id')
                }
                $http.post('screens/dragScreenSort.do', {id: targetId, prevId: prevId, nextId: nextId}).success(function (response) {
                })
                */
                var screenOrderList = [];
                var target = $(event.toElement).parents('ul')
                $(target).find("li").each(function (index, element) {
                    screenOrderList.push({
                        id: $(element).attr('id'),
                        orderId: index
                    })
                })
                /*$http.post('screens/dragScreenSort.do', {screenOrderList: JSON.stringify(screenOrderList)}).success(function (response) {
                })*/
                //传json数组后台以List接收
                $http({
                    method: "POST",
                    url: "screens/dragScreenSort.do",
                    data: JSON.stringify(screenOrderList),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }).success(function(response){
                });
            })
        }

        $scope.addScreeItem = function () {
            $http.post('screens/addScreeItem.do').success(function (result) {
                getScreenList()
            })
        }

        $scope.treeConfig = jsTreeConfig1

        $scope.screenTreeConfig = {
            core: {
                multiple: true,
                animation: true,
                error: function (error) {
                },
                check_callback: true,
                worker: true,
            },
            checkbox: {
                three_state: false,
            },
            version: 1,
            plugins: ['types', 'unique', 'dnd'],
        }

        $scope.screenTreeConfig = $.extend(true, {}, $scope.screenTreeConfig,
            $scope.treeConfig)

        $scope.searchNode = function () {
            var para = {dsName: '', dsrName: ''}
            var list = $scope.screenList.map(function (ds) {
                var dsr = _.find($scope.datasourceList, function (obj) {
                    return obj.id == ds.data.datasource
                })
                return {
                    'id': ds.id,
                    'name': ds.name,
                    'categoryName': ds.categoryName,
                    'datasourceName': dsr ? dsr.name : '',
                }
            })
            //split search keywords
            if ($scope.keywords) {
                if ($scope.keywords.indexOf(' ') == -1 &&
                    $scope.keywords.indexOf(':') == -1) {
                    para.dsName = $scope.keywords
                } else {
                    var keys = $scope.keywords.split(' ')
                    for (var i = 0; i < keys.length; i++) {
                        var w = keys[i].trim()
                        if (w.split(':')[0] == 'ds') {
                            para['dsName'] = w.split(':')[1]
                        }
                        if (w.split(':')[0] == 'dsr') {
                            para['dsrName'] = w.split(':')[1]
                        }
                    }
                }
            }
            //filter data by keywords
            originalData = jstree_CvtVPath2TreeData(
                $filter('filter')(list,
                    {name: para.dsName, datasourceName: para.dsrName})
            )

            jstree_ReloadTree(treeID, originalData)
            if ($scope.keywords)
                _.delay(function () {
                    $scope.treeInstance.jstree(true).open_all()
                }, 100)

            $(document).on('dnd_stop.vakata.jstree', function (event, dropInfo) {
                $('.dropable').removeClass('active')
                var target = dropInfo.event.target
                target = $(target).parents('.dropable')//向外遍历找.dropable元素
                var menuId = target.attr('menu_id'),
                    type = target.attr('type')
                if (menuId) {
                    var nodes = dropInfo.data.nodes
                    var dashboardId = ''
                    for (var i = 0; i < nodes.length; i++) {
                        var name = nodes[i]
                        dashboardId = dropInfo.data.origin._model.data[name].original.id
                    }
                }
                target.attr('border_id', dashboardId)
                setScreenLinkByDrop(menuId, type, dashboardId)
            })
            $(document).on('dnd_move.vakata.jstree', function (event, info) {
                var $target = $(info.event.target)//$target变量命名表示为jQuery对象
                $target = $($target.parents('.dropable'))//向外遍历找.dropable元素
                var menu_id = $target.attr('menu_id')
                if (menu_id != undefined) {
                    $('.dropable').removeClass('active')
                    $target.addClass('active')
                }
            })
        }

        $scope.treeEventsObj = function () {
            var baseEventObj = jstree_baseTreeEventsObj({
                ngScope: $scope, ngHttp: $http, ngTimeout: $timeout,
                treeID: treeID, listName: 'screenList', updateUrl: updateUrl,
                ModalUtils: ModalUtils, categoryList: 'categoryList',
            })
            return baseEventObj
        }()
    })
