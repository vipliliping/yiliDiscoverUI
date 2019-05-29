/**
 *
 * Configuration for DataSet/Widget/Dashboard tree
 */
var jsTreeConfig1 = {
  core: {
    multiple: false,
    animation: true,
    error: function (error) {
      //$log.error('treeCtrl: error from js tree - ' + angular.toJson(error));
    },
    check_callback: function (
      operation, node, node_parent, node_position, more) {
      if (operation === 'move_node') {
        //only allow dropping inside nodes of type 'Parent'
        return node_parent.id.substring(0, 6) == 'parent' ||
          node_parent.id.substring(0, 4) == 'root'
      }
      return true  //allow all other operations
    },
    worker: true
  },
  types: {
    default: {
      valid_children: ['default', 'file']
    },
    file: {
      icon: 'glyphicon glyphicon-file'
    }
  },
  dnd: {
    check_while_dragging: true
  },
  state: {'key': 'cboard'},
  version: 1,
  plugins: ['types', 'unique', 'state', 'sort', 'dnd']
}

/**
 * Holds all jstree related functions and variables, including the actual class and methods to create, access and manipulate instances.
 * @param domID
 */
function jstree_GetWholeTree(domID) {
  return $('#' + domID).jstree(true)
}

/**
 * get an array of all selected nodes
 * @returns {jQuery}
 */
function jstree_GetSelectedNodes(domID) {
  return jstree_GetWholeTree(domID).get_selected(true)
}

/**
 *
 * @param listIn [{
 *      "id": id,
 *      "name": name,
 *      "categoryName": folder[/subfolder]*
 *      }]
 * @returns {Array}
 */
function jstree_CvtVPath2TreeData(listIn) {
  var newParentId = 1
  var listOut = []
  listOut.push(
    {'id': 'root', 'parent': '#', 'text': 'Root', state: {opened: true}})
  for (var i = 0; i < listIn.length; i++) {
    var arr = []
    if (listIn[i].categoryName) {
      arr = listIn[i].categoryName.split('/')
      arr.push(listIn[i].name)
    } else {
      arr.push(listIn[i].name)
    }
    // var arr = listIn[i].categoryName.split('/');
    // arr.push(listIn[i].name);
    var parent = 'root'
    for (var j = 0; j < arr.length; j++) {
      var flag = false
      var a = arr[j]
      for (var m = 0; m < listOut.length; m++) {
        if (listOut[m].text == a && listOut[m].parent == parent &&
          listOut[m].id.substring(0, 6) == 'parent') {
          flag = true
          break
        }
      }
      if (!flag) {
        if (j == arr.length - 1) {
          listOut.push({
            'id': listIn[i].id.toString(),
            'parent': parent,
            'text': a,
            icon: 'glyphicon glyphicon-file'
          })
        } else {
          listOut.push({
            'id': 'parent' + newParentId,
            'parent': parent,
            'text': a
          })
        }
        parent = 'parent' + newParentId
        newParentId++
      } else {
        parent = listOut[m].id
      }
    }
  }
  return listOut
}

function jstree_CheckTreeNode(actionType, treeID, popup) {
  var selectedNodes = jstree_GetSelectedNodes(treeID)
  if (selectedNodes === undefined) {
    return false
  } else if (selectedNodes.length == 0) {
    popup('Please, select one widget first!', 'modal-warning', 'sm')
    return false
  } else if (typeof(selectedNodes[0].children) != 'undefined' &&
    selectedNodes[0].children.length > 0) {
    popup('Can\'t ' + actionType + ' a folder!', 'modal-warning', 'sm')
    return false
  } else {
    return true
  }
}

function jstree_ReloadTree(treeID, treeData, ngScope) {
  jstree_GetWholeTree(treeID).settings.core.data = treeData
  jstree_GetWholeTree(treeID).refresh()
}

/**
 *
 * @param paramObj {
 *      "actionType": tag,
 *      "treeID": treeID,
 *      "copyFunc": function,
 *      "node": selectedNode:
 * }
 * @returns {Function}
 */
