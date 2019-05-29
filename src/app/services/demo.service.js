(function () {
  'use strict';

  angular
    .module('discovery')
    .service('demoService', DemoService);

  /** @ngInject */
  function DemoService($q, exports) {
    return exports.service({
      data: {
        count: 5,
        list: [],
        obj: {},
        getList() {
          const newList = []
          for (let i = 0; i < this.list.length; i++) {
            newList.push(this.list[i] + '_new')
          }
          return newList
        },
        getCount() {
          return parseFloat(this.count) + 10
        },
      },
      actions: {
        up() {
          this.count++
          this.list.push(this.count)
          this.obj['a' + this.count] = this.count
        },
        reset() {
          this.log()
          this.list = ['hello', 'world']
          this.obj = {hello: 'world'}
        }
      },
      utils: {
        log() {
          console.log('log', this)
        }
      }
    })
  }
})();
