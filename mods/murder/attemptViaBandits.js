{
  canTriggerIfUnavailable: true,
  checkType: 'general',
  checkAndAct() {
    const state = daapi.getState()
    const currentId = state.current.id
    const characterId = daapi.getCharacterFlag({ characterId: currentId, flag: 'mod_murder_startedPlotOnTarget' })
    if( !characterId || !state.characters[characterId] || state.characters[characterId].isDead || Math.random() > 1 / 13 / 6 ) {
      return
    }
    const character = state.characters[characterId]
    daapi.displayInteractionModal({
      title: 'Bandit gambit?',
      message: 'You hear news of ' + `[c|${characterId}|${character.praenomen}]` + ' plans to visit their estates in the countryside from one of your confidants, who is in on your scheme, presented along with an plan to disguise yourselves and a group of servants as bandits & ambush ' + `[c|${characterId}|${character.praenomen}]` + ' en-route',
      image: daapi.requireImage('/murder/plot.svg'),
      options: [
        {
          variant: 'danger',
          text: 'Yes!',
          statChanges: {
            cash: -200,
            influence: -100
          },
          action:{
            event: '/murder/attemptViaBandits',
            method: 'makeAttempt'
          }
        },
        {
          text: 'No, it is too risky ...'
        }
      ]
    })
  },
  methods: {
    makeAttempt() {
      const state = daapi.getState()
      const currentId = state.current.id
      const characterId = daapi.getCharacterFlag({ characterId: currentId, flag: 'mod_murder_startedPlotOnTarget' })
      if( !characterId || !state.characters[characterId] || state.characters[characterId].isDead ) {
        return
      }
      const character = state.characters[characterId]
      const currentCharacter = state.characters[currentId]
      let rngesus = (currentCharacter.skills.combat / 40) + (currentCharacter.skills.intelligence / 60) +  ((Math.random() / 5) * (Math.random() > 0.45 ? 1 : -1))
      let message = ''
      let text = ''
      let statChanges = {}
      if (rngesus < 0.15) {
        message = `Just as [c|${characterId}|${character.praenomen}] approaches your ambush point, and as you're eagerly about to spring your trap, you look around to notice your servants missing from their assigned places. You turn towards your confidant to let them know, when suddenly something heavy is smacked against your head. As the world turns dark, you seem to be seeing your confidant clasping hands with [c|${characterId}|${character.praenomen}], through your final haze`
        text = 'Et tu ...'
        daapi.kill({
          characterId: currentId,
          deathCause: ', after being brutally betrayed by their trusted confidant'
        })
        daapi.setCharacterFlag({ characterId, flag: 'mod_murder_plotTarget', data: false })
        daapi.deleteCharacterAction({ characterId: currentId, key: 'mod_murder_cancelPlot' })
      } else if (rngesus < 0.35) {
        message = `On the appointed day, you wait in ambush for what feels like hours, only for [c|${characterId}|${character.praenomen}] to never show up, it turns out they changed their plans. What's worse is one of your servants was spotted by the locals, and although they were not recognized, this ambush spot is no longer viable, even if [c|${characterId}|${character.praenomen}] should come this way again in the future.`
        text = 'Damn it'
      } else if (rngesus < 0.55) {
        message = `[c|${characterId}|${character.praenomen}] falls right into your ambush, at first, but then they manage to beat one of your servants and make an escape. Luckily it appears none of you were recognized.`
        text = 'Argh, we almost had them'
      } else {
        message = `[c|${characterId}|${character.praenomen}] falls right into your ambush, and you manage to get them.`
        text = `Rest in pieces ${character.praenomen}`
        daapi.kill({
          characterId,
          deathCause: ', viciously attacked by bandits'
        })
        daapi.setCharacterFlag({ characterId, flag: 'mod_murder_plotTarget', data: false })
        daapi.setCharacterFlag({ characterId: currentId, flag: 'mod_murder_startedPlotOnTarget', data: false })
        daapi.deleteCharacterAction({ characterId: currentId, key: 'mod_murder_cancelPlot' })
      }
      daapi.displayInteractionModal({
        title: 'Bandit gambit',
        message,
        image: daapi.requireImage('/murder/plot.svg'),
        options: [
          {
            text,
            statChanges
          }
        ]
      })
    }
  }
}