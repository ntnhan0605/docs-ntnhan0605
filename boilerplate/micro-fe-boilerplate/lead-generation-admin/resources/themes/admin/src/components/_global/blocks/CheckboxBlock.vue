<template>
  <div>
    <div @click="emitSelect" class="cursor-grab le-hover-border" :class="{'mark-error-value': !block.data.value, 'newbuilder-selected': currentSelectEdit == portalID }">
      <div class="font-semibold my-2">{{ block.data.placeholder }}</div>
      <div>
        <div v-for="(i, index) in block.data.listQuestion" class="flex margin-bottom-xs" :key="portalID + '-question-' + index">
          <img src="/img/newbuilder/square.svg" class="mr-2" alt />
          {{ i.placeholder }}
        </div>
      </div>
    </div>
    <portal :to="portalID">
      <!-- Mailchimp  -->
      <!-- <div class="padding-sm padding-bottom-0">
        <div class=" text-sm">Send values to Mailchimp?</div>
        <label class="block" :for="'mailchimp-' + portalID">
          <input v-model="block.data.isSendMailChimp" type="checkbox" :id="'mailchimp-' + portalID" name="mail-chimp" />
        </label>
      </div> -->

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

      <div v-if="!isStatic" class="padding-sm">
        <button @click="emitRemove" class="le-builder-remove-btn">
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
  props: ['index', 'block', 'is-static'],
  data() {
    return {
      portalID: 'checkboxBlock-' + uuidv4(),
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
