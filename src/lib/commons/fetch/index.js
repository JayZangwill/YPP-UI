import Interceptor from './interceptors'

const limit_data = {}

const TIMEOUT_MSG = '网络超时'

class Fetch {

  static addBeforeFetch = (filter) => {
    Interceptor.addBefores(filter)
  }

  static addAfterFetch = (reslove) => {
    Interceptor.addAfters(reslove)
  }

  static addFailFetch = (reject) => {
    Interceptor.addFails(reject)
  }

  constructor(url, opts = {}, other) {
    this.url = url

    this.opts = opts

    this.other = other

    this.key = JSON.stringify({
      url: this.url,
      ...this.opts
    })

    this.init()

    return this.fetch()
  }

  init() {
    this.other = {
      limittime: 1000,
      timeout: 10,
      ...this.other
    }
  }

  fetch() {
    // limit some request
    if (limit_data[this.key]) {
      return limit_data[this.key]
    }

    const {
      gResolve,
      gReject
    } = this.limit()

    const result = Promise.race([
      this.timeoutPromise(),
      this.request()
    ])
      .then(res => res.json())

    return Interceptor.after(result)
      .then(response => {
        this.clearLimit()

        return response
      })
      .catch(e => {
        this.clearLimit()

        try {
          return Interceptor.fail(Promise.reject(e))
        } catch (error) {
          return {
            ...error
          }
        }
      })
  }

  request() {
    this.opts = Interceptor.before(this.opts)

    return fetch(this.url, this.opts)
  }

  timeoutPromise() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(
          new Error(TIMEOUT_MSG)
        )
      }, this.other.timeout * 1000)
    })
  }

  limit() {
    let gResolve = null
    let gReject = null

    limit_data[this.key] = new Promise((resolve, reject) => {
      gResolve = resolve
      gReject = reject
    })

    return {
      gResolve,
      gReject
    }
  }

  clearLimit() {
    setTimeout(() => {
      delete limit_data[this.key]
    }, this.other.limittime)
  }
}

export default async function $fetch(url, opts = {}, other) {
  return new Fetch(url, opts, other)
}

export { Fetch }