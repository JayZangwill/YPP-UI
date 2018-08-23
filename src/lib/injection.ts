import alert from '@/lib/packages/alert/index.ts'
import toast from '@/lib/packages/toast/index.ts'
import captcha from '@/lib/packages/captcha/index.ts'
import confirm from '@/lib/packages/confirm/index.ts'
import loader from '@/lib/packages/loader/index.ts'
import process from '@/lib/packages/process/index.ts'
import { reduceInitObject } from './typings/index.d'

const components = [
  {
    name: 'Alert',
    component: alert
  },
  {
    name: 'Captcha',
    component: captcha
  },
  {
    name: 'Confirm',
    component: confirm
  },
  {
    name: 'Loader',
    component: loader
  },
  {
    name: 'Process',
    component: process
  },
  {
    name: 'Toast',
    component: toast
  }
]

const tranformMap = components.reduce((initial: any, v: reduceInitObject<string, Function>) => {
  initial[v.name] = v.component
  return initial
}, {})

export const Alert: Function = tranformMap.Alert

export const Captcha: Function = tranformMap.Captcha

export const Confirm: Function = tranformMap.Confirm

export const Loader: Function = tranformMap.Loader

export const Process: Function = tranformMap.Process

export const Toast: Function = tranformMap.Toast

export default components
