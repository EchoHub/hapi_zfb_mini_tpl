import * as _My from "utils/_my";
const handlers = {
    goTap() {
        _My.navigateTo("index", ()=> {
            console.log(1)
        })
        // my.redirectTo({
        //     url: "/pages/index/index"
        // })
    }
}
export default handlers;