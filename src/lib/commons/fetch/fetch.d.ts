import Interceptor from './interceptors'

export interface LimitData extends Object {
  [key: string]: Promise<any> | any
}

export interface Other extends Object {
  limittime: number

  timeout: number

  timer: WindowTimers
}

export interface defaultInterCeptor {
  addAfters: Function

  addBefores: Function
}