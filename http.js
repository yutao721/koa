/**
 * Created by Administrator on 2019/10/31.
 */


let http = require('http');
let server = http.createServer((req, res) => {
  res.end('hello,world')
})
server.listen(4000)