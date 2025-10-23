<template>
  <section>
    <div class="relative flex justify-center items-center" style="width: 370px; margin: 0 auto; height: 745px;">
      <img class="width-100% absolute" style="top:0;left:0;" src="/img/newbuilder/mobile_bg.png" alt />
      <div class="relative sd" style="background: white; width: 300px; max-height: 650px;">
        <img src="/img/newbuilder/close_btn.svg" width="35" height="35" class="absolute" style="top: -20px;right:-15px;z-index: 10; " alt />
        <div v-if="!isShowThankYou" style="max-height: 650px; overflow: auto;">
          <ImageBlock :placeholder-size="imageSize.MobileCenterTab" :is-link="true" :block="imageBlocks.imageMobile" />
        </div>
        <div v-else>
          <portal-target name="ThankYouBlocks"></portal-target>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import draggable from 'vuedraggable';
import { layoutMixin } from './layoutMixin';

export default {
  props: ['isShowThankYou'],
  data() {
    return {
    };
  },
  components: {
    draggable,
  },
  mixins: [layoutMixin],
};
</script>

<style>
</style>
