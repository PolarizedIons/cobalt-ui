<template>
    <span>Logging you out...</span>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Login extends Vue {
    mounted() {
        this.$token.setToken(null);
        this.$root.loggedIn = false;
        this.$router.push({ name: "home" });
    }
}
</script>

<style scoped></style>
