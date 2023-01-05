{
  checkType: 'householdCharacters',

    checkAndAct(characterId) {
    let character = daapi.getCharacter({ characterId: characterId })
    let state = daapi.getState()
    let scalingFactor = daapi.calculateScaleByClassFactor()
    let age = daapi.calculateAge({ month: character.birthMonth, year: character.birthYear })

    if (character.SpouseData !== undefined && character.flagPlayScenarioModIsPompey) {


      for (var spouseIndex = 0; spouseIndex < character.SpouseData.length; spouseIndex++) {
        if (!daapi.getCharacterFlag({ characterId: characterId, flag: `pompey_engagement_${spouseIndex + 1}_over` })) {
          if (age > character.SpouseData[spouseIndex].time + .5 &&
            age < character.SpouseData[spouseIndex].time + 1.5 &&
            !character.isDead) {
            // console.log(character.SpouseData[spouseIndex].characterFeatures.praenomen);
            let potentialSpouseID = daapi.generateCharacter({

              characterFeatures: character.SpouseData[spouseIndex].characterFeatures,
              dynastyFeatures: character.SpouseData[spouseIndex].dynastyFeatures

            })

            let potentialSpouse = daapi.getCharacter({ characterId: potentialSpouseID })

            let marriageMessage = ''
            let marriageAcceptStatChanges = {}
            let marriageRejectStatChanges = {}
            let divorceAcceptStatChanges = {}
            let divorceRejectStatChanges = {}
            switch (spouseIndex) {
              case 0:
                marriageMessage = 'Your Father has been accused of stealing public prperty.As your father\'s heir, you are being put on trial. Through thorough invesitgation you discovered that the theft was committed by one of your father\'s freedmen. You present your defense to the judge and directly confront the accuser. As a result, You have succesfully defended your father\'s honour and won the trail.'
                  + ' The judge,Publius Antistius, took a liking to you and offered his daughter ,'
                  + `[c|${potentialSpouse.id}|${"Antistia"}]` + '\'s  hand in marriage'
                  + '\n What will you do?'
                marriageAcceptStatChanges = {
                  prestige: +1000 / scalingFactor,
                  influence: +2000 / scalingFactor,
                  property: {
                    insulae: +1,
                    horse: +1
                  }
                }
                marriageRejectStatChanges = {
                  prestige: -3000 / scalingFactor,
                  influence: -1000 / scalingFactor,
                }
                divorceAcceptStatChanges = {
                  prestige: +1000 / scalingFactor,
                  influence: -500 / scalingFactor,
                }
                divorceRejectStatChanges = {
                  prestige: -500 / scalingFactor,
                  influence: +2000 / scalingFactor,
                }
                break;
              case 1:
                marriageMessage = 'Dictator Sulla admires your administration skill and wishes to strengthen ties with you. He and his wife, Metella, wish that ' + `[c|${characterId}|${"you"}]` + ' marry their step-daughter,  '
                  + `[c|${potentialSpouse.id}|${"Aemilia"}].`
                  + 'This could be a great oppurtunity to gain Sulla\'s favor.'
                  + '\n What will you do?'
                marriageAcceptStatChanges = {
                  prestige: +5000 / scalingFactor,
                  influence: +3000 / scalingFactor,
                  property: {
                    seafaringTradeships: +3,
                  }
                }
                marriageRejectStatChanges = {
                  prestige: -7000 / scalingFactor,
                  influence: -1000 / scalingFactor,
                }
                divorceAcceptStatChanges = {
                  prestige: +4000 / scalingFactor,
                  influence: -1500 / scalingFactor,
                }
                divorceRejectStatChanges = {
                  prestige: -5000 / scalingFactor,
                  influence: +1000 / scalingFactor,
                }
                break;
              case 2:
                marriageMessage = 'Julius Caesar come to you with a proposal. As fellow members of the First Triumvirate he wishes to deepen your partnership. He offers his daughter '
                  + `[c|${potentialSpouse.id}|${"Julia"}]` + '\'s  hand in marriage to you,' + `[c|${characterId}|${"Gnaeus Pompeius Magnus"}].`
                  + 'This could be a great oppurtunity to gain Caesar\'s favor and strengthen your position in the Triumvirate.'
                  + '\n What will you do?'
                marriageAcceptStatChanges = {
                  prestige: +1000 / scalingFactor,
                  influence: +2000 / scalingFactor,
                  property: {
                    latifundiumFood: +3
                  }
                }
                marriageRejectStatChanges = {
                  prestige: -3000 / scalingFactor,
                  influence: -1000 / scalingFactor,
                }
                divorceAcceptStatChanges = {
                  prestige: +10000 / scalingFactor,
                  influence: -5000 / scalingFactor,
                }
                divorceRejectStatChanges = {
                  prestige: -20000 / scalingFactor,
                  influence: +10000 / scalingFactor,
                }
                break;

            }

            if (potentialSpouse) {

              let marriageOptions = []

              // console.log(character.spouseId)
              if (character.spouseId !== false &&
                (state.characters[character.spouseId] && !state.characters[character.spouseId].isDead)) {

                let presentSpouse = daapi.getCharacter({ characterId: character.spouseId })

                let acceptDivorceOption = {
                  text: 'Divorce ' + `[c|${character.spouseId}|${presentSpouse.praenomen}]` + ', Marry ' + `[c|${potentialSpouse.id}|${potentialSpouse.praenomen}]`,
                  tooltip: 'Tis most unfortunate.',
                  statChanges: divorceAcceptStatChanges,
                  disabled: false,
                  action: {
                    event: '/play_scenario/scenarios/gnaeus_pompeius_magnus/marriageEvents',
                    method: 'wedding',
                    context: { characterId: characterId, spouseId: potentialSpouse.id, isMatrilineal: false }
                  }
                }
                let rejectDivorceOption =
                {
                  text: 'I won\'t abandon my Love.',
                  tooltip: 'I would never do such a thing',
                  statChanges: divorceRejectStatChanges
                }
                marriageOptions = [acceptDivorceOption, rejectDivorceOption]
              }
              else {
                let acceptMarriageOption =
                {
                  text: 'I accept.',
                  statChanges: marriageAcceptStatChanges,
                  disabled: false,
                  action: {
                    event: '/play_scenario/scenarios/gnaeus_pompeius_magnus/marriageEvents',
                    method: 'wedding',
                    context: { characterId: characterId, spouseId: potentialSpouse.id, isMatrilineal: false }
                  }
                }
                let rejectMarriageOption =
                {
                  text: 'I won\'t marry her.',
                  tooltip: 'Why should I?',
                  statChanges: marriageRejectStatChanges
                }
                marriageOptions = [acceptMarriageOption, rejectMarriageOption]
              }
              daapi.pushInteractionModalQueue({
                title: 'Marriage with ' + `${potentialSpouse.praenomen}`,
                image: daapi.requireImage("/play_scenario/scenarios/gnaeus_pompeius_magnus/ruby_ring_optimized.svg"),
                message: marriageMessage,
                options: marriageOptions
              })
              daapi.setCharacterFlag({ characterId: characterId, flag: `pompey_engagement_${spouseIndex + 1}_over`, data: true })
            }
          }
        }
      }
    }
  },
  methods: {
    wedding({ characterId, spouseId, isMatrilineal }) {
      daapi.performMarriage({ characterId, spouseId, isMatrilineal })
    },
    // divorceAndMarry({ characterId, presentSpouseId, newSpouseId }) {

    //   daapi.performMarriage({ characterId, newSpouseId, isMatrilineal })
    // }
  }
}