var jstree_CopyNode = function (paramObj) {
  return function () {
    if (!jstree_CheckTreeNode(paramObj.actionType, paramObj.treeID)) {
      return
    }
    paramObj.copyFunction(paramObj.oldNode)
  }
}

/**
 * {
 *   treeID: xx,
 *   ngScope: $scope,
 *   ngHttp: $http,
 *   ngTimeout $timeout,
 *   listName: "widgetList",
 *   updateUrl: xxx
 * }
 * @param option
 * @returns {{ready: ready, activate_node: activate_node, dblclick: dblclick, move_node: move_node}}
 */
function jstree_baseTreeEventsObj(option) {
  var events = {
    ready: function () {
      option.ngTimeout(function () {
        option.ngScope.ignoreChanges = false
      })
    },
    activate_node: function (obj, e) {
      var myJsTree = jstree_GetWholeTree(option.treeID)
      var data = myJsTree.get_selected(true)[0]
      if (data.children.length > 0) {
        myJsTree.deselect_node(data)
        myJsTree.toggle_node(data)
      }
    },
    dblclick: function () {
      var selectedNodes = jstree_GetSelectedNodes(option.treeID)
      if (selectedNodes.length == 0) return // Ignore double click folder action
      option.ngScope.editNode()
    },
    move_node: function (e, data) {
      var updateItem = function (nodeid, newCategory) {
        var mindUpdate = true
        var item = _.find(option.ngScope[option.listName], function (i) {
          return i.id == nodeid
        })
        item.categoryName = newCategory
        if (option.categoryList) {//查找拖拽后的父节点的id
          var itemId = _.find(option.ngScope.$parent[option.categoryList],
            function (item) {
              return item.name == newCategory
            })
          if (itemId) {
            mindUpdate = false
            item.categoryId = itemId.id
          }
        }
        if(!mindUpdate) {
          option.ngHttp.post(option.updateUrl, {json: angular.toJson(item)}).
            success(function (serviceStatus) {
              if (serviceStatus.status == '1') {
              } else {
                option.ModalUtils.alert(serviceStatus.msg, 'modal-warning', 'lg')
              }
            })
        } else {
          option.ngHttp.post(option.updateUrl, {
            categoryName: newCategory,
            id: nodeid,
            name: item.name
          }).success(function (serviceStatus) {
              if (serviceStatus.status == '1') {
              } else {
                option.ModalUtils.alert(serviceStatus.msg, 'modal-warning', 'lg')
              }
            })
        }
      }

      var updateNode = function (node, tarPath) {
        var children = node.children
        if (children.length == 0) {
          updateItem(node.id, tarPath)
        } else {
          var newTarPath = tarPath == '' ? node.text : tarPath + '/' +
            node.text
          for (var i = 0; i < children.length; i++) {
            var child = myJsTree.get_node(children[i])
            updateNode(child, newTarPath)
          }
        }
      }

      var myJsTree = jstree_GetWholeTree(option.treeID),
        curNode = data.node,
        tarNodeID = data.parent
      var tarPath = myJsTree.get_path(tarNodeID, '/').substring(5)
      updateNode(curNode, tarPath)
    }
  }
  if (option.ngScope.clickNode) {
    events.waitClick = false
    events.click = function (e) {
      if (option.ngTimeout) {
        if (events.waitClick) {
          events.waitClick = false
          option.ngTimeout.cancel(events.timer)
        } else {
          events.waitClick = true
          events.timer = option.ngTimeout(function () {
            events.waitClick = false
            var selectedNodes = jstree_GetSelectedNodes(option.treeID)[0]
            option.ngScope.clickNode(selectedNodes)
          }, 200)
          option.ngScope.$on('$stateChangeStart', function () {
            option.ngTimeout.cancel(events.timer)
          })
        }
      }
      else
        option.ngScope.clickNode(selectedNodes)
    }
  }
  return events
}