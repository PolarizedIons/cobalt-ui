<template>
  <span>Please wait...</span>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

@Component
export default class LoginTwitch extends Vue {
  mounted() {
    const url =
      window.location.hostname === "localhost"
        ? "//localhost:3000/login"
        : "https://twitch.com/404";
    window.location = url;
  }
}
</script>

<style scoped></style>
