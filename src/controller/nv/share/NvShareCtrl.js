discovery.controller('nvShareCtrl', function ($scope, $http, ModalUtils, $filter) {
    "ngInject";
    var translate = $filter('translate');
    $scope.activeId;
    $scope.curUser;
    $scope.userKeyword = '';
    $scope.selectedRoleId = null;
    var getRoleList = function () {//角色列表
        $http.get("admin/getRoleListAll.do").success(function (response) {
            $scope.roleList = response;
        });
    };
    getRoleList();



    $scope.resList = [{//左侧初始树形数据
        id: 'Dashboard',
        text: translate('ADMIN.BOARD'),
        parent: '#',
        state: {disabled: true}
    }, {
        id: 'Dataset', text: translate('ADMIN.DATASET'), parent: '#',
        state: {disabled: true}
    }, {
        id: 'Widget',
        text: translate('ADMIN.WIDGET'),
        parent: '#',
        state: {disabled: true}
    }, {
        id: 'Mind',
        text: translate('ADMIN.BRAIN_MAP'),
        parent: '#',
        state: {disabled: true}
    }];

  //获取用户展板资源
    var getBoardList = function () {
        return $http.get("admin/getBoardListUser.do").success(function (response) {
            _.each(buildNodeByCategory(response, 'Dashboard', 'board', 'fa fa-puzzle-piece'), function (e) {
                $scope.resList.push(e);
            })
        });
    };

  //获取用户数据资源
    var getDatasetList = function () {
        return $http.get("admin/getDatasetListUser.do").success(function (response) {
            _.each(buildNodeByCategory(response, 'Dataset', 'dataset', 'fa fa-table'), function (e) {
                $scope.resList.push(e);
            });
        });
    };

    //获取用户widget资源
    var getWidgetList = function () {
        return $http.get("admin/getWidgetListUser.do").success(function (response) {
            _.each(buildNodeByCategory(response, 'Widget', 'widget', 'fa fa-line-chart'), function (e) {
                $scope.resList.push(e);
            });
        });
    };

    //获取用户脑图资源
    var getMindMapList = function () {
        return $http.get("mindmap/getMindmapList.do").success(function (response) {
            _.each(buildNodeByCategory(response, 'Mind', 'mind', 'fa fa-sitemap'), function (e) {
                $scope.resList.push(e);
            });
        });
    };

    //组装左侧树形数据格式，根据资源不同进行分类
    var buildNodeByCategory = function (listIn, rParent, type, icon) {
        var newParentId = 1;
        var listOut = [];
        for (var i = 0; i < listIn.length; i++) {
            var arr = [];
            if (listIn[i].categoryName) {
                arr = listIn[i].categoryName.split('/');
                arr.push(listIn[i].name);
            } else {
                arr.push(listIn[i].name);
            }
            var parent = rParent;
            for (var j = 0; j < arr.length; j++) {
                var flag = false;
                var a = arr[j];
                for (var m = 0; m < listOut.length; m++) {
                    if (listOut[m].text == a && listOut[m].parent == parent && listOut[m].id.substring(0, 6) == 'parent') {
                        flag = true;
                        break;
                    }
                }
                if (!flag) {
                    if (j == arr.length - 1) {
                        listOut.push({
                            "id": type + '_' + listIn[i].id.toString(),
                            "parent": parent,
                            "text": a,
                            resId: listIn[i].id,
                            type: type,
                            icon: icon,
                            name: a
                        });
                    } else {
                        listOut.push({
                            "id": 'parent' + '_' + type + '_' + newParentId,
                            "parent": parent,
                            "text": a,
                            /*icon: 'fa fa-fw fa-folder-o',*/
                            state: {disabled: true}
                        });
                    }
                    parent = 'parent' + '_' + type + '_' + newParentId;
                    newParentId++;
                } else {
                    parent = listOut[m].id;
                }
            }
        }
        return listOut;
    };

    //无调用
    var loadResData = function () {
        getBoardList().then(function () {
            return getDatasetList();
        }).then(function () {
            return getWidgetList();
        }).then(function () {
            return getMindMapList();
        }).then(function () {
            $scope.treeConfig = {
                core: {
                    multiple: true,
                    animation: true,
                    error: function (error) {
                    },
                    check_callback: true,
                    worker: true
                },
                checkbox: {
                    three_state: false
                },
                dnd: {
                    check_while_dragging: false
                },
                version: 1,
                plugins: ['types', 'unique', 'dnd']
            };

            $(document).on("dnd_stop.vakata.jstree", function (event, dropInfo) {
                $(".dropable").removeClass("active");
                var target = dropInfo.event.target;
                target = $(target).parents('.dropable');//向外遍历找.dropable元素
                var roleId = $(target).attr("roleId");
                if (roleId) {
                    var nodes = dropInfo.data.nodes;
                    var dataList = [];
                    for (var i = 0; i < nodes.length; i++) {
                        var name = nodes[i];
                        dataList.push(dropInfo.data.origin._model.data[name].original);
                    }
                    setRoleResByDrop(roleId, nodes, dataList);
                }
            });
            // $(document).on("dnd_move.vakata.jstree", function (event, info) {
            //     var $target = $(info.event.target);//$target变量命名表示为jQuery对象
            //     $target = $($target.parents('.dropable'));//向外遍历找.dropable元素
            //     var roleId = $target.attr("roleId");
            //     if (roleId != undefined) {
            //         $(".dropable").removeClass("active");
            //         $target.addClass("active");
            //     }
            // });

            // _.delay(function () {
            //     $scope.treeInstance.jstree(true).open_all();
            // }, 500);
        });
    }();
    //拖拽事件
    var setRoleResByDrop = function (roleId, nodes, dataList) {
        var resIds = _.map($scope.getResListByRoleId(roleId), function (e) {
            return {
                resId: e.resId,
                resType: e.type
            };
        });
        _.each(dataList, function (element) {
            resIds.push({
                resId: element.resId,
                resType: element.type
            });
        });
        $http.post("admin/insertRoleResShare.do", {
            roleId: roleId,
            resIdArr: angular.toJson(resIds),
        }).success(function (serviceStatus) {
            if (serviceStatus == '1') {
                // getRoleResList();
                $scope.getDataset(roleId, true);
                ModalUtils.alert(translate("COMMON.SUCCESS"), "modal-success", "sm");
            } else {
                $scope.alerts = [{msg: serviceStatus.msg, type: 'danger'}];
            }
        });
    };

    //无调用，以前的获取角色展板、数据、widget用接口
    var getRoleResList = function () {
        $http.get("admin/getRoleResList.do").success(function (response) {
            $scope.roleResList = response;
        });
    };
    // getRoleResList();


    // $scope.grantRes = function () {
    //     var roleIds = _.map($scope.selectRole, function (e) {
    //         return e.roleId;
    //     });
    //     var resIds = _.map(_.filter($scope.treeInstance.jstree(true).get_selected(true), function (e) {
    //         return !_.isUndefined(e.original.resId);
    //     }), function (e) {
    //         return {
    //             resId: e.original.resId,
    //             resType: e.original.type,
    //         };
    //     });
    //     $http.post("admin/updateRoleResUser.do", {
    //         roleIdArr: angular.toJson(roleIds),
    //         resIdArr: angular.toJson(resIds),
    //     }).success(function (serviceStatus) {
    //         if (serviceStatus == '1') {
    //             $scope.selectRole = null;
    //             $scope.selectRes = null;
    //             getRoleResList();
    //             ModalUtils.alert(translate("COMMON.SUCCESS"), "modal-success", "sm");
    //         } else {
    //             $scope.alerts = [{msg: serviceStatus.msg, type: 'danger'}];
    //         }
    //     });
    //
    // };

    //左侧树changed事件回调
    $scope.changed = function (node, action, selected) {
        var node = action.node.original;

        var roleIds = _.map(_.filter($scope.roleResList, function (e) {
            return e.resType == node.type && e.resId == node.resId;
        }), function (e) {
            return e.roleId;
        });
        $scope.selectRole = _.filter($scope.roleList, function (e) {
            return _.find(roleIds, function (r) {
                return e.roleId == r;
            })
        });
    };
    /**
     * 根据角色id获取资源列表
     **/
    $scope.getResListByRoleId = function (roleId, filterType) {
        //筛选当前角色的权限list
        var partRoleResList = _.filter($scope.roleResList, function (e) {
            return e.roleId == roleId && (e.resType == 'widget' || e.resType == 'dataset' || e.resType == 'board' || e.resType == 'mind');//只显示左边树型结构中包含的
        });

        // return _.map(partRoleResList, function (ele) {
        //     var temp = _.find($scope.resList, function (res) {
        //         return res.resId == ele.resId && res.type == ele.resType;
        //     });
        //     ele.push(temp.name);
        //     return ele;
        // });

        //根据筛选结果获取对应具体的 resList
        var resList = _.filter($scope.resList, function (e) {
            return _.find(partRoleResList, function (r) {
                return e.resId == r.resId && e.type == r.resType;
            });
        });
        if (!_.isUndefined(filterType))
            resList = _.filter(resList, function (item) {
                return item.type == filterType;
            });
        return resList;
    };

    /**
     * 删除单条记录
     **/
    $scope.deleteResInRoleGroup = function (roleId, resId, resType) {
        $http.post("admin/deleteRoleResByExample.do", {
            roleId: roleId,
            resId: resId,
            resType: resType
        }).success(function (serviceStatus) {
            if (serviceStatus == 1) {
                // getRoleResList();
                $scope.getDataset(roleId, true);
                ModalUtils.alert("删除" + translate("COMMON.SUCCESS"), "modal-success", "sm");
            } else {
                $scope.alerts = [{msg: serviceStatus.msg, type: 'danger'}];
            }
        });
    };

    //获取用户角色列表
    var getUserRoleList = function () {
        $http.get("admin/getUserRoleList.do").success(function (response) {
            $scope.userRoleList = response;
        });
    };
    getUserRoleList();

    //获取用户列表
    var getUserList = function () {
        $http.get("admin/getUserList.do").success(function (response) {
            $scope.userList = response;
        });
    };
    getUserList();

    //无调用
    $scope.changeState = function (roleId) {
        $scope.selectedRoleId = roleId;
        $scope.selectedUserList = _.filter($scope.userList, function (user) {
            return _.find($scope.userRoleList, function (userRole) {
                return userRole.roleId == roleId && user.userId == userRole.userId;
            });
        });
    };

    //根据角色ID获取当前角色资源
    $scope.getDataset = function (roleId, bool) {
        if (_.isUndefined($scope.activeId) || $scope.activeId != roleId || bool) {
            $http.get("/admin/getRoleResListByRoleId.do?roleId=" + roleId).success(function (response) {
                $scope.roleResList = response;
                $scope.activeId = roleId;
            });
        } else {
            $scope.activeId = undefined;
        }
    };
});
