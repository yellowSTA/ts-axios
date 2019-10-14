import { AxiosPromise, AxiosRequestConfig, Method, AxiosReponse, ResolvedFn, RejectedFn } from '../types'
import dispatchRequest from './dispatchRequest'
import InterceptorManage from './interceptorManage'
import mergeConfig from './mergeConfig'

interface Interceptors {
    request: InterceptorManage<AxiosRequestConfig>
    response: InterceptorManage<AxiosReponse>
}

interface PromiseChain<T> {
    resolved: ResolvedFn<T> | ((config: AxiosRequestConfig) => AxiosPromise)
    rejected? : RejectedFn
}

export default class Axios {
    defaults: AxiosRequestConfig
    interceptors: Interceptors

    constructor(initConfig: AxiosRequestConfig) {
        this.defaults = initConfig;
        this.interceptors = {
            request: new InterceptorManage<AxiosRequestConfig>(),
            response: new InterceptorManage<AxiosReponse>()
        }
    }

    request(url: any, config ? : any): AxiosPromise {
        config = config || {};
        if (typeof url === 'string') {
            config.url = url;
        } else if (typeof url === 'object') {
            config = url;
        }

        config = mergeConfig(this.defaults, config)

        const chain: PromiseChain<any>[] = [{
            resolved: dispatchRequest,
            rejected: undefined
        }]

        this.interceptors.request.addInterceptor(interceptor => {
            chain.unshift(interceptor)
        })

        this.interceptors.response.addInterceptor(interceptor => {
            chain.push(interceptor)
        })

        let promise = Promise.resolve(config);

        while(chain.length) {
            const {resolved, rejected} = chain.shift()!;
            promise = promise.then(resolved, rejected)
        }

        return promise;
    }

    get(url: string, config ? : AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithoutData('get', url, config)
    }

    delete(url: string, config ? : AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithoutData('delete', url, config)
    }

    head(url: string, config ? : AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithoutData('head', url, config)
    }

    options(url: string, config ? : AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithoutData('options', url, config)
    }

    post(url: string, data ? : any, config ? : AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithData('post', url, data, config)
    }

    put(url: string, data ? : any, config ? : AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithData('put', url, data, config)
    }

    patch(url: string, data ? : any, config ? : AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithData('patch', url, data, config)
    }

    _requestMethodWithoutData(method: Method, url: string, config ? : AxiosRequestConfig) {
        const conf = Object.assign({}, config || {}, { method, url })
        return this.request(conf)
    }

    _requestMethodWithData(method: Method, url: string, data ? : any, config ? : AxiosRequestConfig) {
        const conf = Object.assign({}, config || {}, { method, url, data })
        return this.request(conf)
    }
}