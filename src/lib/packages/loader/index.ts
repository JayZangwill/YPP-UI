import loader from './index.vue'
import Vue, { VueConstructor } from 'vue'

import { LoaderServerOptions } from '@/lib/typings/loader'

const LoaderConstructor = Vue.extend(loader)

LoaderConstructor.prototype.open = function(text: string) {
  this.text = text || ''
  this.open()
}

LoaderConstructor.prototype.close = function() {
  this.close()
}

const LoaderServer = (options: LoaderServerOptions) => {
  if (Vue.prototype.$isServer) return
 
  const parent: HTMLElement = options.target

  const instance = new LoaderConstructor({
    el: document.createElement('div')
  })

  parent.appendChild(instance.$el)

  return instance
}

export default function install (Vue: VueConstructor) {
  Vue.prototype.$loader = LoaderServer({
    target: document.body
  })
}

export { LoaderConstructor }