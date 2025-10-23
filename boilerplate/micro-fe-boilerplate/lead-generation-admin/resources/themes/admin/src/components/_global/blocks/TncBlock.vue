<template>
  <div>
    <div @click="emitSelect" class="text-tnc-block flex justify-between pr-3"
      :class="{ 'mark-error-value': !block.data.value, 'newbuilder-selected': currentSelectEdit == portalID }">
      <div class="flex align-center margin-y-sm le-builder-term-text text-sm cursor-pointer">
        <input class="align-middle mr-1" type="checkbox" checked readonly />
        <p v-html="block.data.valueHTML" class="mb-0"></p>
      </div>
      <button class="le-block-btn-delete" @click="emitRemove" style="padding-top: 4px;">
        <img width="12" src="/img/icons/delete.svg" alt />
      </button>
    </div>
    <div>
      <portal :to="portalID">
        <div class="padding-sm padding-bottom-0">
          <div class="mb-1 text-sm">Value</div>
          <div>
            <textarea class="le-input-builder" :class="{ ['error-border']: !block.data.value }"
              v-model.trim="block.data.value" />
          </div>
        </div>
        <div class="padding-sm">
          <div class="mb-1 text-sm">URLs</div>
          <textarea class="le-input-builder" v-model="block.data.placeholder"
            placeholder="Press enter to input multiple URLs" />
        </div>
        <div class="padding-sm pb-0 text-left flex gap-xs align-items-center">
          <div class="mb-1 text-sm">Required</div>
          <v-checkbox v-model="block.data.required" class="mt-0 mb-0 pt-0"></v-checkbox>
        </div>
        <div class="padding-sm" v-show="isShowFinalResult">
          <div class="mb-1 text-sm">Final Result</div>
          <textarea class="le-input-builder" ref="refValueHTML" v-model="block.data.valueHTML" type="text" />
        </div>
        <div v-if="!isStatic" class="padding-sm">
          <button @click="emitRemove" class="le-builder-remove-btn">
            <img width="12" src="/img/icons/delete.svg" alt /> Remove
          </button>
        </div>
      </portal>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import { blockMixin } from './blockMixin';

export default {
  props: ['index', 'block', 'is-static'],
  data() {
    return {
      portalID: 'TncBlock-' + uuidv4(),
    };
  },
  mixins: [blockMixin],
  methods: {
    replaceTermsWithLinks: function (inputString, urls) {
      try {
        if (inputString.includes('*')) {
          let index = 0
          const regex = /\*(.*?)\*/g;
          return inputString.replace(regex, (match, term) => {
            const currentUrl = urls[index]
            if (index >= 0 && index < urls.length) {
              index++
              return `<a href="${currentUrl}" target="_blank" rel="noopener noreferrer">${term}</a>`;
            } else {
              return match;
            }
          });
        } else {
          return inputString;
        }
      } catch (err) {
        console.log('Error replaceTermsWithLinks', err)
        return inputString
      }
    }
  },
  computed: {
    isShowFinalResult() {
      return window.location.hash.includes('editable=true')
    }
  },
  watch: {
    block: {
      handler: function (newBlock) {
        try {
          const newValue = newBlock.data.value
          const newUrls = newBlock.data.placeholder.split('\n')
          const newValueHTML = this.replaceTermsWithLinks(newValue, newUrls)

          const event = new Event('input')
          this.$refs.refValueHTML.value = newValueHTML
          this.$refs.refValueHTML.dispatchEvent(event)
        } catch (err) {
          console.log('Error Dispatch Event Value HTML', err)
        }
      },
      deep: true
    }
  }
};
</script>

<style></style>./TncBlock.vueimport { computed } from 'vue';
import { watch } from 'vue';
