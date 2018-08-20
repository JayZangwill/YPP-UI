<template>
  <div class="alert-blk">
    <div class="shadow" v-show="isShow"></div>
    <div class="alert" v-show="isShow">
      <span class="close-icon" v-if="hasClose" @click="close"></span>
      <div class="icon-blk" v-if="icon">
        <img v-if="icon === 2" src="./icon/icon-alert-2.png" alt="">
      </div>
      <h5 v-show="title">{{title}}</h5>
      <div class="text">
        <p v-for="(item, i) in text" :key="i">{{item}}</p>
        <p class="explain" v-for="(item, i) in explain" :key="i">{{item}}</p>
      </div>
      <a href="javascript:;" class="alert-btn" @click="submit">{{btn}}</a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';

@Component
export default class YPPAlert extends Vue {
  isShow = false
  title = ''
  icon = ''
  text = []
  explain = []
  btn = '确定'
  hasClose = false

  open() {
    this.isShow = true;
  }

  close() {
    this.isShow = false;
  }

  @Emit('submit')
  submit() {
    const self = this;
    self.close();
  }
}

</script>

<style scoped>
.alert-blk{
  z-index: 99999;
}
.alert {
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
.alert .close-icon {
  position: absolute;
  top: .1rem;
  right: .1rem;
  background: url(./icon/icon-close.png) center no-repeat;
  width: .8rem;
  height: .8rem;
  background-size: .4rem;
}
.alert .icon-blk img{
  width: 1.6rem;
  height: 1.6rem;
  margin: .15rem 0;
}
.alert h5 {
  font-size: .4rem;
  padding-top: .25rem;
}
.alert .text {
  font-size: .26rem;
  padding: .1rem 0 .5rem 0;

}
.alert .text p {
  min-height: .4rem;
}
.alert .text p.explain {
  color:#9B9B9B;
}
.alert .alert-btn {
  border-top: 1px solid #e5e5e5;
  display: inline-block;
  width: 5.2rem;
  color: #fff;
  background: #1D9AFF;
  border-radius: .1rem;
  font-size: .3rem;
  height: .7rem;
  line-height: .7rem;
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
