<template>
  <div class="alert-remind-thanks" :class="{ show: isShow }">
    <p>Edit 'Thank You' step for 'Phone OTP' input field to ensure proper form function</p>
    <v-btn color="primary" small v-on:click="isShow = false">Got it</v-btn>
  </div>
</template>

<script>
  import { createNamespacedHelpers } from 'vuex';
  const { mapState } = createNamespacedHelpers('builder');

  export default {
    data() {
      return {
        isShow: false
      }
    },
    computed: {
      ...mapState(['listBlockAdded']),
    },
    watch: {
      listBlockAdded: function (newVal, oldVal) {
        if (!newVal.length || newVal.length <= oldVal.length) {
          return
        }

        const isOtpAdded = newVal[newVal.length - 1].name === 'PhoneOtpBlock'

        if (isOtpAdded) {
          this.isShow = true
        }
      },
    },
  }
</script>

<style>
  .alert-remind-thanks {
    position: absolute;
    width: 276px;
    background-color: #262626;
    border-radius: 4px;
    padding: 12px;
    right: calc(100% + 30px);
    top: 50%;
    transform: translateY(-50%);
    text-align: right;

    opacity: 0;
    pointer-events: none;
    z-index: -1;
    transition: 0.3s ease;
  }

  .alert-remind-thanks.show {
    opacity: 1;
    pointer-events: auto;
    z-index: 100;
  }

  .alert-remind-thanks::before {
    content: '';
    position: absolute;
    left: 100%;
    top: 20px;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-right: 0 solid transparent;
    border-left: 5px solid #262626;
  }

  .alert-remind-thanks p {
    font-size: 12px;
    line-height: 18px;
    color: #fff;
    text-align: left;
  }

  .alert-remind-thanks .v-btn {
    text-transform: capitalize;
  }
</style>