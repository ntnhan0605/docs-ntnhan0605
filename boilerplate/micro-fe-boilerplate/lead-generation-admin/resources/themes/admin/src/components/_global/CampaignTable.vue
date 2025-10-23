<template>
  <div class="campaignTable">
    <!-- Filter -->
    <div class="campaignTable--header">
      <a-input-search v-model="params.keyword" @search="onSearch" allow-clear placeholder="Search for campaign name/code/tag" size="large" class="campaignTable--search"> </a-input-search>
      <PopoverFilter :count="sitesCount" @reset="onResetSites" @apply="onApplySites" @visibleChange="onVisibleChangeSites" size="large" class="campaignTable--site">
        <template v-slot:overlay>
          <a-radio-group v-model="params.site_id" class="campaignTablePopoverFilter-group radioSite-group">
            <a-radio v-for="site in sites" :key="site.id" :value="site.id" class="campaignTablePopoverFilter" v-show="!!sites.length">
              <img :src="site.flag" alt="" class="campaignTablePopoverFilter--icon" />
              {{ site.label || site.name }}
            </a-radio>
            <a-empty v-show="!sites.length" style="padding-block: 20px" />
          </a-radio-group>
        </template>
        <template v-slot:icon-suffix>
          <a-icon>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.0001 12.2182C9.89969 12.2182 9.80621 12.2021 9.71969 12.1701C9.63315 12.138 9.55088 12.083 9.47289 12.005L5.72771 8.25983C5.61232 8.14446 5.55329 7.99943 5.55062 7.82475C5.54794 7.65007 5.60697 7.50237 5.72771 7.38164C5.84843 7.26092 5.99479 7.20056 6.16679 7.20056C6.33879 7.20056 6.48515 7.26092 6.60587 7.38164L10.0001 10.7759L13.3944 7.38164C13.5097 7.26627 13.6548 7.20724 13.8295 7.20456C14.0041 7.20189 14.1518 7.26092 14.2725 7.38164C14.3933 7.50237 14.4536 7.64873 14.4536 7.82075C14.4536 7.99275 14.3933 8.13911 14.2725 8.25983L10.5274 12.005C10.4494 12.083 10.3671 12.138 10.2806 12.1701C10.194 12.2021 10.1006 12.2182 10.0001 12.2182Z"
              />
            </svg>
          </a-icon>
        </template>
        Site
      </PopoverFilter>
      <PopoverFilter :loading="loadingClients" :count="clientsCount" @reset="onResetClients" @apply="onApplyClients" @visibleChange="onVisibleChangeClients" size="large" class="campaignTable--client">
        <template v-slot:overlay>
          <a-checkbox-group v-model="params.client_id" class="campaignTablePopoverFilter-group">
            <a-checkbox v-for="client in clients" :key="client.id" :value="client.id" class="campaignTablePopoverFilter" v-show="!!clients.length">
              {{ client.name }}
            </a-checkbox>
            <a-empty v-show="!clients.length" description="Please select site" style="padding-block: 20px" />
          </a-checkbox-group>
        </template>
        <template v-slot:icon-suffix>
          <a-icon>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.0001 12.2182C9.89969 12.2182 9.80621 12.2021 9.71969 12.1701C9.63315 12.138 9.55088 12.083 9.47289 12.005L5.72771 8.25983C5.61232 8.14446 5.55329 7.99943 5.55062 7.82475C5.54794 7.65007 5.60697 7.50237 5.72771 7.38164C5.84843 7.26092 5.99479 7.20056 6.16679 7.20056C6.33879 7.20056 6.48515 7.26092 6.60587 7.38164L10.0001 10.7759L13.3944 7.38164C13.5097 7.26627 13.6548 7.20724 13.8295 7.20456C14.0041 7.20189 14.1518 7.26092 14.2725 7.38164C14.3933 7.50237 14.4536 7.64873 14.4536 7.82075C14.4536 7.99275 14.3933 8.13911 14.2725 8.25983L10.5274 12.005C10.4494 12.083 10.3671 12.138 10.2806 12.1701C10.194 12.2021 10.1006 12.2182 10.0001 12.2182Z"
              />
            </svg>
          </a-icon>
        </template>
        Client
      </PopoverFilter>
      <PopoverFilter :count="formFilterCount" @reset="onResetForm" @apply="onApplyForm" @visibleChange="onVisibleChangeFormFilter" size="large" placement="bottomRight" class="campaignTable--filter" title="Filter">
        <template v-slot:overlay>
          <a-form :form="formFilter" @submit="onSubmitFormFilter" :colon="false" class="campaignTable--filter-form">
            <a-form-item label="Campaign Created Date range">
              <a-range-picker v-decorator="['created_at']" size="large" format="DD/MM/YYYY" :placeholder="['DD/MM/YYYY', 'DD/MM/YYYY']">
                <a-icon slot="suffixIcon" type="calendar" />
              </a-range-picker>
            </a-form-item>
            <a-form-item label="Campaign Last Updated Date range">
              <a-range-picker v-decorator="['updated_at']" size="large" format="DD/MM/YYYY" :placeholder="['DD/MM/YYYY', 'DD/MM/YYYY']">
                <a-icon slot="suffixIcon" type="calendar" />
              </a-range-picker>
            </a-form-item>
            <a-form-item label="Status">
              <a-select v-decorator="['status']" :maxTagCount="0" placeholder="Choose an option" mode="multiple" size="large" allow-clear dropdownClassName="selectDropdown--status" class="select">
                <span slot="menuItemSelectedIcon" class="selectDropdownCheckbox">
                  <span></span>
                </span>
                <a-select-option v-for="st in status" :key="st.value" :value="st.value" class="selectDropdownItem--status">
                  <a-badge :color="st.color" :text="st.label" />
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="Template">
              <a-select v-decorator="['display_type']" :maxTagCount="0" placeholder="Choose an option" mode="multiple" size="large" allow-clear dropdownClassName="selectDropdown--display_type" class="select">
                <span slot="menuItemSelectedIcon" class="selectDropdownCheckbox">
                  <span></span>
                </span>
                <a-select-option v-for="displayType in displayTypes" :key="displayType.value" :value="displayType.value" class="selectDropdownItem--display_type">{{ displayType.label }}</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="Sponsored Content">
              <a-select v-decorator="['is_sponsor']" placeholder="Choose an option" size="large" allow-clear dropdownClassName="selectDropdown--sponsored" class="select--sponsored">
                <a-select-option :value="0" class="selectDropdownItem--sponsored">
                  Not sponsored
                  <span class="selectDropdownCheckbox">
                    <span></span>
                  </span>
                </a-select-option>
                <a-select-option :value="1" class="selectDropdownItem--sponsored">
                  Sponsored
                  <span class="selectDropdownCheckbox">
                    <span></span>
                  </span>
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-form>
        </template>
        <template v-slot:icon-prefix>
          <a-icon>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.24651 11.638C7.10485 11.638 6.9861 11.59 6.89026 11.4942C6.79444 11.3983 6.74653 11.2795 6.74653 11.1378C6.74653 10.996 6.79444 10.8773 6.89026 10.7816C6.9861 10.6859 7.10485 10.638 7.24651 10.638H8.53496C8.67663 10.638 8.79538 10.6859 8.89121 10.7818C8.98705 10.8777 9.03496 10.9965 9.03496 11.1382C9.03496 11.2799 8.98705 11.3987 8.89121 11.4944C8.79538 11.5901 8.67663 11.638 8.53496 11.638H7.24651ZM4.66318 8.47132C4.52152 8.47132 4.40278 8.42339 4.30695 8.32752C4.21111 8.23164 4.1632 8.11284 4.1632 7.97112C4.1632 7.82939 4.21111 7.71066 4.30695 7.61494C4.40278 7.51922 4.52152 7.47135 4.66318 7.47135H11.1183C11.26 7.47135 11.3787 7.51929 11.4745 7.61515C11.5704 7.71103 11.6183 7.82983 11.6183 7.97155C11.6183 8.11329 11.5704 8.23202 11.4745 8.32774C11.3787 8.42346 11.26 8.47132 11.1183 8.47132H4.66318ZM2.7273 5.30467C2.58563 5.30467 2.46688 5.25673 2.37105 5.16085C2.27521 5.06499 2.22729 4.94619 2.22729 4.80445C2.22729 4.66273 2.27521 4.54401 2.37105 4.44829C2.46688 4.35255 2.58563 4.30469 2.7273 4.30469H13.0606C13.2023 4.30469 13.321 4.35263 13.4168 4.4485C13.5127 4.54438 13.5606 4.66318 13.5606 4.8049C13.5606 4.94664 13.5127 5.06537 13.4168 5.16109C13.321 5.25681 13.2023 5.30467 13.0606 5.30467H2.7273Z"
              />
            </svg>
          </a-icon>
        </template>
        Filters
      </PopoverFilter>
    </div>
    <!-- END - Filter -->
    <a-table :loading="loading" :columns="columns" :data-source="dataSource" :pagination="false" :scroll="scroll" @change="onChangeTable" rowKey="id" size="large" v-show="!!dataSource.length">
      <!-- Header -->
      <div slot="name_title_slot" class="campaignTable--name_title_slot">
        <span>Campaign</span>
        <v-btn-toggle v-model="columnType" class="campaignTable--name-toggle" mandatory>
          <v-btn @click.stop="() => {}">{{ !columnType ? 'Information' : 'Info' }}</v-btn>
          <v-btn @click.stop="() => {}">Report</v-btn>
        </v-btn-toggle>
        <a-popover placement="bottom" overlayClassName="campaignTable--name-infoContent">
          <div slot="content">
            <p class="infoTitle">
              <a-icon type="info-circle" theme="filled" />
              View mode
            </p>
            <p class="infoContent">Please switch between the tabs to see campaign’s information or report.</p>
          </div>
          <a-icon type="info-circle" theme="filled" class="campaignTable--name-info" />
        </a-popover>
      </div>
      <!-- END - Header -->

      <!-- Column -->
      <div slot="nameCol" slot-scope="text, record, index" class="campaignTable--name-col">
        <div class="name--feature">
          <v-img :src="record.image ? record.image : '/img/thumbnail.png'" aspect-ratio="1" cover class="feature"></v-img>
        </div>
        <div class="name--container">
          <router-link :to="{ name: 'EditCampaign', params: { id: record.id }, query: { siteID: record.site.id, siteURL: record.site.name } }">
            <a-tooltip :title="record.name">
              <p class="name">{{ record.name }}</p>
            </a-tooltip>
          </router-link>
          <p class="code">
            Code: {{ record.code }}
            <a-tooltip title="Copy to clipboard">
              <a-icon @click="() => onCopyCode(record.code)" class="code--copy">
                <svg width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6.0385 11.6667C5.70172 11.6667 5.41667 11.55 5.18333 11.3167C4.95 11.0833 4.83333 10.7983 4.83333 10.4615V2.87183C4.83333 2.53506 4.95 2.25 5.18333 2.01667C5.41667 1.78333 5.70172 1.66667 6.0385 1.66667H11.6282C11.9649 1.66667 12.25 1.78333 12.4833 2.01667C12.7167 2.25 12.8333 2.53506 12.8333 2.87183V10.4615C12.8333 10.7983 12.7167 11.0833 12.4833 11.3167C12.25 11.55 11.9649 11.6667 11.6282 11.6667H6.0385ZM6.0385 10.6667H11.6282C11.6795 10.6667 11.7265 10.6453 11.7692 10.6025C11.8119 10.5598 11.8333 10.5128 11.8333 10.4615V2.87183C11.8333 2.8205 11.8119 2.7735 11.7692 2.73083C11.7265 2.68806 11.6795 2.66667 11.6282 2.66667H6.0385C5.98717 2.66667 5.94017 2.68806 5.8975 2.73083C5.85472 2.7735 5.83333 2.8205 5.83333 2.87183V10.4615C5.83333 10.5128 5.85472 10.5598 5.8975 10.6025C5.94017 10.6453 5.98717 10.6667 6.0385 10.6667ZM3.70517 14C3.36839 14 3.08333 13.8833 2.85 13.65C2.61667 13.4167 2.5 13.1316 2.5 12.7948V4.70517C2.5 4.56328 2.54789 4.44445 2.64367 4.34867C2.73933 4.253 2.85811 4.20517 3 4.20517C3.14189 4.20517 3.26072 4.253 3.3565 4.34867C3.45217 4.44445 3.5 4.56328 3.5 4.70517V12.7948C3.5 12.8462 3.52139 12.8932 3.56417 12.9358C3.60683 12.9786 3.65383 13 3.70517 13H9.79483C9.93672 13 10.0556 13.0478 10.1513 13.1435C10.247 13.2393 10.2948 13.3581 10.2948 13.5C10.2948 13.6419 10.247 13.7607 10.1513 13.8563C10.0556 13.9521 9.93672 14 9.79483 14H3.70517Z"
                  />
                </svg>
              </a-icon>
            </a-tooltip>
          </p>
        </div>
      </div>
      <div slot="siteCol" slot-scope="text, record, index" class="campaignTable--site-col">
        <a-tooltip :title="record.site.label">
          <a-avatar :src="record.site.flag" :size="32">{{ record.site.nation }}</a-avatar>
        </a-tooltip>
      </div>
      <div slot="clientCol" slot-scope="text, record, index" class="campaignTable--client-col">
        {{ record.client.name }}
      </div>
      <div slot="statusCol" slot-scope="text, record, index" class="campaignTable--status-col">
        <div class="text-sm">
          <div class="campaignTable--status-tag" :style="{ color: record.statusTag.color, backgroundColor: record.statusTag.bgColor }">{{ record.statusTag.label }}</div>
          <!-- <div v-if="[0, 1].includes(record.type) && record.is_testing_running == 0" @click="onChangeStatus(record)" class="le-table-status cursor-pointer">
            <img class="fill-height" v-if="record.formatted_status == 1" src="/img/icons/status_active.svg" alt />
            <img class="fill-height" v-if="record.formatted_status == -1" src="/img/icons/status_inactive.svg" alt />
          </div>
          <div class="le-ab-test-color">
            <div v-if="record.formatted_status == 4 && record.is_testing_running == 1"><img class="align-middle" style="margin-right: 2px" src="/img/icons/ab.svg" width="13" alt /> A/B Testing</div>
            <div v-if="record.type == 2">
              <div v-if="record.formatted_status == 1">Active</div>
              <div v-if="record.formatted_status == -1">Inactive</div>
            </div>
          </div>
          <div v-if="record.formatted_status == 0" class="le-scheduled-color"><img class="align-middle" src="/img/icons/scheduled.svg " style="margin-right: 2px" width="12" alt /> Scheduled</div>
          <div v-if="record.formatted_status == 3" class="le-expired-color"><img class="align-middle" src="/img/icons/expired.svg " style="margin-right: 2px" width="12" alt /> Expired</div> -->
        </div>
      </div>
      <div slot="devicesCol" slot-scope="text, record, index" class="campaignTable--devices-col">
        <a-icon type="mobile" :class="text.some((t) => t.name === 'Mobile' && !t.is_disabled) ? 'active' : ''">
          <svg width="1em" height="1em" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6.58991 18.7499C6.16897 18.7499 5.81266 18.6041 5.521 18.3124C5.22933 18.0208 5.0835 17.6645 5.0835 17.2435V2.75642C5.0835 2.33547 5.22933 1.97917 5.521 1.6875C5.81266 1.39583 6.16897 1.25 6.58991 1.25H14.4104C14.8313 1.25 15.1876 1.39583 15.4793 1.6875C15.771 1.97917 15.9168 2.33547 15.9168 2.75642V17.2435C15.9168 17.6645 15.771 18.0208 15.4793 18.3125C15.1876 18.6041 14.8313 18.75 14.4104 18.75L6.58991 18.7499ZM6.33347 14.8077V17.2436C6.33347 17.3077 6.36018 17.3664 6.4136 17.4199C6.46703 17.4733 6.5258 17.5 6.58991 17.5H14.4104C14.4745 17.5 14.5333 17.4733 14.5867 17.4199C14.6401 17.3664 14.6668 17.3077 14.6668 17.2436V14.8077H6.33347ZM10.5001 16.891C10.7042 16.891 10.8781 16.8192 11.0218 16.6755C11.1655 16.5318 11.2373 16.3579 11.2373 16.1538C11.2373 15.9498 11.1655 15.7759 11.0218 15.6322C10.8781 15.4885 10.7042 15.4166 10.5001 15.4166C10.2961 15.4166 10.1222 15.4885 9.97852 15.6322C9.83482 15.7759 9.76297 15.9498 9.76297 16.1538C9.76297 16.3579 9.83482 16.5317 9.97852 16.6754C10.1222 16.8191 10.2961 16.891 10.5001 16.891ZM6.33347 13.5577H14.6668V4.79163H6.33347V13.5577ZM6.33347 3.54167H14.6668V2.75642C14.6668 2.69231 14.6401 2.63354 14.5867 2.5801C14.5333 2.52669 14.4745 2.49998 14.4104 2.49998H6.58991C6.5258 2.49998 6.46703 2.52669 6.4136 2.5801C6.36018 2.63354 6.33347 2.69231 6.33347 2.75642V3.54167Z"
            />
          </svg>
        </a-icon>
        <a-icon :class="text.some((t) => t.name === 'Desktop' && !t.is_disabled) ? 'active' : ''">
          <svg width="1em" height="1em" viewBox="0 0 21 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9.25016 15.8333V14.1667H4.08991C3.66897 14.1667 3.31266 14.0208 3.021 13.7292C2.72933 13.4375 2.5835 13.0812 2.5835 12.6603V4.42309C2.5835 4.00214 2.72933 3.64584 3.021 3.35417C3.31266 3.06251 3.66897 2.91667 4.08991 2.91667H16.9104C17.3313 2.91667 17.6876 3.06251 17.9793 3.35417C18.271 3.64584 18.4168 4.00214 18.4168 4.42309V12.6603C18.4168 13.0812 18.271 13.4375 17.9793 13.7292C17.6876 14.0208 17.3313 14.1667 16.9104 14.1667H11.7501V15.8333H12.7918C12.9691 15.8333 13.1176 15.8931 13.2373 16.0128C13.357 16.1325 13.4168 16.281 13.4168 16.4583C13.4168 16.6356 13.357 16.7841 13.2373 16.9038C13.1176 17.0235 12.9691 17.0833 12.7918 17.0833H8.2085C8.03115 17.0833 7.88265 17.0235 7.763 16.9038C7.64333 16.7841 7.5835 16.6356 7.5835 16.4583C7.5835 16.281 7.64333 16.1325 7.763 16.0128C7.88265 15.8931 8.03115 15.8333 8.2085 15.8333H9.25016ZM4.08991 12.9167H16.9104C16.9745 12.9167 17.0333 12.89 17.0867 12.8365C17.1401 12.7831 17.1668 12.7244 17.1668 12.6603V4.42309C17.1668 4.35898 17.1401 4.30021 17.0867 4.24678C17.0333 4.19336 16.9745 4.16665 16.9104 4.16665H4.08991C4.0258 4.16665 3.96703 4.19336 3.9136 4.24678C3.86018 4.30021 3.83348 4.35898 3.83348 4.42309V12.6603C3.83348 12.7244 3.86018 12.7831 3.9136 12.8365C3.96703 12.89 4.0258 12.9167 4.08991 12.9167Z"
            />
          </svg>
        </a-icon>
      </div>
      <div slot="templateCol" slot-scope="display_type, record, index" class="campaignTable--template-col">
        {{ display_type }}
      </div>
      <div slot="timeframeCol" slot-scope="timeframe, record, index" class="campaignTable--timeframe-col">
        <!-- <a-badge class="type" color="#00b16a" :text="timeframe.type" /> -->
        <span>{{ timeframe.type }}</span>
        <p class="on_time" v-show="!!timeframe.on_time">Apprearance Time: {{ timeframe.on_time }}</p>
      </div>
      <div slot="actionCol" slot-scope="text, record, index" class="campaignTable--action-col">
        <a-dropdown :trigger="['click']" placement="bottomRight">
          <div class="campaignTable--action-btn">
            <a-icon>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M9.11719 15.6902C9.36198 15.935 9.65624 16.0574 9.99998 16.0574C10.3437 16.0574 10.638 15.935 10.8828 15.6902C11.1276 15.4454 11.25 15.1511 11.25 14.8074C11.25 14.4636 11.1276 14.1694 10.8828 13.9246C10.638 13.6798 10.3437 13.5574 9.99998 13.5574C9.65624 13.5574 9.36198 13.6798 9.11719 13.9246C8.8724 14.1694 8.75 14.4636 8.75 14.8074C8.75 15.1511 8.8724 15.4454 9.11719 15.6902ZM9.11719 10.8825C9.36198 11.1273 9.65624 11.2497 9.99998 11.2497C10.3437 11.2497 10.638 11.1273 10.8828 10.8825C11.1276 10.6377 11.25 10.3434 11.25 9.99971C11.25 9.65597 11.1276 9.36171 10.8828 9.11692C10.638 8.87212 10.3437 8.74973 9.99998 8.74973C9.65624 8.74973 9.36198 8.87212 9.11719 9.11692C8.8724 9.36171 8.75 9.65597 8.75 9.99971C8.75 10.3434 8.8724 10.6377 9.11719 10.8825ZM9.11719 6.07481C9.36198 6.3196 9.65624 6.442 9.99998 6.442C10.3437 6.442 10.638 6.3196 10.8828 6.07481C11.1276 5.83003 11.25 5.53577 11.25 5.19202C11.25 4.84829 11.1276 4.55402 10.8828 4.30923C10.638 4.06445 10.3437 3.94206 9.99998 3.94206C9.65624 3.94206 9.36198 4.06445 9.11719 4.30923C8.8724 4.55402 8.75 4.84829 8.75 5.19202C8.75 5.53577 8.8724 5.83003 9.11719 6.07481Z"
                />
              </svg>
            </a-icon>
          </div>
          <a-menu slot="overlay" class="campaignTable--action-menu" @click="(menuItem) => $emit('clickMenuItem', record, menuItem)">
            <a-menu-item key="deactive" v-if="[0, 1].includes(record.type) && record.is_testing_running == 0 && record.formatted_status == 1">
              <img src="/img/ban.png" />
              <span>Deactive</span>
            </a-menu-item>
            <a-menu-item key="active" v-if="[0, 1].includes(record.type) && record.is_testing_running == 0 && record.formatted_status == -1">
              <img src="/img/Check-circle.png" />
              <span>Active</span>
            </a-menu-item>
            <a-menu-item key="rename">
              <img src="/img/rename.png" />
              <span>Rename</span>
            </a-menu-item>
            <a-menu-item key="edit">
              <img src="/img/edit.png" />
              <span>Edit</span>
            </a-menu-item>
            <a-menu-item key="dupplicate" v-if="record.type == 0 || record.type == 1">
              <img src="/img/duplicate file.png" />
              <span>Duplicate</span>
            </a-menu-item>
            <a-menu-item key="ab_testing" v-if="record.type == 0">
              <img src="/img/AB testing.png" />
              <span>A/B Testing</span>
            </a-menu-item>
            <a-menu-item key="start_ab_testing" v-if="record.type == 1 && record.is_testing_running == 0">
              <img src="/img/AB testing.png" />
              <span>Start A/B Testing</span>
            </a-menu-item>
            <a-menu-item key="stop_ab_testing" v-if="record.type == 1 && record.is_testing_running == 1">
              <img src="/img/AB testing.png" />
              <span>Stop A/B Testing</span>
            </a-menu-item>
            <!-- <a-menu-item key="delete">
              <img src="/img/icons/delete.svg" />
              <span>Delete</span>
            </a-menu-item> -->
          </a-menu>
        </a-dropdown>
      </div>
      <!-- END - Column -->

      <!-- Footer -->
      <template slot="footer" class="campaignTable--footer">
        <div class="campaignTable--footer-total">
          <template v-for="f in footer">
            <span class="campaignTable--footer-totalItem">
              <span>{{ f.label }}</span>
              <strong>{{ f.value }}</strong>
            </span>
          </template>
        </div>
        <a-pagination @change="onChangePagination" :current="pagination.current" :pageSize="pagination.pageSize" :total="pagination.total" size="large" showQuickJumper class="campaignTable--pagination" />
      </template>
      <!-- END - Footer -->
    </a-table>

    <!-- Empty -->

    <div class="campaignTable--empty-container" v-show="!dataSource.length">
      <a-spin :spinning="loading">
        <a-empty image="/img/notification.png" :image-style="{ height: '120px' }" class="campaignTable--empty">
          <span slot="description">There is no campaign at the moment</span>
          <a-button @click="(e) => $emit('create', e)" type="primary" size="large" ghost>
            <a-icon>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.5 9.75H9.75V13.5C9.75 13.9125 9.4125 14.25 9 14.25C8.5875 14.25 8.25 13.9125 8.25 13.5V9.75H4.5C4.0875 9.75 3.75 9.4125 3.75 9C3.75 8.5875 4.0875 8.25 4.5 8.25H8.25V4.5C8.25 4.0875 8.5875 3.75 9 3.75C9.4125 3.75 9.75 4.0875 9.75 4.5V8.25H13.5C13.9125 8.25 14.25 8.5875 14.25 9C14.25 9.4125 13.9125 9.75 13.5 9.75Z" />
              </svg>
            </a-icon>
            Add new campaign
          </a-button>
        </a-empty>
      </a-spin>
    </div>
  </div>
