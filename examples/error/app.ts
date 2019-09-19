import axios from '../../src/index'

/* setTimeout(() => {
    axios({
        method: 'post',
        url: '/error/post',
        responseType: 'json',
        data: {
            imgsId:['a','1','b','well','嗨起来'],
            token: '123asdafdsfg4d45'
        }
    }).then(res => {
        console.log(res)
    })
}, 5000); */

axios({
    method: 'post',
    url: '/error/post',
    responseType: 'json',
    timeout: 3000,
    data: {
        imgsId:['a','1','b','well','嗨起来'],
        token: '123asdafdsfg4d45'
    }
}).then(res => {
    console.log(res)
}).catch(error => {
    console.log(error)
})