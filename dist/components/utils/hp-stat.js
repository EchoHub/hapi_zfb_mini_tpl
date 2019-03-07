"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function hp() {
  var config = require("./hp-stat-config");

  this.sv = function (log, param) {
    console.log("哈皮统计上报：");
    console.log(log, param);
  };

  this.handlers = function (behavors, level) {
    var _this = this;

    if (!behavors) return;

    var _loop = function _loop() {
      var behavor = behavors[i].replace(/([^_]+)_([^_])([^_]*)/g, function (word, a, b, c) {
        return a + b.toUpperCase() + c;
      });
      var _behavor = _this[behavor];

      _this[behavor] = function () {
        if (!(config.defaultTrackConfig instanceof Array)) {
          throw "哈皮统计提示：默认上报特征必须为数组形式配置";
        }

        var defaultTrackConfig = config.defaultTrackConfig.length ? config.defaultTrackConfig : ["datetime"];

        for (var j = 0; j < defaultTrackConfig.length; j++) {
          new hp().sv("", {
            level: level,
            eventId: behavor,
            sessionId: config.app_key,
            uid: config.appid,
            datetime: +new Date()
          });
        }

        _behavor.call(this);
      };
    };

    for (var i = 0; i < behavors.length; i++) {
      _loop();
    }
  };
}

hp.prototype = {
  $App: function $App(conf) {
    var cycles = ["on_launch", "on_show", "on_hide", "on_error", "on_shareappmessage"];
    this.handlers.call(conf, cycles, 1);
    return conf;
  },
  $Page: function $Page(conf) {
    var cycles = ["on_load", "on_show", "on_ready", "on_hide", "on_unload"];
    this.handlers.call(conf, cycles, 2);
    return conf;
  },
  sendEvent: function sendEvent() {
    return this.sv();
  }
};
!function (fn) {
  "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = new fn() : "function" == typeof define && define.amd ? define(new fn()) : this.HapiStat = new fn();
}(hp);