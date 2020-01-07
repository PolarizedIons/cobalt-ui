<template>
  <div class="home">
    <img alt="robot face" src="../assets/robot-face-twitter.png" />
    <h1>CobaltBot</h1>
    <router-link :to="{ name: 'loginTwitch' }" class="login">Login with Twitch</router-link>
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Home extends Vue {}
</script>

<style scoped>
.home {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

h1 {
  font-size: 4rem;
  margin: 1.2rem 0;
}

.login {
  background: #9146ff;
  color: #f0f0ff;
  padding: 1.2rem 3.6rem;
  font-size: 1.2rem;
}
</style>
