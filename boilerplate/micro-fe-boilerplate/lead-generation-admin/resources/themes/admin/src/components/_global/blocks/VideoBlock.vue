<template>
  <div>
    <div @click="emitSelect">VideoBlock</div>
    <portal :to="portalID">
      <div class="padding-sm">
        <v-textarea dense hide-details v-model="block.data.value" label="Solo" placeholder="Placeholder" solo></v-textarea>
      </div>
      <div v-if="!isStatic" class="padding-sm padding-top-0">
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
      portalID: 'videoBlock-' + uuidv4(),
    };
  },
  mixins: [blockMixin],
  methods: {},
};
</script>

<style>
</style>
