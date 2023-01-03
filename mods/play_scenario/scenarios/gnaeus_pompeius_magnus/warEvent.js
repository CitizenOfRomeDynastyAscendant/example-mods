{
  checkType: 'householdCharacters',

    checkAndAct(characterId) {
    let character = daapi.getCharacter({ characterId: characterId })
    let state = daapi.getState()
    let scalingFactor = daapi.calculateScaleByClassFactor()
    let age = daapi.calculateAge({ month: character.birthMonth, year: character.birthYear })

    if (character.flagPlayScenarioModIsPompey && character.flagFather) {

        if (!daapi.getCharacterFlag({ characterId: characterId, flag: `pompey_social_war` })) {

          if (age > 40.5 &&
            age < 41.5 &&
            !character.isDead) {
              daapi.pushInteractionModalQueue({
                title: 'Social War' ,
                image: daapi.requireImage("/play_scenario/scenarios/gnaeus_pompeius_magnus/italy.svg"),
                message: "The Social War, also called the Italian War or the Marsic War, was fought from 91 to 87 BC between the Roman Republic and several of its autonomous allies (socii) in Italy. The Italian allies wanted Roman citizenship, not only for the status and influence that came with it, but also for the right to vote in Roman elections and laws.",
                options: 
                [
                  {
                    text: 'To War we go!!',
                    tooltip: 'Darn the Italians.',
                    statChanges: {
                      prestige: +2000 / scalingFactor,
                      influence: +4000 / scalingFactor,
                    },
                    disabled: false,
                    action: {
                      event: '/play_scenario/scenarios/gnaeus_pompeius_magnus/warEvent',
                      method: 'SocialWar',
                      context: { characterId: characterId}
                    }}
                ]
              })
          }
        }
    }
  },
  methods: {
    SocialWar({characterId}) {
      daapi.setCharacterFlag({ characterId: characterId, flag: `pompey_social_war`, data: true });
      daapi.startWar();
    }
  }
}
