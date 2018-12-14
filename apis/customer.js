import request from '../utils/request.js'
class customer {
  constructor() {
    this._request = new request
  }

  customer(data) {
    return this._request.postRequest('customer/staff/get_by_staff', data)
  }
}
export default customer