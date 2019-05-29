(function () {
  'use strict';
  angular
    .module('discovery')
    .controller('demoCtrl', configUserCtrl);

  /** @ngInject */
  function configUserCtrl($scope, exports, demoService) {
    // let vm = this;
    exports.controller($scope, {
      service: {
        demo: demoService
      },
      data: {
        listCount: 0
      },
      created() {
        demoService.count = 15
      },
      events: {
        childRest(event, data) {
          console.log('receive child rest', event, data)
        }
      },
      watch: {
        demo() {
          console.log('watch demo', arguments)
        },
        ['demo.list']() {
          console.log('watch demo.list', arguments)
        },
        // ['demo.obj']() {
        // },
        // ['demo.count']() {
        // }
        // demo: {
        //   list() {
        //   },
        //   count() {
        //   },
        //   obj() {
        //   }
        // }
      },
      methods: {
        up() {
          this.demo.up()
        },
        reset() {
          demoService.reset()
        }
      },
      destroyed() {
      }
    })
  }
})();
