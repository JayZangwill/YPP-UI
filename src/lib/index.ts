import { VueConstructor } from 'vue'

import components from '@/lib/injection'

import * as SFCComponent from './injection'

const install = function (Vue: VueConstructor) {
  // if (install.installed) return
  components.forEach((component: any) => Vue.use(component.component))
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export const Alert = SFCComponent.Alert

export const Captcha = SFCComponent.Captcha

export const Confirm = SFCComponent.Confirm

export const Loader = SFCComponent.Loader

export const Process = SFCComponent.Process

export const Toast = SFCComponent.Toast

export default {
  install,
  ...components.map((v: any) => v.component)
}
