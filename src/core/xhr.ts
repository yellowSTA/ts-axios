import { AxiosRequestConfig, AxiosPromise, AxiosReponse } from '../types';
import { parseHeader } from '../helpers/headers';
import { createError } from '../helpers/error'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
    return new Promise((resolve, reject) => {

        const { url, data = null, method = 'get', headers, responseType, timeout } = config;
        const request = new XMLHttpRequest();
        request.open(method.toUpperCase(), url!, true);

        if (responseType) {
            request.responseType = responseType;
        }
        if (timeout) {
            request.timeout = timeout;
        }

        request.onreadystatechange = function() {
            if (request.readyState !== 4 || request.status === 0) {
                return;
            }

            const responseHeaders = request.getAllResponseHeaders();
            const responseData = responseType !== 'text' ? request.response : request.responseText;
            const response: AxiosReponse = {
                data: responseData,
                status: request.status,
                statusText: request.statusText,
                headers: parseHeader(responseHeaders),
                config,
                request
            }
            handleResponse(response)
        }
        request.onerror = function() {
            reject(createError('Network Error', config, null, request))
        }
        request.ontimeout = function() {
            reject(createError(`Timeout of ${timeout} ms exceeded`, config, 'ECONNABORTED', request))
        }

        Object.keys(headers).forEach(name => {
            if (data === null && name.toLowerCase() === 'content-type') {
                delete headers[name]
            } else {
                request.setRequestHeader(name, headers[name])
            }
        })

        request.send(data);

        // 处理返回结果
        function handleResponse(response: AxiosReponse): void {
            if (response.status >= 200 && response.status < 300) {
                resolve(response)
            } else {
                reject(createError(`Request faild with status code ${response.status}`, config, null, request, response))
            }
        }
    })
}