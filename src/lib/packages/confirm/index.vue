<template>
  <div class="confirm-blk">
    <div class="shadow" v-show="isShow"></div>
    <div class="confirm" v-show="isShow">
      <span class="close-icon" v-if="hasClose" @click="close"></span>
      <div class="icon-blk" v-if="icon">
        <img v-if="icon === 2" src="./icon/icon-confirm-2.png" alt="">
      </div>
      <h5 v-show="title">{{title}}</h5>
      <div class="text">
        <p v-for="(item, i) in text" :key="i">{{item}}</p>
        <p class="explain" v-for="(item, i) in explain" :key="i">{{item}}</p>
      </div>
      <a href="javascript:;" class="confirm-btn_cancel" @click="cancel">{{btnCancel}}</a><a href="javascript:;" class="confirm-btn" @click="submit">{{btn}}</a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'

@Component
export default class YPPConfirm extends Vue {
  isShow: boolean = false
  title: string = ''
  icon: string = ''
  text: object = []
  explain: object = []
  btn: string = '确定'
  btnCancel: string = '取消'
  hasClose: boolean = false

  open(): void {
    this.isShow = true
  }

  close(): void {
    this.isShow = false
  }

  @Emit('submit')
  submit(): void {
    const self = this
    self.close()
  }

  @Emit('cancel')
  cancel(): void {
    const self = this
    self.close()
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.confirm {
  position: fixed;
  top:50%;
  left:50%;
  background: #fff;
  z-index: 100;
  text-align: center;
  width: 6rem;
  border-radius: .125rem;
  padding: .6rem 0 .4rem;
  transform: translate(-50%, -50%);
  color:#2f2f2f;
}
.confirm .close-icon {
  position: absolute;
  top: .1rem;
  right: .1rem;
  background: url(./icon/icon-close.png) center no-repeat;
  width: .8rem;
  height: .8rem;
  background-size: .4rem;
}
.confirm .icon-blk img{
  width: 1.6rem;
  height: 1.6rem;
  margin: .15rem 0;
}
.confirm h5 {
  font-size: .4rem;
  padding-top: .25rem;
}
.confirm .text {
  font-size: .26rem;
  padding: .1rem 0 .5rem 0;

}
.confirm .text p {
  min-height: .4rem;
}
.confirm .text p.explain {
  color:#9B9B9B;
}
.confirm .confirm-btn {
  margin-left: .4rem;
  border-top: 1px solid #e5e5e5;
  display: inline-block;
  width: 2.2rem;
  color: #fff;
  background: #1D9AFF;
  border-radius: .1rem;
  font-size: .3rem;
  height: .6rem;
  line-height: .6rem;
}
.confirm .confirm-btn_cancel {
  border: 1px solid #1D9AFF;
  display: inline-block;
  width: 2.2rem;
  color: #1D9AFF;
  background: #fff;
  border-radius: .1rem;
  font-size: .3rem;
  height: .6rem;
  line-height: .6rem;
}
.shadow {
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, .5);
}
</style>
