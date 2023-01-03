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

            let potentialSpouseID = daapi.generateCharacter({

              characterFeatures: character.SpouseData[spouseIndex].characterFeatures,
              dynastyFeatures: character.SpouseData[spouseIndex].dynastyFeatures

            })
            let potentialSpouse = daapi.getCharacter({ characterId: potentialSpouseID })

            let marriageMessage = ''
            switch (spouseIndex) {
              case 0:
                marriageMessage = `[c|${characterId}|${"Gnaeus Pompeius Magnus"}]` + ', Publius Antistius offers his daughter '
                  + `[c|${potentialSpouse.id}|${"Antistia"}]` + '\'s  AEMILIA hand in marriage. '
                  + 'You may refuse, but it will leave a mark on you and your family\'s honour'
                  + '\n What will you do?'
                break;
              case 1:
                marriageMessage = `[c|${characterId}|${"Gnaeus Pompeius Magnus"}]` + ', Publius Antistius offers his daughter '
                  + `[c|${potentialSpouse.id}|${"Aemilia"}]` + '\'s  hand in marriage. '
                  + 'You may refuse, but it will leave a mark on you and your family\'s honour'
                  + '\n What will you do?'
                break;
              case 2:
                marriageMessage = `[c|${characterId}|${"Gnaeus Pompeius Magnus"}]` + ', Publius Antistius offers his daughter '
                  + `[c|${potentialSpouse.id}|${"Mucia"}]` + '\'s  hand in marriage. '
                  + 'You may refuse, but it will leave a mark on you and your family\'s honour'
                  + '\n What will you do?'
                break;
              case 3:
                marriageMessage = `[c|${characterId}|${"Gnaeus Pompeius Magnus"}]` + ', Good Friend Julisu Caesar offers his daughter, '
                  + `[c|${potentialSpouse.id}|${"Julia"}]` + '\'s  hand in marriage. '
                  + 'You may refuse, but it will leave a mark on you and your family\'s honour'
                  + '\n What will you do?'
                break;
              case 4:
                marriageMessage = `[c|${characterId}|${"Gnaeus Pompeius Magnus"}]` + ', Publius Antistius offers his daughter '
                  + `[c|${potentialSpouse.id}|${"Cornelia"}]` + '\'s  hand in marriage. '
                  + 'You may refuse, but it will leave a mark on you and your family\'s honour'
                  + '\n What will you do?'
                break;
            }

            if (potentialSpouse) {


              let acceptOption = 
              {
                text: 'I accept.',
                tooltip: 'This will be a feast to remember.',
                statChanges: {
                  cash: -6000 / scalingFactor,
                  prestige: +2000 / scalingFactor,
                  influence: +4000 / scalingFactor,
                  property: {
                    insulae: +1,
                    horse: +1
                  }},
                disabled: false,
                action: {
                  event: '/play_scenario/scenarios/gnaeus_pompeius_magnus/marriageEvents',
                  method: 'wedding',
                  context: { characterId: characterId, spouseId: potentialSpouse.id, isMatrilineal: false }
                }}

              if(character.spouseId !== null ||
                state.characters[character.spouseId] ||
                !state.characters[character.spouseId].isDead) {

                  let presentSpouse = daapi.getCharacter({ characterId: character.spouseId})

                  acceptOption = {
                    text: 'Divorce '+`[c|${character.spouseId}|${presentSpouse.praenomen}]`+',Marry '+`[c|${potentialSpouse.id}|${potentialSpouse.praenomen}]`,
                    tooltip: 'Tis most unfortunate.',
                    statChanges: {
                      cash: -6000 / scalingFactor,
                      prestige: +2000 / scalingFactor,
                      influence: +4000 / scalingFactor,
                      property: {
                        insulae: +1,
                        horse: +1
                      }
                    },
                    disabled: false,
                    action: {
                      event: '/play_scenario/scenarios/gnaeus_pompeius_magnus/marriageEvents',
                      method: 'wedding',
                      context: { characterId: characterId, spouseId: potentialSpouse.id, isMatrilineal: false }
                    }
                  }
              }

              daapi.pushInteractionModalQueue({
                title: 'Marriage with ' + `${potentialSpouse.praenomen}`,
                image: daapi.requireImage("/play_scenario/scenarios/marcus_vipsanius_agrippa/ruby_ring_optimized.svg"),
                message: marriageMessage,
                options: 
                [
                  acceptOption,
                  {
                    text: 'I won\'t marry her.',
                    tooltip: 'Why should I?',
                    statChanges: 
                    {
                      prestige: -500 / scalingFactor,
                      influence: -2000 / scalingFactor
                    }
                  }
                ]
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
    }
  }
}
