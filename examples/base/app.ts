import axios from '../../src/index'

axios({
    method: 'get',
    url: '/base/get',
    params: {
        a: 1,
        b: 2
    }
})

axios({
    method: 'get',
    url: '/base/get#',
    params: {
        a:['a','1','b','well','我，们'],
        token: '123asdafdsfg4d45'
    }
})

axios({
    method: 'post',
    url: '/base/post',
    data: {
        imgsId:['a','1','b','well','嗨起来'],
        token: '123asdafdsfg4d45'
    }
})