!function (fn) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = fn : "function" == typeof define && define.amd ? define(fn) : this.HapiStat = fn
}(function (level) {
    console.log(this, level)
    var config = require("./hp-stat-config");

    function sendEvent() {
        console.log("数立统计上报：", +new Date())
    }
    function handlers(behavors) {
        for (var i = 0; i < behavors.length; i++) {
            const behavor = behavors[i];
            const _behavor = this[behavor];
            this[behavor] = function() {
                if (!(config.defaultTrackConfig instanceof Array)) {
                    throw "数立统计提示：默认上报特征必须为数组形式配置"
                }
                const defaultTrackConfig = config.defaultTrackConfig.length ? config.defaultTrackConfig : ["datetime"]
                for (var j = 0; j < defaultTrackConfig.length; j++) {
                    sendEvent()
                }
                _behavor.call(this)
            }
        }
    }
    // App 埋点植入
    switch (level) {
        case 1:
            // app 层级
            // 周期 
            var _appLifeCycles = ["onLaunch", "onShow", "onHide", "onError", "onShareAppMessage"]
            handlers.call(this, _appLifeCycles)
            break;
        case 2:
            // page 层级
            break;
        case 3:
            // event 层级
            break;
        default:
            // 未定级 
            break;
    }

})