<template>
  <div>
    <div @click="emitSelect" class="text-block" :class="{'mark-error-value': !block.data.value, 'newbuilder-selected': currentSelectEdit == portalID }">
      <div class="flex">
        <img src="/img/builder/date.svg" class="mr-2" alt />
        <div class="padding-right-xs">{{ block.data.placeholder }}</div>
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
            <input class="le-input-builder" :class="{ ['error-border']: !block.data.value }" v-model.trim="block.data.value" type="text" />
          </div>
        </div>
        <div class="padding-sm">
          <div class="mb-1 text-sm">Placeholder</div>
          <input class="le-input-builder" v-model="block.data.placeholder" type="text" />
        </div>
        <div class="padding-sm pb-0 text-left flex gap-xs align-items-center">
          <div class="mb-1 text-sm">Required</div>
          <v-checkbox v-model="block.data.required" class="mt-0 mb-0 pt-0"></v-checkbox>
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
      portalID: 'dateBlock-' + uuidv4(),
    };
  },
  mixins: [blockMixin],
  methods: {},
};
</script>

<style>
</style>
