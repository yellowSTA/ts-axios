import axios, {AxiosError} from '../../src/index'

axios.get('/extend/get').then(res => {
    console.log(res)
})

axios('/extend/get')

interface ResponseData<T> {
    code: number
    msg: string
    data: T
}

interface User {
    username: string
    sex: number
}

function getUser<T>() {
    return axios.get<ResponseData<T>>('/extend/user').then(res => {
        return res.data
    })
}

async function test() {
    const user = await getUser<User>()
    console.log(user.data.username)
}
/* axios.post('/extend/post', {a: 2}).then(res => {
    console.log(res)
})

axios.put('/extend/put', {b: 2}).then(res => {
    console.log(res)
}) */