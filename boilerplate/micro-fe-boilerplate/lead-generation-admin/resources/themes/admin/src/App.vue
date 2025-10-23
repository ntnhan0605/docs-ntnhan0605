<template>
  <v-app id="app" v-cloak>
    <GlobalSideNavBar />
    <div class="le-app-router-content">
      <!-- <router-view :reactStore="reactStore" v-if="reactStore"></router-view> -->
      <router-view />
    </div>

    <notifications position="top center" ignoreDuplicates />
  </v-app>
</template>

<script>

export default {
  mounted() {
    let GTM_ID = '';
    if (location.href.includes('lead.hellobacsi.com')) {
      GTM_ID = 'GTM-56CTQMW';
    }
    if (location.href.includes('lead.marrybaby.vn')) {
      GTM_ID = 'GTM-TS7FZCH';
    }
    if (location.href.includes('lead.helloswasthya.com')) {
      GTM_ID = 'GTM-WBX4T4Z';
    }
    if (location.href.includes('lead.hellosehat.com')) {
      GTM_ID = 'GTM-PTBX867';
    }
    if (location.href.includes('lead.hellodoktor.com')) {
      GTM_ID = 'GTM-5WRS83B';
    }
    if (location.href.includes('lead.hellokrupet.com')) {
      GTM_ID = 'GTM-5292XZR';
    }
    if (location.href.includes('lead.helloyishi.com.tw')) {
      GTM_ID = 'GTM-MTWR3R3';
    }
    if (location.href.includes('lead.hellosayarwon.com')) {
      GTM_ID = 'GTM-TZVDWP4';
    }
    if (location.href.includes('lead.hellokhunmor.com')) {
      GTM_ID = 'GTM-N658NTL';
    }
    if (location.href.includes('lead.hellodoctor.com.ph')) {
      GTM_ID = 'GTM-NWM7XBF';
    }
    if (!GTM_ID) {
      return;
    }
    console.log('📌 GTM ID:', GTM_ID);
    // HEAD
    $('head').append(`
      <!-- Google Tag Manager -->
      <script>
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${GTM_ID}');
      <\/script>
      <!-- End Google Tag Manager -->
    `);

    // Body
    $('body').append(`
      <!-- Google Tag Manager (noscript) -->
      <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}"
      height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
      <!-- End Google Tag Manager (noscript) -->
   `);
  },
};
</script>
