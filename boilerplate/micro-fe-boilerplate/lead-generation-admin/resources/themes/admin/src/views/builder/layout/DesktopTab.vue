<template>
  <section class="relative flex items-end" style="max-width: 890px; margin: 0 auto; height: 575px; padding-left: 0px;">
    <img class="width-100% absolute" style="left:0;top:0;" src="/img/newbuilder/desktop_bg.svg" alt />
    <div class="relative" style="max-width: 100px;bottom: 50px; left: 30px; ">
      <img src="/img/newbuilder/close_btn.svg" width="24" height="24" class="absolute" style="top: -18px;right:-12px;z-index: 10; " alt />
      <div class>
        <ImageBlock :hideBackground="true" title="Recommended dimensions 75x75" :is-link="true" :block="imageBlocks.imageMobile"></ImageBlock>
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
