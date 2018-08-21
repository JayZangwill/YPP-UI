import { VueConstructor } from 'vue'

import captcha from './index.vue'

export default function install(Vue: VueConstructor) {
  Vue.component(captcha.name, captcha)
}