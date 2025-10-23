<template>
  <nav class="le-nav-fixed-menu" >
    <div class="sidebar-menu max-width-400 animate__animated animate__fadeIn animate__faster" >
      <div class="sidebar-menu__content box box-xxs">
        <header class="flex items-end gap-md margin-top-n-xl">
          <div class="sidebar-menu__avatar">
            <div class="crop crop--1:1 radius-50%">
              <div class="no-select crop__content crop__content--center">{{user.first_name ? user.first_name.split('')[0] : ''}}{{user.last_name?user.last_name.split('')[0]:''}}</div>
            </div>
          </div>
          <div class="text-component padding-bottom-xs">
            <p class="font-normal margin-bottom-xxs">{{ user.first_name }} {{ user.last_name }}</p>
            <p class="text-sm color-gray-200" style="overflow: hidden;text-overflow: ellipsis;max-width: 200px;" :title="user.email">{{user.email}}</p>
          </div>
        </header>
        <div class="sidebar-menu__body margin-y-sm">
          <div class="flex justify-between">
            <!-- <div>
              <p class="text-sm color-gray-200">Active campaigns</p>
            </div>
            <div>
              <p class="text-sm">2/2</p>
            </div>-->
          </div>
          <div class="progress-bar js-progress-bar flex flex-column items-center margin-top-xs margin-bottom-md">
            <div class="progress-bar__bg width-100%" aria-hidden="true">
              <div class="progress-bar__fill" style="width: 100%;"></div>
            </div>
          </div>
        </div>
        <footer>
          <nav class="flex flex-column gap-sm">
            <a @click="gotoSetting" href="javascript:void(0)" class="sidebar-menu__link">Setting</a>
            <a @click="gotoSystemHistory" href="javascript:void(0)" class="sidebar-menu__link">System History</a>
            <a @click="logOut" href="javascript:void(0)" class="sidebar-menu__link">Log out</a>
          </nav>
        </footer>
      </div>
    </div>
  </nav>
</template>

<script>
import { API_PATH, API_STATUS, API_TOKEN } from '@/constants/api-constants';
import Api from '@/api';
import { ROUTER } from '@/constants/router-constant';
import { LOCALSTORAGE } from '@/constants/app-constants';

export default {
  props: ['user'],
  methods: {
    resetPass() {
      this.$router.push({
        path: ROUTER.RESET_PASS.path,
      });
    },
    gotoSetting() {
      if (this.$route.name !== ROUTER.ACCOUNT_SETTINGS.name) {
        this.$router.push({
          path: ROUTER.ACCOUNT_SETTINGS.path,
        });
      }
    },
    gotoSystemHistory() {
      if (this.$route.name !== ROUTER.SYSTEM_HISTORY.name) {
        this.$router.push({
          path: ROUTER.SYSTEM_HISTORY.path,
        });
      }
    },
    logOut() {
      Api.get(API_PATH.LOGOUT, { withCredentials: false })
        .then((res) => {
          if (res.data._status == API_STATUS.SUCCESS) {
            localStorage.removeItem(API_TOKEN.ACCESS_TOKEN);
            localStorage.removeItem(LOCALSTORAGE.USER);
            this.$router.push(ROUTER.SIGN_OUT_THANK_YOU.path);
          }
        })
        .catch((e) => {
          localStorage.removeItem(API_TOKEN.ACCESS_TOKEN);
          localStorage.removeItem(LOCALSTORAGE.USER);
          location.reload();
          console.error(e);
        });
    },
  },
};
</script>

<style scoped>
.le-nav-fixed-menu {
  position: fixed;
  left:  calc(var(--le-sidebar-filter-width) + var(--le-left-side-bar-width));
  top: 80px;
  background: white;
  min-width: 400px;
  margin-left: -5px;
}
</style>
