{
  canTriggerIfUnavailable: true,
  checkType: 'general',
  checkAndAct() {
    const state = daapi.getState()
    const currentId = state.current.id
    const characterId = daapi.getCharacterFlag({ characterId: currentId, flag: 'mod_murder_startedPlotOnTarget' })
    if( !characterId || !state.characters[characterId] || !state.characters[characterId].isDead ) {
      return
    }
    const character = state.characters[characterId]
    daapi.displayInteractionModal({
      title: 'Tryst of fate',
      message: `It appears fate itself has joined your plot. [c|${characterId}|${character.praenomen}] has died!`,
      image: daapi.requireImage('/murder/plot.svg'),
      options: [
        {
          text: 'They gods smile upon me!'
        }
      ]
    })
    daapi.setCharacterFlag({ characterId, flag: 'mod_murder_plotTarget', data: false })
    daapi.setCharacterFlag({ characterId: currentId, flag: 'mod_murder_startedPlotOnTarget', data: false })
    daapi.deleteCharacterAction({ characterId: currentId, key: 'mod_murder_cancelPlot' })
  }
}
