<template>
  <div class="animate__animated animate__fadeIn animate__faster">
    <div class="relative" style="width: 370px; margin: 0 auto;">
      <img class="width-100%" src="/img/newbuilder/mobile_bg.png" alt />
      <div class="absolute sd" style="top: 50px;left:50%; background: white; width: 315px; max-height: 650px; overflow-y: auto; transform: translateX(-50%);">
        <div class="relative">
          <img src="/img/newbuilder/close_btn.svg" width="24" height="24" class="absolute" style="top: 5px;right:5px;z-index: 10; " alt />

          <ImageBlock scale="cover" :placeholder-size="imageSize.MobileSkin" placeholder-style="top: 5px"  :block="imageBlocks.imageMobile" />
          <div class="absolute" style="bottom: 10px; left: 50%; transform: translateX(-50%);">
            <LinkButtonBlock :is-static="true" :block="actionBlocks.linkButtonBlock" size="sm"></LinkButtonBlock>
          </div>
        </div>
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
