## Install instructions

Extract and place the whole folder intact for each individual mod you want in your mods directory

On Desktop versions of the game, it loads mods from your `~/documents/CitizenOfRomeDynastyAscendant/mods` directory, creating the same if it does not exist upon game start

On iOS, it's the app's `Documents/CitizenOfRomeDynastyAscendant/mods` directory to which you can upload via the Files app or iTunes

On Android, it uses the `/CitizenOfRomeDynastyAscendant/mods` directory in the app's storage, which would usually be located at `Interal Storage/Android/net.rangergo.rome/`

It displays the exact path for mods in the Settings screen after you enable mods once

Requires v1.4.0+

**Note**: The paths and folder names need to be right for the mods to work. 
A common gotcha is creating a new folder when unzipping mods, please ensure you extract them directly into your `mods` folder without creating a new folder/directory.
For example, the path should look like `/CitizenOfRomeDynastyAscendant/mods/command_console/main.js` for the `command_console` mod.

Modding Support
===============

The game supports mods as of v1.4.0 across all available platforms including Windows, Linux, Mac OSX, Android and iOS.

To use mods you'll need to enable Mods in your Settings in-game

On Desktop versions of the game, it loads mods from your `~/documents/CitizenOfRomeDynastyAscendant/mods` directory, creating the same if it does not exist upon first enabling mods

On iOS, it's the app's `Documents/CitizenOfRomeDynastyAscendant/mods` directory to which you can upload via iTunes or via the Files app

On Android, if external storage/sdcard is available, it uses the `/CitizenOfRomeDynastyAscendant/mods` directory there, else it uses the same path in the app's private files directory

The game displays the exact path for mods in the Settings screen after you enable mods once

To use a mod, simply place its whole folder intact inside `/CitizenOfRomeDynastyAscendant/mods/` and restart the game and move a month forward

To disable a mod rename it's folder to include `.disabled` or simply delete it

Mod Showcase
------------

