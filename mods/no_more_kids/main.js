// Stops all child-births in-game
{
  canTriggerIfUnavailable: true,
  checkType: 'general',
  checkAndAct() {
    daapi.invokeMethod({
      event: '/no_more_kids/main',
      method: 'toggleFlag'
    })
  },
  methods: {
    toggleFlag() {
      if (
        !daapi.getGlobalFlag({ flag: 'noMoreKids' })
      ) {
        daapi.addGlobalAction({
          key: 'noMoreKids',
          action: {
            title: 'Tap for: No More Kids!',
            icon: daapi.requireImage('/no_more_kids/allo.svg'),
            isAvailable: true,
            process: {
              event: '/no_more_kids/main',
              method: 'noMoreKids'
            }
          }
        })
      } else {
        daapi.addGlobalAction({
          key: 'noMoreKids',
          action: {
            title: 'Tap for: More Kids!',
            icon: daapi.requireImage('/no_more_kids/ace.svg'),
            isAvailable: true,
            process: {
              event: '/no_more_kids/main',
              method: 'yesMoreKids'
            }
          }
        })
      }
    },
    noMoreKids() {
      daapi.setGlobalFlag({ flag: 'noMoreKids', data: true })
      daapi.addModifier({ key:'household_fertility', id: 'noMoreKidsMod', factor: 0 })
      daapi.invokeMethod({
        event: '/no_more_kids/main',
        method: 'toggleFlag'
      })
    },
    yesMoreKids() {
      daapi.setGlobalFlag({ flag: 'noMoreKids', data: false })
      daapi.removeModifier({ key:'household_fertility', id: 'noMoreKidsMod' })
      daapi.invokeMethod({
        event: '/no_more_kids/main',
        method: 'toggleFlag'
      })
    }
  }
}