// Switch characters
{
  canTriggerIfUnavailable: true,
  checkType: 'allCharacters',
  checkAndAct(characterId) {
    let character = daapi.getCharacter({ characterId })
    if (
      characterId !== daapi.getState().current.id &&
      character
    ) {
      daapi.addCharacterAction({
        characterId,
        key: 'play_as',
        action: {
          title: 'Play As',
          icon: daapi.requireImage('/play_as/switch.svg'),
          isAvailable: true,
          hideWhenBusy: false,
          process: {
            event: '/play_as/main',
            method: 'process',
            context: {
              characterId
            }
          }
        }
      })
    } else {
      daapi.deleteCharacterAction({
        characterId,
        key: 'play_as'
      })
    }
  },
  methods: {
    process({ characterId }) {
      let character = daapi.getCharacter({ characterId })
      daapi.displayInteractionModal({
        title: 'Play as ' + character.praenomen + '?',
        message: 'Would you like to play as ' + `[c|${characterId}|${character.praenomen}]` + '?',
        image: daapi.requireImage('/play_as/switch.svg'),
        options: [
          {
            variant: 'info',
            text: 'Yes please',
            action:{
              event: '/play_as/main',
              method: 'doSwitch',
              context: {characterId}
            }
          },
          {
            text: 'No, thank you'
          }
        ]
      })
    },
    doSwitch({ characterId }) {
      daapi.setCurrentCharacter({ characterId })
      daapi.deleteCharacterAction({
        characterId,
        key: 'play_as'
      })
    }
  }
}