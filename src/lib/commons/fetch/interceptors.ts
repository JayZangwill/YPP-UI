class Interceptors {
  public befores: Set<any>
  public afters: Set<any>

  constructor() {
    this.befores = new Set()
    this.afters = new Set()
  }

  addBefores(reslove: Function, reject: Function) {
    this.befores.add([reslove, reject])
  }

  addAfters(filter: any) {
    this.afters.add(filter)
  }

  before(opts: RequestInit) {
    return Array.from(this.befores).reduce((opts, fn) => fn(opts), opts)
  }

  async after(response: Promise<any>) {
    return Array.from(this.afters).reduce((response, fnArr) => response.then.apply(response, fnArr), response)
  }

}

export default new Interceptors()