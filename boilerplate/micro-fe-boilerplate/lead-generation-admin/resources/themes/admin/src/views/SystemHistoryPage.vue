<template>
  <div class="le-system-history-page">
    <nav class="le-fixed-topnav">
        <div class="height-100% padding-left-xl padding-right-xl">
          <div class="grid items-center justify-end height-100%">
              <h2 class="font-normal">RECENT HISTORY</h2>
          </div>
        </div>
    </nav>
    <!-- History -->
    <div class="le-system-history-list margin-top-xxxxl">
        <v-alert class="margin-left-xl margin-right-xl" v-show="histories.length == 0"
            close-text="Close Alert"
            dense
            outlined
            type="info"
            dismissible
          >
          {{ message }}
        </v-alert>
        <v-simple-table v-show="histories.length > 0" class="padding-left-xl padding-right-xl">
          <template v-slot:default>
            <tbody>
              <tr v-for="(item, idx) in histories" :key="item.name">
                <td width="10%">
                    <div class="icon-wrapper">
                        <div v-if="idx < histories.length - 1" class="vertical-line"></div>
                        <div class="icon-circle"
                          v-bind:style="{backgroundColor: `${item.icon.bg_color}`, border: `1px solid ${item.icon.border_color}`}">
                          <img
                          :src="item.icon.icon" width="20" />
                        </div>
                    </div>
                </td>
                <td class="le-system-history-list-action" width="70%"><strong>{{ item.username }}</strong> <span v-html="item.action"></span></td>
                <td width="5%" class="text-right history-icon">
                    <img class="icon-clock" src="/img/icons/icon-clock.svg" width="16" />
                </td>
                <td class="text-right"><span :title="dayAgo(item.time)" class="font-light history-time">{{ item.time }}</span></td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <div v-show="histories.length > 0" class="le-system-pagination text-right padding-left-xl padding-right-xl">
            <span v-if="page > 1" class="cursor-pointer" v-on:click="setPage(pagination.prev_page)">
                <v-icon>mdi-chevron-left</v-icon>
                Previous
            </span>
            <span v-if="page < pagination.total_pages" class="cursor-pointer" v-on:click="setPage(pagination.next_page)">
                Next
                <v-icon>mdi-chevron-right</v-icon>
            </span>
        </div>
    </div>
  </div>
</template>

<script>
import Api from '../api';
import { API_PATH, API_STATUS } from '../constants/api-constants';
import { HISTORY_ICON } from '../constants/app-constants';
import { ROUTER } from '../constants/router-constant';
export default {
    data () {
      return {
        histories: [],
        message: '',
        // Pagination
        page: 1,
        pagination: {
            prev_page: 1,
            next_page: 1,
            total_pages: 1
        },
      }
    },
    methods: {
        getHistory() {
            Api.get(API_PATH.LIST_HISTORY + '?page=' + this.page)
              .then((res) => res.data)
              .then((res) => {
                  console.log(res)
                  const history = res.history
                  if (history.length > 0) {
                      this.pagination.prev_page = res.prev_page
                      this.pagination.next_page = res.next_page
                      this.pagination.total_pages = res.total_pages
                      this.histories = history.map((item) => ({
                          icon: (typeof HISTORY_ICON[item.icon.toUpperCase()] !== "undefined") ? HISTORY_ICON[item.icon.toUpperCase()] : '',
                          username: item.user.first_name + ' ' + item.user.last_name,
                          action: item.text,
                          time: item.created_at
                      }));
                  } else {
                      this.message = res.message
                  }
              })
        },
        setPage(page) {
            this.page = page
            this.getHistory()
        },
        dayAgo(day) {
          return moment(new Date(day)).fromNow();
        },
    },
    beforeMount() {
        this.getHistory()
    }
  }
</script>
