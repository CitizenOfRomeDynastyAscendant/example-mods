{
  checkType: 'householdCharacters',
  checkAndAct(characterId) {
    let character = daapi.getCharacter({ characterId: characterId })
    // console.log(daapi.getCharacterFlag(characterId, 'flagPlayScenarioModIsMarcusAgrippa'))
    // console.log(character.flagPlayScenarioModIsMarcusAgrippa)
    if (character.flagPlayScenarioModIsMarcusAgrippa) {
      let age = daapi.calculateAge({ month: character.birthMonth, year: character.birthYear })
      // console.log(age) // debugging only
      if (age > 17.5) {
        daapi.kill({ 
          characterId: characterId, 
          deathCause: 'a scripted death' 
        })
      }
    }
  }
}
