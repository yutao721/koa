/**
 * Created by Administrator on 2019/10/31.
 */

  // 上下文对象

let proto = {} // proto同源码定义的变量名

function defineGetter(prop, name) {
  proto.__defineGetter__(name, function(){
    return this[prop][name] // 由于ctx继承了proto，所以当ctx.url时，触发了__defineGetter__方法，所以这里的this就是ctx
  })
}

function defineSetter (prop, name) {
  proto.__defineSetter__(name, function(val){ // 用__defineSetter__方法设置值
    this[prop][name] = val
  })
}


defineGetter('request', 'url')
defineGetter('request', 'path')
defineGetter('response', 'body') // 同样代理response的body属性
defineSetter('response', 'body') // 同理
module.exports = proto