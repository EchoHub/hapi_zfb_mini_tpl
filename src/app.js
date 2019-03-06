const HapiStat = require("utils/sl-stat")
HapiStat.call(App({
    onLaunch(options) {
        console.log("app launch")
    },
    onShow(options) {
        console.log("app show")
    },
    onHide() {
        console.log("app hide")
    },
    onError(err) {
        console.log("app error")
    },
    onShareAppMessage() {
        console.log("app onShareAppMessage")
    },
    globalData: {
        foo: true,
    }
}), 1)