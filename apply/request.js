/**
 * Created by Administrator on 2019/10/31.
 */

const url = require('url')
let request = {
  get url() {
    return this.req.url
  },
  get path() {
    return url.parse(this.req.url).pathname
  },
  get query() {
    return url.parse(this.req.url).query
  }
};

module.exports = request;