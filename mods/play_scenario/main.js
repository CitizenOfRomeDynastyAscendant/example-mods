{
  canTriggerIfUnavailable: true,
  checkType: 'general',
  checkAndAct() {
    daapi.addGlobalAction({
      key: 'playScenario',
      action: {
        title: 'Play a Scenario',
        icon: daapi.requireImage('/play_scenario/play.svg'),
        isAvailable: true,
        process: {
          event: '/play_scenario/main',
          method: 'process'
        }
      }
    })
  },
  methods: {
    process() {
      let scenarios = [
        '/play_scenario/scenarios/gaius_julius_caesar'
      ]
      let state = daapi.getState()
      let scaleByClassFactor = daapi.calculateScaleByClassFactor()
      let options = []
      scenarios.forEach((scenario) => {
        let scenarioData = daapi.modData.events[scenario]
        let property = {}
        let combinedProperties = {...state.current.propertyDetails, ...scenarioData.property}
        for(var prop in combinedProperties) {
          if(!combinedProperties.hasOwnProperty(prop)) {
            continue
          }
          property[prop] = (parseInt(scenarioData.property[prop], 10) || 0) - (parseInt(state.current.propertyDetails[prop], 10) || 0)
          if(!property[prop]) {
            delete property[prop]
          }
        }
        options.push({
          text: scenarioData.title,
          tooltip: scenarioData.info,
          statChanges: {
            cash: ((parseFloat(scenarioData.cash) || 0) - (parseFloat(state.current.cash) || 0)) / scaleByClassFactor,
            influence: ((parseFloat(scenarioData.influence) || 0) - (parseFloat(state.current.influence) || 0)) / scaleByClassFactor,
            property
          },
          action:{
            event: '/play_scenario/main',
            method: 'playScenario',
            context: {
              scenario
            }
          }
        })
      })
      daapi.pushInteractionModalQueue({
        title: 'Play a Scenario',
        message: 'Play one of these families & scenarios? Your current family & progress will be lost',
        image: daapi.requireImage('/play_scenario/play.svg'),
        options: [
          ...options,
          {
            text: 'Not right now'
          }
        ]
      })
    },
    playScenario({ scenario }) {
      let scenarioData = {...daapi.modData.events[scenario]}
      daapi.setDate(scenarioData.date)
      let genCharIdMapping = {}
      // load characters & linked dynasties
      for(let tmpCharacterId in scenarioData.characters) {
        if(!scenarioData.characters.hasOwnProperty(tmpCharacterId)) {
          continue
        }
        let genCharId = daapi.generateCharacter({ 
          characterFeatures: scenarioData.characters[tmpCharacterId], 
          dynastyFeatures: scenarioData.dynasties[scenarioData.characters[tmpCharacterId].dynastyId]
        })
        genCharIdMapping[tmpCharacterId] = genCharId
      }
      for(let tmpCharacterId in genCharIdMapping) {
        if(!genCharIdMapping.hasOwnProperty(tmpCharacterId)) {
          continue
        }
        let character = {...scenarioData.characters[tmpCharacterId]}
        character.id = genCharIdMapping[tmpCharacterId]
        character.fatherId = genCharIdMapping[character.fatherId] || false
        character.motherId = genCharIdMapping[character.motherId] || false
        character.spouseId = genCharIdMapping[character.spouseId] || false
        let newChildrenIds = []
        character.childrenIds = character.childrenIds || []
        character.childrenIds.forEach((childId) => {
          if(genCharIdMapping[childId]) {
            newChildrenIds.push(genCharIdMapping[childId])
          }
        })
        character.childrenIds = newChildrenIds
        daapi.updateCharacter({
          characterId: genCharIdMapping[tmpCharacterId],
          character
        })
      }
      // play as
      daapi.setCurrentCharacter({ characterId: genCharIdMapping[scenarioData.characterId] })
      daapi.setGlobalFlag({ flag: 'playingScenario', data: scenario })
    }
  }
}
