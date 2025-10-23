export const PAGE_SIZE = 20;

export const CAMPAIGN_STEPS = {
  TARGET: 'TARGET',
  TEMPLATE: 'TEMPLATE',
  TRIGGER: 'TRIGGER',
  // MVP
  // DISPLAY_RULE: 'DISPLAY_RULE',
  // 1.1
  DESIGN: 'DESIGN',
  SETTINGS: 'SETTINGS',
  FINISH: 'FINISH',
};

export const CAMPAIGN_STATUS = {
  STATE_INACTIVE: -1,
  STATE_ACTIVE: 1,
  STATE_PAUSED: 2,
  STATE_DRAFT: -2,
  STATE_SCHEDULE: 0,
  STATE_EXPIRED: 3,
  STATE_AB_TESTING: 4,
};

export const CAMPAIGN_STATUS_OPTION = {
  [CAMPAIGN_STATUS.STATE_ACTIVE]: { label: 'Active', color: '#2D87F3', bgColor: '#E3F2FF' },
  [CAMPAIGN_STATUS.STATE_INACTIVE]: { label: 'Inactive', color: '#595959', bgColor: '#F2F2F2' },
  [CAMPAIGN_STATUS.STATE_PAUSED]: { label: 'Paused', color: '#FC7419', bgColor: '#FFF8E2' },
  [CAMPAIGN_STATUS.STATE_DRAFT]: { label: 'Draft', color: '#9E4CD1', bgColor: '#F5EDFF' },
  [CAMPAIGN_STATUS.STATE_SCHEDULE]: { label: 'Schedule', color: '#006C39', bgColor: '#E0F8EE' },
  [CAMPAIGN_STATUS.STATE_EXPIRED]: { label: 'Expired', color: '#BF331B', bgColor: '#FAE9E8' },
  [CAMPAIGN_STATUS.STATE_AB_TESTING]: { label: 'AB Test', color: '#BF331B', bgColor: '#FAE9E8' },
};

export const LOCALSTORAGE = {
  USER: 'USER',
};

export const CAMPAIGN_TARGET_TYPE = {
  LINKS: 1,
  TAGS: 2,
};

export const CAMPPAIGN_TRIGGER = {
  TRIGGER_TYPE_ON_LANDING: 'on_landing',
  TRIGGER_TYPE_ON_SCROLL: 'on_scroll',
  TRIGGER_TYPE_EXIT_INTENT: 'exit_intent',
  TRIGGER_TYPE_ON_CLICK: 'on_click',
  TRIGGER_TYPE_HOVER: 'hover',
  TRIGGER_TYPE_CUSTOM: 'custom',
  TRIGGER_TYPE_IDLE: 'idle',
};

export const HISTORY_ICON = {
  PLUS: {
    icon: '/img/icons/icon-plus.svg',
    bg_color: '#209d3d',
    border_color: '#209d3d',
  },
  SAVE: {
    icon: '/img/icons/icon-save.svg',
    bg_color: '#5092e2',
    border_color: '#5092e2',
  },
  TRASH: {
    icon: '/img/icons/icon-delete.svg',
    bg_color: '#e64848',
    border_color: '#e64848',
  },
  REACTIVATE: {
    icon: '/img/icons/icon-activate.svg',
    bg_color: '#f1f9ff',
    border_color: '#5092e2',
  },
  DEACTIVATE: {
    icon: '/img/icons/icon-deactivate.svg',
    bg_color: '#f5f5f5',
    border_color: '#666666',
  },
};

export const DISPLAY_TYPES = {
  1: 'Lightbox A',
  2: 'Lightbox B',
  3: 'Floating bar',
  4: 'Fullscreen',
  5: 'Inline A',
  6: 'Inline B',
  7: 'Slider',
  8: 'Sidebar',
  9: 'Tab',
  10: 'Skin A',
  11: 'Skin B',
  12: 'Center Tab',
};

export const SCHEDULES = {
  INACTIVE: -1,
  ACTIVE: 1,
  PAUSED: 2,
  SCHEDULED: 0,
};
