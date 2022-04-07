// Gay marriage
{
  canTriggerIfUnavailable: true,
  checkType: 'householdCharacters',
  checkAndAct(characterId) {
    let character = daapi.getCharacter({ characterId })
    let age = daapi.calculateAge({ month: character.birthMonth, year: character.birthYear })
    if (
      character &&
      !character.isDead &&
      !character.spouseId &&
      age >= 16
    ) {
      daapi.addCharacterAction({
        characterId,
        key: 'gay_marriage',
        action: {
          title: 'Find ' + (character.isMale ? 'achillean' : 'sapphic') + ' spouses',
          icon: daapi.requireImage('/gay_marriage/' + (character.isMale ? 'achillean' : 'sapphic') + '.svg'),
          isAvailable: true,
          hideWhenBusy: false,
          process: {
            event: '/gay_marriage/main',
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
        key: 'gay_marriage'
      })
    }
  },
  methods: {
    process({ characterId }) {
      let state = daapi.getState()
      let character = daapi.getCharacter({ characterId })
      let options = []
      for (let i = 0; i < 5; i++) {
        let potentialSpouseId = daapi.generateCharacter({ 
          characterFeatures: {
            isMale: character.isMale,
            birthYear: state.year - Math.floor(18 + Math.random() * 35)
          },
          dynastyFeatures : {} 
        })
        let potentialSpouse = daapi.getCharacter({ characterId: potentialSpouseId })
        let potentialSpouseDynasty = daapi.getState().dynasties[potentialSpouse.dynastyId] || {}
        let heritages = {
          'roman_plebian' : 'plebeian',
          'roman_novus_homo': 'Novus Homo Plebeian',
          'roman_patrician': 'Patrician',
          'roman_freedman': 'Freedman'
        }
        options.push({
          text: `[c|${potentialSpouseId}|${potentialSpouse.praenomen}]`,
          tooltip: `[c|${potentialSpouseId}|${(potentialSpouse.praenomen + `, ` + potentialSpouseDynasty.nomen + ` ` + potentialSpouseDynasty.cognomen)}]` + ', of a ' + (heritages[potentialSpouseDynasty.heritage] || potentialSpouseDynasty.heritage) + ' family with ' + Math.round(potentialSpouseDynasty.prestige || 0) + ' prestige',
          action:{
            event: '/gay_marriage/main',
            method: 'doMarry',
            context: { characterId, potentialSpouseId }
          }
        })
      }
      daapi.pushInteractionModalQueue({
        title: (character.isMale ? 'Achillean' : 'Sapphic') + ' marriage',
        message: 'Here are some potential sposes for ' + `[c|${characterId}|${character.praenomen}]`+'. Should they marry one of them?',
        image: daapi.requireImage('/gay_marriage/' + (character.isMale ? 'achillean' : 'sapphic') + '.svg'),
        options: [
          ...options,
          {
            text: 'None of them are a fit'
          }
        ]
      })
    },
    doMarry({ characterId, potentialSpouseId }) {
      let character = daapi.getCharacter({ characterId })
      daapi.performMarriage({ characterId, spouseId: potentialSpouseId, isMatrilineal: !character.isMale })
      daapi.setCharacterFlag({ characterId, flag: 'isGayMarried', data: true })
      daapi.setCharacterFlag({ characterId: potentialSpouseId, flag: 'isGayMarried', data: true })
      if (Math.random() < 1 / 100) {
        daapi.setCharacterFlag({ characterId: potentialSpouseId, flag: 'isTrans', data: true })
      }
      daapi.addTrait({ characterId, trait: (character.isMale ? 'achillean' : 'sapphic') })
      daapi.addTrait({ characterId: potentialSpouseId, trait: (character.isMale ? 'achillean' : 'sapphic') })
      daapi.addModifier({ key: 'character_fertility_' + potentialSpouseId, id: 'gay_marriage', factor: 0})
      daapi.deleteCharacterAction({
        characterId,
        key: 'gay_marriage'
      })
    }
  }
}