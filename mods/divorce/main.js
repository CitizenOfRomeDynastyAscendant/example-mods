// Divorce your spouse
{
  canTriggerIfUnavailable: true,
  checkType: 'householdCharacters',
  checkAndAct(characterId) {
    let character = daapi.getCharacter({ characterId })
    if (
      character &&
      character.spouseId
    ) {
      daapi.addCharacterAction({
        characterId,
        key: 'divorce_spouse',
        action: {
          title: 'Divorce?',
          icon: daapi.requireImage('/divorce/divorce.svg'),
          isAvailable: true,
          hideWhenBusy: false,
          process: {
            event: '/divorce/main',
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
        key: 'divorce_spouse'
      })
    }
  },
  methods: {
    process({ characterId }) {
      let character = daapi.getCharacter({ characterId })
      let characterSpouse = daapi.getCharacter({ characterId: character.spouseId })
      daapi.pushInteractionModalQueue({
        title: 'Divorce?',
        message: 'Should ' + `[c|${characterId}|${character.praenomen}]`+' divorce ' + `[c|${character.spouseId}|${characterSpouse.praenomen}]` + '?',
        image: daapi.requireImage('/divorce/divorce.svg'),
        options: [
          {
            variant: 'danger',
            text: 'Yes!!!',
            tooltip: 'This action cannot be undone',
            statChanges: {
              cash: -500,
              prestige: -25,
              influence: -300,
              scaleByRevenue: ['cash']
            },
            action:{
              event: '/divorce/main',
              method: 'doDivorce',
              context: {characterId, spouseId: character.spouseId}
            }
          },
          {
            text: 'No way!'
          }
        ]
      })
    },
    doDivorce({ characterId, spouseId }) {
      daapi.updateCharacter({
        characterId: spouseId,
        character: {
          spouseId: false
        }
      })
      daapi.updateCharacter({
        characterId,
        character: {
          spouseId: false
        }
      })
    }
  }
}