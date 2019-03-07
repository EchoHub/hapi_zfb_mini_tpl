const HapiStat = require("utils/hp-stat")
App(HapiStat.$App({
    onLaunch(options) {
        console.log("app launch")
        my.getSystemInfo({
            success: data => {
                console.log(data)
            }
        })
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
}))