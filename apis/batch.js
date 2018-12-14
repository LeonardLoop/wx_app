import request from '../utils/request.js'
class batch {
    constructor() {
        this._request = new request
    }

    batch(data) {
      return this._request.postRequest('customer_entry/count_by_staff', data)
    }
}
export default batch
