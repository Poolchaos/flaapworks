export const Constants = {

  BROWSER: {
    opera: 'Opera',
    msie: { 
      shortHand: 'MSIE',
      name: 'Microsoft Internet Explorer'
    },
    chrome: 'Chrome',
    safari: 'Safari',
    firefox: 'Firefox'
  },

  OS: {
    windows: 'Windows',
    mac: 'MacOS',
    unix: 'UNIX',
    linux: 'Linux'
  },

  FRAMEWORK_TAGS: {
    TEMPLATE: 'flaap-template-',
    ROUTER: 'flaap-router'
  },

  FRAMEWORK_ACTIONS: {
    CLICK: 'fl-click',
    CLICK_TEMPLATE: 'data-click-trigger',
    DRAG: 'fl-draggable',
    DRAG_TEMPLATE: 'ondragstart',
    REPEAT: 'fl-repeat'
  },

  LIFE_CYCLE: {
    ACTIVATE: 'activate',
    ATTACHED: 'attached',
    DEACTIVATE: 'deactivate'
  },

  UPDATE: {
    TEST: 'update:something'
  },
  
  UPDATED: {
    TEST: 'something:updated'
  },

  EVENT: {
    PIPE: 'flaap:event'
  },

  NOTIFY: 'flevent:notify'
};