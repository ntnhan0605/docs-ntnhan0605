<template>
  <section class="d-flex" style="height: calc(100vh - 65px)">
    <aside style="flex: 0 0 270px; border-right: 1px solid #d3d3d3; height: calc(100vh - 65px); overflow: auto">
      <div class="margin-top-0">
        <portal-target name="builderCampaignName"></portal-target>
      </div>
      <portal-target name="ListBlockForLayout"></portal-target>

      <div v-show="nameCurrentEditBlock" style="background-color: #e3e3e3" class="padding-sm font-semibold">Edit {{ nameCurrentEditBlock }}</div>
      <div>
        <portal-target :name="currentSelectEdit"></portal-target>
      </div>
      <section v-if="!isShowThankYou">
        <div v-if="!['Floating', 'Tab', 'SkinA', 'SkinB', 'CenterTab'].includes(currentLayout)" class="mb-5">
          <div style="background-color: #e3e3e3" class="padding-sm font-semibold no-select flex justify-between items-center">Options</div>
          <aside v-if="['InlineA', 'InlineB'].includes(currentLayout)">
            <div class="padding-sm padding-bottom-0">
              <div class="mb-1 text-sm">Position</div>
              <div class="le-builder-option-select-wrapper">
                <select v-model="popupInlinePosition" class="le-builder-option-select">
                  <option value="1th">After 1th paragraph</option>
                  <option value="2th">After 2th paragraph</option>
                  <option value="3th">After 3th paragraph</option>
                  <option value="4th">After 4th paragraph</option>
                  <option value="5th">After 5th paragraph</option>
                  <option value="6th">After 6th paragraph</option>
                  <option value="7th">After 7th paragraph</option>
                  <option value="8th">After 8th paragraph</option>
                  <option value="9th">After 9th paragraph</option>
                  <option value="10th">After 10th paragraph</option>
                  <option value="11th">After 11th paragraph</option>
                  <option value="12th">After 12th paragraph</option>
                  <option value="lastP">Last of paragraph</option>
                  <option value="1thH2">After first H2</option>
                  <option value="2thH2">After second H2</option>
                  <option value="3thH2">After third H2</option>
                  <option value="4thH2">After fourth H2</option>
                  <option value="5thH2">After fifth H2</option>
                  <option value="6thH2">After sixth H2</option>
                  <option value="7thH2">After seventh H2</option>
                  <option value="8thH2">After eighth H2</option>
                  <option value="9thH2">After ninth H2</option>
                  <option value="10thH2">After tenth H2</option>
                  <option value="lastH2">After last H2</option>
                  <option value="end">End of the article</option>
                </select>
              </div>
            </div>
          </aside>
          <!-- TODO: list will show upload popup background -->
          <aside class="mb-5" v-if="['LightBoxA', 'LightBoxB', 'InlineA', 'InlineB', 'Fullscreen', 'Sidebar', 'Slider'].includes(currentLayout)">
            <div class="padding-sm padding-bottom-0">
              <div class="mb-1 text-sm">{{ displayType }} Popup Background</div>
            </div>
            <!-- Desktop -->
            <div v-show="displayType == 'Desktop'" class="relative padding-sm padding-bottom-0 cursor-pointer">
              <button class="le-builder-remove-btn"><img width="12" src="/img/newbuilder/upload.svg" alt /> Upload/ Replace</button>
              <input @change="readURL($event)" title="Click to upload image" class="absolute cursor-pointer" style="top: 0; left: 0; opacity: 0; width: 100%; height: 100%" type="file" name accept="image/*" />
              <div v-show="imageBlocks.imageOverlayDesktop.data.value" class="mt-3 mb-3">
                <button @click="removeImage" title="Click to remove uploaded image" class="le-builder-remove-btn"><img width="12" src="/img/icons/delete.svg" alt />Remove</button>
              </div>
            </div>

            <!-- Mobile -->
            <div v-show="displayType == 'Mobile'" class="relative padding-sm padding-bottom-0 cursor-pointer">
              <button class="le-builder-remove-btn"><img width="12" src="/img/newbuilder/upload.svg" alt /> Upload/ Replace</button>
              <input @change="readURL($event)" title="Click to upload image" class="absolute cursor-pointer" style="top: 0; left: 0; opacity: 0; width: 100%; height: 100%" type="file" name accept="image/*" />
              <div v-show="imageBlocks.imageOverlayMobile.data.value" class="mt-3 mb-3">
                <button @click="removeImage" title="Click to remove uploaded image" class="le-builder-remove-btn"><img width="12" src="/img/icons/delete.svg" alt />Remove</button>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </aside>

    <div style="max-width: 1400px" class="relative padding-md width-100%">
      <!-- Select device layout :start -->
      <div v-if="displayOn == 'both'" style="max-width: 1260px" class="margin-bottom-sm margin-top-sm flex justify-between">
        <div class="color-primary no-select">
          <img class="align-middle" style="margin-right: 2px; margin-bottom: 4px" draggable="false" src="/img/icons/i.svg" alt />
          {{ currentLayout }}
        </div>
        <div class="flex justify-end">
          <label class="le-builder-device-radio relative" for="desktop-device-radio">
            <input type="radio" v-model="displayType" value="Desktop" name="preview-device" id="desktop-device-radio" />
            <div :class="{ selected: displayType == 'Desktop' }" class="le-builder-device-select text-center">
              <img src="/img/newbuilder/desktop.svg" alt />
            </div>
          </label>
          <label class="le-builder-device-radio relative" for="mobile-device-radio">
            <input v-model="displayType" value="Mobile" type="radio" name="preview-device" id="mobile-device-radio" />
            <div :class="{ selected: displayType == 'Mobile' }" class="le-builder-device-select text-center">
              <img src="/img/newbuilder/mobile.svg" alt />
            </div>
          </label>
        </div>
      </div>

      <div v-if="displayOn == 'Desktop'" style="max-width: 1260px" class="margin-bottom-sm margin-top-sm flex justify-between">
        <div class="color-primary no-select">
          <img class="align-middle" style="margin-right: 2px; margin-bottom: 4px" draggable="false" src="/img/icons/i.svg" alt />
          {{ currentLayout }}
        </div>
        <label class="le-builder-device-radio relative" for="desktop-device-radio">
          <input type="radio" value="Desktop" name="preview-device" id="desktop-device-radio" checked readonly />
          <div class="le-builder-device-select text-center selected">
            <img src="/img/newbuilder/desktop.svg" alt />
          </div>
        </label>
      </div>
      <div v-if="displayOn == 'Mobile'" style="max-width: 1260px" class="margin-bottom-sm margin-top-sm flex justify-end">
        <label class="le-builder-device-radio relative" for="mobile-device-radio">
          <input type="radio" value="Mobile" name="preview-device" id="mobile-device-radio" checked readonly />
          <div class="le-builder-device-select text-center selected">
            <img src="/img/newbuilder/mobile.svg" alt />
          </div>
        </label>
      </div>
      <!-- Select device layout :end -->

      <div v-if="currentLayout">
        <component :isShowThankYou="isShowThankYou" :is="currentDeviceLayout"></component>
      </div>

      <!-- Switcher show thank yout -->
      <div v-if="listLayoutShowThankYou.includes(currentLayout)" class="le-builder-page-switch-fixed le-newbuilder-switch">
        <p class="text-sm font-bold" :class="{ 'color-greyish': isShowThankYou, 'color-secondary': !isShowThankYou }">Main</p>
        <label class="le-switch le-vertical" style="margin-bottom: 15px">
          <input type="checkbox" :checked="isShowThankYou" @change="toogleThankYou" />
          <span class="slider round"></span>
        </label>
        <p class="text-sm font-bold" :class="{ 'color-greyish': !isShowThankYou, 'color-secondary': isShowThankYou }">Thank you</p>
        <div v-show="isShowThankYou && !hasPhoneOtpField">
          <label class="block text-sm flex items-center margin-bottom-xs" for="show-thankyou"> <input v-model="popupShowThankYou" class="margin-right-xxs" value="show" type="radio" name="isShowThankYou" id="show-thankyou" /> show </label>
          <label class="block text-sm flex items-center" for="notshow-thankyou"> <input v-model="popupShowThankYou" class="margin-right-xxs" value="notshow" type="radio" name="isShowThankYou" id="notshow-thankyou" /> not show </label>
        </div>
        <AlertRemindThankYou />
      </div>
    </div>

    <!-- Thanks you blocks -->
    <portal to="ThankYouBlocks">
      <div>
        <div :style="{ 'max-width': imageBlocks.imageThankYou.data.value ? '130px' : '100%' }" style="margin: auto" :class="{ 'padding-top-md': imageBlocks.imageThankYou.data.value }">
          <ImageBlock :size-auto="true" :hide-background="true" :block="imageBlocks.imageThankYou" ref="thankyou-block-image"></ImageBlock>
        </div>
        <div class="padding-sm">
          <div v-for="(item, index) in listBlockThankyou" :key="'listBlockThankyou' + index">
            <component :is="item.name" :block="item" :is-thankyou="true" @remove="onRemoveBlockThankyou(index)"></component>
          </div>
        </div>
      </div>
    </portal>
  </section>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions, mapGetters } = createNamespacedHelpers('builder');

