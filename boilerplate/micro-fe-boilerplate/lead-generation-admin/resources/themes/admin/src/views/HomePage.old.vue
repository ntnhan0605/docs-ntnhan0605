<template>
  <div class="le-page">
    <nav class="le-fixed-topnav">
      <div class="height-100% padding-right-xl">
        <div style="padding-left: var(--le-sidebar-filter-width)" class="d-flex items-center justify-between height-100%">
          <div class="text-lg padding-left-lg">Campaign</div>
          <div class="d-flex items-center">
            <GlobalFilterPanel @applyFilter="onApplyFilterPanel"></GlobalFilterPanel>
            <button @click="showSelectSiteModal = true" class="le-button padding-x-md"><v-icon class="text-md padding-bottom-xxxxs margin-right-xxs" color="white">mdi-plus</v-icon>New Campaign</button>
          </div>
        </div>
      </div>
    </nav>
    <GlobalFilterSideBar @applyFilter="onApplyFilterSideBar"></GlobalFilterSideBar>
    <div class="padding-lg padding-bottom-md">
      <div class="margin-y-md">
        <!-- // TODO: DATE range  -->
        <GlobalDateRangeFilter @applyFilter="onApplyFilterDateRange"></GlobalDateRangeFilter>
      </div>

      <LeSelectSiteModal :dialog.sync="showSelectSiteModal" :title="selectSiteModalTitle" @cancel-modal="cancelModal" :campaignDetail="duplicateCampaignDetail" @clickDuplicateButton="onClickDuplicateButton" />

      <!-- TABLE -->
      <div class="margin-top-md" style="position: relative">
        <v-menu offxet-y :close-on-content-click="false" :value="isShowCustomizeColumn" content-class="le-select-column le-mini-scrollbar" :transition="false">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="white" v-bind="attrs" v-on="on" id="le-select-column-btn" @click="isShowCustomizeColumn = true">
              <v-icon color="primary">mdi-plus</v-icon>
            </v-btn>
          </template>

          <v-list-item-group v-model="headerSettings" multiple>
            <div class="le-select-column-title">
              <h3>Customize columns</h3>
            </div>
            <div v-for="(item, index) in allHeaders" :key="`column-${index}`">
              <v-list-item v-if="item.text" v-show="index !== 0">
                <template v-slot:default="{ active }">
                  <v-list-item-action v-show="item.text">
                    <v-checkbox readonly :input-value="item.active" :disabled="index === 0"></v-checkbox>
                  </v-list-item-action>

                  <v-list-item-content v-show="item.text">
                    <v-list-item-title>{{ item.text }}</v-list-item-title>
                  </v-list-item-content>
                </template>
              </v-list-item>
            </div>
            <div class="le-button-group">
              <v-btn color="primary" @click="saveCustomizeColumn()">Save</v-btn>
              <v-btn @click="resetCustomizeColumn()">Cancel</v-btn>
            </div>
          </v-list-item-group>
        </v-menu>
        <!-- :options.sync="optionsTable" :server-items-length="pagination.total_items" -->
        <v-data-table bSortCellsTop :loading="loadingTable" height="720" fixed-header hide-default-footer :items-per-page="listCampaign ? listCampaign.length : 20" :headers="headers" :items="listCampaign" item-key="id" :show-select="false" class="le-table le-scrollbar">
          <template v-slot:body.prepend="{ headers }">
            <tr class="le-table-body-stats">
              <td :data-col="0" :colspan="1">
                <div class="text-md">Total ({{ tableStats.total_items }})</div>
              </td>
              <td :data-col="1" :colspan="1"></td>
              <td :data-col="2" :colspan="1"></td>
              <td :data-col="3" :colspan="1">
                <div class="text-center text-md font-bold">{{ formatNumber(tableStats.total_impressions) }}</div>
              </td>
              <td :data-col="4" :colspan="1">
                <div class="text-center relative">
                  <div class="text-md font-bold">{{ tableStats.average_conversion_rate.toFixed(2) }} %</div>
                  <div class="text-sm" style="color: #a3a3a3; position: absolute; top: 22px; left: 50%; transform: translateX(-50%)">Avg</div>
                </div>
              </td>
              <td :data-col="5" :colspan="1">
                <div class="text-center font-bold text-md">{{ formatNumber(tableStats.total_leads) }}</div>
              </td>
              <td :data-col="6" :colspan="1">
                <div class="text-center font-bold text-md">{{ formatNumber(tableStats.total_clicks) }}</div>
              </td>
              <td :data-col="7" :colspan="1">
                <div class="text-center font-bold text-md">{{ formatNumber(tableStats.total_submits) }}</div>
              </td>
              <td :data-col="8" :colspan="1"></td>
              <td :data-col="9" :colspan="1"></td>
              <td :data-col="10" :colspan="1"></td>
              <td :data-col="11" :colspan="1"></td>
              <td :data-col="12" :colspan="1"></td>
              <td :data-col="13" :colspan="1" class="hidden"></td>
              <td :data-col="14" :colspan="1" class="hidden">
                <div class="text-center font-bold text-md">{{ formatNumber(tableStats.total_visitors) }}</div>
              </td>
              <td :data-col="15" :colspan="1" class="hidden"></td>
              <td :data-col="16" :colspan="1" class="hidden">
                <div class="text-center font-bold text-md">{{ formatNumber(tableStats.total_habit_exits) }}</div>
              </td>
              <td :data-col="17" :colspan="1" class="hidden">
                <div class="text-center font-bold text-md">{{ formatNumber(tableStats.total_intentional_exits) }}</div>
              </td>
              <td :data-col="18" :colspan="1" class="hidden"></td>
            </tr>
          </template>

          <template v-slot:item.name="{ item }">
            <div class="le-table-name flex items-center padding-sm relative">
              <img v-if="pagination.items_per_page <= 7 && !item.image?.includes('.mp4')" class="le-table-img-preview" :src="item.image ? item.image : '/img/thumbnail.png'" alt />
              <video v-if="pagination.items_per_page <= 7 && item.image?.includes('.mp4')" class="le-table-img-preview" loop muted autoplay>
                <source :src="item.image" />
              </video>
              <div class="padding-left-sm">
                <router-link :to="{ name: 'EditCampaign', params: { id: item.id }, query: { siteID: item.site.id, siteURL: item.site.name } }">
                  <h1 :class="{ 'le-variant-color': [1, 2].includes(item.type) }" class="cursor-pointer color-primary text-md break-word" v-text="item.name"></h1>
                </router-link>
                <small style="max-width: 180px" class="color-gray-300 le-text-ellipsis" :title="getTargetLink(item)" v-text="getTargetLink(item)"></small>
                <small class="color-gray-300" v-text="'Code: ' + item.code"></small>
              </div>
              <div v-if="[1, 2].includes(item.type)" class="le-ab-icon absolute" title="A/B testing">A/B</div>
            </div>
          </template>

          <template v-slot:item.status="{ item }">
            <div class="text-sm">
              <div v-if="[0, 1].includes(item.type) && item.is_testing_running == 0" @click="editStatus(item)" class="le-table-status cursor-pointer">
                <img class="fill-height" v-if="item.formatted_status == 1" src="/img/icons/status_active.svg" alt />
                <img class="fill-height" v-if="item.formatted_status == -1" src="/img/icons/status_inactive.svg" alt />
              </div>

              <div class="le-ab-test-color">
                <div v-if="item.formatted_status == 4 && item.is_testing_running == 1"><img class="align-middle" style="margin-right: 2px" src="/img/icons/ab.svg" width="13" alt /> A/B Testing</div>
                <div v-if="item.type == 2">
                  <div v-if="item.formatted_status == 1">Active</div>
                  <div v-if="item.formatted_status == -1">Inactive</div>
                </div>
              </div>

              <div v-if="item.formatted_status == 0" class="le-scheduled-color"><img class="align-middle" src="/img/icons/scheduled.svg " style="margin-right: 2px" width="12" alt /> Scheduled</div>
              <div v-if="item.formatted_status == 3" class="le-expired-color"><img class="align-middle" src="/img/icons/expired.svg " style="margin-right: 2px" width="12" alt /> Expired</div>
            </div>
          </template>

          <template v-slot:item.device_type="{ item }">
            <div class="le-table-device text-center">
              <img title="Click to toggle filter performance" v-for="img in item.device_types" :class="{ 'cursor-pointer': true, 'le-device-disable': img.is_disabled }" @click="selectFilterDevice(item, img, $event)" class="mx-1 le-device-img-filter" :src="'/img/icons/device_' + img.id + '.svg'" :key="'image' + img.id" />
            </div>
          </template>

          <template v-slot:item.total_impression="{ item }">
            <div class="le-table-impression">{{ item.total_impression }}</div>
          </template>

          <template v-slot:item.conversion_rate="{ item }">
            <div class="le-table-conversion-rate">{{ item.conversion_rate }} %</div>
          </template>

          <template v-slot:item.total_lead="{ item }">
            <div class="le-table-lead">{{ item.total_lead }}</div>
          </template>

          <template v-slot:item.creator="{ item }">
            <div class="le-table-creator color-primary">{{ item.creator }}</div>
          </template>

          <template v-slot:item.created_at="{ item }">
            <div class="le-table-created-at" :title="getDateAgo(item.created_at)">{{ formatDate(item.created_at) }}</div>
          </template>

          <template v-slot:item.updated_at="{ item }">
            <div class="le-table-created-at" :title="getDateAgo(item.updated_at)">{{ formatDate(item.updated_at) }}</div>
          </template>

          <template v-slot:item.actions="{ item, index }">
            <div class="relative">
              <v-icon @mouseover="showActionsMenu(item)" color="primary" class="mr-2 cursor-pointer">mdi-dots-vertical</v-icon>
              <div :class="{ 'le-table-actions--item-bottom': item.id == listCampaign[listCampaign.length - 1].id }" class="le-table-actions animate__animated animate__fadeIn animate__faster" @mouseleave="hideActionsMenu" v-show="showMenu == item.id">
                <div :class="{ 'le-table-actions-arrow-right--item-bottom': item.id == listCampaign[listCampaign.length - 1].id }" class="le-table-actions-arrow-right padding-sm relative">
                  <div @click="renameCapaign(item)" class="le-table-actions__item padding-sm flex items-center">
                    <img src="/img/icons/rename.svg" class="padding-right-sm" />
                    <span>Rename</span>
                  </div>
                  <div @click="goToEdit(item)" class="le-table-actions__item padding-sm flex items-center">
                    <img src="/img/icons/edit.svg" class="padding-right-sm" />
                    <span>Edit</span>
                  </div>
                  <div v-if="item.type == 0 || item.type == 1" @click="duplicateCampaign(item)" class="le-table-actions__item padding-sm flex items-center">
                    <img src="/img/icons/duplicate.svg" class="padding-right-sm" />
                    <span>Duplicate</span>
                  </div>
                  <div v-if="item.type == 0" @click="abTest(item)" class="le-table-actions__item padding-sm flex items-center">
                    <img src="/img/icons/abtest.svg" class="padding-right-sm" />
                    <span>A/B Testing</span>
                  </div>
                  <div v-if="item.type == 1 && item.is_testing_running == 0" @click="setAbTestRuning(item, true)" class="le-table-actions__item padding-sm flex items-center">
                    <img src="/img/icons/abtest.svg" class="padding-right-sm" />
                    <span>Start A/B Testing</span>
                  </div>
                  <div v-if="item.type == 1 && item.is_testing_running == 1" @click="setAbTestRuning(item, false)" class="le-table-actions__item padding-sm flex items-center">
                    <img src="/img/icons/abtest.svg" class="padding-right-sm" />
                    <span>Stop A/B Testing</span>
                  </div>
                  <div @click="deleteCampaign(item)" class="le-table-actions__item padding-sm flex items-center">
                    <img src="/img/icons/delete.svg" class="padding-right-sm" />
                    <span>Delete</span>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </v-data-table>
        <div>
          <div class="margin-top-sm flex items-center justify-end padding-right-xxl">
            <v-pagination class="le-pagination" v-model="page" :length="pagination.last" :total-visible="pagination.items_per_page"></v-pagination>
            <div style="min-width: 120px">
              <div class="flex items-center margin-left-sm">
                <span class="text-15 margin-right-sm color-greyish font-light">View</span>
                <div class="le-has-arrow arrow-right-mini" style="width: 75px">
                  <select @change="selectViewsChange" class="le-input mini" name="views">
                    <option value="7">7</option>
                    <option value="14">14</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value="200">200</option>
                    <option value="500">500</option>
                    <option value="1000">1000</option>
                    <option value="1000">1500</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <LeAbTestingModal ref="AbTestModal" :isShow="isShowModalABTest" @refreshList="refreshList" @toogleModal="toogleModalAbTest"></LeAbTestingModal>
  </div>
