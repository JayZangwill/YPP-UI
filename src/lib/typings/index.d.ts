export interface reduceInitObject<T, U> extends Object {
  name: T
  component: U
}

export interface ComponentType extends Object {
  Alert: Function
  Captcha: Function
  Confirm: Function
  Loader: Function
  Process: Function
  Toast: Function
}