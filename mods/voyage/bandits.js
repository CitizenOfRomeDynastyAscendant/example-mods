{
  canTriggerIfUnavailable: false,
  checkType: 'general',
  checkAndAct() {
    const state = daapi.getState()
    const character = state.characters[state.current.id]
    if(
      character && 
      daapi.getCharacterFlag({ 
        characterId: state.current.id, 
        flag: 'voyageMod_journeyStatus'
      }) === 'started' &&
      Math.random() < 1 / 13 / 25
    ) {
      daapi.pushInteractionModalQueue({
        title: 'A voyage: Bandits!',
        message: 'As you go forth in your journey, you find yourself ambushed by bandits. You could pay their "toll" as they demand, attempt to fight them or make an attempt to flee. Paying up will mean the end of your journey due to a lack of funds to proceed, barring a miracle, and not paying up could cost you your life and limb',
        options: [
          {
            text: 'I value my life over this potential trade deal, I\'ll pay, thank you very much',
            tooltip: 'This could be the end of your journey, forcing you to return home in shame ...',
            statChanges: { 
              cash: -2500,
              prestige: -250,
              influence: -500
            },
            action:{
              event: '/voyage/bandits',
              method: 'pay'
            }
          },
          {
            text: 'We can take them on, let\'s fight!',
            action:{
              event: '/voyage/bandits',
              method: 'fight'
            }
          },
          {
            text: 'We can outrun them, let\'s flee!',
            action:{
              event: '/voyage/bandits',
              method: 'flight'
            }
          }
        ]
      })
    }
  },
  methods: {
    pay() { /* @TODO */ },
    fight() { /* @TODO */ },
    flight() { /* @TODO */ }
  }
}
