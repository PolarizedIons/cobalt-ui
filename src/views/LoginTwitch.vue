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
        ? "//localhost:3000/auth/login"
        : "https://api.cobalt.polarizedions.net";
    window.location = url;
  }
}
</script>

<style scoped></style>
