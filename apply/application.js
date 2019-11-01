/**
 * Created by Administrator on 2019/10/31.
 */

  // Koa的主入口

let http = require('http')
let EventEmitter = require('events')
let context = require('./context')
let request = require('./request')
let response = require('./response')

class Koa {
  constructor() {
    //this.fn;
    this.middleWares = [];
    this.context = context;
    this.request = request;
    this.response = response;
  }

  use(fn) {
    //this.fn = fn
    this.middleWares.push(fn)
  }

  // 创建上下文
  createContext(req, res) {
    const ctx = Object.create(this.context)
    const request = ctx.request = Object.create(this.request)
    const response = ctx.response = Object.create(this.response)
    ctx.req = request.req = req
    ctx.res = response.res = res
    return ctx
  }

  compose(middleWares, ctx) {
    function dispatch(index) {
      if (index === middleWares.length) return Promise.resolve()
      let middleWear = middleWares[index];
      return Promise.resolve(middleWear(ctx, () => dispatch(index + 1)))
    }

    return dispatch(0)
  }

  // 处理函数
  handleRequest(req, res) {
    res.statusCode = 404
    let ctx = this.createContext(req, res);
    let fn = this.compose(this.middleWares, ctx);
    fn.then(() => {
      if (typeof ctx.body == 'object') { // 如果是个对象，按json形式输出
        res.setHeader('Content-Type', 'application/json;charset=utf8')
        res.end(JSON.stringify(ctx.body))
      } else if (typeof ctx.body === 'string') { // 如果是字符串或buffer
        res.setHeader('Content-Type', 'text/htmlcharset=utf8')
        res.end(ctx.body)
      } else {
        res.end('Not found')
      }
    }).catch(() => {
      res.statusCode = 500
      res.end('server error')
    })
  }

  // 监听
  listen(...args) {
    let server = http.createServer(this.handleRequest.bind(this));
    server.listen(...args)
  }
}

module.exports = Koa