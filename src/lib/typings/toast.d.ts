import { VueConstructor } from 'vue'

export interface ToastServerEntity extends VueConstructor {
  open: Function

  close: Function
}

export interface ToastServerOptions {
  target: HTMLElement
}