import fetch, { Fetch } from './fetch/index'
import { VueConstructor } from 'vue'

const commons = [
  fetch
]

window.Fetch = Fetch

const install = function (vue: VueConstructor) {
  commons.forEach(v => vue.prototype[v.name] = v)
}

export default install