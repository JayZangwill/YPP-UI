import Vue from 'vue'

import { LoaderServerEntity } from './loader'
import { ToastServerEntity } from './toast.d'

declare module 'vue/types/vue' {
  interface Vue {
    $alert: Function
    $confirm: Function
    $loader: LoaderServerEntity
    $toast: ToastServerEntity
    $fetch: any
  }
}
