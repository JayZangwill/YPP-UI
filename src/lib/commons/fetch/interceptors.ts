class Interceptors {
  public befores: Set<any>
  public afters: Set<any>
  public fails: Set<any>

  constructor() {
    this.befores = new Set()
    this.afters = new Set()
    this.fails = new Set()
  }

  addAfters(reslove: Function) {
    this.afters.add(reslove)
  }

  addBefores(filter: Function) {
    this.befores.add(filter)
  }

  addFails(filter: Function) {
    this.fails.add(filter)
  }

  before(opts: RequestInit) {
    return Array.from(this.befores).reduce((opts, fn) => fn(opts), opts)
  }

  async after(response: Promise<any>) {
    return Array.from(this.afters).reduce((response, fn) => response.then.call(response, fn), response)
  }

  async fail(rejection: Promise<any>) {
    return Array.from(this.fails).reduce((rejection, fn) => rejection.catch.call(rejection, fn), rejection)
  }
}

export default new Interceptors()