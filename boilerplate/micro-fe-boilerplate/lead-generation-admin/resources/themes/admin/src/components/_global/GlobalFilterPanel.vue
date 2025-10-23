<template>
  <div>
    <button @click="isShow = !isShow" class="le-button-search color-white padding-x-sm mr-3 d-flex items-center">
      <v-icon style="margin-top: 2px;" class="text-lg adding-bottom-xxxxs" color="white">mdi-magnify</v-icon>
      <span v-if="listFilterEmited.length" class="ml-1">( {{ listFilterEmited.length }} filter{{listFilterEmited.length>1?'s':''}} )</span>
    </button>
    <div v-show="isShow">
      <div class="absolute" style="top:  65px;left:var(--le-sidebar-filter-width);width: 100%">
        <div class="le-filter-panel-box">
          <div class="d-flex">
            <button @click="mode = 'name'" :class="{'le-active': isMode('name')}" class="le-btn-panel mr-1">by Name</button>
            <button @click="mode = 'link'" :class="{'le-active': isMode('link')}" class="le-btn-panel mr-1">by Link</button>
            <button @click="mode = 'tag'" :class="{'le-active': isMode('tag')}" class="le-btn-panel">by Tag</button>
          </div>

          <div style="max-width: 1280px" class="flex">
            <div class="padding-right-xl" style="flex: 1; border-right: 1px solid #c2c2c2;">
              <div v-show="isMode('name')">
                <div class="d-flex mt-2">
                  <v-text-field :append-icon="filter.name ? 'mdi-close' : ''" @click:append="filter.name = ''" v-model="filter.name" placeholder="Input name" class="le-search-panel" hide-details solo></v-text-field>
                  <button @click="emitApply" class="le-search-panel-btn">Search</button>
                </div>
              </div>

              <div v-show="isMode('link')">
                <div class="d-flex mt-2">
                  <v-text-field :append-icon="filter.link ? 'mdi-close' : ''" @click:append="filter.link = ''" v-model="filter.link" placeholder="Input link" class="le-search-panel" hide-details solo></v-text-field>
                  <button @click="emitApply" class="le-search-panel-btn">Search</button>
                </div>
              </div>

              <div v-show="isMode('tag')">
                <div class="d-flex mt-2">
                  <v-text-field @keypress.enter="addTag" v-model="inputTag" placeholder="Input tag" class="le-search-panel" hide-details solo></v-text-field>
                  <button @click="addTag" class="le-search-panel-btn">Add</button>
                </div>
              </div>

              <div class="margin-y-lg d-flex">
                <div class="mr-3">
                  <vc-date-picker :locale="{ id: 'en', firstDayOfWeek: 2, masks: { weekdays: 'WWW' } }" v-model="filter.startDate" :popover="{ placement: 'bottom-start', visibility: 'click' }">
                    <div class="d-flex">
                      <button class="le-date-btn">
                        <img width="12" src="/img/date.png" alt />
                        <span>Start Date</span>
                      </button>
                    </div>
                  </vc-date-picker>
                  <v-btn title="Click to clear" :ripple="false" small @click="filter.startDate = '',filter.endDate = ''" v-if="filter.startDate" icon class="ml-1">
                    <v-icon color="grey lighten-1">mdi-close</v-icon>
                  </v-btn>
                </div>

                <div>
                  <vc-date-picker :min-date="filter.startDate" :locale="{ id: 'en', firstDayOfWeek: 2, masks: { weekdays: 'WWW' } }" v-model="filter.endDate" :popover="{ placement: 'bottom-start', visibility: 'click' }">
                    <div class="d-flex">
                      <button class="le-date-btn">
                        <img width="12" src="/img/date.png" alt />
                        <span>End Date</span>
                      </button>
                    </div>
                  </vc-date-picker>
                  <v-btn title="Click to clear" :ripple="false" small @click="filter.endDate = ''" v-if="filter.endDate" icon class="ml-1">
                    <v-icon color="grey lighten-1">mdi-close</v-icon>
                  </v-btn>
                </div>
              </div>

              <div>
                <v-menu :close-on-content-click="false" open-on-hover content-class="le-panel-menu" offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn class="le-panel-dropdown-btn mr-1" large :elevation="0" :ripple="false" v-bind="attrs" v-on="on">
                      <span class="margin-right-xl">Status</span>
                      <v-icon>mdi-menu-down</v-icon>
                    </v-btn>
                  </template>
                  <div class="padding-y-sm padding-x-sm">
                    <v-checkbox :ripple="false" v-for="item in statusOptions" :key="item.text" class="le-panel-select" dense hide-details v-model="filter.listStatus" :label="item.text" :value="item"></v-checkbox>
                  </div>
                </v-menu>

                <v-menu :close-on-content-click="false" open-on-hover content-class="le-panel-menu" offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn class="le-panel-dropdown-btn mr-1" large :elevation="0" :ripple="false" v-bind="attrs" v-on="on">
                      <span class="margin-right-xl">Device</span>
                      <v-icon>mdi-menu-down</v-icon>
                    </v-btn>
                  </template>
                  <div class="padding-y-sm padding-x-sm">
                    <v-checkbox :ripple="false" v-for="item in deviceOptions" :key="item.text" class="le-panel-select" dense hide-details v-model="filter.listDevice" :label="item.text" :value="item"></v-checkbox>
                  </div>
                </v-menu>

                <v-menu :close-on-content-click="false" open-on-hover content-class="le-panel-menu" offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn class="le-panel-dropdown-btn mr-1" large :elevation="0" :ripple="false" v-bind="attrs" v-on="on">
                      <span class="margin-right-xl">Type</span>
                      <v-icon>mdi-menu-down</v-icon>
                    </v-btn>
                  </template>
                  <div class="padding-y-sm padding-x-sm">
                    <v-checkbox :ripple="false" v-for="item in typeOptions" :key="item.text" class="le-panel-select" dense hide-details v-model="filter.listType" :label="item.text" :value="item"></v-checkbox>
                  </div>
                </v-menu>
              </div>
            </div>

            <div class="padding-left-xl" style="flex: 1; max-height: 350px; overflow: auto;">
              <div class="mb-2">
                <b>Name:{{" "}}</b>
                <span v-if="!filter.name">
                  <!-- (no value) -->
                </span>
                {{ filter.name }}
              </div>
              <div class="mb-2">
                <b>Link:{{" "}}</b>
                <span v-if="!filter.link">
                  <!-- (no value) -->
                </span>
                {{ filter.link }}
              </div>
              <div class="mb-2">
                <div>
                  <b>Tags:{{" "}}</b>
                  <span v-if="filter.listTag && !filter.listTag.length">
                    <!-- (no value) -->
                  </span>
                </div>
                <div v-if="filter.listTag && filter.listTag.length" class="d-flex flex-wrap mt-2">
                  <div class="le-panel-tag-btn" v-for="(tag, indexTag) in filter.listTag" :key="'tag-'+indexTag">
                    <button title="Click to remove" @click="removeTag(indexTag)">✕</button>
                    <div>{{tag}}</div>
                  </div>
                </div>
              </div>

              <div class="mb-2">
                <b>Start date:{{" "}}</b>
                <span v-if="!filter.startDate">
                  <!-- (no value) -->
                </span>
                {{ formartDate(filter.startDate) }}
              </div>
              <div class="mb-2">
                <b>End date:{{" "}}</b>
                <span v-if="!filter.endDate">
                  <!-- (no value) -->
                </span>
                {{ formartDate(filter.endDate) }}
              </div>
              <div class="mb-2">
                <b>Status:{{" "}}</b>
                <span v-if="!filter.listStatus.length">
                  <!-- (no value) -->
                </span>
                {{ filter.listStatus.map(i=>i.text).toString().split(",").join(", ") }}
              </div>
              <div class="mb-2">
                <b>Device:{{" "}}</b>
                <span v-if="!filter.listDevice.length">
                  <!-- (no value) -->
                </span>
                {{ filter.listDevice.map(i=>i.text).toString().split(",").join(", ") }}
              </div>

              <div class="mb-2">
                <b>Type:{{" "}}</b>
                <span v-if="!filter.listType.length">
                  <!-- (no value) -->
                </span>
                {{ filter.listType.map(i=>i.text).toString().split(",").join(", ") }}
              </div>
              <!-- <details>
                <pre>{{ filterHasValue }}</pre>
              </details>-->
            </div>
          </div>

          <div style="max-width: 1280px;" class="d-flex justify-center mt-5">
            <button @click="isShow = false" class="le-panel-btn-cancel">CANCEL</button>
            <button @click="emitApply" class="le-panel-btn-apply">APPLY</button>
            <!-- <button @click="reset" class="le-panel-btn-reset">RESET</button> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
      mode: 'name',
      inputTag: '',
      listFilterEmited: [],
      filter: {
        name: '',
        listTag: [],
        link: '',
        listType: [],
        startDate: '',
        endDate: '',
        listDevice: [],
        listStatus: [],
      },
      deviceOptions: [
        {
          text: 'Desktop',
          value: 2,
        },
        {
          text: 'Mobile',
          value: 1,
        },
      ],
      statusOptions: [
        {
          text: 'Active',
          value: 1,
        },
        {
          text: 'Inactive',
          value: -1,
        },
        {
          text: 'Scheduled',
          value: 0,
        },
        {
          text: 'Expired',
          value: 3,
        },
        {
          text: 'A/B Testing',
          value: 4,
        },
      ],
      typeOptions: [
        {
          value: 1,
          text: 'Lightbox A',
        },
        {
          value: 2,
          text: 'Lightbox B',
        },
        {
          value: 3,
          text: 'Floating bar',
        },
        {
          value: 4,
          text: 'Fullscreen',
        },
        {
          value: 5,
          text: 'Inline A',
        },
        {
          value: 6,
          text: 'Inline B',
        },
        {
          value: 7,
          text: 'Slider',
        },
        {
          value: 8,
          text: 'Sidebar',
        },
        {
          value: 9,
          text: 'Tab',
        },
        {
          value: 10,
          text: 'Skin A',
        },
        {
          value: 11,
          text: 'Skin B',
        },
        {
          value: 12,
          text: 'Center Tab',
        },
      ],
    };
  },
  computed: {
    filterHasValue() {
      return _.values(
        _.omitBy(this.filter, (v) => _.isEmpty(v) && !_.isDate(v)),
      );
    },
  },
  methods: {
    isMode(m) {
      return this.mode == m;
    },
    emitApply() {
      this.isShow = false;
      this.listFilterEmited = _.cloneDeep(this.filterHasValue);
      this.$emit('applyFilter', _.cloneDeep(this.filter));
    },
    formartDate(date) {
      if (!date) return;
      return moment(date).format('MMM DD, YYYY');
    },
    reset() {
      this.listFilterEmited = [];
      this.mode = 'name';
      this.inputTag = '';
      this.filter = {
        name: '',
        listTag: [],
        link: '',
        startDate: '',
        endDate: '',
        listDevice: [],
        listStatus: [],
      };
    },
    addTag() {
      if (!this.inputTag.trim()) {
        this.inputTag = '';
        return;
      }
      this.filter.listTag.push(this.inputTag);
      this.inputTag = '';
    },
    removeTag(index) {
      this.filter.listTag.splice(index, 1);
    },
  },
};
</script>

