const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const WebpackConfig = require('./webpack.config')

const app = express()
const compiler = webpack(WebpackConfig)

app.use(webpackDevMiddleware(compiler, {
    publicPath: '/__build__/',
    stats: {
        colors: true,
        chunks: false
    }
}))

app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const port = process.env.PORT || 8080
module.exports = app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})

const router = express.Router()

router.get('/simple/get', function(req, res) {
    res.json({
        msg: 'hello world'
    })
})

router.get('/base/get', function(req, res) {
    res.json(req.query)
})

router.post('/base/post', function(req, res) {
    res.json(req.body)
})

router.post('/error/post', function(req, res) {
    setTimeout(() => {
        res.json(req.body)
    }, 5000);
    
})

router.post('/extend/post', function(req, res) {
    res.json({
        msg: 'hello world'
    })
})

router.get('/extend/get', function(req, res) {
    res.json({
        msg: 'hello world'
    })
})

router.patch('/extend/patch', function(req, res) {
    res.json({
        msg: 'hello world'
    })
})

router.put('/extend/put', function(req, res) {
    res.json({
        msg: 'hello world'
    })
})

router.get('/extend/users', function(req, res) {
    res.json({
        code: 10000,
        data: {username: 'yellowstar', sex: 1},
        msg: 'hello world'
    })
})

router.get('/interceptor/test', function(req, res) {
    res.end('hello')
})
app.use(router);