var LEAD_SITE_ID = 0;
var LEAD_ROUTE_API = 'https://dev.leadgen.hellobacsi.com/';

var languageMappingLead = {
  'hellobacsi.com': 'vi-VN',
  'www.marrybaby.vn': 'vi-VN',
  'hellosehat.com': 'id-ID',
  'hellokhunmor.com': 'th-TH',
  'hellodoktor.com': 'ms-MY',
  'helloyishi.com.tw': 'zh-TW',
  'hellokrupet.com': 'km-KH',
  'hellosayarwon.com': 'my-MM',
  'helloswasthya.com': 'hi-IN',
  'hellodoctor.com.ph': 'en-PH',
};
var arrayLanguageMappingLead = Object.keys(languageMappingLead);

if (document.currentScript.hasAttribute('data-site-id')) {
  LEAD_SITE_ID = document.currentScript.getAttribute('data-site-id');
}

/* hhgGenerateUUID */
function hhgGenerateUUID() {
  var d = new Date().getTime();
  var d2 = (performance && performance.now && performance.now() * 1000) || 0;
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16;
    if (d > 0) {
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}

/* hhgGetCookie */
function hhgGetCookie(field) {
  var cookieFound = document.cookie
    .split(';')
    .map(function(_cookie) {
      return _cookie.trim().split('=');
    })
    .find(function(_cookie) {
      return _cookie[0] === field;
    });
  return cookieFound ? cookieFound[1] : '';
}

/* hhgSetCookie */
function hhgSetCookie(name, value, days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    var expires = '; expires=' + date.toGMTString();
  } else var expires = '';
  document.cookie = name + '=' + value + expires + ';';
}
/* hhgCreateElement */
function hhgCreateElement(el, attrs) {
  var newEl = document.createElement(el);
  if (attrs) {
    Object.keys(attrs).map(function(key) {
      return (newEl[key] = attrs[key]);
    });
  }
  return newEl;
}

/* hhgHttpPost */
function hhgHttpPost(url, params, callback) {
  return new Promise(function(resolve, reject) {
    var req = new XMLHttpRequest();
    req.open('POST', url);

    req.onload = function() {
      if (req.status == 200) {
        resolve(JSON.parse(req.response));
      } else {
        reject(Error(req.statusText));
      }
    };

    req.onerror = function() {
      reject(Error('Network Error'));
    };

    req.send(params);
  });
}

/* hhgHttpGet */
function hhgHttpGet(url, params) {
  return new Promise(function(resolve, reject) {
    var req = new XMLHttpRequest();
    req.open('GET', url);

    req.onload = function() {
      if (req.status == 200) {
        resolve(req.response);
      } else {
        reject(Error(req.statusText));
      }
    };

    req.onerror = function() {
      reject(Error('Network Error'));
    };

    req.send(params);
  });
}

/* hhgDeviceType */
function hhgDeviceType() {
  var ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet';
  } else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return 'mobile';
  }
  return 'desktop';
}

/* queryBuilder */
function queryBuilder(queryParams) {
  var sep = '';
  var queryString = '';
  if (queryParams) {
    Object.keys(queryParams).map(function(key) {
      if (queryParams[key] !== '') {
        queryString += sep + key + '=' + queryParams[key];
      } else {
        queryString += sep + key + '=';
      }
      sep = '&';
    });
  }
  return queryString;
}

function getLead() {
  var LEAD_ROUTE_API_CAMPAIGN = LEAD_ROUTE_API + 'api/campaign/' + '-1';

  hhgHttpPost(LEAD_ROUTE_API_CAMPAIGN, {
    url: 'https://' + window.location.hostname + window.location.pathname,
    ga_client_id: hhgGetCookie('_ga') || null,
  }).then(function(res) {
    console.log('===ryan===>  : ', res);
    console.log('===ryan===>  : ', typeof res);
    if (res._status === 1) {
      console.log('===ryan===>  : ', res._data);
    }
  });
}
getLead();
