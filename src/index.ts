import { AxiosRequestConfig, AxiosPromise, AxiosReponse } from './types';
import xhr from './xhr';
import { buildURL } from './helpers/url'
import { transformRequest, transformResponse } from './helpers/data'
import { processHeaders } from './helpers/headers'

function axios(config: AxiosRequestConfig): AxiosPromise {
    config.url = transformUrl(config);
    config.headers = transformHeader(config);
    config.data = transformData(config);
    return xhr(config).then(res => {
        return transformResponseData(res)
    })
}

//转换请求的URL，如果有params，将参数加在请求url上
function transformUrl(config: AxiosRequestConfig): string {
    const { url, params } = config;
    return buildURL(url, params)
}

//转换请求的data，如果data是object对象，转换成json字符串
function transformData(config: AxiosRequestConfig): any {
    const { data } = config;
    return transformRequest(data)
}

//转换服务器返回的data，如果是json字符串，转换成json对象
function transformResponseData(res: AxiosReponse): AxiosReponse {
    res.data = transformResponse(res.data)
    return res;
}

//为请求设置相应的header
function transformHeader(config: AxiosRequestConfig) {
    const { headers = {}, data } = config;
    return processHeaders(headers, data);
}

export default axios;