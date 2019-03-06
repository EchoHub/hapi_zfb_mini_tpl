import * as _My from "utils/_my";
const handlers = {
    goTap() {
        _My.navigateTo("index", ()=> {
            console.log(1)
        })
    }
}
export default handlers;