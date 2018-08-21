import Vue from 'vue'

import { LoaderServerEntity } from './loader'
declare module 'vue/types/vue' {
  interface Vue {
    $alert: Function
    $confirm: Function
    $loader: LoaderServerEntity
  }
}
