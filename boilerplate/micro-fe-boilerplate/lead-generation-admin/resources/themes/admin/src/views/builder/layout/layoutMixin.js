import { createNamespacedHelpers } from 'vuex';
const { mapState, mapMutations } = createNamespacedHelpers('builder');

export const layoutMixin = {
  data() {
    return {
      isCollapseBlock: false,
      listBlockNameThankyou: ['TitleBlock', 'SubtitleBlock', 'LinkButtonBlock'],
    };
  },
  computed: {
    ...mapState(['imageBlocks', 'actionBlocks', 'textBlocks']),
    popupShowThankYou: {
      get() {
        return this.$store.state.builder.popupShowThankYou;
      },
      set(value) {
        this.$store.commit('builder/SET_DATA', {
          key: 'popupShowThankYou',
          value,
        });
      },
    },
    listBlockAdded: {
      get() {
        // https://hhgdev.atlassian.net/browse/EL-157
        if (this.$store.state.builder.currentLayout === 'LightBoxA') {
          return this.$store.state.builder.listBlockAdded.filter(({ name }) => name === 'LinkButtonBlock');
        }
        return this.$store.state.builder.listBlockAdded;
      },
      set(value) {
        this.$store.commit('builder/SET_DATA', {
          key: 'listBlockAdded',
          value,
        });
      },
    },
    listBlockThankyou: {
      get() {
        return this.$store.state.builder.listBlockThankyou;
      },
      set(value) {
        this.$store.commit('builder/SET_DATA', {
          key: 'listBlockThankyou',
          value,
        });
      },
    },
    imageSize() {
      const listBlockAdded = this.$store.state.builder.listBlockAdded;
      let listAddedSize = 0;
      if (listBlockAdded.length) {
        listAddedSize = this.$store.state.builder.listBlockAdded
          .map((i) => {
            if (['CheckboxBlock'].includes(i.name)) {
              return 115;
            } else if (['DropdownBlock'].includes(i.name)) {
              return 110;
            } else if (['RadioBlock'].includes(i.name)) {
              return 115;
            } else {
              return 50;
            }
          })
          .reduce((a, b) => a + b);
      }

      return {
        //Desktop
        DesktopLighBboxA: '600x400',
        DesktopLightBoxB: `375x${200 + listAddedSize}`,
        DesktopInlineA: '375x240',
        DesktopInlineB: `375x${220 + listAddedSize}`,
        DesktopSkinA: '250x640',
        DesktopSkinB: '2000x280',
        DesktopSidebar: '375x240',
        DesktopSlider: '420x240',
        DesktopFullscreen: '1980x1080',
        DesktopTab: '75x75',
        DesktopCenterTab: '450x450',
        DesktopFloating: '120x120',
        // Mobile
        MobileLightBox: '600x400',
        MobileInline: '375x240',
        MobileCenterTab: '350x350',
        MobileTab: '75x75',
        MobileSkin: '375x240',
        MobileFloating: '90x90',
      };
    },
  },
  methods: {
    ...mapMutations(['SET_DATA']),
    addNewBlock(blockName) {
      const isExistOTPField = this.listBlockAdded.find((o) => o.name === 'PhoneOtpBlock');
      const isExistWhatsappOTPField = this.listBlockAdded.find((o) => o.name === 'WhatsappOtpBlock');
      const isExistZaloOTPField = this.listBlockAdded.find((o) => o.name === 'ZaloOtpBlock');
      const isExistLocationField = this.listBlockAdded.find((o) => o.name === 'LocationBlock');

      if (isExistOTPField && blockName === 'PhoneOtpBlock') {
        this.$notify({
          title: 'The Phone OTP field already exist.',
          type: 'warning',
        });
        return;
      } else if (isExistOTPField && blockName === 'WhatsappOtpBlock') {
        this.$notify({
          title: 'Please remove the Phone OTP field before adding the WhatsApp OTP field.',
          type: 'warning',
        });
        return;
      } else if (isExistOTPField && blockName === 'ZaloOtpBlock') {
        this.$notify({
          title: 'Please remove the Phone OTP field before adding the Zalo OTP field.',
          type: 'warning',
        });
        return;
      }

      if (isExistWhatsappOTPField && blockName === 'WhatsappOtpBlock') {
        this.$notify({
          title: 'The WhatsApp OTP field already exist.',
          type: 'warning',
        });
        return;
      } else if (isExistWhatsappOTPField && blockName === 'PhoneOtpBlock') {
        this.$notify({
          title: 'Please remove the WhatsApp OTP field before adding the Phone OTP field.',
          type: 'warning',
        });
        return;
      } else if (isExistWhatsappOTPField && blockName === 'ZaloOtpBlock') {
        this.$notify({
          title: 'Please remove the WhatsApp OTP field before adding the Zalo OTP field.',
          type: 'warning',
        });
        return;
      }

      if (isExistZaloOTPField && blockName === 'ZaloOtpBlock') {
        this.$notify({
          title: 'The Zalo OTP field already exist.',
          type: 'warning',
        });
        return;
      } else if (isExistZaloOTPField && blockName === 'PhoneOtpBlock') {
        this.$notify({
          title: 'Please remove the Zalo OTP field before adding the Phone OTP field.',
          type: 'warning',
        });
        return;
      } else if (isExistZaloOTPField && blockName === 'WhatsappOtpBlock') {
        this.$notify({
          title: 'Please remove the Zalo OTP field before adding the WhatsApp OTP field.',
          type: 'warning',
        });
        return;
      }

      if (isExistLocationField && blockName === 'LocationBlock') {
        this.$notify({
          title: 'The Location field already exist.',
          type: 'warning',
        });
        return;
      }

      console.log(`addNewBlock -> block`, blockName);
      let dataAdd = {
        value: '',
        required: true,
      };
      if (['PhoneBlock', 'TextBlock', 'DateBlock', 'EmailBlock', 'NumberBlock'].includes(blockName)) {
        dataAdd.value = String(blockName.replace(/Block/g, '')).toLowerCase();
        dataAdd.placeholder = blockName.replace(/Block/g, '');
      }
      if (blockName === 'PhoneOtpBlock') {
        dataAdd.value = 'phone';
        dataAdd.placeholder = 'Phone number';

        this.popupShowThankYou = 'show';
      }
      if (blockName === 'WhatsappOtpBlock') {
        dataAdd.value = 'phone';
        dataAdd.placeholder = 'WhatsApp number';

        this.popupShowThankYou = 'show';
      }
      if (blockName === 'ZaloOtpBlock') {
        dataAdd.value = 'phone';
        dataAdd.placeholder = 'Zalo number';

        this.popupShowThankYou = 'show';
      }
      if (blockName === 'LocationBlock') {
        dataAdd.value = 'location';
        dataAdd.placeholder = 'Address';
      }
      if (blockName == 'TitleBlock') {
        dataAdd.value = 'Sample title';
      }
      if (blockName == 'SubtitleBlock') {
        dataAdd.value = 'Sample description';
      }
      if (blockName == 'LinkButtonBlock') {
        dataAdd.value = 'Join Now';
        dataAdd.newtab = true;
        dataAdd.url = '';
      }
      if (blockName == 'ImageBlock') {
        dataAdd.newtab = true;
        dataAdd.url = '';
      }
      if (blockName == 'CheckboxBlock') {
        dataAdd.value = 'question';
        dataAdd.placeholder = 'This is question';
        // dataAdd.isSendMailChimp = false;
        dataAdd.listQuestion = [
          {
            value: 'answer1',
            placeholder: 'Answer 1',
          },
          {
            value: 'answer2',
            placeholder: 'Answer 2',
          },
        ];
      }
      if (blockName == 'DropdownBlock') {
        dataAdd.value = 'dropdown';
        dataAdd.placeholder = 'Choose one option';
        dataAdd.listQuestion = [
          {
            value: 'option1',
            placeholder: 'Option 1',
          },
          {
            value: 'option2',
            placeholder: 'Option 2',
          },
        ];
      }
      if (blockName == 'RadioBlock') {
        dataAdd.value = 'question';
        dataAdd.placeholder = 'This is radio question';
        dataAdd.listQuestion = [
          {
            value: 'radio1',
            placeholder: 'Radio 1',
          },
          {
            value: 'radio2',
            placeholder: 'Radio 2',
          },
        ];
      }

      if (blockName == 'TncBlock') {
        dataAdd.value = 'I agree with *terms* and *conditions*';
        dataAdd.placeholder = 'https://example.com\nhttps://example2.com';
        dataAdd.valueHTML = 'I agree with <a href="https://example.com">terms</a> and <a href="https://example2.com">conditions</a>';
      }
      // todo check type
      this.listBlockAdded = [
        ...this.listBlockAdded,
        {
          name: blockName,
          id: Date.now(),
          data: dataAdd,
        },
      ];
    },
    onRemoveBlock(index) {
      console.log('onRemoveBlock', index);
      this.listBlockAdded = this.listBlockAdded.filter((_, idx) => idx !== index);
      this.$store.commit('builder/SET_DATA', {
        key: 'currentSelectEdit',
        value: '',
      });
    },
    getBlockName(name) {
      const blockName = _.startCase(_.camelCase(name));
      return blockName.replace('Whatsapp', 'WhatsApp').replace('Otp', 'OTP').replace('Tnc', 'T&C');
    },
    onHideBlock(name) {
      console.log('onRemoveBlock', name);
      if (name == 'SubmitBlock') {
        this.$store.commit('builder/SET_DATA', {
          key: 'actionBlocks.submitBlock.isHide',
          value: true,
        });
      }
      this.$store.commit('builder/SET_DATA', {
        key: 'currentSelectEdit',
        value: '',
      });
      this.$forceUpdate();
    },
    showHideBlock(name) {
      if (name == 'SubmitBlock') {
        this.$store.commit('builder/SET_DATA', {
          key: 'actionBlocks.submitBlock.isHide',
          value: false,
        });
      }
      this.$forceUpdate();
    },
    // Thank you
    addNewThankYouBlock(blockName) {
      console.log('blockName', blockName);
      let dataAdd = {
        value: '',
      };
      if (blockName == 'TitleBlock') {
        dataAdd.value = 'Sample title';
        dataAdd.align = 'center';
      }
      if (blockName == 'SubtitleBlock') {
        dataAdd.value = 'Sample description';
        dataAdd.align = 'center';
      }
      if (blockName == 'LinkButtonBlock') {
        dataAdd.value = 'Join Now';
        dataAdd.newtab = true;
        dataAdd.url = '';
      }
      this.listBlockThankyou.push({
        name: blockName,
        id: Date.now(),
        data: dataAdd,
      });
    },
    hasBlockInThankYou(blockName) {
      return !this.listBlockThankyou.some((i) => i.name == blockName);
    },
  },
};
