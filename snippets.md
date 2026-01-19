# Example console commands / daapi snippets
You can run these either via the command console mod or in game dev tools (opened via the openDevTools mod), or by placing them in a `.js` file in your `mods` directory

## Get Character ID
### Current Character
```js
daapi.getState().current.id
```
### Spouse of Current Character
```js
daapi.getCharacter({ characterId: daapi.getState().current.id }).spouseId
```
### Children of Current Character
```js
daapi.getCharacter({ characterId: daapi.getState().current.id }).childrenIds[0]
```

Note: Children Ids start at `0` for 1st child, `1` for the 2nd and so on, like: 
```js
daapi.getCharacter({ characterId: daapi.getState().current.id }).childrenIds[1]
```
### Spouse of a specific Character ID
```js
daapi.getCharacter({ characterId: 'd9d2b5ae_e429_4956_bc58_02e4c38caea8' }).spouseId
```

## Get Character Info/Data
```js
daapi.getCharacter({ characterId: daapi.getState().current.id })
```

### With a specific Character ID
```js
daapi.getCharacter({ characterId: 'd9d2b5ae_e429_4956_bc58_02e4c38caea8' })
```

## Add/Remove Trait:
```js
daapi.addTrait({characterId:daapi.getState().current.id, trait: 'strong'})
```

