<template>
  <div>
    <div :class="{'arrow-left': isShow}" class="le-sidebar-fixed-toggle">
      <div title="Click to close filter" v-if="isShow" @click="hideSidebar" class="le-sidebar-fixed-toggle__arrow">
        <!-- <v-icon color="white">mdi-close</v-icon> -->
        <img src="/img/icons/left_collapse.svg" alt />
      </div>
      <div title="Click to open filter" v-if="!isShow" @click="showSidebar" class="le-sidebar-fixed-toggle__arrow">
        <!-- <v-icon color="white">mdi-filter-variant</v-icon> -->
        <img src="/img/icons/right_collapse.svg" alt />
      </div>
    </div>
    <div v-show="isShow" class="le-sidebar-fixed-box">
      <div>
        <div class="le-siderbar-filter-block">
          <div class="relative d-flex justify-between items-center pl-3 pr-3">
            <div v-if=" mode == 'site'">
              Site
              <v-icon class="text-xl mr-1 ml-1" color="white" style="margin-bottom: 2px;">mdi-chevron-right</v-icon>Client
            </div>
            <div v-if=" mode == 'client'">
              Client
              <v-icon class="text-xl mr-1 ml-1" color="white" style="margin-bottom: 2px;">mdi-chevron-right</v-icon>Site
            </div>
            <div class="cursor-pointer" style="margin-bottom: 2px;">
              <v-icon @click="isShowMode = !isShowMode" class="text-lg" color="white">mdi-arrow-down-drop-circle</v-icon>
            </div>
            <div v-if="isShowMode" class="absolute" style="top:calc(100% + 10px);right:5px; z-index: 1">
              <div class="le-sidebar-select-mode">
                <div :class="{'le-active': mode == 'site'}" @click="setMode('site')" class="le-sidebar-select-mode__item">
                  Site
                  <v-icon class="text-xl" style="margin-bottom: 2px;">mdi-chevron-right</v-icon>Client
                </div>
                <div :class="{'le-active': mode == 'client'}" @click="setMode('client')" class="le-sidebar-select-mode__item">
                  Client
                  <v-icon class="text-xl" style="margin-bottom: 2px;">mdi-chevron-right</v-icon>Site
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="padding-xxs" v-if="mode == 'site'">
          <v-text-field title="Press Enter to add filter client" @keyup.enter="addTagSearch" :class="{'has-tag': listClientSearch && listClientSearch.length}" class="le-filter-search-tag text-sm" v-model="searchInput" hide-details prepend-inner-icon="mdi-magnify" label="Solo" :placeholder="'Search client'" dense solo></v-text-field>
          <div v-if="listClientSearch && listClientSearch.length" class="le-filter-tag-search d-flex flex-wrap bg-white padding-x-sm pb-0">
            <div class="le-panel-tag-btn" v-for="(tag, indexTag) in listClientSearch" :key="'tag-'+indexTag">
              <button title="Click to remove" @click="removeTagSearch(indexTag)">✕</button>
              <div>{{tag}}</div>
            </div>
          </div>
        </div>
        <div class="padding-xxs" v-if="mode == 'client'">
          <v-text-field class="le-filter-search-tag text-sm" v-model="searchClientInput" hide-details prepend-inner-icon="mdi-magnify" label="Solo" :placeholder="'Search client'" dense solo></v-text-field>
        </div>
        <div class="mt-3" id="le-all-site-list" style="height: calc(100vh - 200px); overflow: auto;">
          <!-- Client ->  Site -->
          <div v-if="mode == 'client'">
            <div :class="{'le-siderbar-active': isSelectAll}" @click="editApply('site','all-clients')" class="no-select d-flex items-center color-white text-sm px-3 py-3 cursor-pointer">
              <span class="margin-right-xl pr-1"></span>All clients
            </div>
            <div class="relative" v-for="(item, index) in listClientFilter" :key="'client'+index">
              <label :for="'client-check-'+item.id + '-' + index">
                <div class="d-flex items-center color-white text-sm px-3 py-3 cursor-pointer">
                  <v-icon color="white" class="text mr-2">mdi-account</v-icon>
                  {{ item.name }}
                </div>
              </label>
              <input @change="toggleCheckbox" v-model="item.isExpand" :id="'client-check-'+item.id + '-' + index" class="le-sidebar-subitem-check" type="checkbox" />
              <div class="le-sidebar-subitem-check-toggle">
                <div :class="{'le-active': item.isSelectAll }" @click="editApply('site',item)" class="le-sidebar-subitem cursor-pointer">All</div>
                <div :class="{'le-active': d.isSelect }" @click="editApply('site',d, item)" class="le-sidebar-subitem cursor-pointer" v-for="(d) in item.sites" :key="d.id">{{ d.name }}</div>
              </div>
            </div>
            <div class="color-white text-sm text-center padding-md" v-if="searchClientInput && !listClientFilter.length">No clients were found.</div>
          </div>
          <!-- Site -> Client -->
          <div v-if="mode == 'site'">
            <div :class="{'le-siderbar-active': isSelectAll}" @click="editApply('client','all-sites')" class="no-select d-flex items-center color-white text-sm px-3 py-3 cursor-pointer">
              <span class="margin-right-xl pr-1"></span>All sites
            </div>
            <div v-if="listClientSearch && !listClientSearch.length">
              <aside class="relative" v-for="(item, index) in listSiteFilter" :key="'site'+index">
                <label :for="'site-check-'+item.id + '-' + index">
                  <div class="d-flex no-select items-center color-white text-sm px-3 py-3 cursor-pointer">
                    <v-icon color="white" class="text mr-2">mdi-application</v-icon>
                    {{ item.name }}
                  </div>
                </label>
                <input @change="toggleCheckbox" v-model="item.isExpand" :id="'site-check-'+item.id + '-' + index" class="le-sidebar-subitem-check" type="checkbox" />
                <div class="le-sidebar-subitem-check-toggle">
                  <div :class="{'le-active': item.isSelectAll }" @click="editApply('client',item)" class="le-sidebar-subitem cursor-pointer">All</div>
                  <div :class="{'le-active': c.isSelect }" @click="editApply('client',c, item)" class="le-sidebar-subitem cursor-pointer" v-for="c in item.clients" :key="c.id">{{ c.name }}</div>
                </div>
              </aside>
            </div>
            <div v-else>
              <aside class="relative" v-for="(item, index) in listSiteFilterWithTag" :key="'site-filter'+index">
                <label :for="'site-check-'+item.id + '-' + index">
                  <div class="d-flex no-select items-center color-white text-sm px-3 py-3">
                    <v-icon color="white" class="text mr-2">mdi-application</v-icon>
                    <span class="cursor-pointer">{{ item.name }}</span>
                  </div>
                </label>
                <input @change="toggleCheckbox" v-model="item.isExpand" :id="'site-check-'+item.id + '-' + index" class="le-sidebar-subitem-check" type="checkbox" />
                <div class="le-sidebar-subitem-check-toggle">
                  <div :class="{'le-active': c.isSelect }" class="le-sidebar-subitem" v-for="c in item.clients" :key="c.id">{{ c.name }}</div>
                </div>
              </aside>
            </div>
            <div class="color-white text-sm text-center padding-md" v-if="listClientSearch.length && !listSiteFilterWithTag.length">No clients were found.</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from '../../api';
