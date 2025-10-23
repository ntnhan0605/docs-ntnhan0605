/*
📌 Example script for dev
<!-- 😎 HHG Lead Dev -->
<script id="le-script" data-api="https://dev.leadgen.hellobacsi.com" data-cookie-domain="hellobacsi.com" data-site-id="1" data-lang="vi"></script>
<script id="le-script-dev" src="https://lead11.localhost:8080/popup.dev.v2.1.js" onerror="document.getElementById('le-script').src='https://dev.leadgen.hellobacsi.com/admin/popup.js'" data-api="https://dev.leadgen.hellobacsi.com" data-cookie-domain="hellobacsi.com" data-site-id="1" data-lang="vi" data-mode="dev"></script>
<!-- 😎 HHG Lead Dev -->

# Production example
📌 Required atribute:
  -  data-api="https://dev.leadgen.hellobacsi.com"
  -  data-cookie-domain="hellobacsi.com"
  -  data-site-id="1"
  -  data-lang="vi

<!-- HHG Lead Production -->
<script defer id="le-script" src="https://lead.hellohealthgroup.com/admin/popup.js" data-api="https://dev.leadgen.hellobacsi.com" data-cookie-domain="hellobacsi.com" data-site-id="1" data-lang="vi"></script>
<!-- End HHG Lead Production -->
*/
var CAMPAIGN_TARGET_TYPE = { LINKS: 1, TAGS: 2 };
var LEAD_SITE_ID = 1;
var LEAD_API = 'https://dev.leadgen.hellobacsi.com';
var LEAD_SITE_DOMAIN = 'hellobacsi.com';
var LEAD_VERSION = '2.1-aka-3.0.62  - ✨ Clementine';
var LEAD_IS_DEV = false;
var LEAD_DEV_URL = '';

var LEAD_DEVICE_TYPE = {
  MOBILE: 1,
  DESKTOP: 2,
};

// SCRIPT ATTRIBUTES DATA
if (document.currentScript.hasAttribute('data-api')) {
  LEAD_API = document.currentScript.getAttribute('data-api');
}
if (document.currentScript.hasAttribute('data-cookie-domain')) {
  LEAD_SITE_DOMAIN = document.currentScript.getAttribute('data-cookie-domain');
}
if (document.currentScript.hasAttribute('data-site-id')) {
  LEAD_SITE_ID = document.currentScript.getAttribute('data-site-id');
}
if (document.currentScript.hasAttribute('data-mode')) {
  LEAD_IS_DEV = document.currentScript.getAttribute('data-mode');
  LEAD_DEV_URL = localStorage.getItem('lead-dev-url') || 'https://lead11.localhost:8080/';
}

// FOR POPUP UI
var CAMPAIGN_SHOW = {};
var CAMPAIGN_UUID = '';
var CAMPAIGN_IMPRESSION_ACTION = '';
var HAS_SHOW_POPUP = false;
var LEAD_CURRENT_URL = location.href.toLowerCase();
// For config axios
var LEAD_AXIOS_CONFIG = {};

var LEAD_POPUP_START_TIME = null;
var LEAD_POPUP_END_TIME = null;

// TODO: set inital object if exists
if (sessionStorage.getItem('insider_object')) {
  window.insider_object = JSON.parse(sessionStorage.getItem('insider_object'));
}

// 🎭 Load css
if (LEAD_IS_DEV) {
  console.log('🤓 Load local style');
  leadLoadCssLink(LEAD_DEV_URL + '/popup.css');
  leadLoadCssLink(LEAD_DEV_URL + `/newbuilder.css`);
} else {
  leadLoadCssLink(LEAD_API + '/admin/popup.css');
  // newbuilder
  leadLoadCssLink(LEAD_API + `/admin/newbuilder.css`);
}

const leadPopupLang = document.currentScript.getAttribute('data-lang');

console.log(`🎯 LEAD version: ${LEAD_VERSION} ➡`, LEAD_SITE_DOMAIN, LEAD_SITE_ID, leadPopupLang, document.currentScript.getAttribute('data-mode'));

// TODO: country code
let leadCountryCode = leadPopupLang;
let countryCodeNumber = 0;
let errorPhoneMsg = 'Please input correct phone number';
if (leadPopupLang == 'vi') {
  leadCountryCode = 'vn'; // https://hellobacsi.com
  countryCodeNumber = 84;
  errorPhoneMsg = 'Nhập đúng định dạng số điện thoại';
}
if (leadPopupLang == 'id') {
  leadCountryCode = 'id'; // https://hellosehat.com
  countryCodeNumber = 62;
  errorPhoneMsg = 'Tolong daftarkan nomor telepon yang valid';
}
if (leadPopupLang == 'th') {
  leadCountryCode = 'th'; // https://hellokhunmor.com/
  countryCodeNumber = 66;
  errorPhoneMsg = 'กรุณาใส่ตัวเลขที่ถูกต้อง';
}
if (leadPopupLang == 'ms') {
  leadCountryCode = 'my'; // https://hellodoktor.com/
  countryCodeNumber = 60;
  errorPhoneMsg = 'Sila masukkan no telefon yang sah.';
}
if (leadPopupLang == 'zh') {
  leadCountryCode = 'tw'; // https://helloyishi.com.tw/
  countryCodeNumber = 886;
  errorPhoneMsg = '請填入有效的電話號碼';
}
if (leadPopupLang == 'km') {
  leadCountryCode = 'kh'; // https://hellokrupet.com/
  countryCodeNumber = 855;
  errorPhoneMsg = 'សូម​វាយបញ្ចូល​លេខ​ឲ្យ​បាន​ត្រឹមត្រូវ';
}
if (leadPopupLang == 'my') {
  leadCountryCode = 'mm'; // https://hellosayarwon.com/
  countryCodeNumber = 95;
  errorPhoneMsg = 'မှန်ကန်သော ဖုန်းနံပါတ်ထည့်သွင်းပါ';
}
if (leadPopupLang == 'hi') {
  leadCountryCode = 'in'; // https://helloswasthya.com/
  countryCodeNumber = 91;
  errorPhoneMsg = 'कृपया एक वैध संख्या दर्ज करें';
}

