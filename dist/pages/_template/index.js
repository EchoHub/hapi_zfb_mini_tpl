"use strict";

var _handlers = _interopRequireDefault(require("./handlers"));

var _utils = require("../../components/utils/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var HapiStat = require("../../components/utils/hp-stat");

Page(HapiStat.$Page(_objectSpread({
  data: {
    title: 'Hapi Template'
  },
  onLoad: function onLoad(query) {
    // 页面加载
    console.log("page onload");
  },
  onShow: function onShow() {
    // 页面显示
    console.log("page onshow");
  },
  onReady: function onReady() {
    // 页面加载完成
    console.log("page onready");
  },
  onHide: function onHide() {
    // 页面隐藏
    console.log("page onhide");
  },
  onUnload: function onUnload() {
    // 页面被关闭
    console.log("page onunload");
  },
  onTitleClick: function onTitleClick() {
    // 标题被点击
    console.log("page ontitleclick");
  },
  onPullDownRefresh: function onPullDownRefresh() {
    // 页面被下拉
    console.log("page onpulldownrefresh");
  },
  onReachBottom: function onReachBottom() {
    // 页面被拉到底部
    console.log("page onreachbottom");
  },
  onShareAppMessage: function onShareAppMessage() {
    // 返回自定义分享信息
    console.log("page onShareAppMessage");
  }
}, _handlers.default)));