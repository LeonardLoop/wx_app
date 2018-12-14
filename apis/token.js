import request from '../utils/request.js'
class token {
  constructor() {
    this._request = new request
    this._request.setErrorHandler(this.errorHander)
  }

  getToken(data) {
    return this._request.postRequest('business_operation/wechat/mini_program/login', data)
  }
}
export default token