jQuery
  .when(
    jQuery.getScript('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.15/lodash.min.js'),
    jQuery.getScript('https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.2/axios.min.js'),
    jQuery.getScript(window.Cookies ? '' : 'https://cdnjs.cloudflare.com/ajax/libs/js-cookie/2.2.1/js.cookie.min.js'),
    jQuery.getScript(window.UAParser ? '' : 'https://cdnjs.cloudflare.com/ajax/libs/UAParser.js/0.7.21/ua-parser.min.js'),
    jQuery.getScript('https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js'),
    // Same version on marrybaby
    jQuery.getScript(jQuery.validator ? `${LEAD_API}/admin/no.js` : 'https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.11.1/jquery.validate.min.js'),
    jQuery.getScript('https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.3/js/utils.min.js'),
    jQuery.getScript('https://cdnjs.cloudflare.com/ajax/libs/uuid/8.3.2/uuidv1.min.js'),
    // Dev
    // jQuery.getScript('https://lead11.localhost:8080/lead-mock.js'),
    jQuery.Deferred(function(deferred) {
      jQuery(deferred.resolve);
    }),
  )
  .done(function() {
    jQuery.getScript('https://subot.hellohealthgroup.com/subot.js');

    function isMobile() {
      return ['iOS', 'Android'].includes(new UAParser().getOS().name);
    }
    WebFont.load({
      google: {
        families: ['Open Sans:300,400,600,700'],
      },
    });

    if (leadPopupLang) {
      try {
        jQuery.getScript(`${LEAD_API}/admin/lang-${leadPopupLang}.js`);
      } catch (error) {
        console.error('Cant load language for lead popup', error);
      }
    }

    axios
      .post(
        LEAD_API + '/api/campaign/' + LEAD_SITE_ID,
        {
          url: location.href,
          ga_client_id: Cookies.get('_ga') || null,
        },
        LEAD_AXIOS_CONFIG,
      )
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        console.log('List campagin: ', data);
        if (data._status == 1) {
          const { campaigns, uuid } = data._data;
          if (!Cookies.get('hhg-id')) {
            Cookies.set(`hhg-id`, uuidv1(), { domain: '.' + LEAD_SITE_DOMAIN, path: '/' });
            console.log('😍 Set HHG ID cookie');
          }
          CAMPAIGN_UUID = Cookies.get('hhg-id');

          // TODO: HP-534 Filter desktop
          let campaignsDevice = [];
          if (isMobile()) {
            campaignsDevice = campaigns.filter((c) => c.device_types.some((d) => d.id == LEAD_DEVICE_TYPE.MOBILE));
          } else {
            campaignsDevice = campaigns.filter((c) => c.device_types.some((d) => d.id == LEAD_DEVICE_TYPE.DESKTOP));
          }
          console.log(`👓 campaignsDevice`, campaignsDevice);

          // Check links
          let listLinksObj = _.flatten(campaignsDevice.map((i, index) => i.targets.map((i) => (i.type == CAMPAIGN_TARGET_TYPE.LINKS ? { ...i, campaignIndex: index } : null)))).filter((i) => i);
          // Check list link match current href
          listLinksObj = listLinksObj.filter((i) => {
            if (i.option == 'exact_match') return Boolean(LEAD_CURRENT_URL == new URL(String(i.target).toLowerCase()).href);
            if (i.option == 'start_with') {
              if (LEAD_CURRENT_URL.includes(String(i.target).toLowerCase())) {
                const listExcluding = i.sub_target.filter((i) => i.option == 'excluding').map((i) => i.value);
                return !listExcluding.includes(LEAD_CURRENT_URL);
              } else {
                return false;
              }
            }
          });

          // Check tags
          const listMetaTag = Array.from(document.getElementsByTagName('META')).filter((i) => i.getAttribute('property') == 'article:tag');
          const listTags = listMetaTag.map((i) => i.content);
          console.log(`listTags`, listTags);
          let listCampaignHasTag = [];
          let listTagsObj = [];

          if (listTags && listTags.length) {
            listCampaignHasTag = _.flatten(campaignsDevice.map((i, index) => i.targets.map((i) => (i.type == CAMPAIGN_TARGET_TYPE.TAGS ? { ...i, campaignIndex: index } : null)))).filter((i) => i);

            listTagsObj = _.intersectionBy(
              listCampaignHasTag,
              listTags.map((i) => ({ target: i })),
              'target',
            );
          }
          const listCampaginsMatch = [...listLinksObj, ...listTagsObj];
          const listCampaignCodeSubmited = _.keys(Cookies.get()).filter((i) => i.includes('lead_submited'));
          console.log(`--listCampaignCodeSubmited`, listCampaignCodeSubmited);
          const listCampaignCodeClosed = _.keys(Cookies.get()).filter((i) => i.includes('lead_closed'));
          console.log(`--listCampaignCodeClosed`, listCampaignCodeClosed);

          const listCampaignSubmitedClosed = [...listCampaignCodeSubmited, ...listCampaignCodeClosed];

          const listCampaignNoSubmitedClosed = listCampaginsMatch.filter((i) => {
            const hasSubmited = listCampaignSubmitedClosed.some((k) => k.includes(campaignsDevice[i.campaignIndex].code));
            return !hasSubmited;
          });
          let listCampaignValid = [];
          listCampaignValid = _.sortBy(_.shuffle(listCampaignNoSubmitedClosed), 'score');
          if (listCampaignValid && listCampaignValid.length) {
            CAMPAIGN_SHOW = campaignsDevice[listCampaignValid[0].campaignIndex];
            console.log(`CAMPAIGN_SHOW`, CAMPAIGN_SHOW);
            const { rules } = CAMPAIGN_SHOW;
            // CHECK RULE TRIGGER POPUP
            const timeoutRule = Number(_.get(_.find(rules, ['rule', 'time']), 'value'));
            console.log(`timeoutRule`, timeoutRule);
            const scrollRule = Number(_.get(_.find(rules, ['rule', 'scroll']), 'value'));
            console.log(`scrollRule`, scrollRule);
            const excludeSponsored = Number(_.get(_.find(rules, ['rule', 'exclude_sponsored']), 'value'));
            console.log(`excludeSponsored`, excludeSponsored);

            // TODO: If excluded sponsored is set true
            // NOTED: Need check if current page is sponsored first
            const isSponsored = Boolean(jQuery('.hhg-disclaimer-text').length);
            console.log(`💎 LEAD current page isSponsored`, isSponsored);
            if (isSponsored && excludeSponsored) {
              return;
            }

            if (Number.isInteger(timeoutRule)) {
              CAMPAIGN_IMPRESSION_ACTION = 'TIME';
              console.log('✨ SHOW AWESOME POPUP AFTER: ', timeoutRule, ' seconds');
              setTimeout(() => {
                if (HAS_SHOW_POPUP) {
                  return;
                }
                leadShowPopup(CAMPAIGN_SHOW);
              }, timeoutRule * 1000);
            }

            if (Number.isInteger(scrollRule)) {
              CAMPAIGN_IMPRESSION_ACTION = 'SCROLL';
              console.log('✨ SHOW AWESOME AFTER: SCROLL', scrollRule, ' %');
              const $p = (jQuery('.page-details-content').length && jQuery('.page-details-content')) || (jQuery('#main.hc2-content-single > :nth-child(1) #article').length && jQuery('#main.hc2-content-single > :nth-child(1) #article')) || (jQuery('.site-content').length && jQuery('.site-content')) || (jQuery('.page-content').length && jQuery('.page-content')) || jQuery('body');
              const pct = $p.offset().top;
              const pb = $p.outerHeight(true);
              console.log(`👓 Element check scroll: `, $p);
              setTimeout(() => {
                jQuery(parent.window.document).scroll(function() {
                  if (HAS_SHOW_POPUP) {
                    return;
                  }
                  const wt = jQuery(window).scrollTop();
                  let percent = 0;
                  if (wt >= pct) {
                    percent = Math.round(((wt - pct) / (pb - innerHeight)) * 100);
                  }
                  // TODO: CHECK FOOTER HEIGHT
                  if (percent >= scrollRule) {
                    leadShowPopup(CAMPAIGN_SHOW);
                  }
                }); //
              }, 3000);
            }
          } else {
            console.log('🚧 No lead campaigns on current URL, tags');
          }
        }
      })
      .catch((err) => {
        console.error(`Lead error: `, err);
      });
  });

