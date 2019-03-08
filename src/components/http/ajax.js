import Type from "utils/type"
export default function ajax() {
    let options = {}
    options = {
        url,headers,method,data,timeout,dataType,success,fail,complete
    }
    return my.request(options)
}

/*
    * HTTP请求包装
    * @param <Object options> 同 jQuery ajax 方法
    */
// $request(options) {
//     if (!utils.type.isPlainObject(options)) { return }

//     if (!options.url) return

//     let domain = this.CONSTANTS.server
//     let url = options.url.indexOf('://') > -1
//         ? options.url
//         : (options.url.charAt(0) === '/'
//             ? domain + options.url
//             : domain + '/' + options.url)
//     let method = 'POST'
//     let timeout = 3000
//     let dataType = 'json'
//     let data = {}

//     const headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
//     if (this.CONSTANTS.atk) { headers.atk = this.CONSTANTS.atk }
//     if (utils.type.isPlainObject(options.headers)) {
//         const customHeaders = options.headers
//         for (let key in customHeaders) {
//             if (customHeaders.hasOwnProperty(key)) {
//                 headers[key] = customHeaders[key]
//             }
//         }
//     }

//     if (options.method) { method = options.method }
//     if (options.data) { data = options.data }
//     if (options.timeout) { timeout = options.timeout }
//     if (options.dataType) { dataType = options.dataType }

//     my.httpRequest({
//         url: url,
//         headers: headers,
//         method: method,
//         data: data,
//         timeout: timeout,
//         dataType: dataType,
//         success(resp) {
//             const data = resp.data || {}

//             if (data.code == '0') { options.success && options.success(data, resp) } else { options.fail && options.fail(data, resp) }
//         },
//         fail(resp) {
//             options.error && options.error(resp)
//         },
//         complete(resp) {
//             options.complete && options.complete(resp)
//         }
//     })
// }