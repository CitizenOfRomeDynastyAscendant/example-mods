// Gay marriage
{
  canTriggerIfUnavailable: true,
  checkType: 'householdCharacters',
  checkAndAct(characterId) {
    let state = daapi.getState()
    let character = state.characters[characterId]
    let age = daapi.calculateAge({ month: character.birthMonth, year: character.birthYear })
    if (
      character &&
      !character.isDead &&
      (character.spouseId === null ||
      !state.characters[character.spouseId] ||
      state.characters[character.spouseId].isDead) &&
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
      let gender = Math.random() <= 0.2 ? 'genderfluid' : character.gender
      for (let i = 0; i < 5; i++) {
        let potentialSpouseId = daapi.generateCharacter({ 
          characterFeatures: {
            gender: character.gender,
            birthYear: state.year - Math.floor(18 + Math.random() * 35),
            ...(gender === 'genderfluid' || Math.random() <= 0.45 ? {
              flagCanGetPregnant: Math.random() < 0.6 ? undefined : Math.random() < 0.5,
              flagCanImpregnate: Math.random() < 0.6 ? undefined : Math.random() < 0.5
            } : {}),
            flagCanHoldImperium: Math.random() > 0.6
          },
          dynastyFeatures : {} 
        })
        let possibleSexualities = ['faunnic', 'ace']
        if(character.gender === 'male' || (character.gender !== 'female' && Math.random() < 0.5)) {
          possibleSexualities.push('achillean')
        }
        if(character.gender === 'female' || (character.gender !== 'male' && Math.random() < 0.5)) {
          possibleSexualities.push('sapphic')
        }
        daapi.addTrait({ 
          characterId: potentialSpouseId, 
          trait: possibleSexualities[Math.floor(Math.random() * possibleSexualities.length)]
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
          text: `[c|${potentialSpouseId}|${(potentialSpouse.praenomen + `, ` + potentialSpouseDynasty.nomen + ` ` + potentialSpouseDynasty.cognomen)}]`,
          tooltip: `[c|${potentialSpouseId}|${potentialSpouse.praenomen}]` + ', of a ' + (heritages[potentialSpouseDynasty.heritage] || potentialSpouseDynasty.heritage) + ' family with ' + Math.round(potentialSpouseDynasty.prestige || 0) + ' prestige',
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
            text: 'None of them are a match'
          }
        ]
      })
    },
    doMarry({ characterId, potentialSpouseId }) {
      let character = daapi.getCharacter({ characterId })
      let isMale = character.gender ? character.gender === 'male' : character.isMale
      daapi.performMarriage({ characterId, spouseId: potentialSpouseId, isMatrilineal: !isMale })
      daapi.setCharacterFlag({ characterId, flag: 'isGayMarried', data: true })
      daapi.setCharacterFlag({ characterId: potentialSpouseId, flag: 'isGayMarried', data: true })
      let possibleSexualities = ['faunnic', 'ace']
      if(character.gender === 'male' || (character.gender !== 'female' && Math.random() < 0.5)) {
        possibleSexualities.push('achillean')
      }
      if(character.gender === 'female' || (character.gender !== 'male' && Math.random() < 0.5)) {
        possibleSexualities.push('sapphic')
      }
      daapi.addTrait({ 
        characterId, 
        trait: possibleSexualities[Math.floor(Math.random() * possibleSexualities.length)]
      })
      // daapi.addModifier({ key: 'character_fertility_' + potentialSpouseId, id: 'gay_marriage', factor: 0}) //@INFO: no need as of v1.5.3+
      daapi.deleteCharacterAction({
        characterId,
        key: 'gay_marriage'
      })
    }
  }
}