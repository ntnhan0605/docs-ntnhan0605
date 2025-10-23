<template>
  <div class="relative d-flex justify-end items-center">
    <div class="le-date-range-box d-flex">
      <div style="border-right: 1px solid #e4e4e4; padding: 10px 20px 10px 0;" class="d-flex items-center text-sm">
        <img class="mr-2" width="12" src="/img/date.png" alt />
        Custom
      </div>
      <div style="padding: 5px 10px;" class>
        <input placeholder="Select day filter ..." style="width: 190px;" @click="isShowExtra = !isShowExtra" :value="dateShow" readonly class="cursor-pointer le-date-range-input" type="text" />
        <v-icon style="position: absolute; right: 4px">mdi-menu-down</v-icon>
      </div>
    </div>
    <div v-if="isShowExtra" class="absolute" style="top:calc(100% + 5px);right:0; z-index: 4; height: 269px; background: white;box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.2);border-radius: 4px;">
      <div class="d-flex">
        <div class="padding-sm padding-right-lg" style="border-right: 1px solid #ddd;">
          <div class="text-sm color-primary mb-2 font-semibold">Custom</div>
          <div class="text-sm">
            <div class="mb-1">
              <button @click="setDate('clear'), selected = ''">None</button>
            </div>
            <div class="mb-1">
              <button :class="{'text-underline': selected == 'today'}" @click="setDate('today'), selected = 'today'">Today</button>
            </div>
            <div class="mb-1">
              <button :class="{'text-underline': selected == 'yesterday'}" @click="setDate('subtract', 1, 'day'), selected = 'yesterday'">Yesterday</button>
            </div>
            <div class="mb-1">
              <button :class="{'text-underline': selected == 'this-week'}" @click="setDate('this-week'), selected = 'this-week'">This week</button>
            </div>
            <div class="mb-1">
              <button :class="{'text-underline': selected == 'last-week'}" @click="setDate('subtract', 7, 'day'), selected = 'last-week'">Last week</button>
            </div>
            <div class="mb-1">
              <button :class="{'text-underline': selected == 'last-14'}" @click="setDate('subtract', 14, 'days'), selected = 'last-14'">Last 14 days</button>
            </div>
            <div class="mb-1">
              <button :class="{'text-underline': selected == 'this-month'}" @click="setDate('this-month'), selected = 'this-month'">This month</button>
            </div>
            <div class="mb-1">
              <button :class="{'text-underline': selected == 'last-30'}" @click="setDate('subtract', 30, 'days'), selected = 'last-30' ">Last 30 days</button>
            </div>

            <div class="mb-1 mt-5">
              <button @click="isShowExtra = false">Close</button>
            </div>
          </div>
        </div>
        <div class="le-square-calendar">
          <!-- <pre>{{rangeDate}}</pre> -->
          <vc-date-picker ref="datePicker" :locale="{ id: 'en', firstDayOfWeek: 2, masks: { weekdays: 'WWW' } }" @input="inputDate" is-inline class="le-square-calendar" mode="range" :columns="2" v-model="rangeDate"></vc-date-picker>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: '',
      rangeDate: null,
      isShowExtra: false,
    };
  },
  computed: {
    dateShow(date) {
      if (!this.rangeDate) {
        return '';
      }
      return `${this.formatDate(this.rangeDate.start)} - ${this.formatDate(
        this.rangeDate.end,
      )} `;
    },
  },
  methods: {
    formatDate(date) {
      return moment(date).format('DD MMM, YYYY');
    },
    inputDate(v) {
      // console.log(`inputDate -> v`, v);
      this.selected = '';
      if (v) {
        this.rangeDate = {};
        this.rangeDate.start = v.start;
        this.rangeDate.end = v.end;
        this.isShowExtra = false;
        this.$nextTick(function () {
          // this.isShowExtra = true;
        });
        this.$emit('applyFilter', this.rangeDate);
      } else {
        this.rangeDate = null;
      }
    },
    setDate(type, dateType, value) {
      if (type == 'clear') {
        this.rangeDate = null;
      }
      if (type == 'today') {
        this.rangeDate = {};
        this.rangeDate.start = new Date();
        this.rangeDate.end = new Date();
      }
      if (type == 'subtract') {
        const filterDay = moment().subtract(value, dateType);
        this.rangeDate = {};
        this.rangeDate.start = filterDay.toDate();
        this.rangeDate.end = new Date();
      }
      if (type == 'this-week') {
        this.rangeDate = {};
        this.rangeDate.start = moment().startOf('isoWeek').toDate();
        this.rangeDate.end = moment().endOf('isoWeek').toDate();
      }
      if (type == 'this-month') {
        this.rangeDate = {};
        this.rangeDate.start = moment().startOf('month').toDate();
        this.rangeDate.end = moment().endOf('month').toDate();
      }
      this.isShowExtra = false;
      this.$nextTick(function () {
        // this.isShowExtra = true;
      });
      this.$emit('applyFilter', this.rangeDate);
    },
  },
};
</script>

<style lang="scss">
.le-date-range-box {
  border: solid 1px #e4e4e4;
  padding: 0 10px;
  border-radius: 4px;
  padding-right: 0;
}
.le-date-range-input {
  border-bottom: solid 1px #707070;
  font-size: 13px;
  padding-bottom: 2px;
  padding-right: 20px;
}

.le-square-calendar {
  .vc-rounded-lg {
    border-radius: 0 !important;
  }
  .vc-container {
    border: none !important;
  }
}
</style>
