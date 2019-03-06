
// 保留当前页面，跳转到应用内的某个指定页面，可以使用 my.navigateBack 返回到原来页面。
// 当前页面正跳转
let navigateTo_ing = false;
function formatNavigateCallback(callback) {
    if (callback && callback instanceof Function) {
        callback();
        navigateTo_ing = false;
    }
}
export function navigateTo(url, suc, fail, complete) {
    if(!navigateTo_ing) {
        navigateTo_ing = true;
        const urlAndParams = url.split("?")
        my.navigateTo({
            url: `/pages/${urlAndParams[0]}/index${urlAndParams[1] ? `?${urlAndParams[1]}`: ""}`,
            suc: formatNavigateCallback(suc),
            fail: formatNavigateCallback(fail),
            complete: formatNavigateCallback(complete)
        })
    }
}