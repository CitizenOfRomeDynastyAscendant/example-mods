// Switches you to a new dynasty
{
  canTriggerIfUnavailable: true,
  checkType: 'general',
  checkAndAct() {
    // daapi.openDevTools()
    daapi.addGlobalAction({
      key: 'newDynasty',
      action: {
        title: 'A new Dynasty?',
        icon: daapi.requireImage('/new_dynasty/rename.svg'),
        isAvailable: true,
        process: {
          event: '/new_dynasty/main',
          method: 'process'
        }
      }
    })
  },
  methods: {
    newDynasty(dynastyFeatures) {
      let state = daapi.getState()
      let characterId = state.current.id
      let character = state.characters[characterId]
      let genCharId = daapi.generateCharacter({
        characterFeatures: {},
        dynastyFeatures: { ...state.dynasties[character.dynastyId], ...dynastyFeatures }
      })
      let newDynId = daapi.getCharacter({ characterId: genCharId }).dynastyId
      daapi.updateCharacter({ characterId, character: {dynastyId: newDynId} })
      daapi.invokeMethod({
          event: '/new_dynasty/main',
          method: 'updateCharacterChildrenDynasty',
          context: {thisCharacterId: characterId, newDynId}
      })
      daapi.kill({ characterId: genCharId })
    },
    updateCharacterChildrenDynasty({thisCharacterId, newDynId}) {
      let state = daapi.getState()
      let thisCharacter = state.characters[thisCharacterId] || {}
      thisCharacter.childrenIds = thisCharacter.childrenIds || []
      for(let i = 0; i < thisCharacter.childrenIds.length; i++) {
        let thisChildId = thisCharacter.childrenIds[i]
        daapi.updateCharacter({ characterId: thisChildId, character: {dynastyId: newDynId} })
        if(thisCharacter.isMale) {
          daapi.invokeMethod({
              event: '/new_dynasty/main',
              method: 'updateCharacterChildrenDynasty',
              context: {thisCharacterId: thisChildId, newDynId}
          })
        }
      }
    },
    process() {
      let state = daapi.getState()
      let characterId = state.current.id
      let character = state.characters[characterId]
      let nomen = state.dynasties[character.dynastyId].nomen
      let cognomen = state.dynasties[character.dynastyId].cognomen
      let heritage = state.dynasties[character.dynastyId].heritage
      daapi.pushInteractionModalQueue({
        title: 'A new Dynasty?',
        message: 'Split away from the age old name and move onward to a more fitting one for your family?',
        image: daapi.requireImage('/new_dynasty/rename.svg'),
        inputs: [
          {
            type: 'text',
            title: 'Nomen',
            value: nomen,
            onChange: {
              event: '/new_dynasty/main',
              method: 'setDynastyNomen'
            }
          },
          {
            type: 'text',
            title: 'Cognomen',
            value: cognomen,
            onChange: {
              event: '/new_dynasty/main',
              method: 'setDynastyCognomen'
            }
          }
        ],
        dropdowns: [{
          title: 'Heritage',
          options: [{
            label: 'Plebeian',
            value: 'roman_plebian'
          }, {
            label: 'Novus Homo Plebeian',
            value: 'roman_novus_homo'
          }, {
            label: 'Patrician',
            value: 'roman_patrician'
          }, {
            label: 'Freedman',
            value: 'roman_freedman',
            icon: daapi.requireImage('/new_dynasty/rename.svg')
          }],
          selected: ['roman_plebian', 'roman_novus_homo', 'roman_patrician', 'roman_freedman'].indexOf(heritage) || 0,
          onChange: {
            event: '/new_dynasty/main',
            method: 'setDynastyHeritage'
          }
        }]
      })
    },
    setDynastyNomen({input, index}) {
      let nomen = input.value || ''
      if(nomen) {
        daapi.invokeMethod({
          event: '/new_dynasty/main',
          method: 'newDynasty',
          context: { nomen }
        })
      }
    },
    setDynastyCognomen({input, index}) {
      let cognomen = input.value || ''
      daapi.invokeMethod({
        event: '/new_dynasty/main',
        method: 'newDynasty',
        context: { cognomen }
      })
    },
    setDynastyHeritage({option}) {
      let heritage = option.value || ''
      if(heritage) {
        daapi.invokeMethod({
          event: '/new_dynasty/main',
          method: 'newDynasty',
          context: { heritage }
        })
      }
    }
  }
}