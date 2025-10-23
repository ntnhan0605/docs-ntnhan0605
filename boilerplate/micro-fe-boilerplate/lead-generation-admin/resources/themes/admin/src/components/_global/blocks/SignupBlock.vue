<template>
  <div>
    <div @click="emitSelect" class="cursor-pointer">
      <div>
        <img class="width-100%" src="/img/newbuilder/SignUpButtons.png" alt="">
      </div>
    </div>
    <portal :to="portalID">
      <div class="padding-sm">
        <input class="le-input-builder" v-model="block.data.value" type="text" />
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
      portalID: 'signupBlock-' + uuidv4(),
    };
  },
  mixins: [blockMixin],
  methods: {},
};
</script>

<style>
</style>
