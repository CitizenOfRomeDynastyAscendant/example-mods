{
  checkType: 'householdCharacters',

  checkAndAct(characterId) {
    let character = daapi.getCharacter({ characterId: characterId })

    if (character.flagPlayScenarioModIsMarcusAgrippa && !character.spouseId) {

      let age = daapi.calculateAge({ month: character.birthMonth, year: character.birthYear })
      // console.log(age) // debugging only
      // if (age > 25.5 && age < 26.5) {
        let characters = daapi.getState().characters
        Object.keys(characters).forEach(function(k){
          let potentialSpouse = daapi.getCharacter({ characterId: k })
          // console.log(potentialSpouse);
          if( potentialSpouse && potentialSpouse.flagPlayScenarioModIsAttica ){

            // character.spouseId = potentialSpouse.characterId
            // potentialSpouse.spouseId = character.characterId

            // daapi.performMarriage({ characterId, spouseId: potentialSpouse.characterId, isMatrilineal: false })

            console.log(potentialSpouse); // debugging only
          }
        });
        //console.log(characters)
      // }
    }
  }
}
