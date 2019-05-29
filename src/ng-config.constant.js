//获取项目根目录
function getRootPath() {
    var strFullPath = window.document.location.href;
    var strPath = window.document.location.pathname;
    var pos = strFullPath.indexOf(strPath);
    var prePath = strFullPath.substring(0, pos);
    var postPath = strPath.substring(0, strPath.substr(1).indexOf('/') + 1);
    return (prePath + postPath);
}
basePathUrl = getRootPath() + "/";
if(basePathUrl !== 'http://localhost:4000/') {
    baseUrl = basePathUrl
    socketUrl = basePathUrl
}
angular.module('discovery').constant('globalConfig', {
  api: {
    'socket': socketUrl,
    'baseUrl': baseUrl
  }
})