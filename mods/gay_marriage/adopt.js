{
  canTriggerIfUnavailable: false,
  checkType: 'householdCharacters',
  checkAndAct(characterId) {
    let character = daapi.getCharacter({ characterId })
    if(
      !character||
      character.isDead ||
      !character.spouseId ||
      !daapi.getCharacterFlag({ characterId, flag: 'isGayMarried' })
    ) {
      return
    }
    let characterSpouse = daapi.getCharacter({ characterId: character.spouseId })
    if (
      characterSpouse &&
      !characterSpouse.isDead &&
      Math.random() < 1 / 13 / 15 / (character.childrenIds.length || 1)
    ) {
      let babyId = daapi.generateCharacter({ 
        characterFeatures: {
          birthYear: daapi.getState().year - Math.round(Math.random() * 3),
          isMale: Math.random() < 0.5
        },
        dynastyFeatures : {} 
      })
      let baby = daapi.getCharacter({ characterId: babyId })
      let messageFlavors = [
        `[c|${character.spouseId}|${characterSpouse.praenomen}]` + ' found an abandoned child, they\'ve named ' + `[c|${babyId}|${baby.praenomen}]` + '. Together with '+ `[c|${characterId}|${character.praenomen}]` +', they can adopt & raise the child as their own',
        'A destitute family is looking to give away their baby, ' + `[c|${babyId}|${baby.praenomen}]` + '. They approach ' + `[c|${characterId}|${character.praenomen}]` + ' begging them to adopt & raise the child',
        'A close relative of ' + `[c|${character.spouseId}|${characterSpouse.praenomen}]` + ' recently passed away leaving their child ' + `[c|${babyId}|${baby.praenomen}]` + ' a denarii-less orphan. They\'d like to adopt the child & raise them as their own'
      ]
      daapi.pushInteractionModalQueue({
        title: 'A child?',
        message: messageFlavors[Math.round(Math.random() * messageFlavors.length)],
        image: daapi.requireImage('/gay_marriage/heir.svg'),
        options: [
          {
            text: `[c|${characterId}|${character.praenomen}]` + ' and ' + `[c|${character.spouseId}|${characterSpouse.praenomen}]` + ' will be your parents now, ' + `[c|${babyId}|${baby.praenomen}]`,
            action:{
              event: '/gay_marriage/adopt',
              method: 'doAdopt',
              context: { characterId, babyId }
            }
          },
          {
            text: 'We cannot take care of this child. Let\'s find them another home'
          }
        ]
      })
    }
  },
  methods: {
    doAdopt({ characterId, babyId }) {
      let state = daapi.getState()
      let parrifamilias = daapi.getCharacter({ characterId: state.current.id })
      let character = daapi.getCharacter({ characterId })
      let characterSpouse = daapi.getCharacter({ characterId: character.spouseId })
      daapi.updateCharacter({
        characterId,
        character: {
          childrenIds : [...character.childrenIds, babyId] 
        }
      })
      daapi.updateCharacter({
        characterId: character.spouseId, 
        character: {
          childrenIds: [...characterSpouse.childrenIds, babyId]
        } 
      })
      daapi.updateCharacter({
        characterId: babyId,
        character: {
          dynastyId: parrifamilias.dynastyId,
          fatherId: character.isMale ? characterId : character.spouseId,
          motherId: !character.isMale ? characterId : character.spouseId
        }
      })
      daapi.forceUpdateCharacterDisplay({ characterId })
      daapi.forceUpdateCharacterDisplay({ characterId: state.current.id })
    }
  }
}