import { API_PATH } from '../../constants/api-constants';
export default {
  data() {
    return {
      searchInput: '',
      searchClientInput: '',
      isShow: false,
      isShowMode: false,
      isSelectAll: true,
      mode: 'site', // client
      listSite: [],
      listClient: [],
      listSiteSelected: [],
      listClientSelected: [],
      listClientSearch: [],
    };
  },
  computed: {
    listSiteFilter() {
      if (this.listClientSearch && !this.listClientSearch.length) {
        return this.listSite;
      }
      return this.listSite.filter((i) =>
        i.clients.some((k) => {
          let isMatch = this.listClientSearch.some((j) =>
            String(k.name).toLowerCase().includes(j.toLowerCase()),
          );
          return isMatch;
        }),
      );
    },
    listSiteFilterWithTag() {
      return this.listSiteFilter.map((i) => ({
        ...i,
        isExpand: true,
        clients: i.clients
          .filter((j) =>
            this.listClientSearch.some((k) =>
              String(j.name).toLowerCase().includes(k.toLowerCase()),
            ),
          )
          .map((i) => ({ ...i, isSelect: false })),
      }));
    },
    listClientFilter() {
      return this.listClient.filter((i) =>
        String(i.name).toLowerCase().includes(this.searchClientInput),
      );
    },
  },
  mounted() {
    this.getListData();
  },
  methods: {
    addTagSearch() {
      if (String(this.searchInput).trim()) {
        this.listClientSearch.push(this.searchInput);
        this.searchInput = '';
        this.$nextTick(function () {
          $('#le-all-site-list').css(
            'height',
            `calc(100vh - ${200 + $('.le-filter-tag-search').height()}px)`,
          );

          this.getDataFilter();
        });
      }
    },
    removeTagSearch(indexTag) {
      this.listClientSearch.splice(indexTag, 1);

      this.$nextTick(function () {
        $('#le-all-site-list').css(
          'height',
          `calc(100vh - ${200 + $('.le-filter-tag-search').height()}px)`,
        );
        this.getDataFilter();
      });
    },
    showSidebar() {
      this.isShow = true;
      document.documentElement.style.setProperty(
        '--le-sidebar-filter-width',
        '200px',
      );
    },
    hideSidebar() {
      this.isShow = false;
      document.documentElement.style.setProperty(
        '--le-sidebar-filter-width',
        '0px',
      );
    },
    setMode(modeName) {
      this.mode = modeName;
      this.isShowMode = false;
      this.getListData();
    },
    getListData() {
      if (this.mode == 'site') {
        this.fetchUsers();
      }
      if (this.mode == 'client') {
        this.fetchClients();
      }
    },
    fetchUsers() {
      Api.get(API_PATH.SITES, { hideLoading: !true }).then((res) => {
        if (res.data._status == 1) {
          this.listSite = res.data._data.models.map((i) => ({
            ...i,
            isExpand: false,
            isSelectAll: true,
            clients: i.clients.map((j) => ({ ...j, isSelect: false })),
          }));
        }
      });
    },
    fetchClients() {
      Api.get(API_PATH.CLIENTS, { hideLoading: !true }).then((res) => {
        if (res.data._status == 1) {
          this.listClient = res.data._data.models.map((i) => ({
            ...i,
            isExpand: false,
            isSelectAll: true,
            sites: i.sites.map((j) => ({ ...j, isSelect: false })),
          }));
        }
      });
    },
    editApply(type, item, parent) {
      // console.log(`😀 editApply ->`, type, item, parent);
      let dataSideBar = {
        site: '',
        client: '',
        type,
      };
      if (['all-sites', 'all-clients'].includes(item)) {
        // Reset
        this.isSelectAll = true;
        this.listSite = this.listSite.map((i) => ({
          ...i,
          isExpand: false,
          isSelectAll: true,
          clients: i.clients.map((j) => ({ ...j, isSelect: false })),
        }));
        this.listClient = this.listClient.map((i) => ({
          ...i,
          isExpand: false,
          isSelectAll: true,
          sites: i.sites.map((j) => ({ ...j, isSelect: false })),
        }));
        this.$emit('applyFilter', dataSideBar);
        this.getDataFilter();
        return;
      }
      this.isSelectAll = false;

      if (parent) {
        // Select items
        item.isSelect = !item.isSelect;
        parent.isSelectAll = false; // parent[type + 's'].every((o) => !o.isSelect);
      } else {
        // Select All
        item.isSelectAll = !item.isSelectAll;
        if (item.isSelectAll) {
          item[type + 's'] = item[type + 's'].map((k) => ({
            ...k,
            isSelect: false,
          }));
        }
      }
      this.getDataFilter();
      // console.log('🐢', dataSideBar);
      // this.$emit('applyFilter', dataSideBar);
    },
    toggleCheckbox(v) {
      this.isSelectAll = false;
      this.getDataFilter();
    },
    getDataFilter() {
      console.log(this.mode);
      let data = [];
      let queryString = '';

      if (this.mode == 'site') {
        // list client
        if (this.listClientSearch && !this.listClientSearch.length) {
          data = this.listSite
            .filter(
              (i) =>
                i.isExpand &&
                (i.isSelectAll || i.clients.some((k) => k.isSelect)),
            )
            .map((i) => ({
              site: i.id,
              clients: i.isSelectAll
                ? ''
                : i.clients
                    .filter((j) => j.isSelect)
                    .map((k) => k.id)
                    .toString(),
            }));
        } else {
          data = this.listSiteFilterWithTag
            .filter((i) => i.isExpand)
            .map((i) => ({
              site: i.id,
              clients: i.clients.map((k) => k.id).toString(),
            }));
        }

        data.forEach((e, eIndex) => {
          queryString += `${eIndex ? '&' : ''}site_id_with_clients[${e.site}]=${
            e.clients
          }`;
        });

        // For search client
      }
      if (this.mode == 'client') {
        // list site
        data = this.listClient
          .filter(
            (i) =>
              i.isExpand && (i.isSelectAll || i.sites.some((k) => k.isSelect)),
          )
          .map((i) => ({
            client: i.id,
            sites: i.isSelectAll
              ? ''
              : i.sites
                  .filter((j) => j.isSelect)
                  .map((k) => k.id)
                  .toString(),
          }));

        data.forEach((e, eIndex) => {
          queryString += `${eIndex ? '&' : ''}client_id_with_sites[${
            e.client
          }]=${e.sites}`;
        });
      }
      console.log('😂', queryString);
      this.$emit('applyFilter', queryString);

      // console.log(`getDataFilter -> data`, JSON.stringify(data));
    },
  },
};
</script>

