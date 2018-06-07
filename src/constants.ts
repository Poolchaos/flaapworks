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
    ROUTER: 'flaap-router'
  },

  FRAMEWORK_ACTIONS: {
    CLICK: 'fl-click',
    TEMPLATE: 'click.trigger'
  },

  LIFE_CYCLE: {
    ACTIVATE: 'activate',
    ATTACHED: 'attached',
    DEACTICATE: 'deactivate',
    DETACHED: 'detached'
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