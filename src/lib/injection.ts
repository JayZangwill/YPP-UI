import Alert from '@/lib/packages/alert/index.ts'
import Toast from '@/lib/packages/toast/index.ts'
import Captcha from '@/lib/packages/captcha/index.ts'
import Confirm from '@/lib/packages/confirm/index.ts'
import Loader from '@/lib/packages/loader/index.ts'
import Process from '@/lib/packages/process/index.ts'

export default [
  {
    name: 'Alert',
    component: Alert
  },
  {
    name: 'Captcha',
    component: Captcha
  },
  {
    name: 'Confirm',
    component: Confirm
  },
  {
    name: 'Loader',
    component: Loader
  },
  {
    name: 'Process',
    component: Process
  },
  {
    name: 'Toast',
    component: Toast
  }
]