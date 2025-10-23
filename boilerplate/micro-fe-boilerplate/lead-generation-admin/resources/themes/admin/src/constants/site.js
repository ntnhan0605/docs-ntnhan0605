export const SITE_KEYS = {
  HELLO_BAC_SI: 'HELLO_BAC_SI',
  MARRY_BABY: 'MARRY_BABY',
  HELLO_SEHAT: 'HELLO_SEHAT', // Indonesia
  HELLO_KHUNMOR: 'HELLO_KHUNMOR', // Thailand
  HELLO_DOKTOR: 'HELLO_DOKTOR', // Malaysia
  HELLO_YISHI: 'HELLO_YISHI', // Taiwan
  HELLO_KRUPET: 'HELLO_KRUPET', // Cambodia
  HELLO_SAYARWON: 'HELLO_SAYARWON', // Myanmar
  HELLO_SWATHYA: 'HELLO_SWATHYA', // India
  HELLO_DOCTOR: 'HELLO_DOCTOR', // Philippines
  HELLO_FIL: 'HELLO_FIL', // Philippines - Fil
  HELLO_HEALTH_GROUP: 'HELLO_HEALTH_GROUP',
};

export const SITE_DOMAINS_PRODUCTION = {
  'hellohealthgroup.com': SITE_KEYS.HELLO_HEALTH_GROUP,
  'hellobacsi.com': SITE_KEYS.HELLO_BAC_SI,
  'marrybaby.vn': SITE_KEYS.MARRY_BABY,
  'www.marrybaby.vn': SITE_KEYS.MARRY_BABY,
  'hellosehat.com': SITE_KEYS.HELLO_SEHAT,
  'hellokhunmor.com': SITE_KEYS.HELLO_KHUNMOR,
  'hellodoktor.com': SITE_KEYS.HELLO_DOKTOR,
  'helloyishi.com.tw': SITE_KEYS.HELLO_YISHI,
  'hellokrupet.com': SITE_KEYS.HELLO_KRUPET,
  'hellosayarwon.com': SITE_KEYS.HELLO_SAYARWON,
  'helloswasthya.com': SITE_KEYS.HELLO_SWATHYA,
  'hellodoctor.com.ph': SITE_KEYS.HELLO_DOCTOR,
  'hellodoctor.com.ph/fil': SITE_KEYS.HELLO_FIL,
};

export const SITE_DOMAINS_STAGING = {
  'discover.hellobacsi.com': SITE_KEYS.HELLO_BAC_SI,
  'fe.marrybaby.vn': SITE_KEYS.MARRY_BABY,
  'discover.hellosehat.com': SITE_KEYS.HELLO_SEHAT,
  'discover.hellokhunmor.com': SITE_KEYS.HELLO_KHUNMOR,
  'discover.hellodoktor.com': SITE_KEYS.HELLO_DOKTOR,
  'discover.helloyishi.com.tw': SITE_KEYS.HELLO_YISHI,
  'discover.hellokrupet.com': SITE_KEYS.HELLO_KRUPET,
  'discover.hellosayarwon.com': SITE_KEYS.HELLO_SAYARWON,
  'discover.helloswasthya.com': SITE_KEYS.HELLO_SWATHYA,
  'discover.hellodoctor.com.ph': SITE_KEYS.HELLO_DOCTOR,
  'discover.hellodoctor.com.ph/fil': SITE_KEYS.HELLO_FIL,
  'staging.hellohealthgroup.com': SITE_KEYS.HELLO_HEALTH_GROUP,
};

export const SITE_DOMAINS = {
  // Production
  ...SITE_DOMAINS_PRODUCTION,
  // Staging
  ...SITE_DOMAINS_STAGING,
};

export const SITES = {
  [SITE_KEYS.HELLO_BAC_SI]: {
    label: 'Hello Bacsi',
    local: 'Vietnam - HelloBacsi',
    flag: '/img/country/sites/vietnam.svg',
    nation: 'VN',
    // icon: Vietnam
  },
  [SITE_KEYS.MARRY_BABY]: {
    label: 'Marrybaby',
    local: 'Vietnam - Marrybaby',
    flag: '/img/country/sites/vietnam.svg',
    nation: 'VN',
    // icon: Vietnam
  },
  [SITE_KEYS.HELLO_SEHAT]: {
    label: 'Hello Sehat',
    local: 'Indonesia',
    flag: '/img/country/sites/indonesia.svg',
    nation: 'ID',
    // icon: Indonesia
  },
  [SITE_KEYS.HELLO_KHUNMOR]: {
    label: 'Hello Khunmor',
    local: 'Thailand',
    flag: '/img/country/sites/thailand.svg',
    nation: 'TH',
    // icon: Thailand
  },
  [SITE_KEYS.HELLO_DOKTOR]: {
    label: 'Hello Doktor',
    local: 'Malaysia',
    flag: '/img/country/sites/malaysia.svg',
    nation: 'MY',
    // icon: Malaysia
  },
  [SITE_KEYS.HELLO_YISHI]: {
    label: 'Hello Yishi',
    local: 'Taiwan',
    flag: '/img/country/sites/taiwan.svg',
    nation: 'TW',
    // icon: Taiwan
  },
  [SITE_KEYS.HELLO_KRUPET]: {
    label: 'Hello Krupet',
    local: 'Cambodia',
    flag: '/img/country/sites/cambodia.svg',
    nation: 'KH',
    // icon: Cambodia
  },
  [SITE_KEYS.HELLO_SAYARWON]: {
    label: 'Hello Sayarwon',
    local: 'Myanmar',
    flag: '/img/country/sites/myanmar.svg',
    nation: 'MM',
    // icon: Myanmar
  },
  [SITE_KEYS.HELLO_SWATHYA]: {
    label: 'Hello Swathya',
    local: 'India',
    flag: '/img/country/sites/india.svg',
    nation: 'IN',
    // icon: India
  },
  [SITE_KEYS.HELLO_DOCTOR]: {
    label: 'Hello Doctor',
    local: 'Phillipines',
    flag: '/img/country/sites/phillipines.svg',
    nation: 'PH',
    // icon: Phillipines
  },
  [SITE_KEYS.HELLO_FIL]: {
    label: 'Hello Doctor - Fil',
    local: 'Phillipines - Fil',
    flag: '/img/country/sites/phillipines.svg',
    nation: 'PH',
    // icon: Phillipines
  },
  [SITE_KEYS.HELLO_HEALTH_GROUP]: {
    label: 'Hello Health Group',
    local: 'Hello Health Group',
    flag: '/img/country/sites/hhg.png',
    nation: 'HHG',
    // icon: Vietnam
  },
};
