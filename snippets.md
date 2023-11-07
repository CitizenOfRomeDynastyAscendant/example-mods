# Example console commands / daapi snippets
You can run these either via the command console mod or in game dev tools (opened via the openDevTools mod), or by placing them in a `.js` file in your `mods` directory

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

`daapi.removeTrait({characterId:daapi.getState().current.id, trait: 'depression'})`
### x10
`(function() { for(var i = 0; i < 10; i++) { daapi.addTrait({characterId:daapi.getState().current.id, trait: 'strong'}); } })()`
### Spouse
`daapi.addTrait({ characterId: daapi.getCharacter({ characterId: daapi.getState().current.id }).spouseId, trait:'strong' })`
### Children
`daapi.addTrait({ characterId: daapi.getCharacter({ characterId: daapi.getState().current.id }).childrenIds[0], trait: 'genius' })`

## Impregnate
`daapi.impregnate({ characterId: daapi.getCharacter({ characterId: daapi.getState().current.id }).spouseId })`

## Update Character Data
### Change Name
`daapi.updateCharacter({ characterId: daapi.getState().current.id, character: { praenomen: 'New Name' }})`

### Set age as 20
`daapi.updateCharacter({ characterId: daapi.getState().current.id, character: { birthYear: daapi.getState().year - 20 }})`

### Revive Char
`daapi.updateCharacter({characterId:daapi.getState().current.id, character:{ isDead:false }})`
#### Revive and play as previous char (usually)
`(()=>{daapi.updateCharacter({characterId:daapi.getCharacter({ characterId: daapi.getState().current.id }).fatherId, character:{ isDead:false }}); daapi.setCurrentCharacter({ characterId: daapi.getCharacter({ characterId: daapi.getState().current.id }).fatherId })})()`

### Change Job
`daapi.updateCharacter({characterId:daapi.getState().current.id, character:{ job:'wetNurse', jobLevel: 25 }})`

### Change look
`daapi.updateCharacter({ characterId:daapi.getState().current.id, character: { look: { group: 'roman', type: 'black' } } })`

### Add parrifamilias' mother as a dependent
`daapi.updateCharacter({ characterId: daapi.getState().current.id, character: { dependantIds: [daapi.getCharacter({ characterId: daapi.getState().current.id }).motherId] } })`

### Change Gender
#### <=v1.5.2
`daapi.updateCharacter({characterId:daapi.getState().current.id, character:{ isMale: false }})`
#### >= v1.5.3
`daapi.updateCharacter({characterId:daapi.getState().current.id, character:{ gender: 'male' }})`

`gender` here can be any string
#### Change whole household to "enby" (>= v1.5.3)
`daapi.getState().current.householdCharacterIds.forEach((characterId) => { daapi.updateCharacter({ characterId, character:{ gender:'enby', flagCanGetPregnant:true, flagCanImpregnate:true, flagCanHoldImperium:true } }) })`

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

### Elect as consul
`daapi.updateCharacter({characterId: daapi.getState().current.id, character: { job: 'consul', jobLevel: 0, flagElectionWon: {post: 'consul', termEndMonth: 0, termEndYear: daapi.getState().year + 1}}})`

### Change spouse family nomen & cognomen
`(function() {  let nomen = 'New_Nomen'; let cognomen = 'New_Cognomen'; let state = daapi.getState(); let spouse = state.characters[state.characters[state.current.id].spouseId]; let genCharId = daapi.generateCharacter({ characterFeatures: {}, dynastyFeatures: { ...state.dynasties[spouse.dynastyId], nomen, cognomen } }); let newDynId = daapi.getCharacter({ characterId: genCharId }).dynastyId; daapi.updateCharacter({ characterId: spouse.id, character: {dynastyId: newDynId} }); daapi.kill({ characterId: genCharId }); })()`

Replace `New_Nomen` & `New_Cognomen` in the first line with whichever new nomen & cognomen you desire

## Add cash
`daapi.displayInteractionModal({ title:'Money!', message: 'Here you go:', options: [{ text: 'Thanks!', statChanges: { cash: 500 }}]})`

or from v1.5.0+

`daapi.addCash({ cash: 500 })`

## Modifiers
### household_health
#### Lower Health to x0.1
`daapi.addModifier({ key: 'household_health', id: 'cancel_easy_mode', factor: 0.1 })`
##### Remove the same
`daapi.removeModifier({ key: 'household_health', id: 'cancel_easy_mode' })`

Note: You can skip the `id` parameter if you don't intend to `removeModifier` manually in the future
#### Increase Health for 13 months
`daapi.addModifier({ key: 'household_health', id: 'increase_for_13', factor: 1000, durationInMonths: 13 })`

### Increase Current Character's Health
`daapi.addModifier({ key: 'character_health_' + daapi.getState().current.id, factor: 300 })`
### Revenue
#### Multiplier
`daapi.addModifier({ key: 'revenue', factor: 10 })`
#### Add Monthly
`daapi.addAdditiveModifier({ key: 'revenue', durationInMonths: 6, amount: 1000 })`

## Clear Global and Character Action icons
### Clear Global Actions
`(function() { let actions = Object.keys(daapi.getState().current.actions || {}); for(var i = 0; i < actions.length; i++) { daapi.deleteGlobalAction({key:actions[i]}); } })()`
### Clear Character Actions
`(function() { let householdCharacterIds = daapi.getState().current.householdCharacterIds; for(var i = 0; i < householdCharacterIds.length; i++) { daapi.updateCharacter({characterId:householdCharacterIds[i], character: {actions: false} }); } })()`

## Change the date
`daapi.setDate({ month: 5, year: 750 })`

## Add Google Translate
`(() => { let translateEl = document.createElement("div"); translateEl.id = 'googleTranslateElement'; translateEl.style.textAlign = 'center'; translateEl.style.marginBottom = '-40px';  translateEl.style.padding = '5px'; document.getElementById('app').prepend(translateEl); window.googleTranslateElementInit = () => { new google.translate.TranslateElement({ pageLanguage: "en", layout: google.translate.TranslateElement.InlineLayout.SIMPLE }, "googleTranslateElement"); }; let script = document.createElement("script"); script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"; document.head.appendChild(script); let style = document.createElement("style"); style.innerHTML = ".modal, .container-main { padding-top: 50px !important; } #goog-gt-tt + div, body > .skiptranslate:first-child { display: none !important; } body { top: 0 !important; } .goog-te-gadget-simple { border: none !important; border-radius: 0.2em; } .dark-mode .goog-te-gadget-simple { opacity: 0.9; }"; document.head.appendChild(style); })()`
