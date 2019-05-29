/**
 * Created by yfyuan on 2016/7/19.
 */
discovery.controller('menuItemCtrl', function ($scope, $http, menuDataService) {
  "ngInject";
  $scope.tree = {
    name: 'first',
    type: 'first',
    id: 'tree',
    children: []
  }
  $scope.noFolder = new Array()   //没有目录的文件

  var getBoardList = function () {
    $http.get("dashboard/getBoardList.do").success(function (response) {
      for (var i in response) {
        menuDataService.buildTree(response[i], $scope.tree.children, $scope.noFolder);
      }
    });
  };
  getBoardList()
});