</template>

<script>
import Api from '../api';
import { API_PATH, API_STATUS } from '../constants/api-constants';
import { CAMPAIGN_STATUS } from '../constants/app-constants';
import { DISPLAY_TYPES } from '../constants/app-constants';
import { ROUTER } from '../constants/router-constant';

export default {
  data() {
    return {
      tableStats: {
        total_items: 0,
        total_impressions: 0,
        total_leads: 0,
        average_conversion_rate: 0,
        total_visitors: 0,
        total_habit_exits: 0,
        total_intentional_exits: 0,
        total_clicks: 0,
        total_submits: 0,
      },
      optionsTable: {},
      copyNumber: 1,
      copyItem: null,
      showMenu: null,
      loadingTable: false,
      filter: {
        isActive: true,
        link: '',
        target: '',
        name: '',
        status: {
          label: 'All',
          value: '',
        },
      },
      paginationList: [7],
      statusList: [
        {
          label: 'All',
          value: '',
        },
        {
          label: 'Active',
          value: CAMPAIGN_STATUS.STATE_ACTIVE,
        },
        {
          label: 'Inactive',
          value: CAMPAIGN_STATUS.STATE_INACTIVE,
        },
      ],
      listCampaign: [],
      headers: [
        { text: 'Campaign', value: 'name', class: 'le-table-label' },
        {
          text: 'Status',
          value: 'status',
          class: 'le-table-label',
          align: 'center',
        },
        {
          text: 'Devices',
          value: 'device_type',
          class: 'le-table-label',
          align: 'center',
          sortable: false,
        },
        {
          text: 'Impressions',
          value: 'total_impression',
          class: 'le-table-label',
          align: 'center',
          sortable: true,
        },
        {
          text: 'Conversion rate',
          value: 'conversion_rate',
          class: 'le-table-label',
          align: 'center',
          sortable: true,
        },
        {
          text: 'Leads',
          value: 'total_lead',
          class: 'le-table-label',
          align: 'center',
          sortable: true,
        },
        {
          text: 'Clicks',
          value: 'total_click',
          class: 'le-table-label',
          align: 'center',
          sortable: true,
        },
        {
          text: 'Submits',
          value: 'total_submit',
          class: 'le-table-label',
          align: 'center',
          sortable: true,
        },
        {
          text: 'Creator',
          value: 'creator',
          class: 'le-table-label',
          align: 'center',
        },
        {
          text: 'Date created',
          value: 'created_at',
          class: 'le-table-label',
          align: 'center',
        },
        {
          text: 'Date updated',
          value: 'updated_at',
          class: 'le-table-label',
          align: 'center',
        },
        {
          text: 'Type',
          value: 'display_type_label',
          class: 'le-table-label',
          align: 'center',
        },
        { text: 'ID', value: 'id', class: 'le-table-label', align: 'center' },
        {
          text: 'Bounces',
          value: 'total_bounce',
          class: 'le-table-label',
          align: 'center',
        },
        {
          text: 'Unique user',
          value: 'total_visitor',
          class: 'le-table-label',
          align: 'center',
        },
        {
          text: 'Client',
          value: 'client.name',
          class: 'le-table-label',
          align: 'center',
        },
        {
          text: 'Habit exits',
          value: 'total_habit_exit',
          class: 'le-table-label',
          align: 'center',
        },
        {
          text: 'Intentional exits',
          value: 'total_intentional_exit',
          class: 'le-table-label',
          align: 'center',
        },
        {
          text: '',
          value: 'actions',
          sortable: false,
          align: 'center',
          class: 'le-actions-column',
        },
      ],
      // Pagination
      page: 1,
      pagination: {
        items_per_page: 7,
        total_items: 0,
        current: 0,
        last: 0,
      },
      // ui
      tabelWrapper: null,
      // Select site modal
      showSelectSiteModal: false,
      selectSiteModalTitle: 'Create',
      duplicateCampaignDetail: {
        name: '',
        site_id: '',
        siteText: '',
        client_id: '',
      },
      // Filter
      filterSideBar: {
        site: '',
        client: '',
        type: '',
      },
      filterDateRange: null,
      filterPanel: {
        name: '',
        listTag: [],
        link: '',
        startDate: '',
        endDate: '',
        listType: [],
        listDevice: [],
        listStatus: [],
      },
      // End filter
      // Hide/Unhide Columns
      allHeaders: [],
      selectedHeaders: [],
      headerSettings: [],
      isShowCustomizeColumn: false,
      isFirstLoadHeader: true,
      oldHeaderSettings: [],
      // Ab testing
      isShowModalABTest: false,
    };
  },
  created() {
    this.searchInputDebounce = _.debounce(() => {
      this.page = 1;
      this.getList();
    }, 500);
    this.allHeaders = this.headers.map((ele, idx) => ({
      ...ele,
      active: idx <= 11 || idx == this.headers.length - 1 ? true : false,
      id: idx,
    }));
    this.selectedHeaders = this.allHeaders.filter((i) => {
      return !this.headerSettings.includes(i.id);
    });
    for (let i = 12; i < this.allHeaders.length - 1; i++) {
      this.headerSettings.push(i);
    }
    this.headers = this.allHeaders.filter((i) => {
      return i.active == true;
    });
    this.isFirstLoadHeader = false;
    this.oldHeaderSettings = this.headerSettings;
  },
  watch: {
    optionsTable: {
      handler(e) {
        this.getList();
      },
      deep: true,
    },
    page(val) {
      this.getList();
    },
    headerSettings: {
      handler: function (val) {
        if (!this.isFirstLoadHeader) {
          this.selectedHeaders = this.headers.filter((i) => {
            return !this.headerSettings.includes(i.id);
          });
          this.allHeaders = this.allHeaders.map((ele, idx) => ({
            ...ele,
            active: !this.headerSettings.includes(ele.id),
          }));
        }
      },
      deep: false,
    },
  },
  methods: {
    // TODO: Filter
    onApplyFilterSideBar(data) {
      console.log(`onApplyFilter -> data`, data);
      this.filterSideBar = data;
      this.page = 1;
      this.getList();
    },
    onApplyFilterPanel(data) {
      console.log(`onApplyFilterPanel -> data`, data);
      this.filterPanel = data;
      this.page = 1;
      this.getList();
    },
    // end Filter
    selectViewsChange(e) {
      const n = +e.target.value;
      this.pagination.items_per_page = n;
      this.page = 1;
      this.getList();
    },
    getDateAgo(dateCreate) {
      return moment(new Date(dateCreate)).fromNow();
    },
    formatDate(date) {
      return moment(moment.utc(date).toDate()).local().format('MMM DD, YYYY');
    },
    getConversionRate(item) {
      return item.total_impression ? Number((item.total_lead / item.total_impression) * 100).toFixed(2) : '0.00';
    },
    getTargetLink(data) {
      return data.targets.map((i) => ' ' + decodeURI(i.target)).toString();
    },
    goToEdit(item) {
      this.$router.push({
        name: ROUTER.EDIT_CAMPAIGN.name,
        params: { id: item.id },
        query: {
          siteID: item.site.id,
          siteURL: item.site.name,
        },
      });
    },
    deleteCampaign(item) {
      Swal.fire({
        title: 'Do you want delete campaign?',
        text: "You won't be able to revert this!",
        showCloseButton: true,
        // icon: 'question',
        imageUrl: '/img/delete_dog.svg',
        showCancelButton: true,
      }).then((result) => {
        if (result.value) {
          Api.delete(API_PATH.CAMPAIGN + '/' + item.id).then((res) => {
            this.$notify({
              title: 'Campaign has been deleted!',
              type: 'success',
            });
            this.getList();
          });
        }
      });
    },
    async renameCapaign(item) {
      const { value: campaignName } = await Swal.fire({
        title: 'Enter your campaign name',
        input: 'text',
        inputValue: item.name,
        showCancelButton: true,
        showCloseButton: true,
        imageUrl: '/img/question_rabit.svg',
        inputValidator: (value) => {
          if (!value) {
            return 'You need to write something!';
          }
        },
      });

      if (campaignName) {
        const dataUpdate = {
          name: campaignName,
        };
        Api.put(API_PATH.CAMPAIGN + `/${item.id}?_name=1`, dataUpdate).then((res) => {
          this.getList();
          this.$notify({
            title: 'Campaign has been renamed!',
            type: 'success',
          });
        });

        // Swal.fire(`Your campaign name is  ${campaignName}`, '', 'success');
      }
    },
    duplicateCampaign(item) {
      // TODO: Get List devices:
      let listDevices = item.device_types.map((i) => i.id);

      this.showSelectSiteModal = true;
      this.selectSiteModalTitle = 'Duplicate';
      this.duplicateCampaignDetail = {
        name: item.name + ' (Copy) ',
        siteText: item.site.name,
        // Create Data
        site_id: item.site.id,
        client_id: item.client.id,
        id: item.id,
      };
    },
    onClickDuplicateButton() {
      this.showSelectSiteModal = false;
      this.$notify({
        title: 'Duplicated done!',
        type: 'success',
      });
      this.getList();
      this.selectSiteModalTitle = 'Create';
    },
    onApplyFilterDateRange(v) {
      console.log(`onApplyFilterDateRange -> v`, v);
      this.filterDateRange = v;
      this.page = 1;
      this.getList();
    },
    editStatus(item) {
      const data = {
        status: item.status === CAMPAIGN_STATUS.STATE_ACTIVE ? CAMPAIGN_STATUS.STATE_INACTIVE : CAMPAIGN_STATUS.STATE_ACTIVE,
      };
      Api.put(API_PATH.CAMPAIGN + '/' + item.id + '?_status=1', data).then((res) => {
        this.getList();
      });
    },
    getList() {
      let filterQuery = '';
      // Date range filter
      if (this.filterDateRange) {
        let dateToCreatedFilter = '';
        let dateFromCreatedFilter = '';
        dateFromCreatedFilter = moment(this.filterDateRange.start).format('YYYY-MM-DD');
        dateToCreatedFilter = moment(this.filterDateRange.end).format('YYYY-MM-DD');

        filterQuery += `&from_performance_date=${dateFromCreatedFilter}`;
        filterQuery += `&to_performance_date=${dateToCreatedFilter}`;
      }

      // Sidebar filter
      if (_.isString(this.filterSideBar)) {
        filterQuery += `&${this.filterSideBar}`;
      } else {
        const siteFilter = this.filterSideBar.site;
        const clientFilter = this.filterSideBar.client;
        filterQuery += `&client_id=${siteFilter}`;
        filterQuery += `&site_id=${clientFilter}`;
      }

      // Panel filter
      let statusFilter = this.filterPanel.listStatus.map((i) => i.value).toString();
      let nameFilter = this.filterPanel.name;
      let linkFilter = this.filterPanel.link;
      let tagFilter = this.filterPanel.listTag.toString();
      let typeFilter = this.filterPanel.listType.map((i) => i.value).toString();
      let deviceFilter = this.filterPanel.listDevice.map((i) => i.value).toString();

      let startDateFilter = ``;
      let endDateFilter = ``;
      if (this.filterPanel.startDate) {
        startDateFilter = moment(this.filterPanel.startDate).format('YYYY-MM-DD');
      }
      if (this.filterPanel.endDate) {
        endDateFilter = moment(this.filterPanel.endDate).format('YYYY-MM-DD');
      }

      filterQuery += `&status=${statusFilter}`;
      filterQuery += `&name=${nameFilter}`;
      filterQuery += `&link=${linkFilter}`;
      filterQuery += `&tags=${tagFilter}`;
      filterQuery += `&from_created_at=${startDateFilter}`;
      filterQuery += `&to_created_at=${endDateFilter}`;
      filterQuery += `&device_types=${deviceFilter}`;
      filterQuery += `&display_types=${typeFilter}`;

      // Device filter
      let performaceFilter = this.getPeformanceQuery();
      filterQuery += `&${performaceFilter}`;

      const filter = `?page=${this.page}&items_per_page=${this.pagination.items_per_page}&sort_by=updated_at&sort_order=desc${filterQuery}`;
      this.loadingTable = true;

      Api.get(API_PATH.LIST_CAMPAIGN + filter, { hideLoading: false })
        .then((res) => {
          if (res.data._status == API_STATUS.SUCCESS) {
            const { models, pagination } = res.data._data;
            this.pagination.total_items = pagination.total_items;

            this.pagination.last = pagination.last;
            this.pagination.current = pagination.current;

            this.listCampaign = models.map((i) => ({
              ...i,
              conversion_rate: this.getConversionRate(i),
              display_type_label: DISPLAY_TYPES[i.display_type],
            }));

            // Update table body prepend table
            this.tableStats = {
              total_items: pagination.total_items,
              total_impressions: pagination.total_impressions,
              total_leads: pagination.total_leads,
              average_conversion_rate: pagination.average_conversion_rate,
              total_visitors: pagination.total_visitors,
              total_habit_exits: pagination.total_habit_exits,
              total_intentional_exits: pagination.total_intentional_exits,
              total_clicks: pagination.total_clicks,
              total_submits: pagination.total_submits,
            };
          }
        })
        .finally(() => {
          window.scrollTo(0, 0);
          this.loadingTable = false;
        });
    },
    showActionsMenu(item) {
      if (item.id == this.showMenu) {
        this.showMenu = null;
        this.tabelWrapper.removeClass('is-bottom');
        return;
      }
      this.showMenu = item.id;
    },
    hideActionsMenu() {
      this.showMenu = false;
      this.tabelWrapper.removeClass('is-bottom');
    },
    // TODO:Customize Columns
    saveCustomizeColumn() {
      this.headers = this.allHeaders.filter((i) => {
        return i.active == true;
      });
      this.isShowCustomizeColumn = false;
      let headerSettings = this.headerSettings || [];
      let allHeaders = this.allHeaders;
      $('.le-table-body-stats td').each(function (idx, ele) {
        if (headerSettings.includes(idx)) {
          $(ele).addClass('hidden');
        } else {
          $(ele).removeClass('hidden');
        }
      });
      this.oldHeaderSettings = this.headerSettings;
    },
    resetCustomizeColumn() {
      this.headers = this.allHeaders.filter((i) => {
        return i.active == true;
      });
      this.isShowCustomizeColumn = false;
      let headerSettings = this.oldHeaderSettings || [];
      let allHeaders = this.allHeaders;
      $('.le-table-body-stats td').each(function (idx, ele) {
        if (headerSettings.includes(idx)) {
          $(ele).addClass('hidden');
        } else {
          $(ele).removeClass('hidden');
        }
      });
      this.headerSettings = headerSettings;
    },
    // Filter device performace.
    selectFilterDevice(item, device, e) {
      if (e.target) {
        this.$set(device, 'is_disabled', !device.is_disabled);
        this.getList();
      }
    },
    getPeformanceQuery() {
      const listFilter = this.listCampaign
        .filter((i) => i.device_types.some((k) => k.is_disabled))
        .map((j) => ({
          id: j.id,
          device_active: j.device_types
            .filter((l) => !l.is_disabled)
            .map((o) => o.id)
            .toString(),
        }));
      let peformanceQuery = ``;
      listFilter.forEach((i, index) => {
        peformanceQuery += `${index ? '&' : ''}campaign_device_types[${i.id}]=${i.device_active}`;
      });
      console.log(`selectFilterDevice -> peformanceQuery`, peformanceQuery);
      return peformanceQuery;
    },
    formatNumber(n) {
      return Number(+n).toLocaleString('en-GB').replace(/\,/gi, ' ');
    },
    // Modal
    cancelModal() {
      console.log('CANCEL MODAL');
      this.selectSiteModalTitle = 'Create';
      this.duplicateCampaignDetail = {
        name: '',
        site_id: '',
        siteText: '',
        client_id: '',
      };
    },
    // Modal
    toogleModalAbTest(isHide) {
      this.isShowModalABTest = isHide;
    },
    refreshList(isRefresh) {
      if (isRefresh) {
        this.getList();
      }
    },
    abTest(item) {
      // TODO: AB testing
      this.toogleModalAbTest(true);
      const abTestCpn = this.$refs.AbTestModal;
      if (abTestCpn) {
        abTestCpn.campaign = item;
        abTestCpn.listVariant[0].value = item.name + ' TEST A';
        abTestCpn.listVariant[1].value = item.name + ' TEST B';
      }
    },
    setAbTestRuning(item, status) {
      console.log('status', status);
      Api.post(`${API_PATH.CAMPAIGN}/${item.id}/variants/${status ? 'activation' : 'deactivation'}`)
        .then((res) => {
          if (res.data._status == API_STATUS.SUCCESS) {
          } else {
          }
        })
        .finally(() => {
          this.getList();
        });
    },
  },
  beforeMount() {
    this.getList();
  },
  mounted() {
    this.tabelWrapper = $('.le-table .v-data-table__wrapper');
  },
  beforeDestroy() {
    document.documentElement.style.setProperty('--le-sidebar-filter-width', '0px');
  },
};
</script>

<style lang="scss">
.le-table-body-stats {
  height: 69.1px;
  background-color: rgba(245, 246, 255, 0.82);
  td.hidden {
    display: none;
  }
}

.le-device-img-filter {
  &:hover {
    filter: brightness(0.5);
  }
}

.le-device-disable {
  filter: grayscale(1) !important;
  opacity: 0.35;
}
</style>