We showcase mods on our [Discord](https://discord.gg/ZVkxjC5), but here's an incomplete list:

[github.com/CitizenOfRomeDynastyAscendant/example-mods](https://github.com/CitizenOfRomeDynastyAscendant/example-mods) -- Contains a set of example mods\
Download the zip file from the [Releases section](https://github.com/CitizenOfRomeDynastyAscendant/example-mods/releases) for any mod you'd like to use and extract it as is in your mods directory

- Give For Adoption -- Allows you to give children up for adoption
- No More Kids -- Prevents the whole household from having more children via a toggleable button
- New Dynasty? -- Allows you to branch off your current household with a new nomen, cognomen and heritage
- Divorce -- Force any pair of characters in household to Divorce
- Play As -- Play as an other character (women included)

### Mods by others:
+ [Bank of Rome and other mods by peritiSumus](https://github.com/peritiSumus/CoR-Mods)
+ [Sandbox Hard mode by @narvin](https://github.com/narvin42/CORmods)
+ [Only Living Descendants & other mods by @maydayp](https://github.com/kstruggles/CORmods)
+ [Change Theme and other mods by @Prahlad](https://github.com/prahlad-swarnkar/CORmods/releases)

Mod file structure
------------------

The game uses JavaScript (VueJS + VueX + custom stuff) that is run in a browser-like environment internally, and so mods are written with JavaScript and in the format detailed below
```
~/documents/CitizenOfRomeDynastyAscendant/mods/
  modName/
    assets/
      style.css
      eventImage1.svg
      ...
    events/
      event1Name.js
      ...
    monthly.js
    yearly.js
```
Note that while this is a recommended structure, the game's modding API is permissive and works with other structures as well. The only keyword file names are that of `monthly.js` and `yearly.js`. Both files are themselves optional, as is `style.css` and any other assets

`monthly.js` and `yearly.js` should contain a single JavaScript array each containing a list of events to be executed every month and every year respectively, and the events should be listed with their full path and without the `.js` extension like so:

```
['/modName/events/event1Name', '/modName/events/event2Name']
```

`style.css` and any other `.css` files found will be included directly into the game's UI

In each events js file you should use the following structure

```
{

  checkType, // String - one of 'general' (passes no args & runs `checkAndAct` once per month/year based on if the event is in monthly/yearly.js) | 'householdCharacters' | 'currentAndFormerHouseholdCharacters' | 'allCharacters' | 'nonHouseholdCharacters' (all 4 run `checkAndAct` once per each applicable character and pass `characterId` as the first argument, and `chunkFactor`),

  checkAndAct(characterId, { chunkFactor }) { // The arguments may or may not be passed based on `checkType` - see above. If `chunkFactor` is passed, you'll want to multiply your probabilities by it as the particular character may only be checked once every `chunkFactor` months/years for performance reasons
    if (/* Conditions for the event to run */) {
       /* Set up and run the event */
    }
  },

  methods: {
    method1(args) { .... },
    method2(args) { .... },
    .....
  }
}
```

Kindly download and look this [set of example mods](https://github.com/CitizenOfRomeDynastyAscendant/example-mods/tree/master/mods)

# daapi
-----

An API object containing various methods is exposed globally via the `window.daapi` object\
The following are the methods available:


## `addTrait({ characterId, trait })`
  Adds given trait to character. The `trait` is a string keyword like 'strong' or 'brilliant'


## `removeTrait({ characterId, trait })`

## `addModifier({ key, id, durationInMonths, factor })`
  Adds a multiplier of `factor` for given number of months.
  `key`: should contain a keyword like 'property_sheep' or 'household_fertility' or 'household_health'
  `id`: String. An id you can use to remove the modifier, etc

## `addAdditiveModifier({ key, id, durationInMonths, amount, householdCharacterId })`
  Adds an additive modifier, typically used with a `key` of 'revenue' for recurring monthly costs like education

## `removeModifier({ key, id })`

## `removeAdditiveModifier({ key, id })`

## `calculateModifier({ key })`

## `calculateAdditiveModifier({ key })`
  Calculates the current cumulative modifier in effect for `key`

## `calculateAge({ month, year, toMonth, toYear, day, toDay })`
  If the `to` parameters are not passed, it calculates the age of the character at the current game date

## `calculateBaseSkill({ characterId, skillName })`
  Returns a Floating point integer with the character's base skill
  `skillName` is a string keyword which is one of 'intelligence' | 'stewardship' | 'eloquence' | 'combat'

## `calculateCurrentProperty()`
  Returns the total value of the currently held property - Float

## `calculateCurrentRevenue()`

## `calculateEffectiveHouseholdStewardhsip()`

## `calculateEffectiveMaxCashHolding()`

## `calculateCurrentClass()`

## `calculateScaleByClassFactor()`
  Returns the automatic cost scaling factor. Divide your cash, influence and prestige `statChanges` to not apply this scaling factor

## `calculateCharacterJobRevenue`
   ```
  ({
    characterId,
    job,
    jobLevel,
    excludeTemporaryGlobals
  })
  ```

## `calculateCharacterJobModifierFactor` 
  ```
  ({
    characterId,
    job,
    excludeTemporaryGlobals
  })
  ```

## `getState()`
  Returns an object containing the entire game state data
  See https://gist.github.com/CitizenOfRome/ce79290468e44afef17f9d53a2786853 for an example of what this looks like

## `getCharacter({ characterId })`
  Returns an object containing character data

## `getJobsForCharacter({ characterId })`
  Returns an array containing all valid/available jobs for a given character

## `generateCharacter` 
  ```
  ({
    characterFeatures: {
      gender: String, // >= v1.5.3 - supports any given string; defaults: 'male' & 'female'
      isMale: Boolean, // <= v1.5.2
      praenomen,
      agnomen,
      birthMonth: Number (0-12),
      birthYear,
      spouseId,
      childrenIds: Array,
      traits: Array,
      jobLevel: Number,
      job,
      skills: {
        intelligence,
        stewardship,
        eloquence,
        combat
      },
      flagIsImmortal: Boolean, // >= v1.5.3 (can still die via events, etc)
      flagCanGetPregnant: Boolean, // >= v1.5.3
      flagCanImpregnate: Boolean, // >= v1.5.3
      flagCannotMarry: Boolean, // >= v1.5.3
      flagCanHoldImperium: Boolean // >= v1.5.3 (allows full ludi, war & election participation)
    },
    dynastyFeatures: {
      nomen,
      cognomen,
      prestige,
      heritage:'roman_plebian'|'roman_freedman'|'roman_patrician'|'roman_novus_homo'
    }
  })
  ```
  Generates a new character and returns the character ID.
  All fields are optional and can be skipped for the game to use default/random values

## `marryRandom({ characterId, isMatrilineal })`
  Generates a new character, marries them to the given characterId and returns the ID of the newly generated spouse character

## `performMarriage({ characterId, spouseId, isMatrilineal })`
  Performs a marriage between the characters with the given IDs

## `impregnate({ characterId, fatherId })`

## `invokeMethod({ event, method, context })`
  Executes a `method` listed in the `methods` object of the selected `event`.
  `event` is the full path to your event like '/modName/events/event1Name'
  `context` is passed down as the sole argument for your method, usually you would like to pass down things like the characterId and any other relevant context like so `context: {characterId: characterId}`

## `pushInteractionModalQueue` | `pushInteractionModalButtonQueue` | `displayInteractionModal` | `updateInteractionModal` 
  ```
  ({
    title,
    message,
    image: Base64 Image String,
    onHidden: { event, method, context },
    inputs: [
      {
        type: HTML Input type,
        title,
        value,
        onChange: { event, method, context } or Function - called on change,
        onRandomize: { event, method, context } or Function - Called when the randomize button is pressed
      }
    ],
    dropdowns: [
      {
        title,
        description,
        selected: Index of the default option,
        options: [{
          icon,
          label
        }],
        onChange: { event, method, context } or Function - called on change
      }
    ],
    options: [
      {
        text,
        tooltip,
        icons: Array of Base64 Image Strings,
        statChanges: {
          cash,
          prestige,
          influence,
          property: {
            propertyName: +/- Integer
          },
          modifiers: [],
          removeModifiers: [],
          additiveModifiers: [],
          removeAdditiveModifiers: []
        },
        disabled: Boolean,
        showDisabledWithTooltip: Boolean,
        action: { event, method, context }
      }
    ]
  })
  ```
  Adds a new popup/event modal to be displayed to the player
  This is the primary mode of interaction within the game
  `pushInteractionModalButtonQueue` adds a button like we have for festivals rather than displaying it directly
  `modifiers` follow the same structure as their methods above
  `disabled` - hides the option if true is passed here (use a condition)
  `showDisabledWithTooltip` if this is set to `true` and `disabled` is also true, it shows the option button with the `tooltip` but it remains disabled/un-tappable

## `processInteractionModalQueue()`

## `playSound(sound)`
  Plays the sound located in your mod at `sound`
  Use the full path with extension like '/modName/assets/sound1.flac'

## `requireImage(image)`
  Returns a base64 string of an image located in your mod at `image`
  Use the full path with extension like '/modName/assets/icon1.svg'
  Use this method for the image and icons sections in interactionModal above

## `setGlobalFlag({ flag, data })`
  Set a global flag with the given data

## `getGlobalFlag({ flag })`
  Returns the value of the previously set global flag

## `setCharacterFlag({ characterId, flag, data })`

## `getCharacterFlag({ characterId, flag })`

## `addCharacterAction` 
  ```
  ({
    characterId,
    key,
    action: {
      title,
      icon,
      isAvailable: true,
      hideWhenBusy: true,
      process: { event, method, context }
    }
  })
  ```
  Add a character action button like we have for education, marriage, etc
  `process` is run when the button is clicked/tapped

## `setCharacterActionAvailability({ characterId, key, isAvailable })`
  Set the `isAvailable` tag to true/false to show/hide the button respectively

## `deleteCharacterAction({ characterId, key })`
  Removes the character action

## `addGlobalAction` 
  ```
  ({
    key,
    action: {
      title,
      icon,
      isAvailable: true,
      process: { event, method, context }
    }
  })
  ```
  Add a global action button
  `process` is run when the button is clicked/tapped

## `setGlobalActionAvailability({ key, isAvailable })`
  Set the `isAvailable` tag to true/false to show/hide the button respectively

## `deleteGlobalAction({ key })`
  Removes the action

## `addCharacterStatus` 
  ```
  ({
    characterId,
    key,
    status: {
      title,
      icon,
      active: true
    }
  })
  ```
  Add a character status icon like we show on the character's image when they're being educated, etc

## `setCharacterStatusActive({ characterId, key, isActive })`
  Set the `active` tag to true/false to show/hide the status respectively

## `deleteCharacterStatus({ characterId, key })`
  Removes the character status

## `kill({ characterId, deathCause })`
  Kills a character

## `updateCharacter` 
  ```
  ({
    characterId,
    character: {
      gender: String, // >= v1.5.3 defaults: 'male' | 'female'
      isMale: Boolean,
      praenomen,
      agnomen,
      birthMonth: Number (0-12),
      birthYear,
      spouseId,
      childrenIds: Array,
      traits: Array,
      jobLevel: Number,
      job,
      skills: {
        intelligence,
        stewardship,
        eloquence,
        combat
      },
      look: {
        isDAAPI: true/false,
        group: 'roman',
        type: 'auburn' | 'black' | 'blonde' | 'brown' | 'brown_curly',
        ageStage: 'baby' | 'teen' | 'adult' | 'old',
        gender: 'male' | 'female' | '<any other gender icons defined via addCharacterLook>'
      },      
      flagIsImmortal: Boolean, // >= v1.5.3 (can still die via events, etc)
      flagCanGetPregnant: Boolean, // >= v1.5.3
      flagCanImpregnate: Boolean, // >= v1.5.3
      flagCannotMarry: Boolean, // >= v1.5.3
      flagCanHoldImperium: Boolean // >= v1.5.3 (allows full ludi, war & election participation)
    }
  })
  ```
  Updates a character. Skip parts to retain previous values in character

## `forceUpdateCharacterDisplay({ characterId })`
  Force the character display to be updated

## `setCurrentCharacter({ characterId })`
  Switch player character

## `addCharacterLook` 
  ```
  ({
     group: String,
     types: {
        typeName1: {
           male: {
             baby: daapi.requireImage(url),
             teen,
             adult,
             old
          },
          female,
          <any other gender>
        }
     }
  })
  ```
    Define a new character look | Use with  isDAAPI: true in updateCharacter - look

## `getCharacterIcon({ group, gender, type, ageStage })`

## `startWar()`
## `endWar()`
## `joinWar({ characterId })`
## `leaveWar({ characterId })`

## `setDate({ day, month, year })`

## `addCash({ cash })`
  Increases the current character's money by `cash` amount

## `addInfluence({ influence })`
  Adds `influence` amount to the current character's personal influence

## `addPrestige({ prestige })`
  Adds `prestige` to the current character's dynasty prestige

## `openDevTools()`
  Opens Dev Tools Console (Desktop editions only)

## `closeDevTools()`
  Closes Dev Tools Console (Desktop editions only)


# Useful Keywords
---------------

## Modifiers

```
property_<property_name>
revenue
household_fertility
character_fertility_<characterId>
household_health
character_health_<characterId>
household_expenses
character_expenses_<characterId>
household_stewardship
character_stewardship_<characterId>
```

## Additive Modifiers

```
revenue
influence
prestige
```

## Traits

```
[
  "literate",
  "educated",
  "oratorDeliberative",
  "oratorJudicial",
  "philosopher",
  "horseRider",
  "charioteer",
  "gladiator",
  "wrestler",
  "veteran",
  "novusHomo",
  "strong",
  "weak",
  "dwarf",
  "giant",
  "attractive",
  "ugly",
  "deformed",
  "accidentDeformed",
  "dimwit",
  "genius",
  "stress",
  "highlyStress",
  "depression",
  "cripplingDepression",
  "illness",
  "malnourished",
  "extremelyMalnourished",
  "fat",
  "morbidlyFat",
  "mangled",
  "severelyMangled",
  "stutter",
  "mute",
  "deaf",
  "blind",
  "wounded",
  "greviouslyWounded",
  "alcoholic",
  "oneHand",
  "noThumb",
  "oneLeg",
  "noHand",
  "noLeg",
  "disfigured",
  "oneEyed",
  "faunnic",
  "sapphic",
  "achillean",
  "ace",
  "effeminatus",
  "tribas", 
  "taurian",
  "fisherMan",
  "marksMan",
  "formerMagistrate",
  "formerMilitaryTribune",
  "formerPlebianTribune",
  "formerQuaestor",
  "formerProQuaestor",
  "formerAedile",
  "formerProAedile",
  "formerPraetor",
  "formerProPraetor",
  "formerConsul",
  "formerProConsul",
  "formerCensor",
  "formerAugures",
  "formerEpulones",
  "formerFlamens",
  "formerPontifexMaximus",
  "formerQuindecimviri",
  "formerVestalVirgin",
  "senator",
  "authoritative",
  "greedy",
  "shy",
  "erudite",
  "fashionable",
  "stubborn",
  "rude",
  "honorable",
  "competitive",
  "charitable",
  "sly",
  "trusting",
  "paranoid",
  "gregarious",
  "ambitious",
  "content",
  "lunatic",
  "mystic",
  "coronaCastrensis",
  "coronaCivica",
  "coronaObsidimalis",
  "coronaTriumphalis",
  "coronaMuralis",
  "coronaRostrata",
  "coronaNavalis",
  "disqualifiedLudi",
  "deserter",
  "barredFromSenate"
]
```

## Properties

```
[
  "farmland",
  "vinyard",
  "orchard",
  "primeFarmland",
  "primeVinyard",
  "primeOrchard",
  "latifundiumFood",
  "latifundiumAnimal",
  "latifundiumFish",
  "latifundiumOil",
  "insulae",
  "fishingBoat",
  "tradeships",
  "seafaringTradeships",
  "horse",
  "donkey",
  "pig",
  "goat",
  "sheep",
  "cattle",
  "duck",
  "chicken"
]
```

## Jobs

```
[
  "farmer",
  "performer",
  "blacksmith",
  "cobbler",
  "jeweller",
  "painter",
  "figurePainter",
  "weaver",
  "trader",
  "physician",
  "litterator",
  "grammaticus",
  "rhetor",
  "philosophyTutor",
  "judge",
  "lawyer",
  "scribe",
  "haruspex",
  "labourer",
  "clerk",
  "shepherd",
  "carpenter",
  "stoneMason",
  "secretary",
  "barber",
  "victimarii",
  "bestiarius",
  "wetNurse",
  "apparitorClerk",
  "apparitorScribe",
  "apparitorLictor",
  "apparitorHerald",
  "vigintisexviri",
  "quaestor",
  "proQuaestor",
  "aedile",
  "praetor",
  "proPraetor",
  "consul",
  "proConsul",
  "censor",
  "equiteService",
  "militaryTribune",
  "plebianTribune",
  "pontifexMaximus",
  "augures",
  "quindecimviri",
  "epulones",
  "flamens",
  "vestalVirgins"
]
```

Kindly reach out via our [Discord](https://discord.gg/ZVkxjC5) for any help

The information shared here, Modding API, tools and examples are made available under [this license](https://github.com/CitizenOfRomeDynastyAscendant/example-mods/blob/master/license)
