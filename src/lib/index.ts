import { VueConstructor } from 'vue'

import YPPAlert from '@/lib/packages/alert/index.ts'
import YPPToast from '@/lib/packages/toast/index.ts'

export default function install(Vue: VueConstructor, options: object) {
  Vue.use(YPPAlert)
  Vue.use(YPPToast)
}
