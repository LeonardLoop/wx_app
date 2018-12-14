// 等处理页面数据获取
import request from '../utils/request.js'
class list {
  constructor() {
    this._request = new request
  }

  list(data) {
    return this._request.postRequest('customer_entry/list_by_staff', data)
  }
}
export default list