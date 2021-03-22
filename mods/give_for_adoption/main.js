// Give child up for adoption button - costs cash, etc and visible upto a certain age - kills the child in game
{
  canTriggerIfUnavailable: true,
  checkType: 'householdCharacters',
  checkAndAct(characterId) {
  	let character = daapi.getCharacter({ characterId })
  	let age = daapi.calculateAge({ month: character.birthMonth, year: character.birthYear })
  	if (
      !character.isDead &&
      !character.flagIsBusy &&
      !character.flagIsAway &&
      !character.spouseId &&
      age <= 15
    ) {
    	daapi.addCharacterAction({
    		characterId,
    		key: 'give_for_adoption',
    		action: {
	        title: 'Give For Adoption',
	        icon: daapi.requireImage('/give_for_adoption/adopt.svg'),
	        isAvailable: true,
	        hideWhenBusy: true,
	        process: {
		        event: '/give_for_adoption/main',
		        method: 'process',
		        context: {
		          characterId
		        }
		      }
	      }
    	})
  	} else {
  		daapi.deleteCharacterAction({
    		characterId,
    		key: 'give_for_adoption'
    	})
  	}
  },
  methods: {
  	process({ characterId }) {
  		let character = daapi.getCharacter({ characterId })
	    daapi.pushInteractionModalQueue({
	      title: 'Give for Adoption',
	      message: 'You can find a suitable family to adopt ' + `[c|${characterId}|${character.praenomen}]` + ', and once they\'re adopted, their well being will no longer be your concern',
	      image: daapi.requireImage('/give_for_adoption/adopt.svg'),
	      options: [
	        {
	        	variant: 'danger',
	          text: 'Fare thee well ' + character.praenomen,
	          tooltip: `[c|${characterId}|${character.praenomen}]` + ' wil be given away for adoption. This action cannot be undone',
	          statChanges: {
	            cash: -50,
	            prestige: -100,
	            influence: -500
	          },
	          action:{
	          	event: '/give_for_adoption/main',
	          	method: 'doAdopt',
	          	context: {characterId}
	          }
	        },
	        {
	        	text: 'No! ' + character.praenomen + ' is our child!'
	        }
	      ]
	    })
  	},
  	doAdopt({ characterId }) {
  		daapi.kill({
  			characterId,
  			deathCause: '...maybe, who knows?, after being given up for adoption'
  		})
  	}
  }
}