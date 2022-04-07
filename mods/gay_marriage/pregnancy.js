{
  canTriggerIfUnavailable: false,
  checkType: 'householdCharacters',
  checkAndAct(characterId) {
    let character = daapi.getCharacter({ characterId })
    if(
      !character||
      character.isDead ||
      !character.spouseId ||
      character.startedPregnancyTime ||
      !daapi.getCharacterFlag({ characterId, flag: 'isGayMarried' })
    ) {
      return
    }
    let characterSpouse = daapi.getCharacter({ characterId: character.spouseId })
    if (
      characterSpouse &&
      !characterSpouse.isDead &&
      !characterSpouse.startedPregnancyTime &&
      daapi.getCharacterFlag({ characterId: character.spouseId, flag: 'isTrans' }) &&
      (Math.random() < ((1 / 13 / 50 / (character.childrenIds.length || 1)) * daapi.calculateModifier({ key: 'household_fertility' })))
    ) {
      daapi.impregnate({
        characterId: (characterSpouse.isMale ? character.spouseId : characterId),
        fatherId: (!characterSpouse.isMale ? character.spouseId : characterId)
      })
      daapi.pushInteractionModalQueue({
        title: 'Pregnancy',
        message: `[c|${(characterSpouse.isMale ? character.spouseId : characterId)}|${(characterSpouse.isMale ? characterSpouse : character).praenomen}]` + ' is pregnant with ' + `[c|${(!characterSpouse.isMale ? character.spouseId : characterId)}|${(!characterSpouse.isMale ? characterSpouse : character).praenomen}]` + '\'s child',
        image: daapi.requireImage('/gay_marriage/transparent.svg'),
        options: [
          {
            text: 'Excellent!'
          }
        ]
      })
    }
  }
}