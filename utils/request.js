import { urlPrefix, whiteList } from '../config.js'
import { jsonToHump, jsonToUnderline } from './index.js'
class request {
  constructor() {
    this._header = {}
  }

  /**
   * 设置统一的异常处理
   */
  setErrorHandler(handler) {
    this._errorHandler = handler;
  }

  /**
   * GET类型的网络请求
   */
  getRequest(url, data, header = this._header) {
    return this.requestAll(url, data, header, 'GET')
  }

  /**
   * DELETE类型的网络请求
   */
  deleteRequest(url, data, header = this._header) {
    return this.requestAll(url, data, header, 'DELETE')
  }

  /**
   * PUT类型的网络请求
   */
  putRequest(url, data, header = this._header) {
    return this.requestAll(url, data, header, 'PUT')
  }

  /**
   * POST类型的网络请求
   */
  postRequest(url, data, header = this._header) {
    return this.requestAll(url, data, header, 'POST')
  }

  /**
   * 网络请求
   */
  requestAll(url, data, header, method) {
    header['content-type'] = 'application/x-www-form-urlencoded'
    header['x-token'] = wx.getStorageSync('token')
    jsonToUnderline(data)
    return new Promise((resolve, reject) => {
      if (!wx.getStorageSync('token') && whiteList.indexOf(url) < 0) {
        getApp().getToken().then(() => {
          resolve({ isRegainToken: true })
        })
      } else {
        wx.request({
          url: urlPrefix + url,
          data: data,
          header: header,
          method: method,

          success: (res => {
            jsonToHump(res.data)
            if (res.header['x-token']) {
              wx.setStorageSync('token', res.header['x-token'])
            }
            if (res.data.errorCode === "0") {
              resolve({ isRegainToken: false, resData: res.data })
            } else if (res.data.errorCode === "1") {// token过期或失效
              getApp().getToken().then(() => {
                resolve({ isRegainToken: true })
              })
            } else if (res.data.errorCode === "239" || res.data.errorCode === "270") {// 未绑定手机账号
              wx.reLaunch({
                url: '/pages/account/index'
              })
            } else {
              if (this._errorHandler != null) {
                //如果有统一的异常处理，就先调用统一异常处理函数对异常进行处理
                this._errorHandler(res.data.errorMessage)
              }
              reject(res)
            }
          }),
          fail: (res => {
            if (this._errorHandler != null) {
              this._errorHandler(res)
            }
            reject(res)
          })
        })
      }
    }).then(({ isRegainToken, resData }) => {
      return isRegainToken ? this.requestAll(url, data, header, method) : Promise.resolve(resData.data)
    })
  }
}

export default request
