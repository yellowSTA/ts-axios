import axios, {AxiosError} from '../../src/index'

axios.get('/extend/get').then(res => {
    console.log(res)
})

/* axios.post('/extend/post', {a: 2}).then(res => {
    console.log(res)
})

axios.put('/extend/put', {b: 2}).then(res => {
    console.log(res)
}) */