<template>
  <span>Please wait...</span>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

@Component
export default class LoginTwitch extends Vue {
  mounted() {
    const domain =
      window.location.hostname === "localhost" ||
      !process.env.VUE_APP_API_DOMAIN
        ? "localhost"
        : process.env.VUE_APP_API_DOMAIN;
    window.location = `//${domain}/auth/login`;
  }
}
</script>

<style scoped></style>
