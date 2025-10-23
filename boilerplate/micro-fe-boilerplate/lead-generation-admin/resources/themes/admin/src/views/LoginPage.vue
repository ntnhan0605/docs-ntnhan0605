<template>
  <section class="le-login-full fill-height le-scrollbar">
    <div class="le-login-wrap flex fill-height">
      <div class="le-login-wrap__left">
        <img class="width-100% fill-height object-cover" src="/img/left_login.jpg" />
      </div>
      <div class="le-login-wrap__right flex justify-center items-center text-left padding-md padding-0@lg overflow-auto">
        <div class="le-login-form animate__animated animate__fadeIn">
          <img @dblclick="faker" src="/img/logo.jpg" width="187" />
          <h2 class="font-normal margin-md margin-left-0" style="font-size: 26px;letter-spacing: -0.19px;">Log in to your account</h2>

          <div class="margin-bottom-md">
            <v-text-field autofocus :rules="rules" v-model="email" type="email" label="Email" placeholder="Email" outlined hide-details="auto"></v-text-field>
          </div>

          <div class="margin-bottom-0">
            <v-text-field :append-icon="isShowPass ? 'mdi-eye' : 'mdi-eye-off'" @click:append="isShowPass = !isShowPass" :type="isShowPass ? 'text' : 'password'" @keyup.native.enter="handleLogin" :rules="rules" v-model="password" label="Password" placeholder="Password" outlined hide-details="auto"></v-text-field>
            <div class="text-right margin-top-xs">
              <div></div>
              <div class="primary--text text-sm cursor-pointer">
                <router-link to="/reset-password-by-email">Forgot password</router-link>
              </div>
            </div>
          </div>

          <div class="margin-bottom-sm">
            <v-checkbox class="margin-top-0 le-checkbox" v-model="checkbox" label="Remember Me" hide-details></v-checkbox>
          </div>

          <div class="margin-bottom-sm">
            <v-btn @click="handleLogin" class="width-100%" style="height:40px;" color="primary">LOGIN</v-btn>
          </div>

          <div hidden class="margin-bottom-md" style="font-size:14px; color: #9ea0a5; letter-spacing: -0.05px;">
            Do not have an account?
            <b class="primary--text cursor-pointer">
              <router-link to="/signup">Sign up</router-link>
            </b>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Api from '@/api';
import { API_PATH, API_TOKEN } from '@/constants/api-constants';
import { LOCALSTORAGE } from '../constants/app-constants';
import { AUTH_STORE } from '../store/authStore';
import { IS_DEV } from '../utils';
export default {
  data() {
    return {
      checkbox: true,
      email: '',
      password: '',
      isShowPass: false,
      rules: [
        // (value) => !!value || 'This field equired.',
        // (value) => (value && value.length >= 3) || 'Min 3 characters',
      ],
    };
  },
  mounted() {
    console.log('IS_DEV', IS_DEV);
  },
  beforeDestroy() {},
  methods: {
    faker() {
      if (!IS_DEV) return;
      this.email = 'admin@hellohealthgroup.com';
      this.password = '@Admin@!@#$%^HELLO9384835';
    },
    handleLogin(e) {
      Api.post(
        API_PATH.LOGIN,
        {
          email: this.email,
          password: this.password,
          hostname: location.hostname,
        },
        { withCredentials: true, hideError: true },
      )
        .then((response) => {
          console.log('_____login_______', response);
          const access_token = _.get(response, 'data._data.access_token');
          const userData = _.get(response, 'data._data.user');
          if (access_token) {
            const wellcomeMsg = _.get(
              response,
              'data._messages[0]',
              'Login successfully, wellcome you back',
            );
            this.$notify({
              text: wellcomeMsg,
              type: 'success',
            });
            localStorage.setItem(API_TOKEN.ACCESS_TOKEN, access_token);
            localStorage.setItem(LOCALSTORAGE.USER, JSON.stringify(userData));
            this.$store.commit('auth/' + AUTH_STORE.MUTATIONS.SET_DATA, {
              key: 'userData',
              value: userData,
            });
            this.$router.replace('/');
          }
        })
        .catch((e) => {
          console.error(e.response);
          if (e.response) {
            const errorData = e.response.data;
            const message = errorData.message || e.response.data._messages[0];
            Swal.fire(message, '', 'error');
          }
        });
    },
  },
};
</script>
