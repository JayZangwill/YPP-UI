import { VueConstructor } from 'vue'

import YPPAlert from '@/lib/packages/alert/index.ts'
import YPPCaptcha from '@/lib/packages/captcha/index.ts'
import YPPConfirm from '@/lib/packages/confirm/index.ts'
import YPPLoader from '@/lib/packages/loader/index.ts'
import YPPProcess from '@/lib/packages/process/index.ts'

export default function install(Vue: VueConstructor, options: object) {
  Vue.use(YPPAlert)
  Vue.use(YPPCaptcha)
  Vue.use(YPPConfirm)
  Vue.use(YPPLoader)
  Vue.use(YPPProcess)
}
