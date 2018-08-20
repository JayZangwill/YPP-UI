import { VueConstructor } from 'vue';
import alert from './index.vue';

interface options extends Object{
  [key: string]: any
}

export default function install(Vue: VueConstructor, options: object) {
  let instance:any
  Vue.prototype.$alert = (opts: options, fn: any) => {
    if (instance) {
      instance.$el.remove()
    }

    const YPPAlert = Vue.extend(alert)

    instance = new YPPAlert({
      el: document.createElement('div')
    })


    try {
      opts = Object.assign({}, opts, options)
    } catch (e) {
    }
    for (const key in opts) {
      instance[key] = opts[key]
    }

    typeof fn === 'function' && instance.$on('submit', fn)
    document.body.appendChild(instance.$el)
    instance.open()
    return instance
  }
}
