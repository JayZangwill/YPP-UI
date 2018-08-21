import toast from './index.vue'
import Vue, { VueConstructor } from 'vue'

// class Toast extends Vue {
//   text: string
//   constructor (text: string) {
//     super()
//     this.text = text || ''
//   }
  // static open(text: string) {
  //   this.text = text || ''
  //   this.close()
  // }
  // $toast () {
  //   return {
  //     open (text: string): void {
  //       this.text = text || ''
  //     },
  //     close (): void {}
  //   }
  // }
// }
const Toast = Vue.extend(toast)
let timer: any = null
Toast.prototype.$toast = {
  open (text: string): void {
    this.text = text || ''
    this.open()
    timer = setTimeout(() => {
      this.close()
      clearTimeout(timer)
    }, 2000)
  },
  close (): void {
    this.close()
  }
}

export default (Vue: VueConstructor) => {
  console.log(123)
  // $toast: new Toast({
  //   el: document.createElement('div')
  // })
  Vue.mixin({
    methods: {
      xxx () {}
    }    
  })
}
