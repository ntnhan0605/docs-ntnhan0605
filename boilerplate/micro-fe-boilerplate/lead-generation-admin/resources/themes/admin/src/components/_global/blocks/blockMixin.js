import { createNamespacedHelpers } from 'vuex';
const { mapState, mapMutations } = createNamespacedHelpers('builder');

export const blockMixin = {
  computed: {
    ...mapState(['currentSelectEdit']),
  },
  methods: {
    ...mapMutations(['SET_DATA']),
    emitSelect() {
      console.log('emitSelect', this.portalID);
      this.SET_DATA({ key: 'currentSelectEdit', value: this.portalID });
      this.$forceUpdate();
    },
    emitRemove(isThankyou) {
      console.log('remove', this.index);
      this.SET_DATA({ key: 'currentSelectEdit', value: ''});
      this.$emit('remove', this.index, isThankyou);
    },
    emitHide(name) {
      this.$emit('hideblock', name);
    },
  },
};
