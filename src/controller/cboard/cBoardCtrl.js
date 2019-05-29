/**
 * Created by yfyuan on 2016/7/19.
 */
discovery.controller('discoveryCtrl', function ($rootScope, $scope, $location, $http, $q, $filter, $uibModal, ModalUtils, menuDataService) {
  "ngInject"
  var translate = $filter('translate')

  $rootScope.alert = function (msg) {
    ModalUtils.alert(msg)
  }


  var getMenuList = function () {
    $http.get("commons/getMenuList.do").success(function (response) {
      $scope.menuList = response
    })
  }

  var getCategoryList = function () {
    $http.get("dashboard/getCategoryList.do").success(function (response) {
      $scope.categoryList = response
    })
  }

  var getBoardList = function () {
    $http.get("dashboard/getBoardList.do").success(function (response) {
      $scope.boardList = response
    })
  }

  $scope.$on("boardChange", function () {
    getBoardList()
  })

  $scope.$on("categoryChange", function () {
    getCategoryList()
  })

  $scope.isShowMenu = function (code) {
    return !_.isUndefined(_.find($scope.menuList, function (menu) {
      return menu.menuCode == code
    }))
  }
  if (!window.isPreview) {
    $http.get("commons/getUserDetail.do").success(function (response) {
      $scope.user = response
      var avatarUrl = 'imgs/user-male-circle-blue-128.png'
      $scope.user.avatar = avatarUrl
    })
    getMenuList()
    getCategoryList()
    getBoardList()
  }

  $scope.changePwd = function () {
    $uibModal.open({
      templateUrl: 'src/view/cboard/changePwd.html',
      windowTemplateUrl: 'src/view/util/modal/window.html',
      backdrop: false,
      size: 'sm',
      controller: function ($scope, $uibModalInstance) {
        "ngInject"
        $scope.close = function () {
          $uibModalInstance.close()
        }
        $scope.ok = function () {
          $http.post("commons/changePwd.do", {
            curPwd: $scope.curPwd,
            newPwd: $scope.newPwd,
            cfmPwd: $scope.cfmPwd
          }).success(function (serviceStatus) {
            if (serviceStatus.status == '1') {
              ModalUtils.alert(translate("COMMON.SUCCESS"), "modal-success", "sm")
              $uibModalInstance.close()
            } else {
              ModalUtils.alert(serviceStatus.msg, "modal-warning", "lg")
            }
          })
        }
      }
    })
  }
})

/*
discovery.animation('.nav', function () {
    return {
        enter: function (element, done) {
// 显示如何用jQuery实现动画的例子
// 注意，这需要在HTML中包含jQuery
            alert();
            $(element).css({
                opacity: 0
            });
            $(element).animate({
                opacity: 1
            }, done);
        },
        leave: function (element, done) {
            done();
        }
    }
});*/
