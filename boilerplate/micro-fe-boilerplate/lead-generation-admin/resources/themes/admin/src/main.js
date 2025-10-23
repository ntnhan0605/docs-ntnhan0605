import Antd from 'ant-design-vue';
import PortalVue from 'portal-vue';
import VTooltip from 'v-tooltip';
import Vue from 'vue';
import Notifications from 'vue-notification';
import vSelect from 'vue-select';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import App from './App';
import router from './router';

import '@/globalComponents.js';
import ScreenLoading from '@/library/screen-loading/index';
import store from '@/store/index';
import VCalendar from 'v-calendar';

import '../public/style.css';
import 'ant-design-vue/dist/antd.css';

import '@/styles/App.scss';
import '@/styles/vue-select.css';

Vue.config.productionTip = false;
Vue.use(Vuetify);
Vue.use(Antd);

// Vue ui library
Vue.use(VTooltip);
Vue.component('v-select-input', vSelect);
Vue.use(Notifications);

// Custom plugin
Vue.use(ScreenLoading);

Vue.use(Vuex);

Vue.use(PortalVue);
// VCalendar
Vue.use(VCalendar, {
  componentPrefix: 'vc',
});

// Custom
// window.store = store
const app = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  vuetify: new Vuetify({
    icons: {
      iconfont: 'mdi', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
    },
    theme: {
      themes: {
        light: {
          primary: '#3389f0',
          secondary: '#0a54ae',
          accent: '#2c87f3',
          error: '#fa140f',
          success: '#46af68',
          gray: '#dadada',
        },
      },
    },
  }),
  render: (h) => h(App),
});

export default app;
