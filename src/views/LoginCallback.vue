<template>
    <span>Logging you in...</span>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Login extends Vue {
    mounted() {
        const token = window.location.hash.substring(1);
        if (!token) {
            this.$token.setToken(null);
            this.$router.push({ name: "noAccess" });
        }

        this.$token.setToken(token);
        this.$root.loggedIn = true;
        this.$router.push({ name: "dashboard" });
    }
}
</script>

<style scoped></style>
