import { LimitData, Other, defaultInterCeptor } from './fetch.d'

import Interceptor from './interceptors'

const limit_data: LimitData = {}

const TIMEOUT_MSG = '网络超时'

class Fetch {
  public static addBeforeFetch: Function = (filter: any) => {
    Interceptor.addBefores(filter)
  }

  public static addAfterFetch: Function = (reslove: Function, reject: Function) => {
    Interceptor.addAfters(reslove, reject)
  }

  public url: string

  public opts: RequestInit

  public other: Other

  public key: string

  constructor(url: string, opts = {}, other: Other) {

    this.url = url

    this.opts = opts

    this.other = other

    this.key = JSON.stringify({
      url: this.url,
      ...this.opts
    })

    this.init()
  }

  init(): void {
    this.other = {
      limittime: 1000,
      timeout: 10,
      ...this.other
    }
  }

  fetch(): Promise<any> {
    // limit some request
    if (limit_data[this.key]) {
      return limit_data[this.key]
    }

    const {
      gResolve,
      gReject
    } = this.limit()

    return Promise.race([
      this.timeoutPromise(),
      this.request()
    ])
      .then(() => {
        this.clearLimit()


      })
      .catch(() => {
        this.clearLimit()

      })
  }

  request(): Promise<any> {
    this.opts = Interceptor.before(this.opts)
    debugger

    return fetch(this.url, this.opts)
  }

  timeoutPromise(): Promise<any> {
    return new Promise((resolve: Function, reject: Function) => {
      setTimeout(() => {
        reject(
          new Error(TIMEOUT_MSG)
        )
      }, this.other.timeout * 1000)
    })
  }

  limit(): any {
    let gResolve = null
    let gReject = null

    limit_data[this.key] = new Promise((resolve: Function, reject: Function) => {
      gResolve = resolve
      gReject = reject
    })

    return {
      gResolve,
      gReject
    }
  }

  clearLimit(): void {
    setTimeout(() => {
      delete limit_data[this.key]
    }, this.other.limittime)
  }
}

export default Fetch