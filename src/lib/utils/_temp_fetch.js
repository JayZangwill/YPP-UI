const ypp = {}

const API_URLS = ['api.ypp.cn', 'api.ypp.work', 'apidev.ypp.work']

const NEED_PROXYS = ['item.ypp.cn']

let loginPromise = null

class Fetch {
  static fetch(url, opts, other) {
    const instance = new Fetch(url, opts, other)
    return instance.fetch()
  }

  constructor(url, opts = {}, other = {}) {
    this.url = url

    this.opts = opts

    this.other = other

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
    // this.url = ypp.config.apiFilter(this.url)
  }

  fetch() {
    const other = this.other

    return Promise.race([new Promise((resolve, reject) => {
      this.timeoutId = setTimeout(() => {
        this.timeout = true

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

    await this.insertSession()

    return fetch(url, opts).then((res) => {
      clearTimeout(this.timeoutId)
      if (this.timeout) {
        return
      }
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
          // loginPromise = ypp._setUserInfo(null).then(() => {
          //   return ypp.getUserInfo({
          //     force: true
          //   })
          // })
        }

        return loginPromise.then((data) => {
          loginPromise = null

          if (!data.islogin) {
            this.showError('用户信息缺失')

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
            }
            return data
          }).catch((e) => {
            //             this.showError(process.env.NODE_ENV === 'development' ? e.message : '程序异常')

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
      (url)
      return data
    })
  }

  showError(msg) {
    if (!this.other.status) {
      return
    }

    // ypp.toast(msg || '网络异常,请稍候再试', 1000)
  }


  hideLoading() {
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

      // const userInfo = await ypp.getUserInfo()

      // if (userInfo && userInfo.usersession) {
      //   headerAuth.Authorization = 'Bearer ' + userInfo.usersession
      // } 
      /** else {
        opts.credentials = 'include'
      } */
    }
    if (other.session) {
      opts.credentials = 'include'
      opts.headers = Object.assign({}, headerAuth, opts.headers)
    }
  }

  setProxy() {
    let url = this.url

    //     if (process.env.NODE_ENV === 'development') {
    //       url = url.replace(/.*?\/\/.+?\//, '/')
    //     } else if (process.env.NODE_ENV === 'wxdev') {
    //       if (location.host === 'catch.ypp.cn') {
    //         const found = NEED_PROXYS.some((item) => {
    //           if (url.indexOf(item) > -1) {
    //             url = url.replace(/.*?\/\/.+?\//, '/')
    //             url = '/proxy' + url
    //             return true
    //           }
    //         })

    //         if (!found) {
    //           if (url.indexOf('//') < 0) {
    //             url = 'https://wx.ypp.cn' + url
    //           }
    //         }
    //       }
    //     }

    this.url = url
  }

  setQuery() {
    let url = this.url
    // const str = $.param(this.other.query)
    if (str) {
      url += url.indexOf('?') > 0 ? '&' + str : '?' + str
    }

    this.url = url
  }
}
// test
Fetch.fetch('https://www.baidu.com')

export default Fetch