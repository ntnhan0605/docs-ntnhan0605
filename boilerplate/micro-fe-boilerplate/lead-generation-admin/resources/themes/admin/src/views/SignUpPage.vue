<template>
  <section class="le-login-full fill-height">
    <div class="le-login-wrap flex fill-height">
      <div class="le-login-wrap__left">
        <img class="width-100% fill-height object-cover" src="/img/left_login.jpg" />
      </div>
      <div class="le-login-wrap__right flex justify-center items-center text-left padding-md padding-0@lg">
        <div class="le-login-form animate__animated animate__fadeIn">
          <img src="/img/logo.jpg" width="187" />
          <h2 class="font-normal margin-md margin-left-0" style="font-size: 26px;letter-spacing: -0.19px;">Sign up to Lead Collection</h2>

          <div class="margin-bottom-md">
            <v-text-field :rules="rules" autofocus v-model="firstName" type="text" label="First Name" outlined clearable hide-details="auto"></v-text-field>
          </div>
          <div class="margin-bottom-md">
            <v-text-field :rules="rules" :autocomplete="false" v-model="lastName" type="text" label="Last Name" outlined clearable hide-details="auto"></v-text-field>
          </div>

          <div class="margin-bottom-md">
            <v-text-field :rules="rules" v-model="password" type="password" label="Password" outlined clearable hide-details="auto"></v-text-field>
          </div>

          <div class="margin-bottom-md">
            <v-text-field @keyup.native.enter="handleSignUp" :rules="rules" v-model="repassword" type="password" label="Verify Password" outlined clearable hide-details="auto"></v-text-field>
          </div>

          <div class="margin-bottom-md">
            <v-checkbox class="margin-top-0 le-checkbox" v-model="checkbox" hide-details>
              <template v-slot:label>
                <div>
                  I have read the
                  <strong class="le-term-link">Terms and Conditions</strong>.
                </div>
              </template>
            </v-checkbox>
          </div>

          <div class="margin-bottom-sm">
            <v-btn @click="handleSignUp" class="width-100%" style="height:40px;" color="primary">SIGN UP NOW</v-btn>
          </div>

          <div class="margin-bottom-md" style="font-size:14px; color: #9ea0a5; letter-spacing: -0.05px;">
            Have an account?
            <b class="primary--text cursor-pointer">
              <router-link to="/login">Log In</router-link>
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
export default {
  data() {
    return {
      checkbox: false,
      firstName: '',
      lastName: '',
      password: '',
      repassword: '',
      rules: [
        // (value) => !!value || 'This field equired.',
        // (value) => (value && value.length >= 3) || 'Min 3 characters',
      ],
    };
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    handleSignUp(e) {},
  },
};
</script>
