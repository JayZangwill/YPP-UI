import toast from './index.vue'
import Vue, { VueConstructor } from 'vue'
import { ToastServerOptions } from '@/lib/typings/toast'

const Toast = Vue.extend(toast)

Toast.prototype.open = function (text: string): void {
  this.text = text || ''
  this.open()
}
Toast.prototype.close = function close(): void {
  this.close()
}

const ToastServer = (options: ToastServerOptions) => {
  if (Vue.prototype.$isServer) return

  const parent: HTMLElement = options.target
  const instance = new Toast({
    el: document.createElement('div')
  })

  parent.appendChild(instance.$el)

  return instance
}

export default (Vue: VueConstructor) => {
  Vue.prototype.$toast = ToastServer({
    target: document.body
  })
}
