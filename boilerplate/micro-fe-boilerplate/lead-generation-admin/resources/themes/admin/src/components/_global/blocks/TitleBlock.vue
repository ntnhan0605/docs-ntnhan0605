<template>
  <div class="padding-y-xs">
    <div @click="emitSelect" class="title-block cursor-pointer" :class="{ 'mark-error-value': !block.data.value, 'newbuilder-selected': currentSelectEdit == portalID }">
      <h1 contenteditable="false" :class="'text-' + block.data.align" class="le-builder-title">{{ block.data.value }}</h1>
      <div>
        <portal :to="portalID">
          <div class="padding-sm">
            <div class="mb-1 text-sm">Value</div>
            <textarea rows="5" class="le-builder-textarea" v-model="block.data.value"></textarea>
          </div>
          <!-- Align -->
          <div class="padding-sm flex justify-between text-center">
            <label class="le-align-radio" for="align-left">
              <input v-model="block.data.align" type="radio" name="align" value="left" id="align-left" />
              <div class="le-align-text">
                <img src="/img/newbuilder/a-left.svg" alt />
              </div>
              <div class="mt-1 text-sm le-align-label-text">Left</div>
            </label>
            <label class="le-align-radio" for="align-center">
              <input v-model="block.data.align" type="radio" name="align" value="center" id="align-center" />
              <div class="le-align-text">
                <img src="/img/newbuilder/a-center.svg" alt />
              </div>
              <div class="mt-1 text-sm le-align-label-text">Center</div>
            </label>
            <label class="le-align-radio" for="align-right">
              <input v-model="block.data.align" type="radio" name="align" value="right" id="align-right" />
              <div class="le-align-text">
                <img src="/img/newbuilder/a-right.svg" alt />
              </div>
              <div class="mt-1 text-sm le-align-label-text">Right</div>
            </label>
          </div>

          <div v-if="!isStatic" class="padding-sm padding-top-lg">
            <button @click="emitRemove(isThankyou)" class="le-builder-remove-btn"><img width="12" src="/img/icons/delete.svg" alt /> Remove</button>
          </div>
        </portal>
      </div>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import { blockMixin } from './blockMixin';

export default {
  props: ['index', 'block', 'is-static', 'is-thankyou'],
  data() {
    return {
      portalID: 'titleBlock-' + uuidv4(),
    };
  },
  mixins: [blockMixin],
  methods: {},
};
</script>

<style lang="scss">
.le-builder-title {
  font-size: 20px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.05;
  letter-spacing: normal;
  color: #2a4975;
  border: 1px dashed #e9e9e9;
  padding: 5px;
  margin: 0;

  &:hover {
    border: 1px dashed #7db6f7;
  }
}

.le-align-text {
  padding: 17px;
  background: #fff;
  border: solid 1px #c6c6c6;
  &:hover {
    border: 1px solid #7db6f7;
  }
}

.le-align-radio {
  cursor: pointer;
  input[type='radio'] {
    display: none;
    &:checked ~ .le-align-text {
      border: 1px solid #7db6f7;
    }
    &:checked ~ .le-align-label-text {
      color: #2c87f3;
    }
  }
}
</style>
