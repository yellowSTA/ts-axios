import { AxiosRequestConfig } from './types';

function xhr(config: AxiosRequestConfig): void {
    const { url, data = null, method = 'get' } = config;
    const request = new XMLHttpRequest();

    request.open(method.toUpperCase(), url, true);
    request.send(data);
}

export default xhr;