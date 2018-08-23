import Vue from 'vue'
import App from './App.vue'
import router from './router'

const YPP = require('ypp-ui')

Vue.config.productionTip = false

// import * as test from './lib/index'

// import { Alert } from './lib'

// console.log(test, '*******按需加载********')

// console.log(Alert, '-----> just import Alert')

// console.log(YPP, '<------ypp-ui1 test 全部注入------>')

Vue.use(YPP)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
