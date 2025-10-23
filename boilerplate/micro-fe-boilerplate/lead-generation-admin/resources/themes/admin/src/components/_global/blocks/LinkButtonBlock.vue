<template>
  <div>
    <button @click="emitSelect" :class="{'size-sm': size == 'sm'}" class="le-builder-link-btn margin-y-xxxs">{{ block.data.value }}</button>
    <portal :to="portalID">
      <div class="padding-sm padding-bottom-0">
        <div class="mb-1 text-sm">Value</div>
        <div>
          <input class="le-input-builder" :class="{ ['error-border']: !block.data.value }" v-model.trim="block.data.value" type="text" />
        </div>
      </div>
      <div>
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
      <div v-if="!isStatic" class="padding-sm">
        <button @click="emitRemove(isThankyou)" class="le-builder-remove-btn">
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
  props: ['index', 'block', 'size', 'is-static', 'is-thankyou'],
  data() {
    return {
      portalID: 'linkBlock-' + uuidv4(),
      localValue: 'Join now',
    };
  },
  mixins: [blockMixin],
  methods: {},
};
</script>

<style lang="scss">
.le-builder-link-btn {
  padding: 8px 20px;
  border-radius: 2px;
  background-color: #2c87f3;
  width: 100%;
  color: white;
  font-size: 16px;
  font-weight: 600;
  /* outline: 2px dashed #2c87f3; */
  white-space: nowrap;
  border: 1px solid transparent;
  &:hover {
    border: 1px dashed white;
  }
  &.size-sm {
    padding: 5px 20px;
    font-size: 14px;
  }
}
</style>
