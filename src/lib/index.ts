import { VueConstructor } from 'vue'

import Alert from '@/lib/packages/alert/index.ts'
import Captcha from '@/lib/packages/captcha/index.ts'
import Confirm from '@/lib/packages/confirm/index.ts'
import Loader from '@/lib/packages/loader/index.ts'
import Process from '@/lib/packages/process/index.ts'

const component = [
  Alert,
  Captcha,
  Confirm,
  Loader,
  Process
]


const install = function (Vue: VueConstructor) {
  // if (install.installed) return
  component.forEach(component => Vue.use(component))
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  ...component
}