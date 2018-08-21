/**
 * author: caozhongping@tuhu.cn
 * date: 2017/11/29 rebuild
 * desc: fetch
 */
import util from './util'

const API_URLS = ['api.tuhu.cn', 'api.tuhu.work', 'apidev.tuhu.work']

const NEED_PROXYS = ['item.tuhu.cn']

const counts = {}

let lastPageId = ''

let loginPromise = null

const channel = util.getParam('_channel')

// let lightAppTimeOut = null
function lightAppRouter() {
  // if (util.isLightApp) {
  //   window.addEventListener('storage', function (event) {
  //     if (event.key === '_cart_change') {
  //       if (/\/pages\/chepin\/detail|\/pages\/personal\/index/.test(location.href)) {
  //         clearTimeout(lightAppTimeOut)
  //         lightAppTimeOut = setTimeout(() => {
  //           location.reload()
  //         }, 500)
  //       }
  //     } else if (event.key === '_personal_change') {
  //       if (/\/pages\/personal/.test(location.href)) {
  //         clearTimeout(lightAppTimeOut)
  //         lightAppTimeOut = setTimeout(() => {
  //           location.reload()
  //         }, 500)
  //       }
  //     } else if (event.key === '_login_change') {
  //       if (/\/pages\/personal/.test(location.href)) {
  //         location.reload()
  //       }
  //     }
  //   }, false)
  // }
}

function lightAppChange(url) {
  // if (tuhu.isLightApp) {
  //   if (/\/user\/LogoutCookie/.test(url)) {
  //     tuhu.localStorage.setItem('_login_change', JSON.stringify(+new Date()))
  //   } else if (/\/Cart\/RemoveCartItem|\/Cart\/AddCartItem|\/Cart\/BatchModifyCartItem/.test(url)) {
  //     tuhu.localStorage.setItem('_cart_change', JSON.stringify(+new Date()))
  //   } else if ([
  //     `/Action/CreateProductPromotion`,
  //     `/apinew/CreatePromotionCode.html`,
  //     `/action/CreateBaoYangActivityPromotion`,
  //     `/BigBrand/GetPacket`,
  //     `/bigbrand/GetPacket`,
  //     `/Active/ConvertFreePromotionCode`,
  //     `/Action/IntegralDraw`,
  //     `/User/InsertExchangeProductRecord`,
  //     `/Order/SubmitOrder`,
  //     `/Order/SubmitOrderForNew`,
  //     `/Order/CreateShopOrder`,
  //     `/Order/MarkDeleteOrder`,
  //     `/order/CancelOrder`,
  //     `/Comment/SubmitCommentOrderVersion1`
  //   ].some((item) => {
  //     return url.indexOf(item) > -1
  //   })) {
  //     tuhu.localStorage.setItem('_personal_change', JSON.stringify(+new Date()))
  //   }
  // }
}

lightAppRouter()

class Fetch {
  static fetch = (url, opts, other) => {
    const instance = new Fetch(url, opts, other)
    return instance.fetch()
  }

  constructor(url, opts = {}, other = {}) {
    this.url = url

    this.opts = opts

    this.other = other

    this.count = 0

    this.timeout = false

    this.timeoutId = null

    this.init()
  }

  init() {
    this.other = Object.assign({
      // successCode: 1,
      session: false,
      json: true,
      timeout: 10,
      limit: 2,
      status: true,
      force: true,
      query: {}
    }, this.other)

    this.autoSession()

    this.setProxy()
    this.setQuery()
    this.url = tuhu.config.apiFilter(this.url)
  }

  fetch() {
    const other = this.other

    return Promise.race([new Promise((resolve, reject) => {
      this.timeoutId = setTimeout(() => {
        this.timeout = true

        this.endCount()

        this.hideLoading()

        this.showError('网络超时')

        reject({
          url: this.url,
          code: -2,
          message: '网络超时'
        })
      }, other.timeout * 1000)
    }), this._fetch()])
  }

