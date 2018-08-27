<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
    <div @click="test">aaaaaa</div>
    <div @click="close">bbbb</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import HelloWorld from "@/components/HelloWorld.vue" // @ is an alias to /src

@Component({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {
  test() {
    this.$fetch("/Addresses/SelectAreas").then((res: any) => {
      console.log(res)
    })
  }
  close() {
    this.$toast.close()
  }
}
</script>
