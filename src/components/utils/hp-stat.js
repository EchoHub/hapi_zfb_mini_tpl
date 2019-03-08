var _global = {
    uid: null,
    sessionId: null
};
function hp() {
    var config = require("./hp-stat-config");
    // 创建当前会话的sessionId
    _global.sessionId = ch(16)
    function ca() {
        return new Promise(function (resolve, rejects) {
            my.getAuthCode({
                scopes: "auth_base",
                success: function (res) {
                    my.request({
                        url: '//auth/token',
                        method: 'POST',
                        data: {
                            authCode: res.authCode,
                            platform: "ALIPAY",
                            source: "",
                            // bizType: this.CONSTANTS.bizType
                        },
                        success: function (resp) {
                            sv("用户信息", {
                                level: 3,
                                eventId: "userInfo",
                                extParam: {
                                    userInfo: JSON.stringify(resp.user)
                                }
                            })
                        },
                        fail: function (error) {
                            my.showToast({
                                type: 'fail',
                                content: error.msg || '系统异常,请稍后再试'
                            })
                        }
                    })
                    resolve()
                },
                fail: function (error) {
                    my.showToast({
                        type: 'fail',
                        content: error.msg || '系统异常,请稍后再试'
                    })
                }
            })
        })
    }
    function sv(lg, ob) {
        const p = Object.assign(ob, {
            eventName: lg,
            appId: config.app_id,
            appKey: config.app_key,
            sessionId: _global.sessionId,
            datetime: +new Date()
        })
        my.request({
            url: '/track/receive',
            method: 'POST',
            data: p,
            success: function () { },
            fail: function (error) {
                my.showToast({ content: error.msg || '系统异常,请稍后再试' })
            }
        })
        console.log("哈皮统计上报：")
        console.log(lg, p)
    }
    function h(behavors, level) {
        if (!behavors) return;
        for (var i = 0; i < behavors.length; i++) {
            const behavor = behavors[i]
            const _behavor = this[behavor];
            this[behavor] = function () {
                if (!(config.defaultTrackConfig instanceof Array)) {
                    throw "哈皮统计提示：默认上报特征必须为数组形式配置"
                }
                const defaultTrackConfig = config.defaultTrackConfig.length ? config.defaultTrackConfig : ["datetime"]
                for (var j = 0; j < defaultTrackConfig.length; j++) {
                    if (level === 1 && behavor.toUpperCase() === "ONLAUNCH") {
                        ca();
                        my.getSystemInfo({
                            success: data => {
                                sv("获取系统信息", {
                                    level: level,
                                    eventId: "systemInfo",
                                    extParam: {
                                        systemInfo: JSON.stringify(data)
                                    }
                                })
                            }
                        })
                    }
                    sv("", {
                        level: level,
                        eventId: behavor
                    })
                }
                _behavor.call(this)
            }
        }
    }
    function ch(hashLength) {
        if (!hashLength || typeof (Number(hashLength)) != 'number') { return; }
        var ar = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
        var hs = [];
        var hl = Number(hashLength);
        var al = ar.length;
        for (var i = 0; i < hl; i++) {
            hs.push(ar[Math.floor(Math.random() * al)]);
        }

        return hs.join('');
    }
    return {
        $App: function (conf) {
            var cycles = ["onLaunch", "onShow", "onHide", "onError", "onShareAppMessage"]
            h.call(conf, cycles, 1)
            return conf;
        },
        $Page: function (conf) {
            var cycles = ["onLoad", "onShow", "onReady", "onHide", "onShareAppMessage"]
            h.call(conf, cycles, 2)
            return conf;
        },
        sendEvent: function (desc, extp) {
            return sv(desc, extp);
        }
    }
}
; !function (fn) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = fn() : "function" == typeof define && define.amd ? define(fn()) : this.HapiStat = fn()
}(hp);