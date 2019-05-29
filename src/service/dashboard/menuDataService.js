discovery.service('menuDataService', function () {
  "ngInject";


  //带"/"的路径处理，去掉第一个"/"及之前的路径
  this.handlePath = function (path) {
    var pathArray = path.split('/');
    var newPath = "";
    for (var i in pathArray) {
      if ((i > 0) && (i !== JSON.stringify(pathArray.length-1))) {
        newPath = newPath + pathArray[i] + '/';
      } else if (i === JSON.stringify(pathArray.length-1)) {
        newPath = newPath + pathArray[i];
      } else {}
    }
    return newPath
  }


  /**
   * 递归数组形成json树结构
   * @param data 要整理的数组
   * @param tree 树的children
   * @param noFolder 无树结构的数组
   */
  this.buildTree = function (data, tree, noFolder) {
    if (!data) {
      return
    }
    if (data.categoryName == null) {
      var tempNoFolder = {}
      tempNoFolder.name = data.name;
      tempNoFolder.type = 'file';
      tempNoFolder.id = data.id;
      tempNoFolder.children = [];
      noFolder.push(tempNoFolder);
      return
    } else if (data.categoryName.indexOf('/') === -1) { // 路径无"/"
      var tempTreeChildren = {}
      if (tree.length === 0) {
        tempTreeChildren.name = data.categoryName;
        tempTreeChildren.type = 'folder';
        tempTreeChildren.id = data.id;
        tempTreeChildren.children = [];
        var newFile = {}
        newFile.name = data.name;
        newFile.type = 'file';
        newFile.id = data.id;
        newFile.children = [];
        tempTreeChildren.children.push(newFile)
        tree.push(tempTreeChildren);
        return
      } else {
        for (var i in tree) {
          if (data.categoryName === tree[i].name) {
            tempTreeChildren.name = data.name;
            tempTreeChildren.type = 'file';
            tempTreeChildren.id = data.id;
            tempTreeChildren.children = [];
            tree[i].children.push(tempTreeChildren);
            return
          } else if (i === JSON.stringify(tree.length-1)) {
            tempTreeChildren.name = data.categoryName;
            tempTreeChildren.type = 'folder';
            tempTreeChildren.id = data.id;
            tempTreeChildren.children = [];
            var newFile = {}
            newFile.name = data.name;
            newFile.type = 'file';
            newFile.id = data.id;
            newFile.children = [];
            tempTreeChildren.children.push(newFile)
            tree.push(tempTreeChildren);
            return
          } else {}
        }
      }
      return
    } else {    // 路径带"/"的情况
      if (tree.length === 0) {
        var tempTreeChildren = {}
        tempTreeChildren.name = data.categoryName.split("/")[0];
        tempTreeChildren.type = 'folder';
        tempTreeChildren.id = data.id;
        tempTreeChildren.children = [];
        tree.push(tempTreeChildren);
        data.categoryName = this.handlePath(data.categoryName);
        this.buildTree(data, tree[tree.length-1].children, noFolder);
        return
      } else {
        for (j in tree) {
          if (data.categoryName.split("/")[0] === tree[j].name) {
            data.categoryName = this.handlePath(data.categoryName);
            this.buildTree(data, tree[j].children, noFolder);
            return
          } else if (j === JSON.stringify(tree.length-1)) {
            var tempTreeChildren = {}
            tempTreeChildren.name = data.categoryName.split("/")[0];
            tempTreeChildren.type = 'folder';
            tempTreeChildren.id = data.id;
            tempTreeChildren.children = [];
            tree.push(tempTreeChildren);
            data.categoryName = this.handlePath(data.categoryName);
            this.buildTree(data, tree[tree.length-1].children, noFolder);
            return
          } else {}
        }
      }
    }
    return
  }
});
