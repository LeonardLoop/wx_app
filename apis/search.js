import request from '../utils/request.js'
class search {
    constructor() {
      this._request = new request
    }

    search(data) {
        return this._request.postRequest('customer_entry/item_by_id', data)
    }
}
export default search
