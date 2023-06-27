// Start a murder plot against characters
// Icon by <a href="https://freeicons.io/profile/433683">manshagraphics</a> on <a href="https://freeicons.io">freeicons.io</a>
{
  canTriggerIfUnavailable: true,
  checkType: 'allCharacters',
  checkAndAct(characterId) {
    const currentId = daapi.getState().current.id
    const character = daapi.getCharacter({ characterId })
    if (
      characterId !== currentId &&
      character &&
      !character.isDead &&
      daapi.calculateAge({ month: character.birthMonth, year: character.birthYear }) > 15 &&
      !daapi.getCharacterFlag({ characterId, flag: 'mod_murder_plotTarget' }) &&
      !daapi.getCharacterFlag({ characterId: currentId, flag: 'mod_murder_startedPlotOnTarget' })
    ) {
      daapi.addCharacterAction({
        characterId,
        key: 'mod_murder_startPlot',
        action: {
          title: 'Attempt Murder',
          icon: daapi.requireImage('/murder/plot.svg'),
          isAvailable: true,
          hideWhenBusy: false,
          process: {
            event: '/murder/main',
            method: 'process',
            context: {
              characterId
            }
          }
        }
      })
    } else {
      daapi.deleteCharacterAction({ characterId, key: 'mod_murder_startPlot' })
    }
  },
  methods: {
    process({ characterId }) {
      const currentId = daapi.getState().current.id
      const existingTargetId = daapi.getCharacterFlag({ characterId: currentId, flag: 'mod_murder_startedPlotOnTarget' })
      if(existingTargetId) {
        daapi.deleteCharacterAction({ characterId, key: 'mod_murder_startPlot' })
        daapi.displayInteractionModal({
          title: 'Another plot in progress ...',
          message: 'You already have a plot in progress against ' + `[c|${existingTargetId}|${daapi.getCharacter({ characterId: existingTargetId }).praenomen}]` + '',
          image: daapi.requireImage('/murder/plot.svg')
        })
        return
      }
      const character = daapi.getCharacter({ characterId })
      const startPlotResponses = ['Let us prey', 'Kill. Die. Kill.', ' Die, Die, Die!', `Hades awaits ${character.praenomen}`, `DIE ${character.praenomen.toUpperCase()}, DIE`, 'Will no one rid me of this turbulent pest?', `${character.praenomen} is not long for this world!`, `Then fall ${character.praenomen}`]
      daapi.displayInteractionModal({
        title: 'Attempt to murder ' + character.praenomen + '?',
        message: 'Start a plot to have ' + `[c|${characterId}|${character.praenomen}]` + ' killed?',
        image: daapi.requireImage('/murder/plot.svg'),
        options: [
          {
            variant: 'danger',
            text: startPlotResponses[Math.floor(Math.random() * startPlotResponses.length)],
            action:{
              event: '/murder/main',
              method: 'startPlot',
              context: { characterId }
            }
          },
          {
            text: 'No.'
          }
        ]
      })
    },
    startPlot({ characterId }) {
      const currentId = daapi.getState().current.id
      daapi.deleteCharacterAction({ characterId, key: 'mod_murder_startPlot' })
      daapi.setCharacterFlag({ characterId, flag: 'mod_murder_plotTarget', data: true })
      daapi.setCharacterFlag({ characterId: currentId, flag: 'mod_murder_startedPlotOnTarget', data: characterId })
      daapi.addCharacterAction({
        characterId: currentId,
        key: 'mod_murder_cancelPlot',
        action: {
          title: 'Stop Plotting Murder',
          icon: daapi.requireImage('/murder/cancelPlot.svg'),
          isAvailable: true,
          hideWhenBusy: false,
          process: {
            event: '/murder/main',
            method: 'cancelPlot'
          }
        }
      })
    },
    cancelPlot() {
      const currentId = daapi.getState().current.id
      daapi.setCharacterFlag({ characterId: daapi.getCharacterFlag({ characterId: currentId, flag: 'mod_murder_startedPlotOnTarget' }), flag: 'mod_murder_plotTarget', data: false })
      daapi.setCharacterFlag({ characterId: currentId, flag: 'mod_murder_startedPlotOnTarget', data: false })
      daapi.deleteCharacterAction({ characterId: currentId, key: 'mod_murder_cancelPlot' })
    }
  }
}
