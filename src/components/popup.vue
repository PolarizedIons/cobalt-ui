<template>
  <div class="popup-wrapper" v-if="open" @click="backgroundClose">
    <div :class="`popup width-${size}`" @click.stop>
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

  backgroundClose() {
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
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
  z-index: 900;

  display: flex;
  justify-content: center;
  align-items: center;
}

.popup {
  position: relative;
  z-index: 999;

  background: #efefef;
  color: #121212;
  padding: 1.2rem 2.4rem;
}

.popup.width-small {
  width: 40%;
}
.popup.width-normal {
  width: 60%;
}
.popup.width-large {
  width: 80%;
}
</style>
