import { isPlainObject } from './utils'

/**
 * 处理请求header；如果用户没有设置header，并且请求体还是一个json，自动设置header的Content-Type=application/json
 * @param headers -请求header
 * @param data -请求体的body
 */
export function processHeaders(headers: any, data: any): any {
    if(isPlainObject(data)) {
        Object.keys(headers).forEach(key => {
            if(key.toLowerCase() === 'content-type') {
                headers[key.toLowerCase()] = headers[key];
                delete headers[key]
            }
        })
        if(!headers['content-type']) {
            headers['Content-Type'] = 'application/json';
        }
    }
    return headers;
}

export function parseHeader(headers: string): object {
    if(!headers) {
        return {}
    }
    let parseResult = Object.create(null);
    headers.split("\r\n").forEach(item => {
        let [key, val] = item.split(': ')
        if(key) {
            parseResult[key] = val
        }
    })
    return parseResult;
}