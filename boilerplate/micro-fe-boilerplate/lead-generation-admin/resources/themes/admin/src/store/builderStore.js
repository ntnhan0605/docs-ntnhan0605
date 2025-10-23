import { getDefaultThankYouSubtitle, getDefaultThankYouTitle } from '@/utils';
import { getWindowOrigin } from '@/views/builder/convertData';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { IS_STAGING } from '@/constants';

const prefix = IS_STAGING ? 'staging.' : 'wp.'

const SITE_ENDPOINT = {
  1: `https://${prefix}hellobacsi.com/wp-json`,
  2: `https://${prefix}hellosehat.com/wp-json`, // Indonesia
  3: `https://${prefix}hellokhunmor.com/wp-json`, // Thailand
  4: `https://${prefix}hellokrupet.com/wp-json`, // Cambodia
  5: `https://${prefix}hellodoktor.com/wp-json`, // Malaysia
  6: `https://${prefix}helloyishi.com.tw/wp-json`, // Taiwan
  7: `https://${prefix}hellosayarwon.com/wp-json`, // Myanmar
  8: `https://${prefix}helloswasthya.com/wp-json`, // India
  9: `https://${prefix}hellodoctor.com.ph/wp-json`, // Philippines
  10: `https://${prefix}marrybaby.vn/wp-json`, // Marrybaby
  11: `https://${prefix}hellobacsi.com/wp-json`,
  12: `https://${prefix}hellobacsi.com/wp-json`,
}

const getDefaultState = () => {
  return {
    layoutSelected: '',
    currentSelectEdit: '',
    currentLayout: '',
    popupShowThankYou: 'show',
    displayOn: 'both',
    displayType: 'Mobile',
    popupInlinePosition: '6th',
    textBlocks: {
      titleBlock: {
        data: {
          value: 'Sample title',
        },
      },
      subtitleBlock: {
        data: {
          value: 'Sample description',
        },
      },
    },
    imageBlocks: {
      imageMobile: {
        data: {
          value: '',
          url: '',
          newtab: true,
        },
      },
      imageDesktop: {
        data: {
          value: '',
          url: '',
          newtab: true,
        },
      },
      imageBackground: {
        data: {
          value: '',
        }
      },
      imageOverlayMobile: {
        data: {
          value: '',
        }
      },
      imageOverlayDesktop: {
        data: {
          value: '',
        }
      },
      imageThankYou: {
        data: {
          value: `${ getWindowOrigin() }/admin/img/thankyou_v2.png`,
        },
      },
    },
    actionBlocks: {
      submitBlock: {
        data: {
          value: 'Submit',
          // text: 'I agree with',
          // text2: 'terms & conditions',
          // url: 'https://hellobacsi.com/chinh-sach/',
        },
      },
      linkButtonBlock: {
        data: {
          value: 'Join now',
          url: '',
          newtab: true,
        },
      },
    },
    listBlockAdded: [],
    listBlockThankyou: [
      {
        name: 'TitleBlock',
        id: uuidv4(),
        data: {
          value: getDefaultThankYouTitle(),
          align: 'center',
        },
      },
      {
        name: 'SubtitleBlock',
        id: uuidv4(),
        data: {
          value: getDefaultThankYouSubtitle(),
          align: 'center',
        },
      },
    ],

    // To use on both CampaignBuilderPage and BuilderDesignLayout
    isShowThankYou: false,

    // Fetch from discover API
    sponsorList: {
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: [],
      8: [],
      9: [],
      10: [],
      11: [],
      12: [],
    }
  };
};
const state = getDefaultState();

export const BUILDER_STORE = {
  STATE: {},
  MUTATIONS: {
    SET_DATA: 'SET_DATA',
  },
  ACTIONS: {},
};

const builderStore = {
  namespaced: true,
  state,
  mutations: {
    [BUILDER_STORE.MUTATIONS.SET_DATA](state, payload) {
      if (!payload.key.split('.').length) {
        state[payload.key] = payload.value;
      } else {
         _.set(state, payload.key, payload.value);
      }
    },
    reset(state) {
      Object.assign(state, getDefaultState(), { sponsorList: state.sponsorList });
    },
    load(state, payload) {
      Object.assign(state, payload);
    },
    setSampleLayoutBlock(state, payload) {
      let name = payload.value;
      // TODO: newbuilder
      let listSampleBlock = [];

      if (name.includes('LightBox') || name.includes('Inline') || name.includes('Sidebar')) {
        listSampleBlock = [
          {
            name: 'TextBlock',
            id: uuidv4(),
            data: {
              placeholder: 'Text',
              value: 'text',
              required: true,
            },
          },
          {
            name: 'EmailBlock',
            id: uuidv4(),
            data: {
              placeholder: 'Email',
              value: 'email',
              required: true,
            },
          },
          {
            name: 'TncBlock',
            id: uuidv4(),
            data: {
              placeholder: 'https://example.com\nhttps://example2.com',
              value: 'I agree with *terms* and *conditions*',
              required: true,
              valueHTML: 'I agree with <a href="https://example.com">terms</a> and <a href="https://example2.com">conditions</a>'
            }
          }
        ];
      }

      if (name.includes('Skin')) {
      }

      if (name.includes('Floating')) {
      }

      if (name.includes('Tab')) {
      }

      if (name.includes('Fullscreen')) {
        listSampleBlock = [
          {
            name: 'EmailBlock',
            id: uuidv4(),
            data: {
              placeholder: 'Email',
              value: 'email',
              required: true,
            },
          },
        ];
      }

      state.listBlockAdded = listSampleBlock;
    },
    setSponsorList(state, { sponsors, siteId }) {
      state.sponsorList = {
        ...state.sponsorList,
        [siteId]: sponsors
      }
    }
  },
  getters: {
    hasPhoneOtpField (state) {
      return !!state.listBlockAdded.find(b => b.name === 'PhoneOtpBlock')
    }
  },
  actions: {
    async ['test']({ commit }) {
      try {
      } catch (error) {
        console.error(error);
      }
    },
    async actFetchSponsor({ commit, state }, siteId) {
      try {
        const sponsorList = state.sponsorList[siteId]
        console.log('sponsorList', sponsorList.length)
        if (sponsorList?.length) {
          return
        }

        const endpoint = SITE_ENDPOINT[siteId]
        const response = await axios.get(`${endpoint}/api/sponsors?per_page=100`)
        const sponsors = response.data.data.sponsors.map(s => ({
          id: s.ID,
          name: s.post_title
        }))
        commit('setSponsorList', { sponsors, siteId })
      } catch (error) {
        console.error('error', error)
      }
    }
  },
};

export default builderStore;
