# Example console commands / daapi snippets

## Add/Remove Trait:
`daapi.addTrait({characterId:daapi.getState().current.id, trait: 'strong'})`
`daapi.removeTrait({characterId:daapi.getState().current.id, trait: 'strong'})`
### x10
`(function() { for(var i = 0; i < 10; i++) { daapi.addTrait({characterId:daapi.getState().current.id, trait: 'strong'}); } })()`
### Spouse
`daapi.addTrait({ characterId: daapi.getCharacter({ characterId: daapi.getState().current.id }).spouseId, trait:'strong' })`
### Children
`daapi.addTrait({ characterId: daapi.getCharacter({ characterId: daapi.getState().current.id }).childrenIds[0], trait: 'genius' })`

Note: Children Ids start at `0` for 1st child, `1` for the 2nd and so on

## Set age as 20
`daapi.updateCharacter({ characterId: daapi.getState().current.id, character: { birthYear: daapi.getState().year - 20 }})`

## Impregnate
`daapi.impregnate({ characterId: daapi.getCharacter({ characterId: daapi.getState().current.id }).spouseId })`

## Get Character Info
`daapi.getCharacter({ characterId: daapi.getState().current.id })`

## Revive Char
`daapi.updateCharacter({characterId:daapi.getState().current.id, character:{ isDead:false }})`
### Revive and play as previous char (usually)
`daapi.updateCharacter({characterId:daapi.getCharacter({ characterId: daapi.getState().current.id }).fatherId, character:{ isDead:false }}); daapi.setCurrentCharacter({ characterId: daapi.getCharacter({ characterId: daapi.getState().current.id }).fatherId })`

## Change Job
`daapi.updateCharacter({characterId:daapi.getState().current.id, character:{ job:'wetNurse', jobLevel: 25 }})`