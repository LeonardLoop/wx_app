import request from '../utils/request.js'
class record {
  constructor() {
    this._request = new request
  }

  record(data) {
    return this._request.postRequest('customer_entry/update_by_entry_id', data)
  }
}
export default record