import AlertRemindThankYou from '@/views/builder/components/AlertRemindThankYou.vue';

// Desktop Layout
import DesktopLightBoxA from '@/views/builder/layout/DesktopLightBoxA';
import DesktopLightBoxB from '@/views/builder/layout/DesktopLightBoxB';
import DesktopSkinA from '@/views/builder/layout/DesktopSkinA';
import DesktopSkinB from '@/views/builder/layout/DesktopSkinB';
import DesktopFloating from '@/views/builder/layout/DesktopFloating';
import DesktopTab from '@/views/builder/layout/DesktopTab';
import DesktopFullscreen from '@/views/builder/layout/DesktopFullscreen';
import DesktopCenterTab from '@/views/builder/layout/DesktopCenterTab';
import DesktopInlineA from '@/views/builder/layout/DesktopInlineA';
import DesktopInlineB from '@/views/builder/layout/DesktopInlineB';
import DesktopSidebar from '@/views/builder/layout/DesktopSidebar';
import DesktopSlider from '@/views/builder/layout/DesktopSlider';
// Mobile layout
import MobileLightBox from '@/views/builder/layout/MobileLightBox';
import MobileSkin from '@/views/builder/layout/MobileSkin';
import MobileFloating from '@/views/builder/layout/MobileFloating';
import MobileTab from '@/views/builder/layout/MobileTab';
import MobileFullscreen from '@/views/builder/layout/MobileFullscreen';
import MobileCenterTab from '@/views/builder/layout/MobileCenterTab';
import MobileInline from '@/views/builder/layout/MobileInline';