```js
daapi.removeTrait({characterId:daapi.getState().current.id, trait: 'depression'})
```
### x10
```js
(function() { for(var i = 0; i < 10; i++) { daapi.addTrait({characterId:daapi.getState().current.id, trait: 'strong'}); } })()
````
### Spouse
```js
daapi.addTrait({ characterId: daapi.getCharacter({ characterId: daapi.getState().current.id }).spouseId, trait:'strong' })
```
### Children
```js
daapi.addTrait({ characterId: daapi.getCharacter({ characterId: daapi.getState().current.id }).childrenIds[0], trait: 'genius' })
```

## Impregnate
```js
daapi.impregnate({ characterId: daapi.getCharacter({ characterId: daapi.getState().current.id }).spouseId })
```

## Update Character Data
### Change Name
```js
daapi.updateCharacter({ characterId: daapi.getState().current.id, character: { praenomen: 'New Name' }})
```

### Set age as 20
```js
daapi.updateCharacter({ characterId: daapi.getState().current.id, character: { birthYear: daapi.getState().year - 20 }})
```

### Revive Character
```js
daapi.updateCharacter({characterId:daapi.getState().current.id, character:{ isDead:false }})
```
#### Revive and play as the father of the current character
```js
(()=>{daapi.updateCharacter({characterId:daapi.getCharacter({ characterId: daapi.getState().current.id }).fatherId, character:{ isDead:false }}); daapi.setCurrentCharacter({ characterId: daapi.getCharacter({ characterId: daapi.getState().current.id }).fatherId })})()
```

### Change Job
```js
daapi.updateCharacter({characterId:daapi.getState().current.id, character:{ job:'wetNurse', jobLevel: 25 }})
```

### Change look
```js
daapi.updateCharacter({ characterId:daapi.getState().current.id, character: { look: { group: 'roman', type: 'black' } } })
```

### Add parrifamilias' mother as a dependent
```js
daapi.updateCharacter({ characterId: daapi.getState().current.id, character: { dependantIds: [daapi.getCharacter({ characterId: daapi.getState().current.id }).motherId] } })
```

### Change Gender
#### <=v1.5.2
```js
daapi.updateCharacter({characterId:daapi.getState().current.id, character:{ isMale: false }})
```
#### >= v1.5.3
```js
daapi.updateCharacter({characterId:daapi.getState().current.id, character:{ gender: 'male' }})
```

`gender` here can be any string
#### Change whole household to "enby" (>= v1.5.3)
```js
daapi.getState().current.householdCharacterIds.forEach((characterId) => { daapi.updateCharacter({ characterId, character:{ gender:'enby', flagCanGetPregnant:true, flagCanImpregnate:true, flagCanHoldImperium:true } }) })
```

### Set Skills/Stats
```js
daapi.updateCharacter({ characterId: daapi.getState().current.id, character: { skills: { intelligence: 32 } } })
```

### Start Education
Note: These will enroll them in the appropriate education but won't charge you for it or display any indication of being educated. You will have to manually add/remove revenue modifiers and status indicators additionally if so desired
#### Ludus
```js
daapi.updateCharacter({characterId:daapi.getState().current.id, character:{ flagAttendingLudus: 'private', flagIsBusy: true, actions: {beginLudusEducation:{}, endLudusEducation:{}} }})
```
#### Grammaticus
```js
daapi.updateCharacter({characterId:daapi.getState().current.id, character:{ flagAttendingGrammaticus: 'renowned', flagIsBusy: true, actions: {beginGrammaticusEducation:{}, endGrammaticusEducation:{}} }})
```
#### Rhetor
```js
daapi.updateCharacter({characterId:daapi.getState().current.id, character:{ flagAttendingRhetor: 'judicial', flagIsBusy: true, actions: {beginRhetorEducation:{}, endRhetorEducation:{}} }})
```

Or similarly `flagAttendingRhetor: 'deliberative'`
#### Philosophy
```js
daapi.updateCharacter({characterId:daapi.getState().current.id, character:{ flagAttendingPhilosophy: 'renowned', flagIsBusy: true, flagIsAway: true, actions: {beginPhilosophyEducation:{}, endPhilosophyEducation:{}} }})
```

### Elect as consul
```js
daapi.updateCharacter({characterId: daapi.getState().current.id, character: { job: 'consul', jobLevel: 0, flagElectionWon: {post: 'consul', termEndMonth: 0, termEndYear: daapi.getState().year + 1}}})
```

### Skip giving inheritance
```js
daapi.updateCharacter({ characterId: '74d8fe17_3a2f_4a0c_9f9a_e3e1c6989e2d', character: { flagWasGivenInheritance: true } })
```

#### Have the heir inherit everything
```js 
(()=> { setInterval(() => { let state = daapi.getState(); state.current.householdCharacterIds.forEach((characterId)=>{ daapi.updateCharacter({ characterId, character: { flagWasGivenInheritance: (characterId!==state.current.flagDesignatedHeirId && characterId!==state.current.id) } }) }) }, 1000) })() 
```

### Move out
```js
daapi.updateCharacter({ characterId: '74d8fe17_3a2f_4a0c_9f9a_e3e1c6989e2d', character: { hasMovedOut: true, flagWasGivenInheritance: true } })
```

### Change spouse family nomen & cognomen
```js
(function() {  let nomen = 'New_Nomen'; let cognomen = 'New_Cognomen'; let state = daapi.getState(); let spouse = state.characters[state.characters[state.current.id].spouseId]; let genCharId = daapi.generateCharacter({ characterFeatures: {}, dynastyFeatures: { ...state.dynasties[spouse.dynastyId], nomen, cognomen } }); let newDynId = daapi.getCharacter({ characterId: genCharId }).dynastyId; daapi.updateCharacter({ characterId: spouse.id, character: {dynastyId: newDynId} }); daapi.kill({ characterId: genCharId }); })()
```

Replace `New_Nomen` & `New_Cognomen` in the first line with whichever new nomen & cognomen you desire

## Add cash
```js
daapi.displayInteractionModal({ title:'Money!', message: 'Here you go:', options: [{ text: 'Thanks!', statChanges: { cash: 500 }}]})
```

or from v1.5.0+

```js
daapi.addCash({ cash: 500 })
```

## Modifiers
### household_health
#### Lower Health to x0.1
```js
daapi.addModifier({ key: 'household_health', id: 'cancel_easy_mode', factor: 0.1 })
```
##### Remove the same
```js
daapi.removeModifier({ key: 'household_health', id: 'cancel_easy_mode' })
```

Note: You can skip the `id` parameter if you don't intend to `removeModifier` manually in the future
#### Increase Health for 13 months
```js
daapi.addModifier({ key: 'household_health', id: 'increase_for_13', factor: 1000, durationInMonths: 13 })
```

### Increase Current Character's Health
```js
daapi.addModifier({ key: 'character_health_' + daapi.getState().current.id, factor: 300 })
```
### Revenue
#### Multiplier
```js
daapi.addModifier({ key: 'revenue', factor: 10 })
```
#### Add Monthly
```js
daapi.addAdditiveModifier({ key: 'revenue', durationInMonths: 6, amount: 1000 })
```

## Clear Global and Character Action icons
### Clear Global Actions
```js
(function() { let actions = Object.keys(daapi.getState().current.actions || {}); for(var i = 0; i < actions.length; i++) { daapi.deleteGlobalAction({key:actions[i]}); } })()
```
### Clear Character Actions
```js
(function() { let householdCharacterIds = daapi.getState().current.householdCharacterIds; for(var i = 0; i < householdCharacterIds.length; i++) { daapi.updateCharacter({characterId:householdCharacterIds[i], character: {actions: false} }); } })()
```

## Change the date
```js
daapi.setDate({ month: 5, year: 750 })
```

## Add Google Translate
```js
(() => { let translateEl = document.createElement("div"); translateEl.id = 'googleTranslateElement'; translateEl.style.textAlign = 'center'; translateEl.style.marginBottom = '-50px'; document.getElementById('app').prepend(translateEl); window.googleTranslateElementInit = () => { new google.translate.TranslateElement({ pageLanguage: "en", layout: google.translate.TranslateElement.InlineLayout.VERTICAL }, "googleTranslateElement"); }; let script = document.createElement("script"); script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"; document.head.appendChild(script); let style = document.createElement("style"); style.innerHTML = ".modal, .container-main { padding-top: 50px !important; } #goog-gt-tt + div, body > .skiptranslate:first-child { display: none !important; } body { top: 0 !important; }"; document.head.appendChild(style); })()
```