</template>

<script>
// page=1
// items_per_page=10
// sort_by=updated_at
// sort_order=desc
// site_id=1,10
// client_id=5,13
// creator_id=1,15
// from_created_at=2024-11-26 07:00:00
// to_created_at=2024-11-27 07:00:00
// from_updated_at=2024-11-26 07:00:00
// to_updated_at=2024-11-27 07:00:00
// display_type=9,1
// is_sponsor=1
// keyword=virus
// status=1,-1

import Api from '@/api';
import { FORMAT_DAY, FORMAT_DAY_API } from '@/constants';
import { API_PATH } from '@/constants/api-constants';
import { CAMPAIGN_STATUS, CAMPAIGN_STATUS_OPTION, DISPLAY_TYPES, PAGE_SIZE } from '@/constants/app-constants';
import { SITES, SITE_DOMAINS } from '@/constants/site';
import { getTableScroll, formatNumberString } from '@/utils';

const CAMPAIGN_COLUMNS = [
  { key: 'name', dataIndex: 'name', align: 'left', slots: { title: 'name_title_slot' }, scopedSlots: { customRender: 'nameCol' }, width: 280 },
  { key: 'site', dataIndex: 'site', align: 'left', title: 'Site', scopedSlots: { customRender: 'siteCol' }, width: 64 },
  { key: 'client', dataIndex: 'client', align: 'left', title: 'Client', scopedSlots: { customRender: 'clientCol' }, width: 160 },
  { key: 'creator', dataIndex: 'creator', align: 'left', title: 'Creator', scopedSlots: { customRender: 'creatorCol' }, width: 160 },
  { key: 'status', dataIndex: 'status', align: 'left', title: 'Status', scopedSlots: { customRender: 'statusCol' }, width: 68 },
  { key: 'device_types', dataIndex: 'device_types', align: 'left', title: 'Devices', scopedSlots: { customRender: 'devicesCol' }, width: 79 },
  { key: 'display_type', dataIndex: 'display_type', align: 'left', title: 'Template', scopedSlots: { customRender: 'templateCol' }, width: 120 },
  { key: 'updated_at', dataIndex: 'updated_at', align: 'left', sorter: true, defaultSortOrder: 'descend', title: 'Update Date', scopedSlots: { customRender: 'createdAtCol' }, width: 160 },
  { key: 'created_at', dataIndex: 'created_at', align: 'left', sorter: true, title: 'Create Date', scopedSlots: { customRender: 'createdAtCol' }, width: 160 },
  { key: 'timeframe', dataIndex: 'timeframe', align: 'left', title: 'Timeframe', scopedSlots: { customRender: 'timeframeCol' }, width: 160 },
  { key: 'action', dataIndex: 'action', align: 'left', title: 'Action', scopedSlots: { customRender: 'actionCol' }, width: 64 },
];
const CAMPAIGN_COLUMNS_INSIGHT = [
  { key: 'name', dataIndex: 'name', align: 'left', slots: { title: 'name_title_slot' }, scopedSlots: { customRender: 'nameCol' }, width: 280 },
  { key: 'total_impression', dataIndex: 'total_impression', align: 'right', title: 'Impressions', customRender: (number) => formatNumberString(number), width: 108 },
  {
    key: 'conversion_rate',
    dataIndex: 'conversion_rate',
    align: 'right',
    title: 'Conversion rate',
    customRender(_, record) {
      return record.total_impression ? `${Number((record.total_lead / record.total_impression) * 100).toFixed(2)}%` : '0.00%';
    },
    width: 108,
  },
  { key: 'total_lead', dataIndex: 'total_lead', align: 'right', title: 'Leads', customRender: (number) => formatNumberString(number), width: 108 },
  { key: 'total_click', dataIndex: 'total_click', align: 'right', title: 'Clicks', customRender: (number) => formatNumberString(number), width: 108 },
  { key: 'total_submit', dataIndex: 'total_submit', align: 'right', title: 'Submits', customRender: (number) => formatNumberString(number), width: 108 },
  { key: 'total_bounce', dataIndex: 'total_bounce', align: 'right', title: 'Bounces', customRender: (number) => formatNumberString(number), width: 108 },
  { key: 'total_visitor', dataIndex: 'total_visitor', align: 'right', title: 'Unique user', customRender: (number) => formatNumberString(number), width: 108 },
  { key: 'total_habit_exit', dataIndex: 'total_habit_exit', align: 'right', title: 'Habit exits', customRender: (number) => formatNumberString(number), width: 108 },
  { key: 'total_intentional_exit', dataIndex: 'total_intentional_exit', align: 'right', title: 'Intentional exits', customRender: (number) => formatNumberString(number), width: 140 },
];

