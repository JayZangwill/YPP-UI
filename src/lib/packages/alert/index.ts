import { VueConstructor } from 'vue'
import { YPPAlertConfig } from '../../typings/alert.d'

import alert from './index.vue'

export default function install(Vue: VueConstructor) {
  let instance:any

  Vue.extend({
    methods: {
      $alert(opts: YPPAlertConfig, fn: any) {
        if (instance) {
          instance.$el.remove()
        }

        const YPPAlert = Vue.extend(alert)

        instance = new YPPAlert({
          el: document.createElement('div'),
        })

        if (opts) {
          instance = {
            ...instance,
            ...opts,
          }
        }

        if (fn && typeof fn === 'function') {
          instance.$on('submit', fn)
        }

        document.body.appendChild(instance.$el)
        instance.open()
        return instance
      },

    },

  })
}
