import axios from '../../src/index'

axios.interceptors.request.use(config => {
    config.params = {
        id: 2,
        username: 'yellowstar'
    }
    return config
})

axios.interceptors.response.use(res => {
    res.data += 2
    return res.data
})

axios({
    url: '/interceptor/test',
    method: 'get'
}).then(res =>{
    console.log(res)
})