import { VueConstructor } from 'vue'

export interface LoaderServerOptions {
  target: HTMLElement
}

export interface LoaderServerEntity extends VueConstructor{
  open: Function
  
  close: Function
}