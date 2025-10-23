<template>
  <section class="le-login-full fill-height">
    <div class="flex justify-center items-center" style="height: calc(100% - 30px)">
      <div class="animate__animated animate__bounce text-center">
        <div>
          <img src="/img/icons/smile-signout.svg" />
        </div>
        <div>
          <h1 class="le-signout-title">Thank you.</h1>
          <p class="le-signout-desc text-md">We appreciate your time. Let’s make more appealing campaigns!</p>
        </div>
        <div class="primary--text">
          <router-link to="/login">
            <b>
              <img class="align-middle" src="/img/icons/arrow-left.svg" />
              <span class="align-middle" style="font-size: 15px; padding-left: 10px">Back to Home</span>
            </b>
          </router-link>
        </div>
      </div>
    </div>
    <div class="text-center primary" style="height: 30px;">
      <span style="color:white; font-size: 12px;font-weight: 600;">© {{(new Date).getFullYear()}} Hello Health Group Pte. Ltd.</span>
    </div>
  </section>
</template>

<script>
export default {
  mounted() {
  },
  beforeDestroy() {
  },
};
</script>
<style scoped>
.le-signout-desc {
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: -0.13px;
  color: #1b3250;
}
.le-signout-title {
  font-size: 32px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: -0.23px;
  color: #1b3250;
  margin-bottom: 10px;
}
</style>

