# Example console commands / daapi snippets

## Get Character ID
### Current Character
`daapi.getState().current.id`
### Spouse of Current Character
`daapi.getCharacter({ characterId: daapi.getState().current.id }).spouseId`
### Children of Current Character
`daapi.getCharacter({ characterId: daapi.getState().current.id }).childrenIds[0]`

Note: Children Ids start at `0` for 1st child, `1` for the 2nd and so on, like: 
`daapi.getCharacter({ characterId: daapi.getState().current.id }).childrenIds[1]`
### Spouse of a specific Character ID
`daapi.getCharacter({ characterId: 'd9d2b5ae_e429_4956_bc58_02e4c38caea8' }).spouseId`

## Get Character Info/Data
`daapi.getCharacter({ characterId: daapi.getState().current.id })`

### With a specific Character ID
`daapi.getCharacter({ characterId: 'd9d2b5ae_e429_4956_bc58_02e4c38caea8' })`

## Add/Remove Trait:
`daapi.addTrait({characterId:daapi.getState().current.id, trait: 'strong'})`
`daapi.removeTrait({characterId:daapi.getState().current.id, trait: 'strong'})`
### x10
`(function() { for(var i = 0; i < 10; i++) { daapi.addTrait({characterId:daapi.getState().current.id, trait: 'strong'}); } })()`
### Spouse
`daapi.addTrait({ characterId: daapi.getCharacter({ characterId: daapi.getState().current.id }).spouseId, trait:'strong' })`
### Children
`daapi.addTrait({ characterId: daapi.getCharacter({ characterId: daapi.getState().current.id }).childrenIds[0], trait: 'genius' })`

## Impregnate
`daapi.impregnate({ characterId: daapi.getCharacter({ characterId: daapi.getState().current.id }).spouseId })`

## Update Character Data
### Set age as 20
`daapi.updateCharacter({ characterId: daapi.getState().current.id, character: { birthYear: daapi.getState().year - 20 }})`

### Revive Char
`daapi.updateCharacter({characterId:daapi.getState().current.id, character:{ isDead:false }})`
#### Revive and play as previous char (usually)
`daapi.updateCharacter({characterId:daapi.getCharacter({ characterId: daapi.getState().current.id }).fatherId, character:{ isDead:false }}); daapi.setCurrentCharacter({ characterId: daapi.getCharacter({ characterId: daapi.getState().current.id }).fatherId })`

### Change Job
`daapi.updateCharacter({characterId:daapi.getState().current.id, character:{ job:'wetNurse', jobLevel: 25 }})`

### Change Gender
`daapi.updateCharacter({characterId:daapi.getState().current.id, character:{ isMale:false }})`

### Set Skills/Stats
`daapi.updateCharacter({ characterId: daapi.getState().current.id, character: { skills: { intelligence: 32 } } })`

### Start Education
Note: These will enroll them in the appropriate education but won't charge you for it or display any indication of being educated. You will have to manually add/remove revenue modifiers and status indicators additionally if so desired
#### Ludus
`daapi.updateCharacter({characterId:daapi.getState().current.id, character:{ flagAttendingLudus: 'private', flagIsBusy: true, actions: {beginLudusEducation:{}, endLudusEducation:{}} }})`
#### Grammaticus
`daapi.updateCharacter({characterId:daapi.getState().current.id, character:{ flagAttendingGrammaticus: 'renowned', flagIsBusy: true, actions: {beginGrammaticusEducation:{}, endGrammaticusEducation:{}} }})`
#### Rhetor
`daapi.updateCharacter({characterId:daapi.getState().current.id, character:{ flagAttendingRhetor: 'judicial', flagIsBusy: true, actions: {beginRhetorEducation:{}, endRhetorEducation:{}} }})`

Or similarly `flagAttendingRhetor: 'deliberative'`
#### Philosophy
`daapi.updateCharacter({characterId:daapi.getState().current.id, character:{ flagAttendingPhilosophy: 'renowned', flagIsBusy: true, flagIsAway: true, actions: {beginPhilosophyEducation:{}, endPhilosophyEducation:{}} }})`


## Add cash
`daapi.displayInteractionModal({ title:'Money!', message: 'Here you go:', options: [{ text: 'Thanks!', statChanges: { cash: 500 }}]})`

## Modifiers
### household_health
#### Lower Health to x0.1
`daapi.addModifier({ key: 'household_health', id: 'cancel_easy_mode', factor: 0.1 })`
##### Remove the same
`daapi.removeModifier({ key: 'household_health', id: 'cancel_easy_mode' })`

Note: You can skip the `id` parameter if you don't intend to `removeModifier` manuall in the future
#### Increase Health for 13 months
`daapi.addModifier({ key: 'household_health', id: 'increase_for_13', factor: 1000, durationInMonths: 13 })`

### Increase Current Character's Health
`daapi.addModifier({ key: 'character_health_' + daapi.getState().current.id, factor: 300 })`
### Revenue
#### Multiplier
`daapi.addModifier({ key: 'revenue', factor: 10 })`
#### Add Monthly
`daapi.addAdditiveModifier({ key: 'revenue', durationInMonths: 6, amount: 1000 })`
