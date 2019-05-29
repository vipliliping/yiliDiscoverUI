(function (exports) {
  'use strict'
  var discovery = angular.module('discovery', ['splitter', 'gridster', 'ui.router', 'angular-md5', 'dndLists', 'treeControl',
    'ui.bootstrap', 'ngSanitize', 'ui.select', 'pascalprecht.translate', 'ui.ace', 'ngJsTree', 'daterangepicker',
    'angular-cron-jobs', 'rzModule', 'uuid4', 'ngFileUpload', 'ngSanitize', 'ui.select', 'moment-picker'])

  exports.H = {
    PAGE: (tpl) => `src/app/pages/${tpl}.tpl.html`,
    CMPT: (tpl) => `src/app/components/${tpl}.tpl.html`,
    URL: (urls) => _.mapObject(urls, (item) => baseUrl + item)
  }

  discovery.service('exports', function () {
    return {
      controller($scope, option) {
        if (!option) return
        // simpleBind(option, ['data', 'service', 'methods', 'utils'], $scope)
        if (option.data)
          for (let name in option.data) {
            $scope[name] = option.data[name]
          }
        if (option.service)
          for (let name in option.service) {
            $scope[name] = option.service[name]
          }
        if (option.methods)
          for (let name in option.methods) {
            $scope[name] = option.methods[name].bind($scope)
          }

        if (option.utils)
          for (let name in option.utils) {
            $scope[name] = option.utils[name].bind(undefined)
          }
        if (option.watch)
          for (let name in option.watch) {
            const fun = option.watch[name]
            let target = undefined
            try {
              target = eval('$scope.' + name)
            } catch (err) {
            }
            if (typeof target !== 'undefined')
              if (typeof target === 'object')
                $scope.$watchCollection(name, fun.bind($scope))
              else
                $scope.$watch(name, fun.bind($scope))
          }
        const eventsDestroyList = []
        if (option.events) {
          for (let name in option.events) {
            eventsDestroyList.push($scope.$on(name, option.events[name].bind($scope)))
          }
        }
        if (option.created)
          option.created.bind($scope)()
        if (option.destroyed) {
          $scope.$on('$destroy', function () {
            option.destroyed.bind($scope)()
            for (let i = 0; i < eventsDestroyList.length; i++) {
              eventsDestroyList[i]()
            }
          })
        }
      },
      service(option) {
        const service = {}
        // simpleBind(option, ['data', 'actions', 'utils'], service)
        if (option.data)
          for (let name in option.data) {
            let data = option.data[name]
            if (typeof data === 'function')
              service[name] = option.data[name].bind(service)
            else
              service[name] = option.data[name]
          }
        if (option.actions)
          for (let name in option.actions) {
            const action = option.actions[name]
            if (typeof  action === 'function')
              service[name] = action
            else if (typeof action === 'object') {
              for (let subName in action) {
                service[subName] = action[subName]
              }
            }
          }
        if (option.utils)
          for (let name in option.utils) {
            service[name] = option.utils[name].bind(undefined)
          }
        if (option.cached) {
          for (let name in option.cached) {
            service[name] = _.memoize(option.cached[name], function () {
              let address = ''
              for (let i = 0; i < arguments.length; i++) {
                address += '_' + arguments[i]
              }
              console.log('get Memoize', address)
              return address
            })
            service[name].clear = (function () {
              console.log('clear Memoize')
              let address = ''
              for (let i = 0; i < arguments.length; i++) {
                address += '_' + arguments[i]
              }
              delete(this.cache[address])
            }).bind(service[name])
            service[name].clearAll = (function () {
              this.cache = {}
            }).bind(service[name])
          }
        }
        if (option.created)
          option.created.apply(service)

        return service
      }
    }
  })
  exports.discovery = discovery
})(window)
