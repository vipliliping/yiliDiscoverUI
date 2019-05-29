discovery.directive('menuItemDirective', function () {
  "ngInject"
  return {
      restrict: 'A',
      priority: 2000,
      replace: true,
      compile: function (element) {
          var template = element[0].outerHTML;
          return function (scope, element, attrs) {
              scope.$template = template;
              if (!scope.firstList) {
                  scope.firstList = {}
                  scope.firstList.children = scope.$eval(attrs.menuItemDirective)
              }
          }
      }
  }
});

discovery.directive('menuItemChildrenDirective', function ($compile) {
  "ngInject"
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
        var subScope = scope.$new(true);
        subScope.firstList = {}
        subScope.firstList.children = scope.$eval(attrs.menuItemChildrenDirective);
        var dom = $compile(scope.$template)(subScope);
        element.replaceWith(dom);
    }
  }
});
