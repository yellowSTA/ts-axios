import { isDate, isPlainObject } from './utils'

export function buildURL(url: string, params ? : any): string {
    if(!params) {
        return url
    }
    let parts: string[] = [];
    Object.keys(params).forEach(key => {
        const val = params[key];
        if(val === null || typeof val === 'undefined') {
            return
        }
        let values = [];
        if(Array.isArray(val)) {
            values = val;
            key += '[]'
        } else {
            values = [val]
        }
        values.forEach(item => {
            if(isDate(item)) {
                item = item.toISOString()
            } else if(isPlainObject(item)) {
                item = JSON.stringify(item)
            }
            parts.push(`${encode(key)}=${item}`)
        })
    })

    let serializedParams = parts.join('&');
    let newUrl = url;

    if(serializedParams) {
        if(newUrl.includes('#')) {
            newUrl = newUrl.split('#')[0];
        }
        newUrl += (newUrl.indexOf('?') === -1 ? '?' : '&') + serializedParams;
    }
    return newUrl;
}

function encode(val: string): string {
    return encodeURIComponent(val)
        .replace(/%40/g, '@')
        .replace(/%3A/ig, ':')
        .replace(/%24/g, '$')
        .replace(/%2C/ig, ',')
        .replace(/%20/g, '+')
        .replace(/%5B/ig, '[')
        .replace(/%5D/ig, ']')
}