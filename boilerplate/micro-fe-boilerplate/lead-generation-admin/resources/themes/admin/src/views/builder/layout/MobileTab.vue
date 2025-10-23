<template>
  <div class="animate__animated animate__fadeIn animate__faster">
    <div class="relative flex items-end" style="width: 370px; margin: 0 auto; height: 700px; padding-left: 40px">
      <img class="width-100% absolute" style="left: 0;top: 0;" src="/img/newbuilder/mobile_bg.png" alt />
      <div class="relative" style="max-width: 100px; max-height: 100px;  ">
        <img src="/img/newbuilder/close_btn.svg" width="24" height="24" class="absolute" style="top: -18px;right:-12px;z-index: 10; " alt />
        <ImageBlock :hideBackground="true" title="Recommended dimensions 60x60" :is-link="true" :block="imageBlocks.imageMobile"></ImageBlock>
      </div>
    </div>
  </div>
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
