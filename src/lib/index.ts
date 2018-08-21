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

export default function install(Vue: VueConstructor, options: object) {
  component.forEach(component => Vue.use(component))
}
