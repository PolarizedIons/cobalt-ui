<template>
  <a
    class="btn"
    :class="{ disabled: disabled || busy, [variant]: true }"
    @click="$emit('click', $event)"
  >
    <div v-if="busy" class="loader"></div>
    <span class="content" :style="{ opacity: busy ? 0 : 1 }">
      <slot></slot>
    </span>
  </a>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class Btn extends Vue {
  @Prop([Boolean])
  disabled!: boolean;

  @Prop([Boolean])
  busy!: boolean;

  @Prop({ default: "normal", type: String })
  size!: string;

  @Prop({ default: "secondary", type: String })
  variant!: string;
}
</script>

<style scoped>
.btn {
  padding: 0.6rem 1.2rem;
  margin: 0 0.6rem;
  cursor: pointer;
  position: relative;
}

.btn.primary {
  background: #9146ff;
  color: white;
}

.btn.secondary {
  background: #414141;
  color: white;
}

.btn.danger {
  background: rgb(148, 34, 34);
  color: white;
}

.btn.disabled {
  opacity: 0.4;
  cursor: not-allowed;
  pointer-events: none;
}

.loader {
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -3px;
  margin-left: -2px;
  transform: translateX(-50%) translateY(-50%);
  width: 20px;
  height: 20px;
}
.loader:after {
  content: " ";
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 3px solid #fff;
  border-color: #fff transparent #fff transparent;
  animation: btn-loader 1.2s linear infinite;
}
@keyframes btn-loader {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
