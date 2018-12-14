// 通过customer_id来获取详细数据
import request from '../utils/request.js'
class query {
  constructor() {
    this._request = new request
  }

  query(data) {
    return this._request.postRequest('customer_entry/item_by_id', data)
  }
}
export default query
