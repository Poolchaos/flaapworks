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
    REPEAT: 'fl-repeat',
    REPEAT_TEMPLATE: 'data-fl-repeat',
    DRAG_DROP: 'fl-drag-drop',
    DRAG_START: 'fl-drag-start',
    DRAG_OVER: 'fl-drag-over'
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