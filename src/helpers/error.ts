import { AxiosReponse, AxiosRequestConfig } from '../types'

export class AxiosError extends Error {
    isAxiosError: boolean
    config: AxiosRequestConfig
    code ? : string | null
    request ? : any
    response ? : AxiosReponse

    constructor(message: string, config: AxiosRequestConfig, code ? : string | null, request ? : any, response ? : AxiosReponse) {
        super(message)

        this.config = config;
        this.code = code;
        this.request = request;
        this.response = response;
        this.isAxiosError = true;

        Object.setPrototypeOf(this, AxiosError.prototype)
    }
}

export function createError(message: string, config: AxiosRequestConfig, code ? : string | null, request ? : any, response ? : AxiosReponse) {
    return new AxiosError(message, config, code, request, response)
}