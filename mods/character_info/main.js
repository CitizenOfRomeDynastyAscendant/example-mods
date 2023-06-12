// Adds a character action on all characters to character ID and other character info
{
  canTriggerIfUnavailable: true,
  checkType: 'allCharacters',
  checkAndAct(characterId) {
    daapi.addCharacterAction({
      characterId,
      key: 'character_info',
      action: {
        title: 'Show character info',
        icon: daapi.requireImage('/character_info/info.svg'),
        isAvailable: true,
        hideWhenBusy: false,
        process: {
          event: '/character_info/main',
          method: 'process',
          context: {
            characterId
          }
        }
      }
    })
  },
  methods: {
    process({ characterId }) {
      let character = daapi.getCharacter({ characterId })
      daapi.pushInteractionModalQueue({
        title: 'Character Info',
        message: 'Select and copy character info below:',
        image: daapi.requireImage('/character_info/info.svg'),
        inputs: [
          {
            type: 'text',
            title: 'Character ID',
            value: JSON.stringify(character.id)
          },
          {
            type: 'textarea',
            title: 'Character Info',
            value: JSON.stringify(character)
          }
        ]
      })
    }
  }
}