export default {
  components: {
    AlertRemindThankYou,
    // Layout
    DesktopLightBoxA,
    DesktopLightBoxB,
    DesktopSkinA,
    DesktopSkinB,
    DesktopFloating,
    DesktopTab,
    DesktopFullscreen,
    DesktopCenterTab,
    DesktopInlineA,
    DesktopInlineB,
    DesktopSidebar,
    DesktopSlider,
    //
    MobileLightBox,
    MobileSkin,
    MobileFloating,
    MobileTab,
    MobileFullscreen,
    MobileCenterTab,
    MobileInline,
  },
  data() {
    return {
      popup: {},
      // isShowThankYou: false,
      isMain: true,
      listPortal: [],
      currentEditBlock: '',
      // https://hhgdev.atlassian.net/browse/EL-157
      listLayoutShowThankYou: ['LightBoxB', 'Fullscreen', 'InlineA', 'InlineB', 'Sidebar', 'Slider'],
      listAddedBlock: [],
    };
  },
  computed: {
    nameCurrentEditBlock() {
      const text = this.currentSelectEdit ? this.currentSelectEdit.split('-')[0] : '';
      const result = text.replace(/([A-Z])/g, ' $1');
      const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
      console.log('finalResult', finalResult);
      return finalResult.replace('Block', '').replace('Whatsapp', 'WhatsApp').replace('Otp', 'OTP').replace('Tnc', 'T&C');
    },
    isShowThankYou: {
      get() {
        return this.$store.state.builder.isShowThankYou;
      },
      set(value) {
        this.$store.commit('builder/SET_DATA', {
          key: 'isShowThankYou',
          value,
        });
      },
    },
    popupShowThankYou: {
      get() {
        return this.$store.state.builder.popupShowThankYou;
      },
      set(value) {
        this.$store.commit('builder/SET_DATA', {
          key: 'popupShowThankYou',
          value,
        });
      },
    },
    displayType: {
      get() {
        return this.$store.state.builder.displayType;
      },
      set(value) {
        this.$store.commit('builder/SET_DATA', {
          key: 'displayType',
          value,
        });
      },
    },
    popupInlinePosition: {
      get() {
        return this.$store.state.builder.popupInlinePosition;
      },
      set(value) {
        this.$store.commit('builder/SET_DATA', {
          key: 'popupInlinePosition',
          value,
        });
      },
    },
    listBlockThankyou: {
      get() {
        return this.$store.state.builder.listBlockThankyou;
      },
      set(value) {
        this.$store.commit('builder/SET_DATA', {
          key: 'listBlockThankyou',
          value,
        });
      },
    },
    currentDeviceLayout() {
      return this.displayType + (this.displayType == 'Desktop' ? this.currentLayout : this.currentLayout.replace(/A$|B$/, ''));
    },
    ...mapState(['currentLayout', 'currentSelectEdit', 'imageBlocks', 'displayOn']),
    ...mapGetters(['hasPhoneOtpField']),
  },
  mounted() {},
  methods: {
    ...mapActions([]),
    readURL(e, type) {
      const input = e.target;
      if (input.files && input.files[0]) {
        if (input.files[0].type.startsWith('video/') && input.files[0].size > 5242880) {
          Swal.fire('Your video is too large', 'Please upload an video that is less than 5MB.', 'info');
          return;
        } else if (input.files[0].type.startsWith('image/') && input.files[0].size > 520000) {
          Swal.fire('Your image is too large', 'Please upload an image that is less than 500Kb.', 'info');
          return;
        }
        const reader = new FileReader();
        const app = this;
        reader.readAsDataURL(input.files[0]); // convert to base64 string
        reader.onload = function (e) {
          // app.block.data.value = e.target.result;
          app.$store.commit('builder/SET_DATA', {
            key: `imageBlocks.imageOverlay${app.displayType}.data.value`,
            value: e.target.result,
          });
          app.$forceUpdate();
        };
      }
    },
    removeImage() {
      this.$store.commit('builder/SET_DATA', {
        key: `imageBlocks.imageOverlay${this.displayType}.data.value`,
        value: '',
      });
      this.$forceUpdate();
    },
    toogleThankYou() {
      this.isShowThankYou = !this.isShowThankYou;
      this.$store.commit('builder/SET_DATA', {
        key: 'currentSelectEdit',
        value: '',
      });
    },
    onRemoveBlockThankyou(index) {
      this.listBlockThankyou.splice(index, 1);
      this.$store.commit('builder/SET_DATA', {
        key: 'currentSelectEdit',
        value: '',
      });
    },
  },
};
</script>

<style lang="scss"></style>
