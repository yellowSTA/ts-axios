import { AxiosInstance, AxiosRequestConfig } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/utils'
import defaults from './defaults'

function createInstance(config: AxiosRequestConfig): AxiosInstance {
    const context = new Axios(config);
    const instance = Axios.prototype.request.bind(context);

    extend(instance, context)
    return instance as AxiosInstance;
}
// 两种方式都可以，但不知有什么差别
/* function createInstance(): AxiosInstance {
    const context = new Axios();
    const instance = Axios.prototype.request;
    
    return extend(instance, context);
} */

export default createInstance(defaults);