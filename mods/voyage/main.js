{
  canTriggerIfUnavailable: false,
  checkType: 'general',
  checkAndAct() {
    const state = daapi.getState()
    const character = state.characters[state.current.id]
    if(
      character && 
      !character.isDead && 
      !character.isBusy && 
      !character.isAway && 
      (Math.random() < 0.2 || (character.job === 'trader' && character.jobLevel > 10)) && 
      Math.random() < 1 / 13 / 150
    ) {
      daapi.pushInteractionModalQueue({
        title: 'A voyage?',
        message: 'One of your mercantile connections from a distant land presents a potential trade opportunity that will need you to travel with them to their homeland to negotiate an agreement with their chief',
        options: [
          {
            text: 'Let us do it!',
            statChanges: { 
              cash: -25000
            },
            action:{
              event: '/voyage/main',
              method: 'travel'
            }
          },
          {
            text: 'A risky venture, that is not for me'
          }
        ]
      })
    }
  },
  methods: {
    travel() {
      const state = daapi.getState()
      daapi.setCharacterFlag({ 
        characterId: state.current.id, 
        flag: 'voyageMod_journeyStatus', 
        data: 'started' 
      })
      daapi.updateCharacter({
        characterId: state.current.id,
        character: {
          isAway: true,
          isBusy: true
        }
      })
      daapi.pushInteractionModalQueue({
        title: 'A voyage!',
        message: 'Taking them up on the offer, you set off to their distant homeland. Wonder what trials and tribulations await you on the way ...',
        options: [
          {
            text: 'My journey begins!'
          }
        ]
      })
    }
  }
}
