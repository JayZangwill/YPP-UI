/**
 * @author guokai@yupaopao.cn
 * @description fetch
 */

import util from '@/lib/utils/util'

const API_URLS = ['ypp.test.cn']

let loginPromise: any = null

interface Other extends Object {
  timeout: any
  status: false
}

class Fetch {

  public url: string

  public opts: object

  public other: object

  public timeout: boolean

  public timeoutId: any

  public count: any

  public constructor(url: string, opts = {}, other: Other) {

    this.url = url

    this.opts = opts

    this.other = other

    this.timeout = false

    this.timeoutId = null

    this.init()
  }


  static fetch(url: string, opts: object, other: Other): Promise<any> {
    // call
    const instance = new Fetch(url, opts, other)
    return instance.fetch()
  }

  init(): void {
    // init 
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

    // this.setProxy()
    this.setQuery()
    // this.url = ypp.config.apiFilter(this.url)
  }

  newError(code: number, message: string): object {
    return {
      url: this.url,
      code,
      message
    }
  }

  fetch(): Promise<any> {
    const other: any = this.other

    return Promise.race([new Promise((resolve: Function, reject: Function) => {
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

  async _fetch(): Promise<any> {
    const url: string = this.url
    const opts: object = this.opts
    const other: any = this.other

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
        if (!loginPromise) {
        }
        return loginPromise.then((data: any) => {
          loginPromise = null

          if (!data.islogin) {
            this.showError('err')

            return Promise.reject({
              url: this.url,
              code: -4,
              message: 'rtt'
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

      return Promise.reject({
        url: this.url,
        code: -3,
        message: '接口异常 状态码:' + res.status
      })
    }).then((data) => {
      return data
    })
  }

  showError(msg: string): any {
    const other: any = this.other
    if (!other.status) {
      return false
    }

    util.toast(msg || '网络异常,请稍候再试', 1000)
  }

  hideLoading(): void {
  }

  autoSession(): void {
    const urlHost = this.url.match(/\/\/(.+?)\//)
    const other: any = this.other
    if (urlHost && API_URLS.indexOf(urlHost[1]) > -1) {
      other.session = true
    }
  }

  async insertSession(): Promise<any> {
    const opts: any = this.opts
    const other: any = this.other
    const headerAuth = {}
    if (other.session) {
      opts.credentials = 'include'
      opts.headers = Object.assign({}, headerAuth, opts.headers)
    }
  }

  setProxy(): void {
  }

  setQuery(): void {
    let url: string = this.url
    // const str = // this.other.query
    // if (str) {
    //   url += url.indexOf('?') > 0 ? '&' + str : '?' + str
    // }
    this.url = url
  }
}

export default Fetch