<style lang="scss">
.le-sidebar-fixed-box {
  width: var(--le-sidebar-filter-width);
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #024aa0;
  z-index: 10;
}
.le-sidebar-fixed-toggle {
  position: fixed;
  top: 50%;
  left: calc(0px + var(--le-sidebar-filter-width));
  transform: translateY(-50%);
  z-index: 99;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  &__arrow {
    &:hover {
      opacity: 0.9;
    }
  }
  &.arrow-left {
    left: calc(-14px + var(--le-sidebar-filter-width));
  }
}
.le-app-router-content {
  transition: all 0.25s ease;
  margin-left: var(--le-sidebar-filter-width);
}
.le-siderbar-filter-block {
  color: white;
  background-color: #003676;
  padding: 10px 0px;
  font-size: 12px;
  font-weight: bold;
  margin-top: 64px;
}
.le-sidebar-select-mode {
  border-radius: 3px;
  color: #707070;
  text-align: center;
  width: 140px;
  background-color: #f5f5f5;
  font-weight: 500;

  &__item {
    padding: 5px 0;
    cursor: pointer;
    &:last-child {
      border-bottom-right-radius: 3px;
      border-bottom-left-radius: 3px;
    }
    &.le-active {
      font-weight: 700;
      background-color: #fff;
      color: #3389f0;
      border-left: 4px solid #3389f0;
    }
  }
}

.le-siderbar-active {
  background-color: rgba(1, 88, 191, 0.62);
  font-weight: bold;
}
.le-sidebar-subitem-check-toggle {
  display: none;
}
.le-sidebar-subitem {
  color: #bce0fd;
  font-size: 13px;
  padding: 7px 5px;
  padding-left: 42px;

  &.le-active {
    background-color: rgba(1, 88, 191, 0.62);
    color: white !important;
    font-weight: bold;
  }
}
.le-sidebar-subitem-check {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  &:checked + .le-sidebar-subitem-check-toggle {
    display: block;
  }
}
.le-filter-search-tag.has-tag {
  .v-input__control {
    .v-input__slot {
      box-shadow: none !important;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
}
.le-filter-tag-search {
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}
</style>

