import handlers from "./handlers"
const HapiStat = require("utils/hp-stat")
Page(HapiStat.$Page({
    data: {
        title: 'Hapi Template'
    },
    onLoad(query) {
        // 页面加载
        console.log("page onload")
    },
    onShow() {
        // 页面显示
        console.log("page onshow")
    },
    onReady() {
        // 页面加载完成
        console.log("page onready")
    },
    onHide() {
        // 页面隐藏
        console.log("page onhide")
    },
    onUnload() {
        // 页面被关闭
        console.log("page onunload")
    },
    onTitleClick() {
        // 标题被点击
        console.log("page ontitleclick")
    },
    onPullDownRefresh() {
        // 页面被下拉
        console.log("page onpulldownrefresh")
    },
    onReachBottom() {
        // 页面被拉到底部
        console.log("page onreachbottom")
    },
    onShareAppMessage() {
        // 返回自定义分享信息
        console.log("page onShareAppMessage")
    },
    ...handlers
}))
