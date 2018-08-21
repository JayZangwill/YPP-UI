<template>
  <span class="ypp-process" :style="{width: width, height: height, backgroundColor: baseColor}">
    <em class="ypp-process-inset" :style="{width: percent + '%', backgroundColor: insetColor}"></em>
  </span>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component
export default class YPPProcess extends Vue {
  @Prop({type: Number, default: 100}) percent!: number
  @Prop({type: String, default: '4rem'}) width!: string
  @Prop({type: String, default: '.2rem'}) height!: string
  @Prop({type: String, default: '#f00'}) baseColor!: string
  @Prop({type: String, default: '#00f'}) insetColor!: string
}
</script>

<style lang="scss" scoped>
.ypp-process{
  position: relative;
  display: inline-block;
  border-radius: .4rem;
  background-color: #f00;
}
.ypp-process-inset{
  position: absolute;
  left: 0;
  height: 100%;
  border-radius: .4rem;
  background-color: #0ff;
}
</style>
