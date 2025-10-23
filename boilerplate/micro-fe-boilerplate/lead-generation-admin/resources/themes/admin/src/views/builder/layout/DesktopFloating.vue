<template>
  <section class="relative flex items-end" style="max-width: 890px; height: 500px; margin: 0 auto; padding-left: 25px">
    <img class="width-100% absolute" style="top:0;left: 0;" src="/img/newbuilder/desktop_bg.svg" alt />

    <div class="relative sd" style="max-width: 830px;background: #fff;">
      <img src="/img/newbuilder/close_btn.svg" width="24" height="24" class="absolute" style="top: -30px;right:-10px;z-index: 10; " alt />
      <div class="flex width-100% height-100% ">
        <div style="flex: 0 0 auto; max-width: 150px;" class="">
          <ImageBlock :placeholder-size="imageSize.DesktopFloating" scale="cover" :mobile-auto-height="true" :placeholder-style="`top: 50%; transform: translateY(-50%)`" :block="imageBlocks.imageDesktop" ref="editblock-static-image-desktop"></ImageBlock>
        </div>
        <div class="flex items-center width-100%">
          <div class="width-100% height-100% padding-sm">
            <TitleBlock :is-static="true" :block="textBlocks.titleBlock" style="margin-top: 0px !important"></TitleBlock>
            <SubtitleBlock :is-static="true" :block="textBlocks.subtitleBlock"  style="margin-bottom: 0px !important"></SubtitleBlock>
          </div>
          <div class="padding-right-sm">
            <LinkButtonBlock :is-static="true" :block="actionBlocks.linkButtonBlock"></LinkButtonBlock>
          </div>
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
  components: {
    draggable,
  },
  mixins: [layoutMixin],
};
</script>

<style>
</style>
