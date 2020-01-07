<template>
  <div class="noaccess">
    <h2>No Access</h2>
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

@Component
export default class NoAccess extends Vue {}
</script>

<style scoped>
.noaccess {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
