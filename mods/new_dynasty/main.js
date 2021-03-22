// Switches you to a new dynasty
{
  canTriggerIfUnavailable: true,
  checkType: 'general',
  checkAndAct() {
  	/* daapi.openDevTools() */
  	let state = daapi.getState()
  	let characterId = state.current.id
  	daapi.addCharacterAction({
  		characterId,
  		key: 'newDynasty',
  		action: {
        title: 'A new Dynasty?',
        icon: daapi.requireImage('/new_dynasty/rename.svg'),
        isAvailable: true,
        hideWhenBusy: false,
        process: {
	        event: '/new_dynasty/main',
	        method: 'process',
	        context: {
	        	characterId
	        }
	      }
      }
  	})
  },
  methods: {
  	process({characterId}) {
  		let state = daapi.getState()
  		let character = state.characters[characterId]
  		let nomen = state.dynasties[character.dynastyId].nomen
  		let cognomen = state.dynasties[character.dynastyId].cognomen
  		let updateCharacterChildrenDynasty = (thisCharacterId, newDynId) => {
  			let thisCharacter = state.characters[thisCharacterId] || {}
  			thisCharacter.childrenIds = thisCharacter.childrenIds || []
  			for(let i = 0; i < thisCharacter.childrenIds.length; i++) {
  				let thisChildId = thisCharacter.childrenIds[i]
  				daapi.updateCharacter({ characterId: thisChildId, character: {dynastyId: newDynId} })
  				if(thisCharacter.isMale) {
  					updateCharacterChildrenDynasty(thisChildId, newDynId)
  				}
  			}
  		}
  		let newDynasty = ({ nomen, cognomen }) => {
  			let genCharId = daapi.generateCharacter({
  				characterFeatures: {},
  				dynastyFeatures: { ...state.dynasties[character.dynastyId], nomen, cognomen }
  			})
  			let newDynId = daapi.getCharacter({ characterId: genCharId }).dynastyId
  			daapi.updateCharacter({ characterId, character: {dynastyId: newDynId} })
  			updateCharacterChildrenDynasty(characterId, newDynId)
  			daapi.kill({ characterId: genCharId })
  		}
      daapi.pushInteractionModalQueue({
        title: 'A new Dynasty?',
        message: 'Split away from the age old name and move onward to a more fitting one for your family?',
        image: daapi.requireImage('/new_dynasty/rename.svg'),
        inputs: [
          {
            type: 'text',
            title: 'Nomen',
            value: nomen,
            onChange: (input) => {
              nomen = input.value || nomen
              newDynasty({ nomen, cognomen })
            }
          },
          {
            type: 'text',
            title: 'Cognomen',
            value: cognomen,
            onChange: (input) => {
              cognomen = input.value || ''
              newDynasty({ nomen, cognomen })
            }
          }
        ]
      })
  	}
  }
}