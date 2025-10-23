<template>
  <div class="position-relative">
    <div @click="toggle" class="le-filter-toggle" title="Click to open filter">
      <v-icon :color="(site_ids && site_ids.length) ? 'primary': ''" class="text-base padding-bottom-0 mr-1">mdi-filter</v-icon>Site
      <span v-if="site_ids && site_ids.length">({{ site_ids.length == listSite.length ? 'All' : site_ids.length }})</span>
    </div>
    <div v-if="isShow" class="position-absolute le-filter-box" style="top:100%;right:0;z-index: 3;">
      <div class="animate__animated animate__fadeIn animate__faster">
        <div>
          <v-checkbox dense :input-value="site_ids && site_ids.length == listSite.length" @change="toggleCheckAll([...arguments, 'listSite','id','site_ids'])" class="le-checkbox-site le-checkbox-site--mini" label="All" hide-details></v-checkbox>
          <v-checkbox dense class="le-checkbox-site le-checkbox-site--mini" v-for="site in listSite" :key="name + '-' + site.id" v-model="site_ids" :label="site.description" :value="site.id" hide-details>
            <template v-slot:label>
              <div class="d-flex items-center justify-between pr-3" style="width: 225px;">
                <div style="flex: 0 0 auto;" class>{{ site.description }}</div>
                <img v-if="site.country_id" width="24" :src="'/img/country/square/'+ site.country_id + '.png'" alt />
              </div>
            </template>
          </v-checkbox>
        </div>
        <div class="mt-3 d-flex justify-between" style>
          <button @click="cancel" class="le-filter-btn le-filter-btn__cancel">Cancel</button>
          <button @click="emitApply" class="le-filter-btn le-filter-btn__save">Apply</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['listSite', 'name'],
  data() {
    return {
      isShow: false,
      site_ids: [],
    };
  },
  watch: {
    listSite: function (newVal, oldVal) {
      console.log('Prop listSite changed: ', newVal, ' | was: ', oldVal);
      if (newVal.length) {
        this.site_ids = newVal.map((i) => i.id);
      }
    },
  },
  methods: {
    toggleCheckAll(v) {
      let [isCheck, listName, valueKey, checkKey] = v;
      if (isCheck) {
        this[checkKey] = this[listName].map((i) => i[valueKey]);
      } else {
        this[checkKey] = [];
      }
    },
    toggle() {
      this.isShow = !this.isShow;
    },
    cancel() {
      this.isShow = false;
    },
    emitApply() {
      this.$emit('onApply', _.cloneDeep(this.site_ids));
      this.isShow = false;
    },
  },
};
</script>

<style lang="scss">
.le-filter-box {
  background: #fff;
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 10px;
}
.le-checkbox-site {
  &--mini {
    &.v-input--selection-controls {
      margin-top: 5px !important;
    }
  }
}
.le-filter-toggle {
  border: solid 1px #e4e4e4;
  padding: 8px 12px;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
  &:hover {
    opacity: 0.95;
  }
}
.le-filter-btn {
  flex: 1;
  margin: 5px;
  border-radius: 4px;
  padding: 10px 10px;
  text-align: center;
  font-weight: 600 !important;
  &__save {
    color: #ffffff;
    background-color: #2c87f3;
    border: solid 1px #2c87f3;
  }
  &__cancel {
    border: solid 1px #707070;
  }
  &:hover {
    opacity: 0.95;
  }
}
</style>
