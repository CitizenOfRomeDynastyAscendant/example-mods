// Stops all child-births in-game
{
  canTriggerIfUnavailable: true,
  checkType: 'allCharacters',
  checkAndAct(characterId) {
    daapi.invokeMethod({
      event: '/no_more_kids/individual',
      method: 'toggleFlag',
      context: { characterId }
    })
  },
  methods: {
    toggleFlag({ characterId }) {
      if (
        !daapi.getCharacterFlag({ characterId, flag: 'noMoreKids' })
      ) {
        daapi.addCharacterAction({
          characterId,
          key: 'noMoreKids',
          action: {
            title: 'Tap for: No More Kids!',
            icon: daapi.requireImage('/no_more_kids/allo.svg'),
            isAvailable: true,
            process: {
              event: '/no_more_kids/individual',
              method: 'noMoreKids',
              context: { characterId }
            }
          }
        })
      } else {
        daapi.addCharacterAction({
          characterId,
          key: 'noMoreKids',
          action: {
            title: 'Tap for: More Kids!',
            icon: daapi.requireImage('/no_more_kids/ace.svg'),
            isAvailable: true,
            process: {
              event: '/no_more_kids/individual',
              method: 'yesMoreKids',
              context: { characterId }
            }
          }
        })
      }
      daapi.forceUpdateCharacterDisplay({ characterId })
    },
    noMoreKids({ characterId }) {
      daapi.setCharacterFlag({ characterId, flag: 'noMoreKids', data: true })
      daapi.addModifier({ key: 'character_fertility_' + characterId, id: 'noMoreKidsMod', factor: 0, reason: 'No More Kids!' })
      daapi.invokeMethod({
        event: '/no_more_kids/individual',
        method: 'toggleFlag',
        context: { characterId }
      })
    },
    yesMoreKids({ characterId }) {
      daapi.setCharacterFlag({ characterId, flag: 'noMoreKids', data: false })
      daapi.removeModifier({ key: 'character_fertility_' + characterId, id: 'noMoreKidsMod' })
      daapi.invokeMethod({
        event: '/no_more_kids/individual',
        method: 'toggleFlag',
        context: { characterId }
      })
    }
  }
}