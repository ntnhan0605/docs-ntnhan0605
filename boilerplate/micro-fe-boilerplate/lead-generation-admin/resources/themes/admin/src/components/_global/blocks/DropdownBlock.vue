<template>
  <div>
    <div @click="emitSelect" class="cursor-grab my-2 le-hover-border" :class="{'mark-error-value': !block.data.value, 'newbuilder-selected': currentSelectEdit == portalID }">
      <div class="font-semibold mb-2">{{ block.data.placeholder }}</div>
      <div class="le-newbuilder-select-wrapper">
        <select class="le-newbuilder-select" readonly>
          <option v-for="(i, index) in block.data.listQuestion" :value="i.placeholder" :key="portalID + '-question-select-' + index">{{i.placeholder}}</option>
        </select>
      </div>
    </div>

    <portal :to="portalID">
      <div class="padding-sm padding-bottom-0">
        <div class="mb-1 text-sm color-primary">Question</div>
      </div>
      <div class="padding-sm padding-bottom-0">
        <div class="mb-1 text-sm">Value (English only)</div>
        <div>
          <input class="le-input-builder" :class="{ ['error-border']: !block.data.value }" v-model.trim="block.data.value" type="text" />
        </div>
      </div>
      <div class="padding-sm">
        <div class="mb-1 text-sm">Placeholder</div>
        <div>
          <input class="le-input-builder" v-model="block.data.placeholder" type="text" />
        </div>
      </div>
      <div class="padding-sm pb-0 text-left flex gap-xs align-items-center">
        <div class="mb-1 text-sm">Required</div>
        <v-checkbox v-model="block.data.required" class="mt-0 mb-0 pt-0"></v-checkbox>
      </div>

      <div class="padding-sm padding-top-0">
        <section v-for="(i, index) in block.data.listQuestion" class :key="portalID + '-question-input-' + index">
          <div class="margin-bottom-sm text-sm color-primary flex justify-between items-center">
            <div>Answer {{ index + 1 }}</div>
            <button v-if="index > 1" @click="block.data.listQuestion.splice(index, 1)" title="Click to delete question">
              <img width="12" src="/img/icons/delete.svg" alt />
            </button>
          </div>

          <div class="padding-bottom-sm">
            <div class="mb-1 text-sm">Value (English only)</div>
            <div>
              <input class="le-input-builder" :class="{ ['error-border']: !i.value }" v-model="i.value" type="text" />
            </div>
          </div>
          <div class="padding-bottom-sm">
            <div class="mb-1 text-sm">Placeholder</div>
            <div>
              <input class="le-input-builder" v-model="i.placeholder" type="text" />
            </div>
          </div>
        </section>

        <div @click="pushQuestion(block.data.listQuestion)" title="Click to add new question" class="text-center le-add-list-btn">
          <img src="/img/newbuilder/add.svg" alt />
        </div>
      </div>

      <aside v-if="!isStatic" class="padding-sm">
        <button @click="emitRemove" class="le-builder-remove-btn">
          <img width="12" src="/img/icons/delete.svg" alt /> Remove
        </button>
      </aside>
    </portal>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import { blockMixin } from './blockMixin';
export default {
  props: ['index', 'block', 'is-static'],
  data() {
    return {
      portalID: 'dropdownBlock-' + uuidv4(),
    };
  },
  methods: {
    pushQuestion(list) {
      list.push({
        value: 'answer' + (list.length + 1),
        placeholder: 'Answer ' + (list.length + 1),
      });
    },
  },
  mixins: [blockMixin],
};
</script>

<style>
</style>
