import request from '../utils/request.js'
class name {
  constructor() {
    this._request = new request
  }

  name(data) {
    return this._request.postRequest('customer_entry/update_by_entry_id', data)
  }
}
export default name