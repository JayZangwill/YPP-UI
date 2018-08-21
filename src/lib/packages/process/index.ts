import { VueConstructor } from 'vue'

import process from './index.vue'

export default function install(Vue: VueConstructor) {
  Vue.component(process.name, process)
}