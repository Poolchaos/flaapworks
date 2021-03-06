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

  FRAMEWORK: {
    ENTRY: 'flaap-app',
    TEMPLATE: 'flaap-template-',
    ROUTER: 'flaap-router',
    ATTRIBUTES: {
      DRAG_START: 'fl-drag-start',
      DRAG_OVER: 'fl-drag-over',
      DRAG_DROP: 'fl-drag-drop',
      CLICK: 'fl-click',
      CLICK_TEMPLATE: 'data-click-trigger',
      REPEAT: 'fl-repeat',
      REPEAT_TEMPLATE: 'data-fl-repeat'
    }
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