function leadShowPopup(campaignShow) {
  // newbuilder
  if (campaignShow.extra_fields.popupVersion == '2.1') {
    console.log('newbuilder');
    return leadShowPopupNewbuilder(campaignShow);
  }

  LEAD_POPUP_START_TIME = Date.now();
  jQuery('body').addClass('noscroll');
  HAS_SHOW_POPUP = true;
  const { extra_fields } = campaignShow;

  const popUpTitle = extra_fields.title;
  const popUpDesc = extra_fields.desc;
  const popUpSubmitText = extra_fields.submit;

  const popUpLogo = campaignShow.custom_logo ? `<img class="lead-modal__image lead-modal-image-logo" src="${campaignShow.custom_logo}" alt="" style="height: 15px;">` : '';
  const popUpCover = campaignShow.image ? `<img class="lead-modal__image lead-modal-image-cover" src="${campaignShow.image}" alt="" >` : '';

  const popUpTermURL = extra_fields.popUpTermURL;
  const popUpTermAgreeText = extra_fields.popUpTermAgreeText;
  const popUpTermText = extra_fields.popUpTermText;

  const listField = extra_fields.fields ? JSON.parse(extra_fields.fields) : [];
  // For library validation
  let numberList = {
    tel: 0,
    text: 0,
    date: 0,
    email: 0,
  };

  const listFieldHTML = listField.map((i, index) => {
    let HTMLTemplate = ``;
    if (i.control == 'date') {
      HTMLTemplate = `
      <div class="lead-modal__form-control-wrapper form-control-wrapper--icon-left">
         <input required type="date" data-key="${i.listEdit[0].value}" name="${numberList.date ? i.control + numberList.date : i.control}"  placeholder="${i.listEdit[1].value || '...'}" onclick="jQuery(this).removeClass('placeholderclass')" onblur="!jQuery(this).val() && jQuery(this).addClass('placeholderclass')" class="dateclass placeholderclass lead-modal__form-control width-100%" />
         <img class="lead-modal__form-control-icon" src="${LEAD_API}/admin/img/builder/${i.name}.svg">
       </div>
      `;
    } else {
      HTMLTemplate = `
      <div class="lead-modal__form-control-wrapper form-control-wrapper--icon-left">
         <input required data-key="${i.listEdit[0].value}" name="${numberList[i.control] ? i.control + numberList[i.control] : i.control}" spellcheck="false" type="${i.control}" placeholder="${i.listEdit[1].value || '...'}" class="lead-modal__form-control width-100%">
         <img class="lead-modal__form-control-icon" src="${LEAD_API}/admin/img/builder/${i.name}.svg">
       </div>
      `;
    }
    if (i.control == 'date') {
      numberList.date += 1;
    }
    if (i.control == 'text') {
      numberList.text += 1;
    }
    if (i.control == 'tel') {
      numberList.tel += 1;
    }
    if (i.control == 'email') {
      numberList.email += 1;
    }
    return HTMLTemplate;
  });

  let fieldsHTML = ``;

  listFieldHTML.forEach((i) => (fieldsHTML += i));

  jQuery('#lead-modal').remove();
  jQuery('body').append(`
    <div id="lead-modal" class="lead-modal modal--animate-scale">
        <div class="lead-modal__wrapper animate__animated ">
          <div class="lead-modal__content">
            <header class="lead-modal__header">
              ${popUpLogo}
              ${popUpCover}
            </header>

            <div class="lead-modal__body">
              <h2 class="lead-modal__title">${popUpTitle}</h2>
              <p class="lead-modal__description">${popUpDesc}</p>

              <form class="lead-modal__form">
                ${fieldsHTML}
                <div class="lead-modal__checkbox-wrapper">
                  <div class="lead-modal__checkbox">
                    <input id="lead-term-checkbox" class="lead-modal__checkbox__input" type="checkbox" aria-label="Checkbox label" checked>
                    <div class="lead-modal__checkbox__control" aria-hidden="true" ></div>
                  </div>
                  <label for="checkbox" class="lead-modal__checkbox__label">
                    ${popUpTermAgreeText} <span style="color: #2c87f3; font-weight: bold;"><a target="blank" href="${popUpTermURL || 'https://hellobacsi.com/chinh-sach'}" rel="noopener noreferrer">${popUpTermText}</a></span>
                  </label>
                </div>
                <button id="lead-submit" type="submit" class="lead-modal__btn"> ${popUpSubmitText}</button>
              </form>
            </div>

          </div>

          <button class="lead-modal__close-btn js-modal__close">
            <svg class="lead-modal__close-icon" viewBox="0 0 24 24">
              <title>Close modal window</title>
              <g fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"><line x1="3" y1="3" x2="21" y2="21" /><line x1="21" y1="3" x2="3" y2="21" /></g>
            </svg>
          </button>
        </div>
      </div>
  `);

  // TODO: Get ga_client_id from cookies
  let gaCookie = Cookies.get('_ga') ? Cookies.get('_ga') : null;
  axios.post(
    `${LEAD_API}/api/campaign/${CAMPAIGN_SHOW.code}/impression`,
    {
      action: CAMPAIGN_IMPRESSION_ACTION,
      url: location.href.toLowerCase(),
      title_article: document.title,
      cookie_id: CAMPAIGN_UUID,
      ga_client_id: gaCookie,
    },
    LEAD_AXIOS_CONFIG,
  );

  jQuery.validator.addMethod(
    'phoneNumber',
    function(value, element) {
      return intlTelInputUtils.isValidNumber(String(value), leadCountryCode);
    },
    errorPhoneMsg,
  );

  const numberRule = { required: true, number: true, min: 0 };
  const telRule = { required: true, phoneNumber: Boolean(leadCountryCode) };
  const emailRule = { required: true, email: true };
  const requireOnlyRule = { required: true };

  jQuery('.lead-modal__form').validate({
    // onkeyup: false,
    rules: {
      number: numberRule,
      number1: numberRule,
      number2: numberRule,
      number3: numberRule,
      tel: telRule,
      tel1: telRule,
      tel2: telRule,
      tel3: telRule,
      email: emailRule,
      email1: emailRule,
      email2: emailRule,
      email3: emailRule,
      date: requireOnlyRule,
      date1: requireOnlyRule,
      date2: requireOnlyRule,
      date3: requireOnlyRule,
      text: requireOnlyRule,
      text1: requireOnlyRule,
      text2: requireOnlyRule,
      text3: requireOnlyRule,
    },
    submitHandler: function(form) {
      submitHandler(form);
    },
  });
}

