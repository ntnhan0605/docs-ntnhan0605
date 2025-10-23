<template>
  <section class="relative flex justify-center items-center" style="max-width: 890px; height: 600px; margin: 0 auto;">
    <img @click="getRefs" class="width-100% absolute" style="top:0;left:0;" src="/img/newbuilder/desktop_bg.svg" alt />

    <div class="relative" style="width: 320px;max-height: 475px; background: white;">
      <img src="/img/newbuilder/close_btn.svg" width="35" height="35" class="absolute" style="top: -20px;right:-15px;z-index: 10; " alt />
      <div v-if="!isShowThankYou" class="relative" style="max-height: 475px; overflow: auto;">
        <div style="min-height: 118px">
          <ImageBlock :placeholder-size="imageSize.DesktopCenterTab" :is-link="true" :block="imageBlocks.imageDesktop" ref="editblock-static-image-desktop"></ImageBlock>
        </div>

      </div>
      <div v-if="isShowThankYou">
        <portal-target name="ThankYouBlocks"></portal-target>
      </div>
    </div>
  </section>
</template>

<script>
import draggable from 'vuedraggable';
import { layoutMixin } from './layoutMixin';
export default {
  props: ['isShowThankYou'],
  components: {
    draggable,
  },
  data() {
    return {
    };
  },
  mixins: [layoutMixin],
  methods: {
    getRefs() {
      console.log(this.$refs);
    },
  },
};
</script>

<style>
</style>
