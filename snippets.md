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
