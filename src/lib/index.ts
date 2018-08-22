import { VueConstructor } from 'vue'

import components from '@/lib/injection'

import { reduceInitObject } from './typings/index.d'

const install = function (Vue: VueConstructor) {
  // if (install.installed) return
  components.forEach((component: any) => Vue.use(component.component))
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

const tranformMap = components.reduce((initial: any, v: reduceInitObject<string, any>) => {
  initial[v.name] = v.component
  return initial
}, {})


// why no dynamic export ... ugly

export const Alert: any = tranformMap.Alert

export const Captcha: any = tranformMap.Captcha

export const Confirm: any = tranformMap.Confirm

export const Loader: any = tranformMap.Loader

export const Process: any = tranformMap.Process

export const Toast: any = tranformMap.Toast

export default {
  install,
  ...components.map((v: any) => v.component)
}
