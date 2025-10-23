<template>
  <section class="le-login-full fill-height">
    <div class="le-login-wrap flex fill-height">
      <div class="le-login-wrap__left">
        <img class="width-100% fill-height object-cover" src="/img/left_login.jpg" />
      </div>
      <div class="le-login-wrap__right flex justify-center items-center text-left padding-md padding-0@lg overflow-auto">
        <div class="le-login-form animate__animated animate__fadeIn">
          <div class="primary--text margin-bottom-md">
            <router-link to="/login">
              <b>
                <img class="align-middle" src="/img/icons/arrow-left.svg" />
                <span class="align-middle" style="font-size: 15px; padding-left: 10px">Back to Home</span>
              </b>
            </router-link>
          </div>

          <img src="/img/logo.jpg" width="187" />
          <h2 class="font-normal margin-md margin-left-0" style="font-size: 26px;letter-spacing: -0.19px;">Reset my password</h2>

          <!-- <div class="margin-bottom-md">
            <v-text-field autofocus @keyup.native.enter="handleResetPass" :rules="rules" v-model="email" type="email" label="Email" outlined clearable hide-details="auto"></v-text-field>
          </div>-->

          <div class="margin-bottom-lg">
            <v-text-field :append-icon="isShowPass ? 'mdi-eye' : 'mdi-eye-off'" @click:append="isShowPass = !isShowPass" autofocus :rules="rules" v-model="password" :type="isShowPass ? 'text' : 'password'" label="Password" placeholder="Password" outlined clearable hide-details="auto"></v-text-field>
          </div>

          <div class="margin-bottom-lg">
            <v-text-field :append-icon="isShowPass ? 'mdi-eye' : 'mdi-eye-off'" @click:append="isShowPass = !isShowPass" @keyup.native.enter="handleResetPass" :rules="rules" v-model="repassword" :type="isShowPass ? 'text' : 'password'" label="Verify Password" placeholder="Verify Password" outlined clearable hide-details="auto"></v-text-field>
          </div>

          <div class="margin-bottom-sm">
            <v-btn @click="handleResetPass" class="width-100%" style="height:40px;" color="primary">RESET PASSWORD</v-btn>
          </div>

          <!-- <div class="margin-bottom-md" style="font-size:14px; color: #9ea0a5; letter-spacing: -0.05px;">
            Have an account?
            <b class="primary--text cursor-pointer">
              <router-link to="/login">Log In</router-link>
            </b>
          </div>-->
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Api from '@/api';
import { API_PATH, API_TOKEN } from '@/constants/api-constants';
import { mapState } from 'vuex';
import { ROUTER } from '../constants/router-constant';

export default {
  data() {
    return {
      checkbox: false,
      token: '',
      email: '',
      password: '',
      repassword: '',
      isShowPass: false,
      rules: [
        // (value) => !!value || 'This field equired.',
        // (value) => (value && value.length >= 3) || 'Min 3 characters',
      ],
    };
  },
  mounted() {
    $('html').css('overflow', 'hidden');
    this.token = this.$route.params.token;
    this.email = this.$route.query.email;
  },
  beforeDestroy() {
    $('html').css('overflow', 'initial');
  },
  computed: {
    ...mapState('auth', {
      userData: (state) => state.userData,
    }),
  },
  methods: {
    handleResetPass(e) {
      Api.post(
        API_PATH.RESET_PASSWORD,
        {
          email: this.email,
          token: this.token,
          password: this.password,
          password_confirmation: this.repassword,
        },
        {
          // hideError: true,
        },
      )
        .then((res) => {
          const app = this;
          Swal.fire({
            title: 'Reset password success!',
            icon: 'success',
            allowOutsideClick: false,
            allowEscapeKey: false,
            showCancelButton: false,
            confirmButtonText: 'OK',
            onClose: function() {
              app.$router.push(ROUTER.LOGIN.path);
            },
          });
        })
        .catch((e) => {
          if (e.response) {
            const errorData = e.response.data;
            const message = errorData.message || e.response.data._messages[0];
            console.log(this.$notify);
            Swal.fire(message, '', 'error');
          }
        });
    },
  },
};
</script>
