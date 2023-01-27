export class Request {
  constructor() {
    this.url = '' // 请求的 url 地址
    this.baseUrl = '' // 请求的根路径
    this.data = '' // 请求参数
    this.header = {} // header 请求头
    this.beforeRequest = null // 请求拦截器
    this.afterRequest = null // 响应拦截器
  }
  // GET
  get(url, data = {}) {
    return this.request(url, data, 'GET')
  }
  // POST
  post(url, data = {}) {
    return this.request(url, data, 'POST')
  }
  // PUT
  put(url, data = {}) {
    return this.request(url, data, 'PUT')
  }
  // DELETE
  delete(url, data = {}) {
    return this.request(url, data, 'DELETE')
  }
  request(url, data, method) {
    this.url = this.baseUrl + url
    this.data = data // 将请求参数放在实例对象中,方便请求拦截器操作
    this.beforeRequest && typeof this.beforeRequest === 'function' && this.beforeRequest(this) // 执行请求拦截
    // 发起请求
    return new Promise((resolve, reject) => {
      const weixin = typeof uni !== 'undefined' ? uni : wx
      weixin.request({
        data,
        method,
        url: this.url,
        header: this.header,
        success: res => resolve(res), // 成功
        fail: err => reject(err), // 失败
        complete: res => this.afterRequest && typeof this.afterRequest === 'function' && this.afterRequest(res) // 执行响应拦截
      })
    })
  }
}
export default new Request()
