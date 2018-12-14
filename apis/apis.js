import token from 'token'
import bind from 'bind'
import list from 'list'
import query from 'query'
import receive from 'receive'
import customer from 'customer'
import detail from 'detail'
import staff from 'staff'
import log from 'log'
import name from 'name'
import batch from "batch"
import search from "search"
import exhib from "exhib"
import record from "record"


var apis = {
  token: new token(),
  bind: new bind(),
  list: new list(),
  customer: new customer(),
  query: new query(),
  receive: new receive(),
  detail: new detail(),
  staff: new staff(),
  log: new log(),
  name: new name(),
  batch: new batch(),
  search: new search(),
  exhib: new exhib(),
  record: new record()
}

export default apis
