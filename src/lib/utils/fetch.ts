
interface FetchOptions extends Object {
  credentials: string

  headers: Headers


}

interface FetchOther extends Object{
  session: boolean

  json: boolean

  timeout: number

  limit: number

  status: boolean

  force: boolean

  query: object
}

class Fetch{
  url: URL
  opts: FetchOptions
  count: number = 0
  timeout: boolean = false
  timeoutId: any = null


  static fetch = (url: URL, opts: FetchOptions, other: FetchOther) => {

  }
  
  constructor(url: URL, opts: FetchOptions, other: FetchOther) {
    this.url = url

    this.opts = opts

    this.init()
  }

  init() {
    
  }
}