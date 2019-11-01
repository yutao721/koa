// const Koa = require('./apply/application');
const Koa = require('koa');
const app = new Koa();

app.use((ctx) => {
  console.log(ctx.req.path)   // undefined  ctx.req = req
  console.log(ctx.request.path) // /  ctx.request是koa自己缝制的
  console.log(ctx.request.req.path)// undefined ctx.request.req = req
  console.log(ctx.path) // /  用ctx来代理一下ctx.request属性
})

app.listen(3003);


// 对比发现，相对原生，koa多了两个实例上的use、listen方法，和use回调中的ctx、next两个参数。
// 这四个不同，几乎就是koa的全部了，也是这四个不同让koa如此强大.

// listen 方法实际上还是用了http.createServer()，然后监听了一个端口

// ctx 利用 上下文(context) 机制，将原来的req,res对象合二为一，并进行了大量拓展,
//     使开发者可以方便的使用更多属性和方法，大大减少了处理字符串、提取信息的时间，
//     免去了许多引入第三方包的过程。(例如ctx.query、ctx.path等)

