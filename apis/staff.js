import request from '../utils/request.js'
class staff {
  constructor() {
    this._request = new request
  }

  staff(data) {
    return this._request.postRequest('customer/update', data)
  }
}
export default staff