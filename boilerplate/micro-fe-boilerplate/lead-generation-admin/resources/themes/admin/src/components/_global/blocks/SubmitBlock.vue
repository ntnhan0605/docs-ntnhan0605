<template>
  <div v-if="block && block.data" class="cursor-pointer le-submit-block" :class="{'mark-error-value': !block.data.value, 'newbuilder-selected': currentSelectEdit == portalID }">
    <!-- <div @click="emitSelect" class="margin-y-sm le-builder-term-text text-sm cursor-pointer">
      <input class="align-middle mr-1" type="checkbox" checked readonly />
      {{ block.data.text }}
      <b class="color-primary">{{ block.data.text2}}</b>
    </div> -->
    <div>
      <button @click="emitSelect" class="le-builder-submit-btn">{{ block.data.value }}</button>
    </div>

    <portal :to="portalID">
      <div class="padding-sm">
        <div class="mb-1 text-sm color-primary">Button Content</div>
        <input class="le-input-builder" v-model="block.data.value" placeholder="Button Content" type="text" />
      </div>
      <!-- <div class="padding-sm">
        <div class="mb-1 text-sm color-primary">Text 1</div>
        <input class="le-input-builder" v-model="block.data.text" type="text" />
      </div>
      <div class="padding-sm">
        <div class="mb-1 text-sm color-primary">Text 2</div>
        <input v-if="block.data" class="le-input-builder" v-model="block.data.text2" type="text" />
      </div>
      <div class="padding-sm">
        <div class="mb-1 text-sm color-primary">URL</div>
        <input class="le-input-builder" v-model="block.data.url" type="text" />
      </div> -->
      <div v-if="!isStatic" class="padding-sm">
        <button @click="emitRemove" class="le-builder-remove-btn">
          <img width="12" src="/img/icons/delete.svg" alt /> Remove
        </button>
      </div>

      <div v-if="canHide" class="padding-sm">
        <button @click="emitHide('SubmitBlock')" class="le-builder-remove-btn">
          <img width="12" src="/img/icons/delete.svg" alt /> Remove
        </button>
      </div>
    </portal>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import { blockMixin } from './blockMixin';
export default {
  props: ['index', 'block', 'is-static', 'can-hide'],
  data() {
    return {
      portalID: 'submitBlock-' + uuidv4(),
    };
  },
  mixins: [blockMixin],
  methods: {},
};
</script>

<style lang="scss">
.le-builder-submit-btn {
  padding: 8px 10px;
  border-radius: 2px;
  background-color: #2c87f3;
  width: 100%;
  color: white;
  font-size: 16px;
  font-weight: 600;
  /* outline: 2px dashed #2c87f3; */
  border: 1px solid transparent;
}

.le-submit-block {
  border: 1px dashed transparent;
  &:hover {
    border: 1px dashed #2c87f3;
  }
}
</style>
