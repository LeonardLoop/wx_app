import request from '../utils/request.js'
class detail {
  constructor() {
    this._request = new request
  }

  detail(data) {
    return this._request.postRequest('entry_detail/add', data)
  }
}
export default detail