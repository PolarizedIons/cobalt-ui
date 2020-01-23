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
        : "https://api.cobalt.polarizedions.net"; // TODO: MAKE THIS A ENV
    window.location = url;
  }
}
</script>

<style scoped></style>
