"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ajax;

var _type = _interopRequireDefault(require("./type"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ajax() {
  var options = {};
  options = {
    url: url,
    headers: headers,
    method: method,
    data: data,
    timeout: timeout,
    dataType: dataType,
    success: success,
    fail: fail,
    complete: complete
  };
  return my.request(options);
}