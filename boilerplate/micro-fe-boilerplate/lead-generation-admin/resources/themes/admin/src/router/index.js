import Vue from 'vue';
import Router from 'vue-router';

// Views
import HomePage from '@/views/HomePage';
import LoginPage from '@/views/LoginPage';
import ResetPassByEmailPage from '@/views/ResetPassByEmailPage';
import SignUpPage from '@/views/SignUpPage';
import SignOutThankYouPage from '@/views/SignOutThankYouPage';
import CreateCampaignSuccessPage from '@/views/CreateCampaignSuccessPage';
import CampaignDetailPage from '@/views/CampaignDetailPage';
import ResetPassPage from '@/views/ResetPassPage';
import AccountSettingsPage from '@/views/AccountSettingsPage';
import SystemHistoryPage from '@/views/SystemHistoryPage';
import CampaignPage from '@/views/builder/CampainBuilderPage';
import NotFoundPage from '@/views/NotFoundPage';


import store from '@/store';

import { ROUTER } from '@/constants/router-constant';
import { API_TOKEN } from '@/constants/api-constants';
import { LOCALSTORAGE } from '@/constants/app-constants';
import { IS_DEV } from '@/utils';

Vue.use(Router);

const router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: HomePage,
    },
    {
      path: ROUTER.LOGIN.path,
      name: ROUTER.LOGIN.name,
      component: LoginPage,
    },
    {
      path: ROUTER.RESET_PASS.path + '/:token',
      name: ROUTER.RESET_PASS.name,
      component: ResetPassPage,
    },
    {
      path: ROUTER.RESET_PASS_BY_EMAIL.path,
      name: ROUTER.RESET_PASS_BY_EMAIL.name,
      component: ResetPassByEmailPage,
    },
    {
      path: ROUTER.SIGN_UP.path,
      name: ROUTER.SIGN_UP.name,
      component: SignUpPage,
    },
    {
      path: ROUTER.SIGN_OUT_THANK_YOU.path,
      name: ROUTER.SIGN_OUT_THANK_YOU.name,
      component: SignOutThankYouPage,
    },
    {
      path: ROUTER.NEW_CAMPAIGN.path,
      name: ROUTER.NEW_CAMPAIGN.name,
      component: CampaignPage,
    },
    {
      path: ROUTER.EDIT_CAMPAIGN.path + '/:id',
      name: ROUTER.EDIT_CAMPAIGN.name,
      component: CampaignPage,
      meta: {
        mode: 'edit',
      },
    },
    //
    {
      path: ROUTER.CREATE_CAMPAIGN_SUCCESS.path,
      name: ROUTER.CREATE_CAMPAIGN_SUCCESS.name,
      component: CreateCampaignSuccessPage,
    },
    {
      path: ROUTER.DETAILS_CAMPAIGN.path + '/:id',
      name: ROUTER.DETAILS_CAMPAIGN.name,
      component: CampaignDetailPage,
    },
    {
      path: ROUTER.ACCOUNT_SETTINGS.path,
      name: ROUTER.ACCOUNT_SETTINGS.name,
      component: AccountSettingsPage,
    },
    {
      path: ROUTER.SYSTEM_HISTORY.path,
      name: ROUTER.SYSTEM_HISTORY.name,
      component: SystemHistoryPage,
    },
    {
      path: '*',
      name: 'notfound',
      component: NotFoundPage,
    },
  ],
});

// Ensures all pending requests are cancelled on route change
router.beforeEach((to, from, next) => {
  const isSTG = location.host == "dev.leadgen.hellobacsi.com";
  document.title = (isSTG ? '[STG] ' : '') + (IS_DEV ? '[DEV] ': '') + ' Lead v3.0 ' + _.get(to, 'name', 'Collection');
  // Cancel all request before page active
  store.dispatch('cancelRequest/CANCEL_PENDING_REQUESTS');
  const hasToken = localStorage.getItem(API_TOKEN.ACCESS_TOKEN);

  // List router allow when not login
  const listRouteNotLogin = [ROUTER.SIGN_UP.name, ROUTER.RESET_PASS_BY_EMAIL.name, ROUTER.RESET_PASS.name, ROUTER.SIGN_OUT_THANK_YOU.name];
  if (!hasToken && !listRouteNotLogin.includes(to.name) && to.name !== ROUTER.LOGIN.name) next(ROUTER.LOGIN.path);

  // List route redirect when has login
  const listRouteRedirect = [ROUTER.SIGN_UP.name, ROUTER.LOGIN.name, ROUTER.SIGN_OUT_THANK_YOU.name];
  if (hasToken && listRouteRedirect.includes(to.name)) {
    next('/');
  }
  const userData = localStorage.getItem(LOCALSTORAGE.USER);
  if (hasToken && userData) {
    try {
      store.commit('auth/SET_DATA', {
        key: 'userData',
        value: JSON.parse(userData),
      });
    } catch (error) {
      console.error('Cant load userdata', error);
    }
  }

  // Others case
  next();
});

export default router;
