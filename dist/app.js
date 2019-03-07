"use strict";

var HapiStat = require("./components/utils/hp-stat");

App(HapiStat.$App({
  onLaunch: function onLaunch(options) {
    console.log("app launch");
    my.getSystemInfo({
      success: function success(data) {
        console.log(data);
      }
    });
  },
  onShow: function onShow(options) {
    console.log("app show");
  },
  onHide: function onHide() {
    console.log("app hide");
  },
  onError: function onError(err) {
    console.log("app error");
  },
  onShareAppMessage: function onShareAppMessage() {
    console.log("app onShareAppMessage");
  },
  globalData: {
    foo: true
  }
}));