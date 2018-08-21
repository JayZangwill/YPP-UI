<template>
  <div class="toast-blk" v-show="isShow">
    <span>{{text}}</span>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class YPPToast extends Vue {
  isShow: boolean = false
  text: string = ''
  open (): void {
    this.isShow = true
  },
  close (): void {
    this.isShow = false
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.toast-blk {
  position: fixed;
  z-index: 101;
  top: 50%;
  left: 0;
  width: 100%;
  margin: -1rem 0 0 0;
  text-align: center;
}
.toast-blk span {
  background: rgba(0, 0, 0, .7);
  color: #fff;
  display: inline-block;
  padding: 0 .1rem;
  border-radius: .05rem;
  height: .4rem;
  line-height: .4rem;
}
</style>
