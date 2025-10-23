<template>
  <div class="le-page">
    <ReactComponent :title=title></ReactComponent>

    <nav class="le-fixed-topnav">
      <div class="height-100% padding-right-xl">
        <div style="padding-left: var(--le-sidebar-filter-width)" class="d-flex items-center justify-between height-100%">
          <div class="text-lg padding-left-lg">Campaign</div>
          <div class="d-flex items-center">
            <button @click="showSelectSiteModal = true" class="le-button padding-x-md"><v-icon class="text-md padding-bottom-xxxxs margin-right-xxs" color="white">mdi-plus</v-icon>New Campaign</button>
          </div>
        </div>
      </div>
    </nav>

    <CampaignTable :triggerGetList="triggerGetList" @clickMenuItem="onClickMenuItem" @create="showSelectSiteModal = true" class="homeCampaignTable"></CampaignTable>

    <LeSelectSiteModal :dialog.sync="showSelectSiteModal" :title="selectSiteModalTitle" @cancel-modal="showSelectSiteModal = false" :campaignDetail="duplicateCampaignDetail" @clickDuplicateButton="onClickDuplicateButton" />
    <LeAbTestingModal ref="AbTestModal" :isShow="modalABTest" @refreshList="getList" @toogleModal="modalABTest = !modalABTest"></LeAbTestingModal>
  </div>
</template>

<script>
import Api from '@/api';
import { API_PATH } from '@/constants/api-constants';
import { CAMPAIGN_STATUS } from '@/constants/app-constants';
import { ROUTER } from '@/constants/router-constant';

export default {
  data() {
    return {
      triggerGetList: false,
      modalABTest: false,
      title: 'Hello world',
      selectSiteModalTitle: 'Create',
      showSelectSiteModal: false,
      duplicateCampaignDetail: {
        name: '',
        site_id: '',
        siteText: '',
        client_id: '',
      },
      reduxStore: null,
    };
  },
  created() {},
  watch: {},
  methods: {
    getList() {
      setTimeout(() => {
        this.triggerGetList = !this.triggerGetList;
      }, 10);
    },
    goToEdit(record) {
      this.$router.push({
        name: ROUTER.EDIT_CAMPAIGN.name,
        params: { id: record.id },
        query: {
          siteID: record.site.id,
          siteURL: record.site.name,
        },
      });
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
    changeCampaignStatus(record) {
      const data = {
        status: record.status === CAMPAIGN_STATUS.STATE_ACTIVE ? CAMPAIGN_STATUS.STATE_INACTIVE : CAMPAIGN_STATUS.STATE_ACTIVE,
      };
      Api.put(API_PATH.CAMPAIGN + '/' + record.id + '?_status=1', data).then((res) => {
        this.getList();
      });
    },
    renameCampaign(record) {
      Swal.fire({
        title: 'Enter your campaign name',
        input: 'text',
        inputValue: record.name,
        showCancelButton: true,
        showCloseButton: true,
        imageUrl: '/img/question_rabit.svg',
        inputValidator: (value) => {
          if (!value) {
            return 'You need to write something!';
          }
        },
      }).then(({ value: campaignName }) => {
        if (campaignName) {
          const dataUpdate = {
            name: campaignName,
          };
          Api.put(API_PATH.CAMPAIGN + `/${record.id}?_name=1`, dataUpdate).then((res) => {
            this.$notify({
              title: 'Campaign has been renamed!',
              type: 'success',
            });
            this.getList();
          });
        }
      });
    },
    deleteCampaign(record) {
      Swal.fire({
        title: 'Do you want delete campaign?',
        text: "You won't be able to revert this!",
        showCloseButton: true,
        imageUrl: '/img/delete_dog.svg',
        showCancelButton: true,
      }).then((result) => {
        if (result.value) {
          Api.delete(API_PATH.CAMPAIGN + '/' + record.id).then((res) => {
            this.$notify({
              title: 'Campaign has been deleted!',
              type: 'success',
            });
            this.getList();
          });
        }
      });
    },
    duplicateCampaign(record) {
      // TODO: Get List devices:
      let listDevices = record.device_types.map((i) => i.id);

      this.showSelectSiteModal = true;
      this.selectSiteModalTitle = 'Duplicate';
      this.duplicateCampaignDetail = {
        name: record.name + ' (Copy) ',
        siteText: record.site.name,
        // Create Data
        site_id: record.site.id,
        client_id: record.client.id,
        id: record.id,
      };
    },
    abTest(record) {
      // TODO: AB testing
      this.modalABTest = !this.modalABTest;
      const abTestCpn = this.$refs.AbTestModal;
      if (abTestCpn) {
        abTestCpn.campaign = record;
        abTestCpn.listVariant[0].value = record.name + ' TEST A';
        abTestCpn.listVariant[1].value = record.name + ' TEST B';
      }
    },
    setAbTestRuning(record, status) {
      console.log('status', status);
      Api.post(`${API_PATH.CAMPAIGN}/${record.id}/variants/${status ? 'activation' : 'deactivation'}`)
        .then((res) => {
          if (res.data._status == API_STATUS.SUCCESS) {
          } else {
          }
        })
        .finally(() => {
          this.getList();
        });
    },
    onClickMenuItem(record, menuItem) {
      switch (menuItem.key) {
        case 'rename': {
          this.renameCampaign(record);
          break;
        }
        case 'edit': {
          this.goToEdit(record);
          break;
        }
        case 'dupplicate': {
          this.duplicateCampaign(record);
          break;
        }
        case 'ab_testing': {
          this.abTest(record);
          break;
        }
        case 'start_ab_testing': {
          this.setAbTestRuning(record, true);
          break;
        }
        case 'stop_ab_testing': {
          this.setAbTestRuning(record, false);
          break;
        }
        case 'delete': {
          this.deleteCampaign(record);
          break;
        }
        case 'deactive':
        case 'active': {
          this.changeCampaignStatus(record);
          break;
        }
      }
    },
  },
  beforeMount() {},
  mounted() {},
  beforeDestroy() {},
};
</script>
