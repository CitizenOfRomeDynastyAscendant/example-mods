{
  checkType: 'householdCharacters',

  checkAndAct(characterId) {
    let character = daapi.getCharacter({ characterId: characterId })
    let state = daapi.getState()

    if (character.flagPlayScenarioModIsPompey && !daapi.getCharacterFlag({ characterId: characterId, flag: 'pompey_engagement_1_over' })) {
      // console.log(character) // debugging only

      let age = daapi.calculateAge({ month: character.birthMonth, year: character.birthYear })
      // console.log(age) // debugging only
      if (age > 20.5 && age < 21.5 &&
          !character.isDead &&
          (character.spouseId === null ||
          !state.characters[character.spouseId] ||
          state.characters[character.spouseId].isDead)) {

        let potentialSpouseID = daapi.generateCharacter({
          characterFeatures: {
            isDead: false,
            isMale: false,
            praenomen: 'Attica',
            agnomen: '',
            birthMonth: 3,
            birthYear: 648,
            job: null,
            jobLevel: 0,
            spouseId: null,
            fatherId: null,
            motherId: null,
            childrenIds: [],
            traits: ['oratorDeliberative', 'weak'],
            skills: {
              intelligence: Math.round(Math.random() * 10) + 4,
              stewardship: Math.round(Math.random() * 10) + 6,
              eloquence: Math.round(Math.random() * 10) + 8,
              combat: Math.round(Math.random() * 10)
            },
            look: {
              group: 'roman',
              type: 'blonde'
            },
            flagAssignedPersonalityTrait: false
          },
          dynastyFeatures: {
            id: 'Antistia',
            nomen: 'Antistia',
            cognomen: '',
            prestige: 40000,
            heritage: 'roman_plebian'
          }
        })
        let potentialSpouse = daapi.getCharacter({ characterId: potentialSpouseID })
        // console.log(potentialSpouse); // debugging only

        if (potentialSpouse) {

          let scalingFactor = daapi.calculateScaleByClassFactor()

          daapi.pushInteractionModalQueue({
            title: 'Marriage with Antistia',
            image: daapi.requireImage("/play_scenario/scenarios/marcus_vipsanius_agrippa/ruby_ring_optimized.svg"),
            message: `[c|${characterId}|${"Gnaeus Pompeius Magnus"}]` + ', Publius Antistius offers his daughter '
              + `[c|${potentialSpouse.id}|${"Antistia"}]` + '\'s hand in marriage. '
              + 'You may refuse, but it will leave a mark on you and your family\'s honour'
              + '\n What will you do?',

            options: [
              {
                text: 'I accept.',
                tooltip: 'This will be a feast to remember.',
                statChanges: {
                  cash: -6000 / scalingFactor,
                  prestige: +2000 / scalingFactor,
                  influence: +4000 / scalingFactor,
                  property: {
                    insulae: +1,
                    horse: +1
                  }
                },
                disabled: false,
                action: {
                  event: '/play_scenario/scenarios/gnaeus_pompeius_magnus/marriage_events/marry_antistia',
                  method: 'wedding',
                  context: { characterId: characterId, spouseId: potentialSpouse.id, isMatrilineal: false }
                }
              },
              {
                text: 'I won\'t marry her.',
                tooltip: 'Why should I?',
                statChanges: {
                  prestige: -500 / scalingFactor,
                  influence: -2000 / scalingFactor
                }
              }
            ]
          })

          daapi.setCharacterFlag({ characterId: characterId, flag: 'pompey_engagement_1_over', data: true })
          // console.log(daapi.getCharacterFlag({ characterId: characterId, flag: 'marcus_attica_engagement_over' })) // debugging only

          // daapi.performMarriage({ characterId: characterId, spouseId: potentialSpouse.id, isMatrilineal: false })

          // console.log(potentialSpouse); // debugging only
        }

        //console.log(characters)
      }
    }
  },

  methods: {
    wedding({ characterId, spouseId, isMatrilineal }) {
      daapi.performMarriage({ characterId, spouseId, isMatrilineal })
    }
  }
}