  async _fetch() {
    const url = this.url
    const opts = this.opts
    const other = this.other

    this.count++
    this.pageCount()

    await this.insertSession()

    return fetch(url, opts).then((res) => {
      clearTimeout(this.timeoutId)
      if (this.timeout) {
        return
      }

      this.endCount()

      if (res.status === 401 && !other.force) {
        this.hideLoading()

        return res
      }

      if (res.status === 401) {
        /** if (this.count >= other.limit) {
          this.showError('用户信息缺失')

          return Promise.reject({
            code: -4,
            message: '用户信息缺失'
          })
        } */

        if (!loginPromise) {
          loginPromise = tuhu._setUserInfo(null).then(() => {
            return tuhu.getUserInfo({
              force: true
            })
          })
        }

        return loginPromise.then((data) => {
          loginPromise = null

          if (!data.islogin) {
            // this.showError('用户信息缺失')

            return Promise.reject({
              url: this.url,
              code: -4,
              message: '用户信息缺失'
            })
          }

          this.insertSession()
          return this._fetch()
        })
      }

      if (res.ok) {
        this.hideLoading()

        if (other.json) {
          return res.json().then((data) => {
            if (data.Code !== undefined) {
              data.Code -= 0

              /**
              if (data.Code !== other.successCode) {
                this.showError(process.env.NODE_ENV === 'development' ? data.Message : '数据异常，请稍候再试')

                return Promise.reject({
                  url: this.url,
                  code: -5,
                  message: data.Message
                })
              }
              */
            }

            return data
          }).catch((e) => {
            this.showError(process.env.NODE_ENV === 'development' ? e.message : '程序异常')

            return Promise.reject({
              url: this.url,
              code: -1,
              message: e.message
            })
          })
        }

        return res
      }

      if (this.count < other.limit) {
        return this._fetch()
      }

      this.hideLoading()

      // this.showError(process.env.NODE_ENV === 'development' ? '接口异常 状态码:' + res.status : '网络异常，请稍候再试')

      return Promise.reject({
        url: this.url,
        code: -3,
        message: '接口异常 状态码:' + res.status
      })
    }).then((data) => {
      lightAppChange(url)
      return data
    })
  }

  showError(msg) {
    if (!this.other.status) {
      return
    }

    tuhu.toast(msg || '网络异常,请稍候再试', 1000)
  }

  endCount() {
    if (!this.other.status) {
      return
    }

    counts[lastPageId].end++
  }

  pageCount() {
    if (!this.other.status) {
      return
    }

    const currentPageId = location.pathname
    if (counts[lastPageId] && lastPageId !== currentPageId) {
      delete counts[lastPageId]
    }

    if (!counts[currentPageId]) {
      counts[currentPageId] = {
        begin: 0,
        end: 0
      }
    }

    if (counts[currentPageId].begin < 1) {
      tuhu.showIndicator()
    }

    counts[currentPageId].begin++

    lastPageId = currentPageId
  }

  hideLoading() {
    const other = this.other

    if (!other.status) {
      return
    }

    setTimeout(() => {
      if (counts[lastPageId].end >= counts[lastPageId].begin) {
        tuhu.hideIndicator()
      }
    }, 300)
  }

  autoSession() {
    const urlHost = this.url.match(/\/\/(.+?)\//)

    if (urlHost && API_URLS.indexOf(urlHost[1]) > -1) {
      this.other.session = true
    }
  }

  async insertSession() {
    const opts = this.opts
    const other = this.other
    const url = this.url
    const headerAuth = {}

    if (other.session && !/\/User\/GetIdentityCode|\/User\/SignIn|\/user\/GetMemberMallUserInfo/.test(url)) {
      opts.credentials && delete opts.credentials
      opts.headers && opts.headers.Authorization && delete opts.headers.Authorization

      const userInfo = await tuhu.getUserInfo()

      if (userInfo && userInfo.usersession) {
        headerAuth.Authorization = 'Bearer ' + userInfo.usersession
      } /** else {
        opts.credentials = 'include'
      } */
    }
    if (other.session) {
      if (tuhu.device.isApp) {
        headerAuth.version = tuhu.device.appVersion
      }

      if (channel === 'huawei') {
        headerAuth.h5channel = 'H5_HW'
      }

      opts.credentials = 'include'
      opts.headers = Object.assign({}, headerAuth, opts.headers)
    }
  }

  setProxy() {
    let url = this.url

    if (process.env.NODE_ENV === 'development') {
      url = url.replace(/.*?\/\/.+?\//, '/')
    } else if (process.env.NODE_ENV === 'wxdev') {
      if (location.host === 'catch.tuhu.cn') {
        const found = NEED_PROXYS.some((item) => {
          if (url.indexOf(item) > -1) {
            url = url.replace(/.*?\/\/.+?\//, '/')
            url = '/proxy' + url
            return true
          }
        })

        if (!found) {
          if (url.indexOf('//') < 0) {
            url = 'https://wx.tuhu.cn' + url
          }
        }
      }
    }

    this.url = url
  }

  setQuery() {
    let url = this.url
    const str = $.param(this.other.query)
    // const query = this.other.query

    // const strArr = []
    // for (let i in query) {
    //   if (query.hasOwnProperty(i)) {
    //     strArr.push(`${i}=` + encodeURIComponent(query[i]))
    //   }
    // }
    if (str) {
      url += url.indexOf('?') > 0 ? '&' + str : '?' + str
    }

    this.url = url
  }
}

export default Fetch