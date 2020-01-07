<template>
  <span>Please wait...</span>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Login extends Vue {
  mounted() {
    const token = window.location.hash;
    if (!token) {
      this.$router.push({ name: "noaccess" });
    }
  }
}
</script>

<style scoped></style>
