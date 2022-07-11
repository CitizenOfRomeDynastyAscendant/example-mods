{
  checkType: 'householdCharacters',

  checkAndAct(characterId) {
    let character = daapi.getCharacter({ characterId: characterId })
    let state = daapi.getState()

    if (character.flagPlayScenarioModIsMarcusAgrippa && !daapi.getCharacterFlag({ characterId: characterId, flag: 'marcus_attica_engagement_over' })) {
      // console.log(character) // debugging only

      let age = daapi.calculateAge({ month: character.birthMonth, year: character.birthYear })
      // console.log(age) // debugging only
      if (age > 25.5 && age < 26.5 &&
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
            birthYear: 695,
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
            id: 'Pomponius_Atticus',
            nomen: 'Pomponius',
            cognomen: 'Atticus',
            prestige: 80000,
            heritage: 'roman_novus_homo'
          }
        })
        let potentialSpouse = daapi.getCharacter({ characterId: potentialSpouseID })
        // console.log(potentialSpouse); // debugging only

        if (potentialSpouse) {

          let scalingFactor = daapi.calculateScaleByClassFactor()

          daapi.pushInteractionModalQueue({
            title: 'Marriage with Attica',
            message: `[c|${characterId}|${"Marcus Vipsanius Agrippa"}]` + ', the wedding with your Fiance, '
              + `[c|${potentialSpouse.id}|${"Attica"}]` + ' is neigh. '
              + 'You may refuse, but it will leave a mark on you and your family\'s honour'
              + '\n What will you do?',

            options: [
              {
                text: 'Marry your Fiance',
                tooltip: 'Do it!',
                statChanges: {
                  cash: -5000 / scalingFactor,
                  prestige: +2000 / scalingFactor,
                  influence: +4000 / scalingFactor,
                  property: {
                    insulae: +1
                  }
                },
                disabled: false,
                action: {
                  event: '/play_scenario/scenarios/marcus_vipsanius_agrippa/marry_attica',
                  method: 'wedding',
                  context: { characterId: characterId, spouseId: potentialSpouse.id, isMatrilineal: false }
                }
              },
              {
                text: 'I won\'t marry her.',
                tooltip: 'Who cares about an agreement?',
                statChanges: {
                  prestige: -500 / scalingFactor,
                  influence: -2000 / scalingFactor
                }
              }
            ]
          })

          daapi.setCharacterFlag({ characterId: characterId, flag: 'marcus_attica_engagement_over', data: true })
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
