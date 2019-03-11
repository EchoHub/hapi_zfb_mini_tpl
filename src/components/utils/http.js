import Type from "./type"
export default function ajax() {
    let options = {}
    options = {
        url,headers,method,data,timeout,dataType,success,fail,complete
    }
    return my.request(options)
}