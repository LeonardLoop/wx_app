import request from '../utils/request.js'
class bind {
  constructor() {
    this._request = new request
  }

  bind(data) {
    return this._request.postRequest('business_operation/wechat/mini_program/bind', data)
  }
}
export default bind