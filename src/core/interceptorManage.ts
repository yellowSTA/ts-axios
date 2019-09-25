import {ResolvedFn, RejectedFn} from '../types'

interface Interceptor<T> {
    resolved: ResolvedFn<T>
    rejected?: RejectedFn
}

export default class InterceptorManage<T> {
    private interceptors: Array<Interceptor<T> | null>

    constructor() {
        this.interceptors = []
    }

    use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number {
        this.interceptors.push({
            resolved,
            rejected
        })

        return this.interceptors.length -1;
    }

    addInterceptor(fn: (interceptor: Interceptor<T>) => void): void {
        this.interceptors.forEach(interceptor => {
            if(interceptor !== null) {
                fn(interceptor)
            }
        })
    }

    eject(id: number): void {
        if(this.interceptors[id]) {
            this.interceptors[id] = null;
        }
    }
}