<template>
  <span class="msf-captcha" :disable="status.disable" @click="send()">{{codeText}}</span>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit, Watch } from 'vue-property-decorator'
import { YPPCaptchaComponentStauts } from '@/lib/typings/captcha.d'

@Component
export default class YPPCaptcha extends Vue {
  @Prop(String) phone!: string
  @Prop({type: Number, default: 0}) state!: number
  @Prop({type: String, default: 'YCCAPTCHA'}) storage!: string

  status: YPPCaptchaComponentStauts = {
    disable: true
  }
  codeText: string = '获取验证码'
  timer: any = null

  get isPhone(): boolean{
    return /^1[3|4|5|7|8][0-9]{9}$/.test(this.phone)
  }

  @Watch('state')
  onStateChanged(val: number, oldVal: number) {
    if (val === 1) {
      this.initClock()
    }
  }

  mounted() {
    this.checkClock()
  }

  send() {
    if (this.status.disable) {
      return
    }
    this.$emit(!this.isPhone ? 'error' : 'send')
  }

  checkClock(): void {
    const expires = window.localStorage.getItem(this.storage) // 获取缓存
    this.clock(expires)
  }

  initClock(): void {
    const expires: string = JSON.stringify(new Date().getTime() + 60000)
    window.localStorage.setItem(this.storage, expires) // 设置缓存
    this.clock(expires)
  }

  clock(expires: any): void {
    let step: number
    let nowtime = new Date().getTime()
    if (nowtime > expires) return
    step = Math.round((expires - nowtime) / 1000)
    this.status.disable = true
    this.codeText = '获取验证码(' + step + 's)'
    this.timer = setInterval(() => {
      step--
      if (step) {
        this.codeText = '获取验证码(' + step + 's)'
      } else {
        clearInterval(this.timer)
        this.codeText = '获取验证码'
        this.status.disable = false
      }
    }, 1000)
  }

}

</script>

<style lang="scss" scoped>
.msf-captcha {
  display: inline-block;
  padding: .1rem .2rem;
  border-radius: .1rem;
  background-color: #0c75f5;
  cursor: pointer;
  color: #fff;
}
.msf-captcha[disable]{
  background-color: #ccc;
}
</style>
