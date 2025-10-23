<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="435px">
      <v-card class="le-select-modal-site">
        <v-card-title class="modal-title">
          <span class="headline">{{ title }} Campaign</span>
        </v-card-title>
        <v-card-text>
          <v-container fluid>
            <v-row>
              <v-col class="form-column" cols="12" md="12" sm="12">
                  <label class="form-label">Campaign name <span class="le-error-text">(*)</span></label>
                  <v-text-field
                    autofocus
                    :class="campaignError ? 'error-input' : ''"
                    :error="!!campaignError"
                    :error-messages="campaignError"
                    color="campaignError ? 'error' : 'success'"
                    outlined
                    required
                    :append-icon="campaignError ? 'mdi-close-circle' : ''"
                     @keyup.native="checkRequiredCampaignName"
                    v-model="campaignName"></v-text-field>
                  <div v-show="campaignError" class="le-error-text text-xs">{{campaignError}}</div>
              </v-col>
            </v-row>
            <v-row>
                <v-col class="form-column" cols="12" md="12" sm="12">
                    <label class="form-label">Site <span class="le-error-text">(*)</span></label>
                    <v-select
                      :class="siteError ? 'error-select' : ''"
                      :error="!!siteError"
                      :error-messages="siteError"
                      :items="sites"
                      color="siteError ? 'error' : 'success'"
                      placeholder="- Please select a site -"
                      outlined
                      required
                      :append-icon="siteError ? 'mdi-close-circle' : 'mdi-menu-down'"
                      v-on:change="checkRequiredSite"
                      v-model="site"
                      :disabled="title != 'Create'"
                    ></v-select>
                    <div v-show="siteError" class="le-error-text text-xs">{{siteError}}</div>
                </v-col>
            </v-row>
            <v-row>
                <v-col class="form-column" cols="12" md="12" sm="12">
                    <label class="form-label">Client <span class="le-error-text">(*)</span></label>
                    <v-select
                      :class="clientError ? 'error-select' : ''"
                      :error="!!clientError"
                      :error-messages="clientError"
                      :items="clients"
                      color="clientError ? 'error' : 'success'"
                      placeholder="- Please select a client -"
                      outlined
                      required
                      :append-icon="clientError ? 'mdi-close-circle' : 'mdi-menu-down'"
                      v-on:change="checkRequiredClient"
                      v-model="client"
                    ></v-select>
                    <div v-show="clientError" class="le-error-text text-xs">{{clientError}}</div>
                </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-text>
          <v-container>
              <v-row>
                  <v-col class="form-column d-flex justify-space-between" cols="12" md="12" sm="12">
                      <v-btn class="close-btn" @click.native="close" text>cancel</v-btn>
                      <v-btn class="create-btn" :class="isActiveButton" color="white" text @click="createCampaign">save</v-btn>
                  </v-col>
              </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import Api from '../../api';
import { API_PATH, API_STATUS } from '../../constants/api-constants';
import { LOCALSTORAGE } from '../../constants/app-constants';
import { ROUTER } from '../../constants/router-constant';
export default {
    props: {
      dialog: {
          default: false
      },
      title: {
          default: "Create"
      },
      campaignDetail: {
          type: Object,
          default: function () {
              return {
                  name: "",
                  site_id: "",
                  siteText: "",
                  client_id: "",
              }
          }
      }
    },
    data: () => ({
      sites: [],
      clients: [],
      campaignName: "",
      site: "",
      siteText: "",
      client: "",
      campaignError: "",
      siteError: "",
      clientError: "",
      campaign: {},
    }),
    computed: {
      isActiveButton: function() {
        return (this.campaignName && this.site && this.client) ? 'active-btn' : 'disabled-btn'
      }
    },
    beforeMount() {
      this.campaign = this.campaignDetail
      this.client = this.campaignDetail.client_id
      this.site = this.campaignDetail.site_id
      this.getSites()
    },
    methods: {
      close() {
        this.$emit('update:dialog', false);
        this.$emit('cancel-modal');
        this.resetData();
      },
      getSites() {
          Api.get(API_PATH.SITES)
          .then((res) => res.data)
          .then((res) => {
              if (res._status == 1) {
                  let data = res._data.models
                  this.sites = data.map((site) => ({
                      value: site.id,
                      text: site.name
                  }))
                  if (this.sites.length == 1) {
                      this.site = this.sites[0].value
                      this.getClients()
                  }
              }
          });
      },
      getClients() {
          Api.get(API_PATH.CLIENTS + '?site_ids=' + this.site + '&assigned=1')
          .then((res) => res.data)
          .then((res) => {
              if (res._status == 1) {
                  let data = res._data.models
                  this.clients = data.map((client) => ({
                      value: client.id,
                      text: client.name
                  }))
                  if (this.clients.length == 1) {
                      this.client = this.clients[0].value
                      this.clientError = ''
                  }
              }
          });
      },
      checkRequiredCampaignName(e) {
        this.campaignError = e.target.value != "" ? "" : "Campaign Name is required"
      },
      checkRequiredSite(e) {
        this.siteError = e != "" ? "" : "Site is required"
      },
      checkRequiredClient(e) {
        this.clientError = e != "" ? "" : "Client is required"
      },
      createCampaign() {
          if (this.isActiveButton == 'disabled-btn') {
            return
          }
          if (this.campaignName && this.site) {
              this.campaignError = ""
              this.siteError = ""
              this.siteText = this.sites.find(x => x.value == this.site).text
              // TODO: Check if duplicate campaign
              if (this.title == "Duplicate") {
                  // TODO: Call api
                  const dataPost = {
                    name: this.campaignName,
                    client_id: this.campaign.client_id,
                  }
                  Api.post(`${API_PATH.CAMPAIGN}/${this.campaign.id}/clone`, dataPost)
                  .then((res) => {
                    this.$emit('clickDuplicateButton');
                    this.resetData();
                  });
              } else {
                  this.$router.push({
                      name: ROUTER.NEW_CAMPAIGN.name,
                      query: {
                          campaignName: this.campaignName,
                          siteID: this.site,
                          siteURL: this.siteText,
                          clientID: this.client
                      }
                  });
              }
          } else {
              // TODO: Add notification here
              if (!this.campaignName) {
                  this.campaignError = "Campaign Name is required"
              }
              if (!this.site) {
                  this.siteError = "Site is required"
              }
              if (!this.client) {
                  this.clientError = "Client is required"
              }
          }
      },
      resetData() {
        this.campaignName = "";
      }
    },
    watch: {
      site: {
          handler: function() {
              this.getClients()
              if (this.site !== this.campaign.site_id) {
                this.client = ""
                this.campaign.client_id = ""
              }
              this.siteText = this.sites.find(x => x.value == this.site).text
              this.campaign.site_id = this.site
              this.campaign.siteText = this.siteText
          },
          deep:true
      },
      client: {
        handler: function() {
          if (this.client) {
            this.campaign.client = this.client
            this.campaign.client_id = this.client
          }
        },
        deep:true
      },
      campaignDetail: {
          handler: function() {
              this.campaign = _.cloneDeep(this.campaignDetail);
              if (this.title == "Duplicate") {
                  this.campaignName = this.campaign.name
                  this.site = this.campaign.site_id
                  this.siteText = this.campaign.siteText
                  this.client = this.campaign.client_id
              }
          },
          deep:true
      },
      campaign: {
          handler: function() {
              this.$emit('campaignDetailChange', this.campaign)
          },
          deep:true
      },
    }
}
</script>
