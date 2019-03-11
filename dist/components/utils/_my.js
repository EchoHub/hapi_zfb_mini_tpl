"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.navigateTo = navigateTo;
// 保留当前页面，跳转到应用内的某个指定页面，可以使用 my.navigateBack 返回到原来页面。
// 当前页面正跳转
var navigateTo_ing = false;

function formatNavigateCallback(callback) {
  if (callback && callback instanceof Function) {
    callback();
    navigateTo_ing = false;
  }
}

function navigateTo(url, suc, fail, complete) {
  if (!navigateTo_ing) {
    navigateTo_ing = true;
    var urlAndParams = url.split("?");
    my.navigateTo({
      url: "/pages/".concat(urlAndParams[0], "/index").concat(urlAndParams[1] ? "?".concat(urlAndParams[1]) : ""),
      suc: formatNavigateCallback(suc),
      fail: formatNavigateCallback(fail),
      complete: formatNavigateCallback(complete)
    });
  }
}