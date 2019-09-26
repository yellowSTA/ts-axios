export type Method = 'get' | 'GET' | 'post' | 'POST' | 'delete' | 'DELETE' | 'head' | 'HEAD' | 'options' | 'OPTIONS' | 'put' | 'PUT' | 'patch' | 'PATCH';

export interface AxiosRequestConfig {
    url ? : string
    method ? : Method
    data ? : any
    params ? : any
    headers ? : any
    responseType ? : XMLHttpRequestResponseType
    timeout ? : number
}

export interface AxiosReponse < T = any > {
    data: T
    status: number
    statusText: string
    headers: any
    config: AxiosRequestConfig
    request: any
}

export interface AxiosPromise < T = any > extends Promise < AxiosReponse<T> > {

}

export interface AxiosError extends Error {
    isAxiosError: boolean
    config: AxiosRequestConfig
    code ? : string | null
    request ? : any
    response ? : AxiosReponse
}

export interface Axios {
    defaults: AxiosRequestConfig
    interceptors: {
        request: AxiosInterceptorManager<AxiosRequestConfig>
        response: AxiosInterceptorManager<AxiosReponse>
    }
    request< T = any >(config: AxiosRequestConfig): AxiosPromise<T>
    get< T = any >(url: string, config ? : AxiosRequestConfig): AxiosPromise<T>
    head< T = any >(url: string, config ? : AxiosRequestConfig): AxiosPromise<T>
    options< T = any >(url: string, config ? : AxiosRequestConfig): AxiosPromise<T>
    delete< T = any >(url: string, config ? : AxiosRequestConfig): AxiosPromise<T>
    post< T = any >(url: string, data ? : any, config ? : AxiosRequestConfig): AxiosPromise<T>
    put< T = any >(url: string, data ? : any, config ? : AxiosRequestConfig): AxiosPromise<T>
    patch< T = any >(url: string, data ? : any, config ? : AxiosRequestConfig): AxiosPromise<T>
}

export interface AxiosInstance extends Axios {
    < T = any >(config: AxiosRequestConfig): AxiosPromise<T>
    < T = any >(url: string, config ? : AxiosRequestConfig): AxiosPromise<T>
}

export interface AxiosInterceptorManager < T > {
    use(resolved: ResolvedFn < T > , rejected?: RejectedFn): number

    eject(id: number): void
}

export interface ResolvedFn < T > {
    (val: T): T | Promise < T >
}

export interface RejectedFn {
    (error: any): any
}