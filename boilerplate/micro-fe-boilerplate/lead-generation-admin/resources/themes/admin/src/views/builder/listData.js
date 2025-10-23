export const listBehaviorType = () => [
  {
    label: 'Active',
    value: 'avtive',
    checked: false,
  },
  {
    label: 'Reader',
    value: 'reader',
    checked: false,
  },
  {
    label: 'Buyer',
    value: 'buyer',
    checked: false,
  },
  {
    label: 'Disinterested',
    value: 'disinterested',
    checked: false,
  },
];

export const listBehaviorPopup = () => [
  {
    label: 'Collect information of visitors already saw the popup on a specific campaign.',
    value: 'saw',
    checked: false,
  },
  {
    label: 'Pop ups are already exited before by closing and still want to collect information',
    value: 'saw',
    checked: false,
  },
];

export const listBehaviorCategories = () => [
  {
    label: 'Collect information from most visited categories',
    value: 'saw',
    checked: false,
  },
];

export const listGender = () => [
  {
    label: 'Male',
    value: 'male',
    checked: false,
  },
  {
    label: 'Female',
    value: 'female',
    checked: false,
  },
];

export const listSEC = () => [
  {
    label: 'Upper class',
    value: 'Upper class',
    checked: false,
  },
  {
    label: 'Labour class',
    value: 'Upper class',
    checked: false,
  },
  {
    label: 'Working class',
    value: 'Working class',
    checked: false,
  },
  {
    label: 'Upper middle class',
    value: 'Upper middle class',
    checked: false,
  },
  {
    label: 'Middle class',
    value: 'Middle class',
    checked: false,
  },
];

export const listDevice = () => [
  {
    label: 'Mobile',
    value: 1,
    checked: true,
  },
  {
    label: 'Desktop',
    value: 2,
    checked: true,
  },
  // {
  //   label: 'Tablet',
  //   value: 3,
  //   checked: false,
  // },
];

export const listAge = () => [
  {
    label: '18-24',
    value: '18-24',
    checked: false,
  },
  {
    label: '25-34',
    value: '25-34',
    checked: false,
  },
  {
    label: '35-44',
    value: '35-44',
    checked: false,
  },
  {
    label: '45-54',
    value: '45-54',
    checked: false,
  },
  {
    label: '55-64',
    value: '55-64',
    checked: false,
  },
  {
    label: '65+',
    value: '65+',
    checked: false,
  },
];

export const listLayout = [
  {
    name: 'Light box (A)',
    images: ['d_f_a.svg', 'm_f.svg'],
    value: 'LightBoxA',
    description: 'Recommend for the short-form which contains only Banner, Title, Desc., CTA Button',
    displayOn: 'both',
  },
  {
    name: 'Light box (B)',
    images: ['d_f_b.svg', 'm_f.svg'],
    value: 'LightBoxB',
    description: "Recommend for the longer-form which includes the fields to collect user's data",
    displayOn: 'both',
  },
  {
    name: 'Skin (A)',
    images: ['d_s_a.svg', 'm_s.svg'],
    value: 'SkinA',
    displayOn: 'both',
  },
  {
    name: 'Skin (B)',
    images: ['d_s_b.svg', 'm_s.svg'],
    value: 'SkinB',
    displayOn: 'both',
  },
  {
    name: 'Floating',
    images: ['d_fl.svg', 'm_fl.svg'],
    value: 'Floating',
    displayOn: 'both',
  },
  {
    name: 'Tab',
    images: ['d_t.svg', 'm_t.svg'],
    value: 'Tab',
    displayOn: 'both',
  },
  {
    name: 'In-line (A) (Article only)',
    images: ['d_i_a.svg', 'm_i.svg'],
    value: 'InlineA',
    displayOn: 'both',
  },
  {
    name: 'In-line (B) (Article only)',
    images: ['d_i_b.svg', 'm_i.svg'],
    value: 'InlineB',
    displayOn: 'both',
  },
  {
    name: 'Center Tab',
    images: ['d_ct.svg', 'm_ct.svg'],
    value: 'CenterTab',
    displayOn: 'both',
  },
  {
    name: 'Side bar (Article only)',
    images: ['d_sb.svg', ''],
    value: 'Sidebar',
    displayOn: 'Desktop',
  },
  {
    name: 'Fullscreen',
    images: ['d_fs.svg', ''],
    value: 'Fullscreen',
    displayOn: 'Desktop',
  },
  {
    name: 'Slider',
    images: ['d_sl.svg', ''],
    value: 'Slider',
    displayOn: 'Desktop',
  },
];

export const listBlockShow = [
  'TextBlock',
  'NumberBlock',
  'DateBlock',
  'EmailBlock',
  'PhoneBlock',
  'PhoneOtpBlock',
  'WhatsappOtpBlock',
  'ZaloOtpBlock',
  'LocationBlock',
  'LinkButtonBlock',
  'RadioBlock',
  'DropdownBlock',
  'CheckboxBlock',
  'TncBlock',
  // 'SubtitleBlock',
];
// .filter(blockName => {
//   const isLocal = window.location.origin.includes('localhost')
//   const isStaging = window.location.origin.includes('dev.leadgen')

//   if (blockName === 'PhoneOtpBlock' || blockName === 'LocationBlock') {
//     return isLocal || isStaging
//   }

//   return true
// })

export const DISPLAY_TYPE = {
  LightBoxA: {
    value: 1,
    label: 'Lightbox A',
  },
  LightBoxB: {
    value: 2,
    label: 'Lightbox B',
  },
  Floating: {
    value: 3,
    label: 'Floating bar',
  },
  Fullscreen: {
    value: 4,
    label: 'Fullscreen',
  },
  InlineA: {
    value: 5,
    label: 'Inline A',
  },
  InlineB: {
    value: 6,
    label: 'Inline B',
  },
  Slider: {
    value: 7,
    label: 'Slider',
  },
  Sidebar: {
    value: 8,
    label: 'Sidebar',
  },
  Tab: {
    value: 9,
    label: 'Tab',
  },
  SkinA: {
    value: 10,
    label: 'Skin A',
  },
  SkinB: {
    value: 11,
    label: 'Skin B',
  },
  CenterTab: {
    value: 12,
    label: 'Center Tab',
  },
};
