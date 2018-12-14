import request from '../utils/request.js'
class log {
  constructor() {
    this._request = new request
  }

  log(data) {
    return this._request.postRequest('log/get', data)
  }
}
export default log