// --EVENTS LEAD POPUP
function submitHandler(form) {
  const formDataArray = jQuery(form).serializeArray();
  const formData = _.map(
    _.mapValues(_.groupBy(formDataArray, 'name'), (v) => v.map((i) => i.value).toString()),
    (v, k) => ({ name: k, value: v }),
  );
  const numberFormatType = 2; // i18n.phonenumbers.PhoneNumberFormat.NATIONAL
  // TODO: Get ga_client_id from cookies
  let gaCookie = Cookies.get('_ga') ? Cookies.get('_ga') : null;

  let data = {
    url: location.href.toLowerCase(),
    title_article: document.title,
    meta: formData.map((i) => ({
      key: jQuery(`.lead-modal__form [name="${i.name}"]`).data('key'),
      value: leadCountryCode && ['tel', 'tel1', 'tel2', 'tel3'].includes(i.name) ? intlTelInputUtils.formatNumber(String(i.value), leadCountryCode, numberFormatType).replace(/\s+/g, '') : i.value,
      control: i.name
        .replace('1', '')
        .replace('2', '')
        .replace('3', ''),
      is_sent_mailchimp: jQuery(`.lead-modal__form .mailchimp-${jQuery(`.lead-modal__form [name="${i.name}"]`).data('key')}`).data('mailchimp'),
    })),
    cookie_id: CAMPAIGN_UUID,
    ga_client_id: gaCookie,
  };

  const expiresDay = Number(_.get(_.find(CAMPAIGN_SHOW.rules, ['rule', 'days_to_show_again']), 'value', 7));
  const showAgain = Number(_.get(_.find(CAMPAIGN_SHOW.rules, ['rule', 'show_again_after_submit']), 'value', 0));

  if (showAgain == 0) {
    console.log('⛔ Popup never show again!');
    Cookies.set(`lead_submited_${CAMPAIGN_SHOW.code}`, `target_${CAMPAIGN_SHOW.extra_fields.targetType}`, { domain: '.' + LEAD_SITE_DOMAIN, path: '/' });
  }
  if (showAgain == 1) {
    console.log(`⌛ Popup will show again after ${expiresDay} days!`);
    Cookies.set(`lead_submited_${CAMPAIGN_SHOW.code}`, `target_${CAMPAIGN_SHOW.extra_fields.targetType}`, { domain: '.' + LEAD_SITE_DOMAIN, expires: expiresDay, path: '/' });
  }

  // TODO: Show THANK YOU
  axios.post(`${LEAD_API}/api/campaign/${CAMPAIGN_SHOW.code}/lead`, data, LEAD_AXIOS_CONFIG).then(() => {});

  if (CAMPAIGN_SHOW.extra_fields.popupShowThankYou == 'notshow') {
    jQuery('#lead-modal').remove();
    jQuery('body').removeClass('noscroll');
    return;
  }

  let isShowThanksYou = true;

  const thanksImg = CAMPAIGN_SHOW.thank_you_image || `${LEAD_API}/admin/img/thanksyou.png`;
  let thankTitle = CAMPAIGN_SHOW.extra_fields.popupThankyouTitle || 'Thank you.';
  let thankDesc = CAMPAIGN_SHOW.extra_fields.popupThankyouDesc || 'We appreciate your time!';

  let titleAlign = '';
  let descAlign = '';

  let titleHTML,
    subTitleHTML,
    linkHTML,
    linkText,
    linkNewtab,
    linkUrl = '';

  if (CAMPAIGN_SHOW.extra_fields.popupVersion == '2.1') {
    const extra = CAMPAIGN_SHOW.extra_fields;
    const listBlockThankyou = JSON.parse(extra.listBlockThankyou);
    const titleBlock = _.find(listBlockThankyou, (i) => i.name == 'TitleBlock');
    const subtitleBlock = _.find(listBlockThankyou, (i) => i.name == 'SubtitleBlock');
    const linkButtonBlock = _.find(listBlockThankyou, (i) => i.name == 'LinkButtonBlock');

    thankTitle = _.get(titleBlock, 'data.value', '');
    titleAlign = _.get(titleBlock, 'data.align', '');

    thankDesc = _.get(subtitleBlock, 'data.value', '');
    descAlign = _.get(subtitleBlock, 'data.align', '');

    linkText = _.get(linkButtonBlock, 'data.value', '');
    linkNewtab = _.get(linkButtonBlock, 'data.newtab', false);
    linkUrl = _.get(linkButtonBlock, 'data.url', '');

    titleHTML = titleBlock ? `<h1 class="le-thankyou-title le-text-align-${titleAlign}"> ${thankTitle} </h1>` : '';
    subTitleHTML = subtitleBlock ? `<p class="le-thankyou-subtitle le-text-align-${descAlign}"> ${thankDesc} </p>` : '';
    linkHTML = linkButtonBlock ? ` <div><a href="${linkUrl}" target="${linkNewtab ? '_blank' : 'parrent'}"><button class="lead-modal__btn">${linkText}</button></a></div> ` : '';

    const curLayout = CAMPAIGN_SHOW.extra_fields.currentLayout;
    // TODO: newbuilder thank you
    // List layout not show thanks you
    if (['SkinA', 'SkinB', 'Floating', 'Tab', 'CenterTab'].includes(curLayout)) {
      isShowThanksYou = false;
    }
  }
  if (isShowThanksYou) {
    jQuery('.lead-modal__content').empty();
    jQuery('.lead-modal__content').append(`
      <div class="lead-modal__thank-you">
        <div style="width: 100%;">
          <img src="${thanksImg}" style="max-height:162px; object-fit: cover;">
           ${titleHTML}
           ${subTitleHTML}
           ${linkHTML}
        </div>
      </div>
    `);
  }

  // Other
  // Init Insider Obj
  if (sessionStorage.getItem('insider_object')) {
    window.insider_object = JSON.parse(sessionStorage.getItem('insider_object'));
  } else {
    window.insider_object = {
      user: {
        email: '',
        phone_number: '',
        gdpr_optin: true,
        sms_optin: true,
        email_optin: true,
      },
    };
  }
  // Submit Inisder Obj
  formData.map((data) => {
    let name = data.name;
    let value = data.value;
    if (name == 'tel') {
      window.insider_object.user.phone_number = value;
    } else if (name == 'email') {
      window.insider_object.user.email = value;
    }
  });
  sessionStorage.setItem('insider_object', JSON.stringify(window.insider_object));
  // End Init Insider Obj
}

jQuery('body').on('click', '.js-modal__close', closePopupHandler);
jQuery('body').on('change', '#lead-term-checkbox', function() {
  jQuery('#lead-submit').prop('disabled', !jQuery(this).prop('checked'));
});

// Close
function closePopupHandler() {
  LEAD_POPUP_END_TIME = Date.now();
  console.log(`👋👋👋 CLOSE POPUP ${CAMPAIGN_SHOW.code} 👋👋👋`);
  HAS_SHOW_POPUP = true;
  jQuery('#lead-modal').remove();
  jQuery('body').removeClass('noscroll');

  const showAfterExit = Number(_.get(_.find(CAMPAIGN_SHOW.rules, ['rule', 'show_again_after_exit ']), 'value', 0));
  const expiresDay = Number(_.get(_.find(CAMPAIGN_SHOW.rules, ['rule', 'days_to_show_again']), 'value', 7));
  if (showAfterExit == 0) {
    if (expiresDay == '-1') {
      Cookies.set(`lead_closed_${CAMPAIGN_SHOW.code}`, `target_${CAMPAIGN_SHOW.extra_fields.popupVersion}`, { domain: '.' + LEAD_SITE_DOMAIN, path: '/' });
    } else {
      Cookies.set(`lead_closed_${CAMPAIGN_SHOW.code}`, `target_${CAMPAIGN_SHOW.extra_fields.popupVersion}`, { domain: '.' + LEAD_SITE_DOMAIN, expires: expiresDay, path: '/' });
    }
  }

  axios.post(
    `${LEAD_API}/api/campaign/${CAMPAIGN_SHOW.code}/popup_exit`,
    {
      action: 'CLICK',
      url: location.href.toLowerCase(),
      title_article: document.title,
      cookie_id: CAMPAIGN_UUID,
      duration: Math.ceil((LEAD_POPUP_END_TIME - LEAD_POPUP_START_TIME) / 1000),
    },
    LEAD_AXIOS_CONFIG,
  );
} //

// Other utils
function leadLoadCssLink(linkCss) {
  if (document.createStyleSheet) {
    try {
      document.createStyleSheet(linkCss);
    } catch (e) {}
  } else {
    var css;
    css = document.createElement('link');
    css.rel = 'stylesheet';
    css.type = 'text/css';
    css.media = 'all';
    css.href = linkCss;
    document.getElementsByTagName('head')[0].appendChild(css);
  }
}

// TODO: newbuilder

