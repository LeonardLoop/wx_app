import request from '../utils/request.js'
class exhib {
  constructor() {
    this._request = new request
  }

  exhib(data) {
    return this._request.postRequest('staff/exhib_info_by_staff', data)
  }
}
export default exhib