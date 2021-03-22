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
      let state = daapi.getState()
      let characterId = state.current.id
      if (
        !daapi.getGlobalFlag({ flag: 'noMoreKids' })
      ) {
        daapi.deleteCharacterAction({
          characterId,
          key: 'yesMoreKids'
        })
        daapi.addCharacterAction({
          characterId,
          key: 'noMoreKids',
          action: {
            title: 'Tap for: No More Kids!',
            icon: daapi.requireImage('/no_more_kids/allo.svg'),
            isAvailable: true,
            hideWhenBusy: false,
            process: {
              event: '/no_more_kids/main',
              method: 'noMoreKids'
            }
          }
        })
      } else {
        daapi.deleteCharacterAction({
          characterId,
          key: 'noMoreKids'
        })
        daapi.addCharacterAction({
          characterId,
          key: 'yesMoreKids',
          action: {
            title: 'Tap for: Please More Kids!',
            icon: daapi.requireImage('/no_more_kids/ace.svg'),
            isAvailable: true,
            hideWhenBusy: false,
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