function hp() {
    var config = require("./hp-stat-config");
    this.sv = function (log, param) {
        console.log("哈皮统计上报：")
        console.log(log, param)
    }
    this.handlers = function (behavors, level) {
        if (!behavors) return;
        for (var i = 0; i < behavors.length; i++) {
            const behavor = behavors[i].replace(/([^_]+)_([^_])([^_]*)/g,
                function (word, a, b, c) {
                    return a + b.toUpperCase() + c;
                }
            );
            const _behavor = this[behavor];
            this[behavor] = function () {
                if (!(config.defaultTrackConfig instanceof Array)) {
                    throw "哈皮统计提示：默认上报特征必须为数组形式配置"
                }
                const defaultTrackConfig = config.defaultTrackConfig.length ? config.defaultTrackConfig : ["datetime"]
                for (var j = 0; j < defaultTrackConfig.length; j++) {
                    new hp().sv("", {
                        level: level,
                        eventId: behavor,
                        sessionId: config.app_key,
                        uid: config.appid,
                        datetime: +new Date()
                    })
                }
                _behavor.call(this)
            }
        }
    }
}
hp.prototype = {
    $App: function (conf) {
        var cycles = ["on_launch", "on_show", "on_hide", "on_error", "on_shareappmessage"]
        this.handlers.call(conf, cycles, 1)
        return conf;
    },
    $Page: function (conf) {
        var cycles = ["on_load", "on_show", "on_ready", "on_hide", "on_unload"]
        this.handlers.call(conf, cycles, 2)
        return conf;
    },
    sendEvent: function () {
        return this.sv();
    }
}
    ; !function (fn) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = new fn() : "function" == typeof define && define.amd ? define(new fn()) : this.HapiStat = new fn()
    }(hp);