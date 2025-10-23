<template>
  <section class="relative" style="max-width: 890px; margin: 0 auto">
    <img class="width-100%" src="/img/newbuilder/desktop_bg.svg" alt />
    <div class="absolute" style="width: 160px;height: calc(100% - 80px); background: #f5f5f5;top: 59px; left: 13px; overflow-y:auto">
      <div class="relative width-100% height-100%">
        <img src="/img/newbuilder/close_btn.svg" width="24" height="24" class="absolute" style="top: 5px;right:5px;z-index: 10; " alt />

        <div class="absolute" style="left:0; top: 0; width: 100%; height: 100%">
          <ImageBlock :placeholder-size="imageSize.DesktopSkinA" scale="cover" :placeholder-style="`top:calc(50% - 50px); transform: translateY(-50%)`" :block="imageBlocks.imageDesktop"></ImageBlock>
        </div>
        <div class="absolute" style="top: 265px;  left: 50%; transform: translateX(-50%);">
          <LinkButtonBlock :is-static="true" :block="actionBlocks.linkButtonBlock" size="sm"></LinkButtonBlock>
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
