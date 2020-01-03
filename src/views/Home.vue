<template>
  <div class="home">
    <img alt="robot face" src="../assets/robot-face-twitter.png" />
    <h1>CobaltBot</h1>
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

@Component
export default class HelloWorld extends Vue {}
</script>

<style scoped>
.home {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