var tableScrollDebounce = null;

function getTableScrollX(columns) {
  return columns.reduce((total, col) => {
    return total + (col.width || 0) * 1.5;
  }, 0);
}

function formatDataSourceForCampaignTable(dataSource) {
  return dataSource.map((data) => {
    var newData = { ...data };
    try {
      if (data.site && data.site.name) {
        newData.site = { ...data.site, ...SITES[SITE_DOMAINS[data.site.name]] };
      }
      if (data.created_at) {
        newData.created_at = moment(data.created_at).format(FORMAT_DAY);
      }
      if (data.updated_at) {
        newData.updated_at = moment(data.updated_at).format(FORMAT_DAY);
      }
      if (!data.ended_at && !data.started_at) {
        newData.timeframe = { type: 'Start now/On going', on_time: '' };
      } else {
        var startedAt = moment(data.started_at).format(FORMAT_DAY);
        var endedAt = moment(data.ended_at).format(FORMAT_DAY);
        newData.timeframe = { type: `${startedAt} - ${endedAt}`, on_time: '' };
      }
      const appearenceTime = data.rules.find((r) => r.rule === 'appearance_time');

      if (appearenceTime && appearenceTime.value.startTime && appearenceTime.value.endTime) {
        newData.timeframe.on_time = `${appearenceTime.value.startTime} - ${appearenceTime.value.endTime}`;
      }

      if (typeof data.display_type === 'number') {
        newData.display_type = DISPLAY_TYPES[data.display_type];
      }

      if (data.formatted_status === 0) {
        newData.statusTag = { ...CAMPAIGN_STATUS_OPTION[data.formatted_status] };
      } else if (data.formatted_status === 4 && data.is_schedule) {
        newData.statusTag = { ...CAMPAIGN_STATUS_OPTION[CAMPAIGN_STATUS.STATE_SCHEDULE] };
      } else if (data.formatted_status === 3) {
        newData.statusTag = CAMPAIGN_STATUS_OPTION[CAMPAIGN_STATUS.STATE_EXPIRED];
      }

      if (data.type == 2 || ([0, 1].includes(data.type) && data.is_testing_running == 0)) {
        newData.statusTag = CAMPAIGN_STATUS_OPTION[data.formatted_status];
      } else if (data.type == 2 || ([0, 1].includes(data.type) && data.is_testing_running == 1)) {
        newData.statusTag = CAMPAIGN_STATUS_OPTION[data.formatted_status];
      }
    } catch (error) {}

    return newData;
  });
}

