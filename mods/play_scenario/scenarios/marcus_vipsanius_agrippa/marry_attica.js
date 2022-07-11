{
  checkType: 'householdCharacters',

  checkAndAct(characterId) {
    let character = daapi.getCharacter({ characterId: characterId })
    let state = daapi.getState()

    if (character.flagPlayScenarioModIsMarcusAgrippa && !character.spouseId) {

      let age = daapi.calculateAge({ month: character.birthMonth, year: character.birthYear })
      // console.log(age) // debugging only
      if (age > 25.5 && age < 26.5) {

        let potentialSpouseID = daapi.generateCharacter({
          characterFeatures: {
            isDead: false,
            isMale: false,
            praenomen: 'Attica',
            agnomen: '',
            birthMonth: 3,
            birthYear: 695,
            job: null,
            jobLevel: 0,
            spouseId: null,
            fatherId: null,
            motherId: null,
            childrenIds: [],
            traits: ['oratorDeliberative', 'weak'],
            skills: {
              intelligence: Math.round(Math.random() * 10) + 4,
              stewardship: Math.round(Math.random() * 10) + 6,
              eloquence: Math.round(Math.random() * 10) + 8,
              combat: Math.round(Math.random() * 10)
            },
            look: {
              group: 'roman',
              type: 'blonde'
            },
            flagAssignedPersonalityTrait: false
          },
          dynastyFeatures: {
            id: 'Pomponius_Atticus',
            nomen: 'Pomponius',
            cognomen: 'Atticus',
            prestige: 80000,
            heritage: 'roman_novus_homo'
          }
        })
        let potentialSpouse = daapi.getCharacter({ characterId: potentialSpouseID })
        console.log(potentialSpouse); // debugging only
        if (potentialSpouse &&
            !character.isDead &&
            (character.spouseId === null ||
            !state.characters[character.spouseId] ||
            state.characters[character.spouseId].isDead)) { //some checks, uncertain for now

          daapi.performMarriage({ characterId: characterId, spouseId: potentialSpouse.id, isMatrilineal: false })

          // console.log(potentialSpouse); // debugging only
        }

        //console.log(characters)
      }
    }
  }
}