<style lang="scss">
.le-filter-panel-box {
  overflow-y: auto;
  overflow-x: hidden;
  padding: 20px 40px;
  box-shadow: -8px 10px 15px 0px rgba(0, 0, 0, 0.15),
    inset 0px 10px 8px -2px rgba(0, 0, 0, 0.075);
  background-color: #f5f5f5;
}
.le-btn-panel {
  font-size: 13px;
  color: white;
  padding: 7px 10px;
  border-radius: 3px;
  background-color: #e5e5e5;
  color: #707070;
  &.le-active {
    color: white;
    background: #0a54ae;
  }
}

.le-search-panel {
  border-radius: 0;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  .v-input__slot {
    box-shadow: none !important;
  }
}
.le-search-panel-btn {
  color: white;
  background: #0a54ae;
  padding: 0 20px;
  font-size: 14px;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
}
.le-panel-btn-apply {
  background-color: #2c87f3;
  color: #fff;
  border: solid 1px #2c87f3;
  min-width: 150px;
  padding: 10px 30px;
  margin: 0 5px;
  border-radius: 4px;
  font-weight: bold;
}
.le-panel-btn-cancel {
  color: #707070;
  border: solid 1px #707070;
  min-width: 150px;
  padding: 10px 30px;
  margin: 0 4px;
  border-radius: 4px;
  font-weight: bold;
}
.le-panel-btn-reset {
  color: #707070;
  border: solid 1px #707070;
  min-width: 150px;
  padding: 10px 30px;
  margin: 0 5px;
  border-radius: 4px;
  font-weight: bold;
}
.le-date-btn {
  background: #fff;
  padding: 12px 15px 12px 15px;
  font-size: 13px;
  color: #0a54ae;
  display: flex;
  border-radius: 3px;
  user-select: none;

  img {
    margin-top: 2px;
    margin-right: 10px;
  }
}
.le-panel-dropdown-btn {
  background: #0a54ae !important;
  color: white !important;
  text-transform: none !important;
  font-size: 13px !important;
  padding: 0 20px !important;
  padding-right: 5px !important;
}
.le-panel-select {
  margin-top: 2px !important;
  label {
    font-size: 13px !important;
    font-weight: 600 !important;
  }
}

.le-panel-menu {
  background: #fff !important;
  overflow: hidden;
}
.le-panel-tag-btn {
  border-radius: 3px;
  border: solid 1px #7fc4fd;
  background-color: #bce0fd;
  margin-right: 10px;
  margin-bottom: 10px;

  display: flex;
  align-items: center;
  color: #2699fb;
  font-size: 13px;
  button {
    padding: 3px 7px;
    border-right: 1px solid #7fc4fd;
  }
  div {
    padding: 0 10px;
  }
}
</style>
