import { VueConstructor } from 'vue'

import YPPAlert from '@/lib/packages/alert/index.ts'

export default function install(Vue: VueConstructor, options: object) {
  Vue.use(YPPAlert)
}
