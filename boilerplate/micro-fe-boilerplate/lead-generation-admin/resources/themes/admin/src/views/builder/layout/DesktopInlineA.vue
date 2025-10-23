<template>
  <section class="relative flex padding-left-xxxxl items-center" style="max-width: 890px; height: 600px; margin: 0 auto;">
    <img @click="getRefs" class="width-100% absolute" style="top:0;left:0;" src="/img/newbuilder/desktop_bg.svg" alt />

    <div class="relative" style="width: 320px;max-height: 475px; background: white;">
      <!-- <img src="/img/newbuilder/close_btn.svg" width="35" height="35" class="absolute" style="top: -20px;right:-15px;z-index: 10; " alt /> -->
      <div v-if="!isShowThankYou" class="relative" style="max-height: 475px; overflow: auto;">
        <div style="min-height: 118px">
          <ImageBlock :placeholder-size="imageSize.DesktopInlineA" :block="imageBlocks.imageMobile" ref="editblock-static-image-desktop"></ImageBlock>
        </div>
        <section :style=" { background: `url(${imageBlocks.imageOverlayDesktop.data.value}) no-repeat`, 'background-size': 'cover'} ">
          <div class="padding-sm padding-bottom-0">
            <TitleBlock :is-static="true" :block="textBlocks.titleBlock"></TitleBlock>
            <SubtitleBlock :is-static="true" :block="textBlocks.subtitleBlock"></SubtitleBlock>
          </div>
          <div class>
            <draggable v-model="listBlockAdded">
              <div v-for="(item, indexBlock) in listBlockAdded" :key="'edit' + item.name +'-'+ item.id">
                <component class="padding-x-sm margin-bottom-sm" :ref="'editblock-' + item.name + '-' + item.id" @remove="onRemoveBlock" :block="item" :index="indexBlock" :is="item.name"></component>
              </div>
            </draggable>
            <div class="padding-x-sm padding-bottom-sm">
              <SubmitBlock v-if="!actionBlocks.submitBlock.isHide" @hideblock="onHideBlock" :is-static="true" :can-hide="true" :block="actionBlocks.submitBlock"></SubmitBlock>
            </div>
          </div>
        </section>
      </div>
      <div v-if="isShowThankYou">
        <portal-target name="ThankYouBlocks"></portal-target>
      </div>
    </div>
    <portal to="ListBlockForLayout">
      <aside>
        <div style="background-color: #e3e3e3;" class="padding-sm font-semibold cursor-pointer no-select flex justify-between items-center" @click="isCollapseBlock = !isCollapseBlock">
          Blocks
          <img :class="{'le-rotate-up': !isCollapseBlock}" src="/img/newbuilder/arrow-down.png" width="16" />
        </div>
        <div v-if="!isCollapseBlock">
          <div v-if="!isShowThankYou" class="grid">
            <div class="col-4 cursor-pointer text-center" v-for="(item, indexAddBlock) in listBlock" :key="indexAddBlock">
              <div @click="addNewBlock(item)" class="le-builder-add-block flex justify-center items-center">
                <img :src="'/img/newbuilder/'+ item + '.png'" alt />
              </div>
              <div class="text-xs mt-1">{{ getBlockName(item.split('Block')[0]) }}</div>
            </div>
            <!-- // Submit button -->
            <div v-if="actionBlocks.submitBlock.isHide" class="col-4 cursor-pointer text-center">
              <div @click="showHideBlock('SubmitBlock')" class="le-builder-add-block flex justify-center items-center">
                <img :src="'/img/newbuilder/'+ 'SubmitBlock' + '.png'" alt />
              </div>
              <div class="text-xs mt-1">Submit</div>
            </div>
          </div>
          <!-- // Thanks you -->
          <div v-else class="grid">
            <div v-show="hasBlockInThankYou(item)" class="col-4 cursor-pointer text-center" v-for="(item, indexAddBlockThankYou) in listBlockNameThankyou" :key="'indexAddBlockThankYou' + indexAddBlockThankYou">
              <div>
                <div @click="addNewThankYouBlock(item)" class="le-builder-add-block flex justify-center items-center">
                  <img :src="'/img/newbuilder/'+ item + '.png'" alt />
                </div>
                <div class="text-xs mt-1">{{ getBlockName(item.split('Block')[0]) }}</div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </portal>
  </section>
</template>

<script>
import draggable from 'vuedraggable';
import { listBlockShow } from '../listData';
import { layoutMixin } from './layoutMixin';
export default {
  props: ['isShowThankYou'],
  components: {
    draggable,
  },
  data() {
    return {
      listAddedBlock: [],
      listBlock: listBlockShow,
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
