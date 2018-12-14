import request from '../utils/request.js'
class receive {
  constructor() {
    this._request = new request
  }

  receive(data) {
    return this._request.postRequest('customer_entry/update_by_entry_id', data)
  }
}
export default receive