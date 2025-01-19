// Opens a modal with the list of previously play_as-ed characters to switch to or an option to play a 
{
  canTriggerIfUnavailable: true,
  checkType: 'general',
  checkAndAct() {
    daapi.addGlobalAction({
      key: 'play_as',
      action: {
        title: 'Play As control',
        icon: daapi.requireImage('/play_as/switch.svg'),
        isAvailable: true,
        process: {
          event: '/play_as/control',
          method: 'process'
        }
      }
    })
  },
  methods: {
    process() {
    }
  }
}