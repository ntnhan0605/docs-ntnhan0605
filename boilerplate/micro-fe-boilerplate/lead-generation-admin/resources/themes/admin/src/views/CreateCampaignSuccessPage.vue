<template>
  <div class="flex justify-center items-center height-100vh">
    <div class="text-center animate__animated animate__bounce text-center">
      <div class="margin-bottom-sm">
        <img src="/img/ok.svg" width="122" />
      </div>
      <h1 class="margin-bottom-xxs">Success!</h1>
      <p class="text-md">Your campaign has been successfully created. Let’s make more appealing campaigns!</p>
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
</template>

<script>
export default {};
</script>

<style>
</style>
