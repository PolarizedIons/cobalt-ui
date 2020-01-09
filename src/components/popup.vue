<template>
  <div class="popup-wrapper" v-if="open">
    <div class="dimmer" @click="onBackgroundClick"></div>
    <div :class="`popup ${size}`">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class Popup extends Vue {
  @Prop({ default: true })
  backgroundCloses!: boolean;

  @Prop([Boolean])
  open!: boolean;

  @Prop({ default: "normal" })
  size!: string;

  onBackgroundClick() {
    console.log("backgound click", this.backgroundCloses);
    if (this.backgroundCloses) {
      this.$emit("close");
    }
  }
}
</script>

<style scoped>
.popup-wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  justify-content: center;
  align-items: center;
}

.dimmer {
  content: "";
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
  z-index: 900;
}

.popup {
  position: relative;
  z-index: 999;

  background: #222;
  color: #efefef;
  padding: 1.2rem 2.4rem;
}

.popup.small {
  width: 35%;
}
.popup.normal {
  width: 50%;
}
.popup.large {
  width: 70%;
}
</style>
