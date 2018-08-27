import Vue from 'vue'
import App from './App.vue'
import router from './router'

const YPP = require('./lib/index')

Vue.config.productionTip = false

Vue.use(YPP)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
