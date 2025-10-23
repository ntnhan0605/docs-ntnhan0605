<template>
  <div class="le-page">
    <nav class="le-fixed-topnav">
      <div class="height-100% padding-right-xl">
        <div class="grid items-center justify-end height-100%">
          <div class="col-content">
            <router-link to="/new-campaign">
              <button class="btn btn--primary font-normal shadow-md text-15" style="min-height: 45px;">New Campaign</button>
            </router-link>
          </div>
        </div>
      </div>
    </nav>
    <div class="padding-x-xl padding-y-md">
      <div class="flex">
        <div class="flex items-start">
          <div>
            <h1 class="padding-right-sm" style="max-width: 600px; color:#2c2c2c;">{{ campaign.name }}</h1>
            <p class="color-greyish margin-top-sm text-xs">Campaign ID: {{ campaign.id }} | Last edit: {{ formatDate(campaign.created_at) }}</p>
          </div>
          <img @click="editStatus(campaign)" class="cursor-pointer padding-top-sm margin-right-lg" v-if="campaign.status == 1" src="/img/icons/status_active.svg" />
          <img @click="editStatus(campaign)" class="cursor-pointer padding-top-sm margin-right-lg" v-else src="/img/icons/status_inactive.svg" />
          <img class="padding-top-sm margin-right-lg" src="/img/icons/mobile.svg" />
        </div>
        <div class="color-label text-15 padding-top-sm">
          <div class="flex items-start">
            <p class="margin-left-0 nowrap">Type: Pop-up</p>
            <!-- <div class="margin-left-lg cursor-pointer hover-opacity flex items-center">
              <img width="22" src="/img/icons/download.svg" />
              <span class="padding-x-sm">Download</span>
            </div>-->
            <div @click="goEdit" class="margin-left-lg cursor-pointer hover-opacity flex items-center">
              <img width="18" src="/img/icons/edit.svg" />
              <span class="padding-x-sm">Edit</span>
            </div>
            <div @click="deleteCampaign" class="margin-left-lg cursor-pointer hover-opacity flex items-center">
              <img width="18" src="/img/icons/delete.svg" />
              <span class="padding-x-sm">Delete</span>
            </div>
          </div>
        </div>
      </div>

      <div class="grid padding-left-0">
        <div class="col-4 padding-left-0">
          <div class="flex justify-between padding-top-xs">
            <div>
              <p class="font-semibold">Impressions</p>
              <h1 class="text-center font-semibold">{{ campaign.total_impression || 0 }}</h1>
            </div>
            <div>
              <p class="font-semibold">Leads</p>
              <h1 class="text-center font-semibold">{{ campaign.total_lead || 0 }}</h1>
            </div>
            <div>
              <p class="font-semibold">Conversion Rate</p>
              <h1 class="text-center font-semibold">{{ getConversionRate(campaign) }} %</h1>
            </div>
          </div>
          <div class="flex items-start margin-top-md">
            <div class="text-sm font-semibold">Sites</div>
            <div class="padding-x-sm">
              <div v-for="(link, index) in campaign.targets" :key="'linkkey'+index" class="text-sm">
                <a :href="link.target" target="blank">{{ link.target }}</a>
              </div>
            </div>
          </div>
        </div>
        <div class="col-8">
          <div class="padding-left-md">
            <v-data-table :loading="loadingTable" fixed-header hide-default-footer :headers="headers" :height="550" :items="listLead" item-key="id" :show-select="false" class="le-table le-scrollbar"></v-data-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ROUTER } from '../constants/router-constant';
import Api from '../api';
import { API_PATH, API_STATUS } from '../constants/api-constants';
import { CAMPAIGN_STATUS } from '../constants/app-constants';
export default {
  data() {
    return {
      lead: {},
      campaign: {},
      listLead: [],
      loadingTable: false,
      headers: [
        { text: '#', value: 'index', class: '', width: 120 },
        { text: 'Name', value: 'name', class: '', width: 120 },
        { text: 'Email', value: 'name', class: '', width: 120 },
        { text: 'Phone', value: 'name', class: '', width: 120 },
        { text: 'Date', value: 'name', class: '', width: 120 },
      ],
    };
  },
  beforeMount() {
    this.getDetails();
  },
  methods: {
    getDetails() {
      const id = this.$route.params.id;
      Api.get(API_PATH.CAMPAIGN + '/' + id).then((res) => {
        if (res.data._status == API_STATUS.SUCCESS) {
          const data = res.data._data;
          console.log(`beforeMount -> data`, data);
          const { lead = {}, campaign = {} } = data;
          this.lead = lead;
          this.campaign = campaign;
        }
      });
    },
    goEdit() {
      const id = this.$route.params.id;
      this.$router.push({ name: ROUTER.EDIT_CAMPAIGN.name, params: { id } });
    },
    getConversionRate(item) {
      return item.total_impression
        ? Number((item.total_lead / item.total_impression) * 100).toFixed(2)
        : 0;
    },
    formatDate(date) {
      return moment(moment.utc(date).toDate())
        .local()
        .format('YYYY-MM-DD HH:mm:ss');
    },
    editStatus(item) {
      const data = {
        status:
          item.status === CAMPAIGN_STATUS.STATE_ACTIVE
            ? CAMPAIGN_STATUS.STATE_INACTIVE
            : CAMPAIGN_STATUS.STATE_ACTIVE,
      };
      Api.put(API_PATH.CAMPAIGN + '/' + item.id + '?_status=1', data).then(
        (res) => {
          this.getDetails();
        },
      );
    },
    deleteCampaign() {
      Swal.fire({
        title: 'Are you want delete?',
        text: "You won't be able to revert this!",
        icon: 'question',
        showCancelButton: true,
      }).then((result) => {
        if (result.value) {
          const id = this.$route.params.id;
          Api.delete(API_PATH.CAMPAIGN + '/' + id).then((res) => {
            this.$notify({
              title: 'Campaign has been deleted!',
              type: 'success',
            });
            this.$router.push('/');
          });
        }
      });
    },
  },
};
</script>

<style>
</style>
