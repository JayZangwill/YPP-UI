import { VueConstructor } from 'vue'
import { YPPConfirmConfig } from '@/lib/typings/confirm'
import confirm from './index.vue'

export default function install(Vue: VueConstructor) {
  let instance:any

  Vue.mixin({
    methods: {
      $alert(opts: YPPConfirmConfig, fn: Function, fn2: Function) {
        if (instance) {
          instance.$el.remove()
        }

        const YPPConfirm = Vue.extend(confirm)

        instance = new YPPConfirm({
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

        if (fn2 && typeof fn2 === 'function') {
          instance.$on('cancel', fn2)
        }

        document.body.appendChild(instance.$el)
        instance.open()
        return instance
      },

    },

  })
}