function getFooterContent(columnType, dataSourceMeta) {
  if (!!columnType) {
    return [
      { label: 'Impressions', value: formatNumberString(dataSourceMeta.total_impressions || 0) },
      { label: 'Leads', value: formatNumberString(dataSourceMeta.total_leads || 0) },
      { label: 'Submits', value: formatNumberString(dataSourceMeta.total_submits || 0) },
    ];
  }
  return [{ label: 'Total Campaign', value: formatNumberString(dataSourceMeta.total_items || 0) }];
}

export default {
  name: 'CampaignTable',
  props: ['triggerGetList'],
  data() {
    return {
      sites: [],
      clients: [],
      status: Object.keys(CAMPAIGN_STATUS_OPTION)
        .filter((k) => [CAMPAIGN_STATUS.STATE_ACTIVE, CAMPAIGN_STATUS.STATE_INACTIVE, CAMPAIGN_STATUS.STATE_EXPIRED, CAMPAIGN_STATUS.STATE_SCHEDULE, CAMPAIGN_STATUS.STATE_AB_TESTING].some((i) => i == k))
        .map((k) => {
          return { ...CAMPAIGN_STATUS_OPTION[k], label: CAMPAIGN_STATUS_OPTION[k].label, value: k };
        }),
      displayTypes: Object.keys(DISPLAY_TYPES).map((k) => {
        return { label: DISPLAY_TYPES[k], value: k };
      }),
      loadingClients: false,

      loading: false,
      columnType: 0,
      columns: CAMPAIGN_COLUMNS,
      dataSource: [],
      dataSourceMeta: {},
      scroll: { x: getTableScrollX(CAMPAIGN_COLUMNS) },

      formFilter: this.$form.createForm(this, { name: 'formFilter' }),
      params: {
        keyword: '',
        site_id: '',
        client_id: [],
        sort_by: 'updated_at',
        sort_order: 'desc',
        display_type: '',
        is_sponsor: '',
        from_created_at: '',
        to_created_at: '',
        status: '',
      },
      footer: getFooterContent(0, {}),
      pagination: {
        current: 1,
        pageSize: PAGE_SIZE,
        total: 100,
      },

      sitesCount: 0,
      clientsCount: 0,
      formFilterCount: 0,
      isFixedSite: false,
      isFixedClient: false,
      isFixedFormFilter: false,
    };
  },

  methods: {
    getList(paramsProps) {
      this.loading = true;
      const params = { ...this.params, client_id: this.params.client_id.join(','), page: this.pagination.current, items_per_page: this.pagination.pageSize, ...paramsProps };
      Object.keys(params).forEach((k) => {
        const isDeleteParams = typeof params[k] === 'undefined' || (typeof params[k] === 'string' && !params[k]) || (Array.isArray(params[k]) && !params[k].length);
        if (isDeleteParams) {
          delete params[k];
        }
      });

      Api.get(API_PATH.CAMPAIGN, { params })
        .then((res) => {
          if (res.data && res.data._data) {
            const { models, pagination } = res.data._data || {};
            this.dataSource = formatDataSourceForCampaignTable(models || []);
            if (pagination) {
              var { items_per_page, current, total_items } = pagination || {};
              this.pagination.total = total_items;
              this.pagination.current = current;
              this.pagination.pageSize = items_per_page;
              this.dataSourceMeta = pagination;
              this.footer = getFooterContent(this.columnType, pagination);
            }
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    onChangeTable(_, _filter, sorter, { currentPageData }) {
      if (sorter) {
        if (sorter.order) {
          this.params.sort_by = sorter.field;
          this.params.sort_order = sorter.order === 'ascend' ? 'asc' : 'desc';
        } else {
          this.params.sort_by = '';
          this.params.sort_order = '';
        }
        this.columns = this.columns.map((col) => {
          if (col.key === sorter.field) {
            const sortOrder = sorter.order;
            return { ...col, sortOrder };
          }
          return { ...col, sortOrder: null };
        });
        this.getList();
      }
    },
    onChangePagination(page, pageSize) {
      this.pagination = { ...this.pagination, current: page, pageSize };
      this.getList();
    },
    onSearch() {
      this.pagination.current = 1;
      this.getList();
    },
    onResetSites() {
      this.isFixedSite = false;
      this.sitesCount = 0;
      this.params.site_id = null;
      this.clientsCount = 0;
      this.clients = [];
      this.params.client_id = [];
      this.pagination.current = 1;
      this.getList();
    },
    onApplySites() {
      Api.get(API_PATH.CLIENTS, { params: { site_ids: this.params.site_id } }).then((res) => {
        if (res.data && res.data._data) {
          const { models = [] } = res.data._data || {};
          this.clients = models;
        }
      });
      this.pagination.current = 1;
      this.params.client_id = [];
      this.clientsCount = 0;
      this.isFixedSite = true;
      this.sitesCount = typeof this.params.site_id === 'number' ? 1 : 0;

      this.getList();
    },
    onVisibleChangeSites(visible) {
      if (!visible && !this.isFixedSite) {
        this.sitesCount = 0;
        this.params.site_id = null;
      }
    },
    onResetClients() {
      this.isFixedClient = false;
      this.pagination.current = 1;
      this.clientsCount = 0;
      this.params.client_id = [];
      this.getList();
    },
    onApplyClients() {
      this.isFixedClient = true;
      this.pagination.current = 1;
      this.clientsCount = this.params.client_id.length;
      this.getList();
    },
    onVisibleChangeClients(visible) {
      if (!visible && !this.isFixedClient) {
        this.params.client_id = [];
      }
    },
    onResetForm() {
      this.formFilter.resetFields();
      this.formFilterCount = 0;
      this.isFixedFormFilter = false;
      this.pagination.current = 1;
      this.onSubmitFormFilter();
    },
    onApplyForm() {
      this.isFixedFormFilter = true;
      this.onSubmitFormFilter();
    },
    onVisibleChangeFormFilter(visible) {
      if (!visible && !this.isFixedFormFilter) {
        this.formFilter.resetFields();
        this.formFilterCount = 0;
      }
    },
    onSubmitFormFilter() {
      this.formFilter.validateFields((err, fieldsValue) => {
        if (err) {
          return;
        }
        this.params.display_type = fieldsValue.display_type ? fieldsValue.display_type.join(',') : '';
        this.params.is_sponsor = typeof fieldsValue.is_sponsor === 'number' ? fieldsValue.is_sponsor : '';
        if (fieldsValue.created_at && fieldsValue.created_at[0] && fieldsValue.created_at[1]) {
          this.params.from_created_at = fieldsValue.created_at[0].startOf('day').format(FORMAT_DAY_API);
          this.params.to_created_at = fieldsValue.created_at[1].endOf('day').format(FORMAT_DAY_API);
        } else {
          this.params.from_created_at = '';
          this.params.to_created_at = '';
        }
        if (fieldsValue.updated_at && fieldsValue.updated_at[0] && fieldsValue.updated_at[1]) {
          this.params.from_updated_at = fieldsValue.updated_at[0].startOf('day').format(FORMAT_DAY_API);
          this.params.to_updated_at = fieldsValue.updated_at[1].endOf('day').format(FORMAT_DAY_API);
        } else {
          this.params.from_updated_at = '';
          this.params.to_updated_at = '';
        }
        this.params.status = fieldsValue.status ? fieldsValue.status.join(',') : '';

        this.pagination.current = 1;

        this.formFilterCount = Object.values(fieldsValue).filter((val) => {
          if (Array.isArray(val)) {
            return !!val.length;
          }
          if (typeof val === 'undefined') {
            return false;
          }
          return true;
        }).length;

        this.getList();
      });
    },
    onCopyCode(code) {
      navigator.clipboard.writeText(code);
      this.$notify({
        title: `Campaign code <strong>${code}</strong> is copied!`,
        type: 'success',
      });
    },
    tableScrollOnResize() {
      if (tableScrollDebounce) {
        clearTimeout(tableScrollDebounce);
      }
      tableScrollDebounce = setTimeout(() => {
        var $tableEl = document.getElementsByClassName('ant-table-wrapper');
        if ($tableEl) {
          var scroll = getTableScroll($tableEl[0]);
          this.scroll = { ...this.scroll, ...scroll };
        }
      }, 250);
    },
  },
  computed: {},
  watch: {
    triggerGetList() {
      this.getList();
    },
    columnType(newVal) {
      this.columns = newVal ? CAMPAIGN_COLUMNS_INSIGHT : CAMPAIGN_COLUMNS;
      this.scroll.x = getTableScrollX(this.columns);
      this.footer = getFooterContent(newVal, this.dataSourceMeta);
    },
  },
  created() {
    Api.get(API_PATH.SITES).then((res) => {
      this.sites = res.data._data?.models.map((site) => {
        if (SITES?.[SITE_DOMAINS?.[site.name]]) {
          return { ...site, ...SITES[SITE_DOMAINS[site.name]] };
        }
        return { ...site };
      });
    });
    this.getList();
  },
  mounted() {
    this.tableScrollOnResize();
    window.addEventListener('resize', this.tableScrollOnResize);
  },
  beforeMount() {},
  beforeDestroy() {
    window.removeEventListener('resize', this.tableScrollOnResize);
  },
};
</script>

<style lang="scss">
@import './CampaignTable.scss';
.le-app-router-content {
  height: 100vh;
  .le-page {
    height: 100%;
  }
}
</style>