function leadShowPopupNewbuilder(campaignShow) {
  LEAD_POPUP_START_TIME = Date.now();
  HAS_SHOW_POPUP = true;
  console.log(`leadShowPopupNewbuilder -> campaignShow`, campaignShow);
  try {
    const extra = campaignShow.extra_fields;
    const { currentLayout } = extra;
    const listBlockAdded = JSON.parse(extra.listBlockAdded);
    const actionBlocks = JSON.parse(extra.actionBlocks);
    const textBlocks = JSON.parse(extra.textBlocks);
    const imageBlocks = extra.imageBlocks ? JSON.parse(extra.imageBlocks) : {};
    console.log(`leadShowPopupNewbuilder -> currentLayout`, currentLayout);

    let popupHtml = ``;
    const LightBoxAImage = campaignShow.image ? `<img draggable="false" class="lead-modal__image lead-modal-image-cover" src="${campaignShow.image}" alt="" >` : '';
    const LightBoxBDesktopImage = campaignShow.image_desktop ? `<img draggable="false" class="le-only-desktop lead-modal__image lead-modal-image-cover" style="height: 100%; object-fit: cover;" src="${campaignShow.image_desktop}" alt="" >` : '';
    const LightBoxBMobileImage = campaignShow.image ? `<img draggable="false" class="le-only-mobile lead-modal__image lead-modal-image-cover" src="${campaignShow.image}" alt="" >` : '';

    let popUpTermURL = actionBlocks.submitBlock.data.url;
    let popUpTermAgreeText = actionBlocks.submitBlock.data.text;
    let popUpTermText = actionBlocks.submitBlock.data.text2;
    let popUpSubmitText = actionBlocks.submitBlock.data.value;

    let listFieldAddedHTML = ``;
    let blockCount = {
      TextBlock: 0,
      NumberBlock: 0,
      EmailBlock: 0,
      PhoneBlock: 0,
      DateBlock: 0,
      CheckboxBlock: 0,
      RadioBlock: 0,
    };
    listBlockAdded.forEach((b) => {
      if (b.name == 'TitleBlock') {
        listFieldAddedHTML += `
        <h2 class="lead-modal__title ${'le-text-align-' + b.data?.align}">${b.data.value}</h2>
        `;
      }
      if (b.name == 'SubtitleBlock') {
        listFieldAddedHTML += `
        <p class="lead-modal__description ${'le-text-align-' + b.data?.align}">${b.data.value}</p>
        `;
      }
      if (b.name == 'TextBlock') {
        listFieldAddedHTML += `
        <div>
          <div class="lead-modal__form-control-wrapper form-control-wrapper--icon-left">
            <input required data-key="${b.data.value}" name="${'text' + (blockCount['TextBlock'] > 1 ? blockCount['TextBlock'] : '')}" spellcheck="false" type="text"
                  placeholder="${b.data.placeholder}" class="lead-modal__form-control width-100%">
            <img class="lead-modal__form-control-icon" src="${LEAD_API}/admin/img/builder/text.svg">
          </div>
        </div>
        `;
        blockCount['TextBlock'] += 1;
      }
      if (b.name == 'NumberBlock') {
        listFieldAddedHTML += `
        <div>
          <div class="lead-modal__form-control-wrapper form-control-wrapper--icon-left">
            <input required data-key="${b.data.value}" name="${'number' + (blockCount['NumberBlock'] ? blockCount['NumberBlock'] : '')}"  spellcheck="false" type="number" min="0"
                  placeholder="${b.data.placeholder}" class="lead-modal__form-control width-100%">
            <img class="lead-modal__form-control-icon" src="${LEAD_API}/admin/img/builder/number.svg">
          </div>
        </div>
        `;
        blockCount['NumberBlock'] += 1;
      }
      if (b.name == 'EmailBlock') {
        listFieldAddedHTML += `
        <div>
          <div class="lead-modal__form-control-wrapper form-control-wrapper--icon-left">
            <input required data-key="${b.data.value}" name="${'email' + (blockCount['EmailBlock'] ? blockCount['EmailBlock'] : '')}" spellcheck="false" type="email"
                  placeholder="${b.data.placeholder}" class="lead-modal__form-control width-100%">
            <img class="lead-modal__form-control-icon" src="${LEAD_API}/admin/img/builder/email.svg">
          </div>
        </div>
        `;
        blockCount['EmailBlock'] += 1;
      }
      if (b.name == 'PhoneBlock') {
        listFieldAddedHTML += `
        <div>
          <div class="lead-modal__form-control-wrapper form-control-wrapper--icon-left">
            <input required data-key="${b.data.value}" name="${'tel' + (blockCount['PhoneBlock'] ? blockCount['PhoneBlock'] : '')}" spellcheck="false" type="tel"
                  placeholder="${b.data.placeholder}" class="lead-modal__form-control width-100%">
            <img class="lead-modal__form-control-icon" src="${LEAD_API}/admin/img/builder/tel.svg">
          </div>
        </div>
        `;
        blockCount['PhoneBlock'] += 1;
      }
      if (b.name == 'DateBlock') {
        listFieldAddedHTML += `
        <div>
          <div class="lead-modal__form-control-wrapper form-control-wrapper--icon-left">
            <input required type="date" data-key="${b.data.value}" name="${'date' + (blockCount['DateBlock'] ? blockCount['DateBlock'] : '')}"  placeholder="${b.data.placeholder}" onclick="jQuery(this).removeClass('placeholderclass')" onblur="!jQuery(this).val() && jQuery(this).addClass('placeholderclass')" class="dateclass placeholderclass lead-modal__form-control width-100%" />
            <img class="lead-modal__form-control-icon" src="${LEAD_API}/admin/img/builder/date.svg">
          </div>
        </div>
        `;
        blockCount['DateBlock'] += 1;
      }
      if (b.name == 'LinkButtonBlock') {
        listFieldAddedHTML += `
        <div>
          <a target="${b.data.newtab ? 'blank' : 'parrent'}" href="${b.data.url}">
            <button type="button" class="lead-modal__btn js-modal__close js-popup-other-submit"> ${b.data.value} </button>
          </a>
        </div>
        `;
      }

      if (b.name == 'CheckboxBlock') {
        const { listQuestion, isSendMailChimp = false } = b.data;
        console.log('listQuestion', listQuestion);
        let checkboxHTML = ``;
        listQuestion.forEach((l) => {
          checkboxHTML += `
          <label class="lead-checkbox-container">
            <input data-key="${b.data.value}" name="${'checkbox' + (blockCount['CheckboxBlock'] ? blockCount['CheckboxBlock'] : '') + '[]'}" value="${l.value}" type="checkbox">
            <span class="lead-checkbox-checkmark"></span>
            ${l.placeholder}
          </label>
          `;
        });

        listFieldAddedHTML += `
        <div style="margin: 5px 0;">
          <div class="le-checkbox-title">${b.data.placeholder}</div>
          <div class="mailchimp-${b.data.value}" data-mailchimp="${isSendMailChimp}"></div>
          ${checkboxHTML}
        </div>
        `;

        blockCount['CheckboxBlock'] += 1;
      }

      if (b.name == 'RadioBlock') {
        const { listQuestion } = b.data;
        let radioHTML = ``;
        listQuestion.forEach((l) => {
          radioHTML += `
          <label class="lead-radio-container">
            <input data-key="${b.data.value}" name="${'radio' + (blockCount['RadioBlock'] ? blockCount['RadioBlock'] : '')}" value="${l.value}" type="radio">
            <span class="lead-radio-checkmark"></span>
            ${l.placeholder}
          </label>
          `;
        });

        listFieldAddedHTML += `
        <div style="margin: 5px 0;">
          <div class="le-checkbox-title">${b.data.placeholder}</div>
          ${radioHTML}
        </div>
        `;

        blockCount['RadioBlock'] += 1;
      }

      if (b.name == 'DropdownBlock') {
        const { listQuestion } = b.data;
        let dropdownHTML = ``;
        listQuestion.forEach((l) => {
          dropdownHTML += `
          <option  value="${l.value}" >
            ${l.placeholder}
          </option>
          `;
        });

        listFieldAddedHTML += `
        <div style="margin: 5px 0;">
          <div class="le-checkbox-title">${b.data.placeholder}</div>
          <div class="le-newbuilder-select-wrapper">
            <select class="le-newbuilder-select" data-key="${b.data.value}" name="${'dropdown' + (blockCount['DropdownBlock'] ? blockCount['DropdownBlock'] : '')}">
            ${dropdownHTML}
            </select>
          </div>
        </div>
        `;

        blockCount['DropdownBlock'] += 1;
      }
    });

    // TODO: CHECK LAYOUT
    if (currentLayout.includes('LightBox') || currentLayout.includes('Inline') || currentLayout == 'Fullscreen' || currentLayout == 'Sidebar' || currentLayout == 'Slider') {
      let isShowClose = true;
      let isInPage = false;
      let isSlider = false;
      if (window.innerWidth < 769 && ['Fullscreen', 'Slider'].includes(currentLayout)) {
        console.log('😎 Not show fullscreen, slider on mobile ');
        HAS_SHOW_POPUP = true;
        return;
      }
      if (currentLayout.includes('LightBox') || currentLayout == 'Fullscreen') {
        jQuery('body').addClass('noscroll');
      }
      if (currentLayout.includes('Inline') || currentLayout == 'Sidebar') {
        isInPage = true;
      }
      if (currentLayout.includes('Inline')) {
        isShowClose = false;
      }

      if (currentLayout == 'Slider') {
        isSlider = true;
      }

      let submitHTML = ``;

      const styleSheet = document.createElement('style');
      styleSheet.id = 'le-custom-slyte';
      styleSheet.textContent = `
        .le-newbuilder-overlay {
          background: url(${campaignShow.image_overlay_mobile}) ;
          background-repeat: no-repeat;
          background-size: cover;
        }
        @media screen and (min-width:768px) {
          .le-newbuilder-overlay {
            background: url(${campaignShow.image_overlay_desktop}) ;
            background-repeat: no-repeat;
            background-size: cover;
          }
        }
      `;
      document.body.appendChild(styleSheet, 'beforeend');

      if (!_.get(actionBlocks, 'submitBlock.isHide')) {
        submitHTML = `
        <div class="lead-modal__checkbox-wrapper">
                  <div class="lead-modal__checkbox">
                    <input id="lead-term-checkbox" class="lead-modal__checkbox__input" type="checkbox" aria-label="Checkbox label" checked>
                    <div class="lead-modal__checkbox__control" aria-hidden="true" ></div>
                  </div>
                  <label for="checkbox" class="lead-modal__checkbox__label">
                    ${popUpTermAgreeText} <span style="color: #2c87f3; font-weight: bold;"><a target="blank" href="${popUpTermURL || 'https://hellobacsi.com/chinh-sach'}" rel="noopener noreferrer">${popUpTermText}</a></span>
                  </label>
                </div>
        <button id="lead-submit" type="submit" class="lead-modal__btn"> ${popUpSubmitText}</button>
        `;
      }

      popupHtml = `
      <div id="lead-modal" class="lead-modal modal--animate-scale ${isInPage ? 'le-buider-inline' : ''} ${isSlider ? 'le-buider-slider' : ''}">
        ${currentLayout == 'Fullscreen' ? `<img class="le-only-desktop le-fullscreen-img" draggable="false" src="${campaignShow.image_background ? campaignShow.image_background : ''}">` : ''}
        <div class="lead-modal__wrapper le-newbuilder-wrap-${currentLayout}">
          <div class="lead-modal__content le-newbuilder-${currentLayout}">
            <header class="lead-modal__header">
              ${
                ['LightBoxA', 'InlineA', 'Sidebar', 'Slider'].includes(currentLayout)
                  ? LightBoxAImage
                  : `
                ${LightBoxBDesktopImage}
                ${LightBoxBMobileImage}
              `
              }
            </header>

            <div class="lead-modal__body le-newbuilder-overlay">
              <form class="lead-modal__form">
                <div style="margin-bottom: 20px;">
                  <h2 class="lead-modal__title ${'le-text-align-' + textBlocks.titleBlock.data?.align}">${textBlocks.titleBlock.data.value}</h2>
                  <p class="lead-modal__description ${'le-text-align-' + textBlocks.subtitleBlock.data?.align}">${textBlocks.subtitleBlock.data.value}</p>
                </div>

                <div style="">${listFieldAddedHTML}</div>

                ${submitHTML}
              </form>
            </div>
          </div>

          ${
            isShowClose
              ? `
                <button class="lead-modal__close-btn ${currentLayout == 'Fullscreen' ? 'lead-fullscreen-desktop-close-btn' : ''} js-modal__close">
                  <svg class="lead-modal__close-icon" viewBox="0 0 24 24">
                    <g fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"><line x1="3" y1="3" x2="21" y2="21" /><line x1="21" y1="3" x2="3" y2="21" /></g>
                  </svg>
                </button>`
              : ``
          }
        </div>
      </div>
      `;

      jQuery('#lead-modal').remove();
      // TODO: Show popup
      if (currentLayout.includes('LightBox') || currentLayout == 'Fullscreen' || currentLayout == 'Slider') {
        jQuery('body').append(popupHtml);
      }

      if (currentLayout.includes('Inline')) {
        const $content = jQuery('.entry-content-body,.article-details-content-main.single-article-details,.page-details-content-main.article-main-content,.blog-details-content-main');
        if ($content.length) {
          const $child = $content.children();

          switch (extra.popupInlinePosition) {
            case '1th':
              renderHTML($child, popupHtml, 'p', 0);
              break;
            case '2th':
              renderHTML($child, popupHtml, 'p', 1);
              break;
            case '3th':
              renderHTML($child, popupHtml, 'p', 2);
              break;
            case '4th':
              renderHTML($child, popupHtml, 'p', 3);
              break;
            case '5th':
              renderHTML($child, popupHtml, 'p', 4);
              break;
            case '6th':
              renderHTML($child, popupHtml, 'p', 5);
              break;
            case '7th':
              renderHTML($child, popupHtml, 'p', 6);
              break;
            case '8th':
              renderHTML($child, popupHtml, 'p', 7);
              break;
            case '9th':
              renderHTML($child, popupHtml, 'p', 8);
              break;
            case '10th':
              renderHTML($child, popupHtml, 'p', 9);
              break;
            case '11th':
              renderHTML($child, popupHtml, 'p', 10);
              break;
            case '12th':
              renderHTML($child, popupHtml, 'p', 11);
              break;
            case 'lastP':
              renderHTML($child, popupHtml, 'p', $child.eq($child.filter('p').length - 1));
              break;
            case '1thH2':
              renderHTML($child, popupHtml, 'h2', 0);
              break;
            case '2thH2':
              renderHTML($child, popupHtml, 'h2', 1);
              break;
            case '3thH2':
              renderHTML($child, popupHtml, 'h2', 2);
              break;
            case '4thH2':
              renderHTML($child, popupHtml, 'h2', 3);
              break;
            case '5thH2':
              renderHTML($child, popupHtml, 'h2', 4);
              break;
            case '6thH2':
              renderHTML($child, popupHtml, 'h2', 5);
              break;
            case '7thH2':
              renderHTML($child, popupHtml, 'h2', 6);
              break;
            case '8thH2':
              renderHTML($child, popupHtml, 'h2', 7);
              break;
            case '9thH2':
              renderHTML($child, popupHtml, 'h2', 8);
              break;
            case '10thH2':
              renderHTML($child, popupHtml, 'h2', 9);
              break;
            case 'lastH2':
              renderHTML($child, popupHtml, 'h2', $child.eq($child.filter('h2').length - 1));
              break;
            default:
              jQuery(popupHtml).insertAfter($posEnd);
              break;
          }
        } else {
          console.log('🙂 Inline only show on article ');
          HAS_SHOW_POPUP = true;
          return;
        }
      }
      if (currentLayout == 'Sidebar') {
        const $sideBar = jQuery('.hc2-sidebar-with-ads,.page-main-col .right-col.f-right');
        if ($sideBar.length) {
          $sideBar.prepend(popupHtml);
        } else {
          console.log('🙂 Sidebar only show on article ');
          HAS_SHOW_POPUP = true;
          return;
        }
      }

      jQuery.validator.addMethod(
        'phoneNumber',
        function(value, element) {
          return intlTelInputUtils.isValidNumber(String(value), leadCountryCode);
        },
        errorPhoneMsg,
      );

      const numberRule = { required: true, number: true, min: 0 };
      const telRule = { required: true };
      const emailRule = { required: true };
      const requireOnlyRule = { required: true };
      const checkboxRule = { required: true };
      const radioboxRule = { required: true };
      const dropdownRule = { required: true };

      jQuery('.lead-modal__form').validate({
        errorPlacement: function(error, element) {
          error.appendTo(element.parent().parent());
        },
        // onkeyup: false,
        rules: {
          number: numberRule,
          number1: numberRule,
          number2: numberRule,
          number3: numberRule,
          tel: telRule,
          tel1: telRule,
          tel2: telRule,
          tel3: telRule,
          email: emailRule,
          email1: emailRule,
          email2: emailRule,
          email3: emailRule,
          date: requireOnlyRule,
          date1: requireOnlyRule,
          date2: requireOnlyRule,
          date3: requireOnlyRule,
          text: requireOnlyRule,
          text1: requireOnlyRule,
          text2: requireOnlyRule,
          text3: requireOnlyRule,
          'checkbox[]': checkboxRule,
          'checkbox1[]': checkboxRule,
          'checkbox2[]': checkboxRule,
          'checkbox3[]': checkboxRule,
          radio: radioboxRule,
          radio1: radioboxRule,
          radio2: radioboxRule,
          radio3: radioboxRule,
          dropdown: dropdownRule,
          dropdown1: dropdownRule,
          dropdown2: dropdownRule,
          dropdown3: dropdownRule,
        },
        submitHandler: function(form) {
          submitHandler(form);
        },
      });
    } // End LightBox

    if (currentLayout.includes('Skin')) {
      let desktopHTMLPopup = ``;
      if (currentLayout == 'SkinA') {
        desktopHTMLPopup = `
        <aside class="le-only-desktop">
          <div class="le-skin-a-desktop">
            <div style="position: relative;">
              <img src="${campaignShow.image_desktop}">
              <a style="position: absolute; top: 75%; left: 50%; transform: translate(-50%, -50%); text-align: center; width: 100%;" href="${actionBlocks.linkButtonBlock.data.url}" target="${actionBlocks.linkButtonBlock.data.newtab ? 'blank' : '_parent'}">
                <button class="le-joinbow-btn js-popup-other-submit">${actionBlocks.linkButtonBlock.data.value}</button>
              </a>
              <button class="lead-modal__close-btn js-modal__close"><svg class="lead-modal__close-icon" viewBox="0 0 24 24"> <g fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"><line x1="3" y1="3" x2="21" y2="21" /><line x1="21" y1="3" x2="3" y2="21" /></g> </svg></button>
            </div>
          </div>
        </aside>
        `;
      }
      if (currentLayout == 'SkinB') {
        desktopHTMLPopup = `
        <aside class="le-only-desktop">
          <div class="">
            <div style="position: relative; z-index: 10000;">
              <img src="${campaignShow.image_desktop}" style="width: 100%;">
              <a style="position: absolute; top: 75%; left: 50%; transform: translate(-50%, -50%); text-align: center; width: 100%;" href="${actionBlocks.linkButtonBlock.data.url}" target="${actionBlocks.linkButtonBlock.data.newtab ? 'blank' : '_parent'}">
                <button class="le-joinbow-btn-mobile js-popup-other-submit">${actionBlocks.linkButtonBlock.data.value}</button>
              </a>
              <button class="le-newbuilder-close-button le-abs-top-right js-modal__close">
                <svg class="le-newbuilder-close-svg " xmlns="http://www.w3.org/2000/svg" width="53" height="53" viewBox="0 0 53 53"><defs><filter width="53" height="53" filterUnits="userSpaceOnUse"><feGaussianBlur result="blur" stdDeviation="3"/><feFlood flood-opacity=".4"/><feComposite in2="blur" operator="in"/><feComposite in="SourceGraphic"/></filter><style>.cls-2{fill:none;stroke:#fff;stroke-linecap:round;stroke-width:2px}</style></defs><g filter="url(#Ellipse_482)"><circle cx="17.5" cy="17.5" r="17.5" transform="translate(-483.1 -671.163)translate(483.1 671.16)translate(9 9)" fill="#005cfd"/></g><path d="M19 19L34 34" class="cls-2"/><path d="M34 19L19 34" class="cls-2"/></svg>
              </button>
            </div>
          </div>
        </aside>
        `;
      }

      jQuery('body').prepend(`
      <div id="lead-modal">
        ${desktopHTMLPopup}

        <aside class="le-only-mobile">
          <div class="le-skin-mobile">
            <div style="position: relative;">
              <img src="${campaignShow.image}" style="width: 100%;">
              <a style="position: absolute; top: 75%; left: 50%; transform: translate(-50%, -50%); text-align: center; width: 100%;" href="${actionBlocks.linkButtonBlock.data.url}" target="${actionBlocks.linkButtonBlock.data.newtab ? 'blank' : '_parent'}">
                <button class="le-joinbow-btn-mobile js-popup-other-submit">${actionBlocks.linkButtonBlock.data.value}</button>
              </a>
              <button class="le-newbuilder-close-button le-abs-top-right js-modal__close">
                <svg class="le-newbuilder-close-svg le-mobile-btn" xmlns="http://www.w3.org/2000/svg" width="53" height="53" viewBox="0 0 53 53"><defs><filter width="53" height="53" filterUnits="userSpaceOnUse"><feGaussianBlur result="blur" stdDeviation="3"/><feFlood flood-opacity=".4"/><feComposite in2="blur" operator="in"/><feComposite in="SourceGraphic"/></filter><style>.cls-2{fill:none;stroke:#fff;stroke-linecap:round;stroke-width:2px}</style></defs><g filter="url(#Ellipse_482)"><circle cx="17.5" cy="17.5" r="17.5" transform="translate(-483.1 -671.163)translate(483.1 671.16)translate(9 9)" fill="#005cfd"/></g><path d="M19 19L34 34" class="cls-2"/><path d="M34 19L19 34" class="cls-2"/></svg>
              </button>
            </div>
          </div>
        </aside>
      </div>
      `);
      // For hellosite
      const $head = jQuery('#masthead');
      if ($head.length) {
        setTimeout(() => {
          const $mb = jQuery('.le-skin-mobile img');
          const mbh = $mb.height();
          $head.attr('style', 'top: ' + mbh + 'px !important;');
          jQuery(parent.window.document).scroll(leNewbuilderResizeSkin);
          jQuery(window).resize(leNewbuilderResizeSkin);
          jQuery('body').on('click', '.le-newbuilder-close-button', leNewbuilderResetHeader);
          leNewbuilderResizeSkin();
        }, 750);
      }

      function leNewbuilderResizeSkin() {
        const $mb = jQuery('.le-skin-mobile img');
        const mbh = $mb.height();
        const xTop = jQuery(window).scrollTop();
        $head.attr('style', 'top: ' + (mbh - xTop) + 'px !important;');
        if (xTop > mbh) {
          leNewbuilderResetHeader();
        }
      }
      function leNewbuilderResetHeader() {
        $head.attr('style', 'top: ' + 0 + 'px !important;');
      }

      const $mobile_nav = jQuery('.hhg-header-mobile .header-action-nav');
      const $modal = jQuery('#lead-modal');
      $mobile_nav.click(function() {
        const isOpen = $mobile_nav.hasClass('nav-open');
        if (isOpen) {
          $modal.hide();
          leNewbuilderResetHeader();
        } else {
          $modal.show();
          leNewbuilderResizeSkin();
        }
      });
    } // End Skin

    if (currentLayout == 'Floating') {
      const imgFloatMobile = campaignShow.image ? `<div><img style="margin-left:15px; margin-top: 4px; max-width: 100px;" src="${campaignShow.image}"></div>` : ``;
      const imgFloatDesktop = campaignShow.image_desktop ? `<div><img style="max-width: 120px;border-top-left-radius: 5px;border-bottom-left-radius: 5px;" src="${campaignShow.image_desktop}"></div>` : ``;

      jQuery('body').append(`
      <div id="lead-modal">
       <aside class="le-only-desktop">
        <div class="le-floating-desktop">
          <div class="le-floating-desktop-wrap" style="position: relative; background: #fff;">
            ${imgFloatDesktop}
            <div style="padding:20px;">
              <div class="le-floating-desktop-title le-text-align-${textBlocks.titleBlock.data.align}">${textBlocks.titleBlock.data.value}</div>
              <div class="le-floating-desktop-desc le-text-align-${textBlocks.subtitleBlock.data.align}">${textBlocks.subtitleBlock.data.value}</div>
            </div>
            <a target="${actionBlocks.linkButtonBlock.data.newtab ? 'blank' : '_parent'}" style="margin-left: 35px;" href="${actionBlocks.linkButtonBlock.data.url}">
              <button class="le-joinbow-floating-btn js-popup-other-submit">${actionBlocks.linkButtonBlock.data.value}</button>
            </a>
            <button class="le-newbuilder-close-button le-abs-outer-top-right js-modal__close">
              <svg class="le-newbuilder-close-svg " xmlns="http://www.w3.org/2000/svg" width="53" height="53" viewBox="0 0 53 53"><defs><filter width="53" height="53" filterUnits="userSpaceOnUse"><feGaussianBlur result="blur" stdDeviation="3"/><feFlood flood-opacity=".4"/><feComposite in2="blur" operator="in"/><feComposite in="SourceGraphic"/></filter><style>.cls-2{fill:none;stroke:#fff;stroke-linecap:round;stroke-width:2px}</style></defs><g filter="url(#Ellipse_482)"><circle cx="17.5" cy="17.5" r="17.5" transform="translate(-483.1 -671.163)translate(483.1 671.16)translate(9 9)" fill="#005cfd"/></g><path d="M19 19L34 34" class="cls-2"/><path d="M34 19L19 34" class="cls-2"/></svg>
            </button>
          </div>
        </div>
       </aside>

       <aside class="le-only-mobile">
       <div class="le-floating-mobile">
         <div class="le-floating-mobile-wrap" style="position: relative; background: #fff;">
           <aside style="display:flex;justify-content: space-between;">
            <div>
              <div class="le-floating-mobile-title le-text-align-${textBlocks.titleBlock.data.align}">${textBlocks.titleBlock.data.value}</div>
              <div class="le-floating-mobile-desc le-text-align-${textBlocks.subtitleBlock.data.align}">${textBlocks.subtitleBlock.data.value}</div>
            </div>
            ${imgFloatMobile}
           </aside>
           <div style="text-align:center; margin-top: 10px;">
            <a target="${actionBlocks.linkButtonBlock.data.newtab ? 'blank' : '_parent'}"  href="${actionBlocks.linkButtonBlock.data.url}"><button class="le-joinbow-floating-btn js-popup-other-submit">${actionBlocks.linkButtonBlock.data.value}</button></a>
           </div>
          <button class="le-newbuilder-close-button le-abs-outer-mobile-top-right js-modal__close">
              <svg class="le-newbuilder-close-svg le-mobile-btn" xmlns="http://www.w3.org/2000/svg" width="53" height="53" viewBox="0 0 53 53"><defs><filter width="53" height="53" filterUnits="userSpaceOnUse"><feGaussianBlur result="blur" stdDeviation="3"/><feFlood flood-opacity=".4"/><feComposite in2="blur" operator="in"/><feComposite in="SourceGraphic"/></filter><style>.cls-2{fill:none;stroke:#fff;stroke-linecap:round;stroke-width:2px}</style></defs><g filter="url(#Ellipse_482)"><circle cx="17.5" cy="17.5" r="17.5" transform="translate(-483.1 -671.163)translate(483.1 671.16)translate(9 9)" fill="#005cfd"/></g><path d="M19 19L34 34" class="cls-2"/><path d="M34 19L19 34" class="cls-2"/></svg>
          </button>
         </div>
       </div>
      </aside>

      </div>
      `);
    }

    if (currentLayout == 'Tab') {
      jQuery('body').append(`
      <div id="lead-modal">
        <div class="le-tab-popup">
          <div style="position:relative;">
            <a href="${imageBlocks.imageMobile.data.url}" target="${imageBlocks.imageMobile.data.newtab ? 'blank' : '_parent'}">
              <img class="js-popup-other-submit" src="${campaignShow.image}">
            </a>
            <button class="le-newbuilder-close-button le-abs-outer-mobile-top-right-2 js-modal__close">
              <svg class="le-newbuilder-close-svg le-mobile-btn" xmlns="http://www.w3.org/2000/svg" width="53" height="53" viewBox="0 0 53 53"><defs><filter width="53" height="53" filterUnits="userSpaceOnUse"><feGaussianBlur result="blur" stdDeviation="3"/><feFlood flood-opacity=".4"/><feComposite in2="blur" operator="in"/><feComposite in="SourceGraphic"/></filter><style>.cls-2{fill:none;stroke:#fff;stroke-linecap:round;stroke-width:2px}</style></defs><g filter="url(#Ellipse_482)"><circle cx="17.5" cy="17.5" r="17.5" transform="translate(-483.1 -671.163)translate(483.1 671.16)translate(9 9)" fill="#005cfd"/></g><path d="M19 19L34 34" class="cls-2"/><path d="M34 19L19 34" class="cls-2"/></svg>
            </button>
          </div>
        </div>
      </div>
      `);
    }

    if (currentLayout == 'CenterTab') {
      jQuery('body').append(`
      <div id="lead-modal">
        <div class="le-center-tab-popup">
          <div style="position:relative;">
            <a class="js-popup-other-submit" href="${imageBlocks.imageMobile.data.url}" target="${imageBlocks.imageMobile.data.newtab ? 'blank' : '_parent'}">
              <img class="le-only-mobile" src="${campaignShow.image}">
              <img class="le-only-desktop" src="${campaignShow.image_desktop}">
            </a>
            <button class="le-newbuilder-close-button le-abs-outer-mobile-top-right-2 js-modal__close">
              <svg class="le-newbuilder-close-svg le-mobile-btn" xmlns="http://www.w3.org/2000/svg" width="53" height="53" viewBox="0 0 53 53"><defs><filter width="53" height="53" filterUnits="userSpaceOnUse"><feGaussianBlur result="blur" stdDeviation="3"/><feFlood flood-opacity=".4"/><feComposite in2="blur" operator="in"/><feComposite in="SourceGraphic"/></filter><style>.cls-2{fill:none;stroke:#fff;stroke-linecap:round;stroke-width:2px}</style></defs><g filter="url(#Ellipse_482)"><circle cx="17.5" cy="17.5" r="17.5" transform="translate(-483.1 -671.163)translate(483.1 671.16)translate(9 9)" fill="#005cfd"/></g><path d="M19 19L34 34" class="cls-2"/><path d="M34 19L19 34" class="cls-2"/></svg>
            </button>
          </div>
        </div>
      </div>
      `);
    }

    // TODO: Get ga_client_id from cookies
    let gaCookie = Cookies.get('_ga') ? Cookies.get('_ga') : null;
    axios.post(
      `${LEAD_API}/api/campaign/${CAMPAIGN_SHOW.code}/impression`,
      {
        action: CAMPAIGN_IMPRESSION_ACTION,
        url: location.href.toLowerCase(),
        title_article: document.title,
        cookie_id: CAMPAIGN_UUID,
        ga_client_id: gaCookie,
      },
      LEAD_AXIOS_CONFIG,
    );

    // TODO: other submit layout: Tab, Floating bar
    jQuery('body').on('click', '.js-popup-other-submit', function() {
      console.log('👌 Other submit click');

      HAS_SHOW_POPUP = true;
      jQuery('#lead-modal').remove();
      jQuery('body').removeClass('noscroll');

      if (CAMPAIGN_SHOW.extra_fields.currentLayout.includes('Skin')) {
        const $head = jQuery('#masthead');
        $head.attr('style', 'top: ' + 0 + 'px !important;');
      }

      const expiresDay = Number(_.get(_.find(CAMPAIGN_SHOW.rules, ['rule', 'days_to_show_again']), 'value', 7));
      const showAgain = Number(_.get(_.find(CAMPAIGN_SHOW.rules, ['rule', 'show_again_after_submit']), 'value', 0));

      if (showAgain == 0) {
        console.log('⛔ Popup never show again!');
        Cookies.set(`lead_submited_${CAMPAIGN_SHOW.code}`, `target_${CAMPAIGN_SHOW.extra_fields.popupVersion}`, { domain: '.' + LEAD_SITE_DOMAIN, path: '/' });
      }
      if (showAgain == 1) {
        console.log(`⌛ Popup will show again after ${expiresDay} days!`);
        Cookies.set(`lead_submited_${CAMPAIGN_SHOW.code}`, `target_${CAMPAIGN_SHOW.extra_fields.popupVersion}`, { domain: '.' + LEAD_SITE_DOMAIN, expires: expiresDay, path: '/' });
      }

      let gaCookie = Cookies.get('_ga') ? Cookies.get('_ga') : null;
      let data = {
        url: location.href.toLowerCase(),
        title_article: document.title,
        meta: [],
        cookie_id: CAMPAIGN_UUID,
        ga_client_id: gaCookie,
      };
      axios.post(`${LEAD_API}/api/campaign/${CAMPAIGN_SHOW.code}/lead`, data, LEAD_AXIOS_CONFIG).then(() => {});
    });
  } catch (error) {
    console.error('Error when show newbuilder popup', error);
    jQuery('body').removeClass('noscroll');
  }
}
