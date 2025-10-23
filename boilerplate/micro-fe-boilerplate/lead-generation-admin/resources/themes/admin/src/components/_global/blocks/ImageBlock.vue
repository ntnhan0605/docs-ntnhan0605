<template>
  <div
      v-if="block && block.data" @click="emitSelect" :style="{ background : hideBackground ? 'transparent' : '#F5F5F5' }"
      class="relative cursor-pointer flex items-center justify-center width-100% "
      :class="{'height-100%': (!block.data.value ? true : !mobileAutoHeight) }"
  >
    <img 
      v-if="!isVideo"
      :class="{
        'object-cover': block.data.value && scale == 'cover',
        'width-100%': !sizeAuto,
        'height-100%': !sizeAuto || (!block.data.value ? true : !mobileAutoHeight),
      }" :src="block.data.value ? block.data.value: '/img/newbuilder/sampleImage.svg'" class="le-builder-image-block" alt />
    <video
      v-if="isVideo"
      :class="{
        'object-cover': block.data.value && scale == 'cover',
        'width-100%': !sizeAuto,
        'height-100%': !sizeAuto || (!block.data.value ? true : !mobileAutoHeight),
      }"
      class="le-builder-image-block"
      muted autoplay loop
    >
      <source :src="block.data.value" type="video/mp4">
    </video>
    <div v-if="placeholderSize && !block.data.value" class="absolute" :style="placeholderStyle? placeholderStyle: 'bottom: 20px;'">
      <div class="text-xs font-normal text-center color-black">
        Max 1MB
        <div>
          Recommended dimension
          <b class="color-primary">
            <a title="Click to open example image" target="_blank" :href="`https://dummyimage.com/${placeholderSize}/2C87F3/FFFFFF`">{{ placeholderSize }}</a>
          </b>
        </div>
      </div>
    </div>
    <portal :to="portalID">
      <div v-if="isLink">
        <div class="padding-sm padding-bottom-0">
          <div class="mb-1 text-sm">URL</div>
          <div>
            <input class="le-input-builder" v-model="block.data.url" type="url" placeholder="https://" />
          </div>
          <div class="mt-2">
            <label class="text-sm">
              <input checked v-model="block.data.newtab" style="vertical-align:middle;" class="mr-1" type="checkbox" name id /> Open URL in newtab
            </label>
          </div>
        </div>
      </div>
      <div class="mb-3">
        <div class="relative margin-top-md padding-sm padding-bottom-0 cursor-pointer">
          <button @click="emitRemove" class="le-builder-remove-btn">
            <img width="12" src="/img/newbuilder/upload.svg" alt /> Upload/ Replace
          </button>
          <input title="Click to upload image" @change="readURL($event)" class="absolute cursor-pointer" style="top:0;left:0; opacity: 0; width: 100%; height: 100%;" type="file" name accept="image/*, video/mp4" />
        </div>

        <div v-if="block.data.value" class="padding-sm padding-bottom-0">
          <button title="Click to remove uploaded image" @click="removeImage" class="le-builder-remove-btn">
            <img width="12" src="/img/icons/delete.svg" alt />
            Remove
          </button>
        </div>

        <div  v-if="placeholderSize && block.data.value" class="margin-top-sm">
          <div class="text-xs font-normal text-center color-black">
            Max 1MB
            <div>
              Recommended dimension
              <b class="color-primary">
                <a title="Click to open example image" target="_blank" :href="`https://dummyimage.com/${placeholderSize}/2C87F3/FFFFFF`">{{ placeholderSize }}</a>
              </b>
            </div>
          </div>
        </div>
      </div>
    </portal>
  </div>
</template>

<script>
import { blockMixin } from './blockMixin';

export default {
  props: [
    'index',
    'block',
    'scale',
    'size-auto',
    'hide-background',
    'is-static',
    'is-link',
    'placeholder-size',
    'placeholder-style',
    'mobile-auto-height',
  ],
  data() {
    return {
      portalID: 'imageBlock-' + Date.now(),
    };
  },
  mixins: [blockMixin],
  computed: {
    isVideo: function() {
      return this.block.data.value?.endsWith('.mp4') || this.block.data.value?.startsWith('data:video/mp4')
    }
  },
  methods: {
    //- UPLOAD IMAGE
    readURL(e) {
      const input = e.target;
      if (input.files && input.files[0]) {
        if (input.files[0].type.startsWith('video/') && input.files[0].size > 5242880) {
          Swal.fire('Your video is too large', 'Please upload an video that is less than 5MB.', 'info');
          return;
        } else if (input.files[0].type.startsWith('image/') && input.files[0].size > 1280000) {
          Swal.fire(
            'Your image is too large',
            'Please upload an image that is less than 1MB.',
            'info',
          );
          input.value = ""
          return;
        }
        const reader = new FileReader();
        const app = this;
        reader.readAsDataURL(input.files[0]); // convert to base64 string
        reader.onload = function (e) {
          app.block.data.value = e.target.result;
          app.$forceUpdate();
        };
      }
    },
    removeImage() {
      this.block.data.value = '';
      this.$forceUpdate();
    },
  },
};
</script>

<style lang="scss">
.le-builder-image-block {
  &:hover {
    border: 1px dashed #2699fb;
  }
}
</style>
