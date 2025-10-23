<template>
  <div class="animate__animated animate__fadeIn animate__faster">
    <div class="relative flex justify-center items-end" style="width: 370px; height: 745px; margin: 0 auto;">
      <img class="width-100% absolute" style="top: 0; left: 0;" src="/img/newbuilder/mobile_bg.png" alt />
      <div class="relative" style=" width: 325px; max-height: 650px; margin-bottom: 25px;">
        <img src="/img/newbuilder/close_btn.svg" width="24" height="24" class="absolute" style="top: -30px;right:5px;z-index: 10; " alt />

        <div class="padding-sm padding-bottom-lg bg-white" style="border-bottom-left-radius: 33px;border-bottom-right-radius: 33px;">
          <div class="flex justify-between">
            <div style class="padding-right-sm width-100%">
              <TitleBlock :is-static="true" :block="textBlocks.titleBlock"></TitleBlock>
              <SubtitleBlock :is-static="true" :block="textBlocks.subtitleBlock"></SubtitleBlock>
            </div>
            <div :style="{
              'flex': imageBlocks.imageMobile.data.value ? '0 0 auto' : 'auto',
              'max-width': '88px',
              'height': imageBlocks.imageMobile.data.value? 'auto' : '88px',
              }" class="padding-y-xs">
              <ImageBlock :placeholder-size="imageSize.MobileFloating" :mobile-auto-height="true" scale="cover" :placeholder-style="`top: 50%; transform: translateY(-50%)`" :block="imageBlocks.imageMobile" ref="editblock-static-image-mobile"></ImageBlock>
            </div>
          </div>
          <LinkButtonBlock :is-static="true" :block="actionBlocks.linkButtonBlock"></LinkButtonBlock>
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
    return {};
  },
  components: {
    draggable,
  },
  mixins: [layoutMixin],
};
</script>

<style>
</style>
