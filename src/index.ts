import { AxiosRequestConfig } from './types';
import xhr from './xhr';
import { buildURL } from './helpers/url'
import { transformRequest } from './helpers/data'

function axios(config: AxiosRequestConfig): void {
    config.url = transformUrl(config);
    config.data = transformData(config);
    xhr(config)
}

function transformUrl(config: AxiosRequestConfig): string {
    const { url, params } = config;
    return buildURL(url, params)
}

function transformData(config: AxiosRequestConfig): any {
    const { data } = config;
    return transformRequest(data)
}

export default axios;