{
  checkType: 'householdCharacters',

    checkAndAct(characterId) {
    let character = daapi.getCharacter({ characterId: characterId })
    let state = daapi.getState()
    let scalingFactor = daapi.calculateScaleByClassFactor()
    let age = daapi.calculateAge({ month: character.birthMonth, year: character.birthYear })

    if (character.flagPlayScenarioModIsPompey && character.flagPlayScenarioModPompeyIsFather) {

      if (!daapi.getCharacterFlag({ characterId: characterId, flag: `pompey_social_war` })) {

        if (age > 40.5 && age < 41.5 && !character.isDead) {
          
          let warVolunteerOption = {
            text: 'I shall volunteer! To War we go!!',
            tooltip: 'Participate in the war for Rome and Glory',
            statChanges: {
              prestige: +2000 / scalingFactor,
              influence: +4000 / scalingFactor,
            },
            disabled: false,
            action: {
              event: '/play_scenario/scenarios/gnaeus_pompeius_magnus/warEvent',
              method: 'SocialWar',
              context: { characterId: characterId, flagJoinWar: true }
            }
          }

          let warAcknowledgeOption = {
            text: 'Damn the Soci',
            disabled: false,
            action: {
              event: '/play_scenario/scenarios/gnaeus_pompeius_magnus/warEvent',
              method: 'SocialWar',
              context: { characterId: characterId, flagJoinWar: false }
            }
          }

          let warAbstainOption = {
            text: 'I do not wish for Bloodshed',
            tooltip: 'Abstain from the War',
            statChanges: {
              prestige: -2000 / scalingFactor,
              influence: -4000 / scalingFactor,
            },
            disabled: false,
          }

          let warOptions = []

          let flagWarEligble=character.traits.some((trait) => { return (trait==="formerMilitaryTribune"||trait==="militaryTribune")})

          if (flagWarEligble) {
            warOptions = [warVolunteerOption, warAbstainOption]
          }
          else {
            warOptions = [warAcknowledgeOption]
          }

          daapi.pushInteractionModalQueue({
            title: 'Social War',
            image: daapi.requireImage("/play_scenario/scenarios/gnaeus_pompeius_magnus/italy.svg"),
            message: "The Social War, also called the Italian War or the Marsic War, was fought from 91 to 87 BC between the Roman Republic and several of its autonomous allies (socii) in Italy. The Italian allies wanted Roman citizenship, not only for the status and influence that came with it, but also for the right to vote in Roman elections and laws.",
            options: warOptions
          })
        }
      }
    }
  },
  methods: {
    SocialWar({ characterId,flagJoinWar }) {
      daapi.setCharacterFlag({ characterId: characterId, flag: `pompey_social_war`, data: true });
      daapi.startWar();
      if(flagJoinWar)
      {
        daapi.joinWar({ characterId: characterId });
      }
    }
  }
}
