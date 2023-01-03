{
  title: 'Gnaeus Pompeius Magnus, 648 A.U.C',
  info: 'Start as Gnaeus Pompeius Strabo, a Roman general, politician and father of Pompey the Great.',
  characterId: 'Gnaeus_Pompeius_Magnus_Father',
  date: {
    day: 1,
    month: 4,
    year: 658
  },
  cash: 10000,
  influence: 20000,
  property: {
    horse: 1,
    farmland: 2,
    vinyard: 3,
    insulae: 5,
    tradeships: 5,
    fishingBoat: 20,
    donkey: 30,
    pig: 30,
    cattle: 25,
    chicken: 25
  },
  dynasties: {
    'Pompeius_Strabo': {
      id: 'Pompeius_Strabo',
      nomen: 'Pompeius',
      cognomen: 'Strabo',
      prestige: 1500,
      heritage: 'roman_plebian'
    },
    // 'Mother_Gen': {
    //   id: 'Mother_Gen',
    //   nomen: 'Mother',
    //   cognomen: 'Gen',
    //   prestige: 1500,
    //   heritage: 'roman_plebian'
    // }
  },
  characters: {
    'Gnaeus_Pompeius_Magnus_Father': {
      id: 'Gnaeus_Pompeius_Magnus_Father',
      dynastyId: 'Pompeius_Strabo',
      isDead: false,
      gender: 'male',
      isMale: true,
      praenomen: 'Gnaeus',
      agnomen: '',
      birthMonth: 11,
      birthYear: 619,
      // deathMonth: 3,
      // deathYear: 667,
      job: null,
      jobLevel: 0,
      spouseId: null,
      fatherId: null,
      motherId: null,
      childrenIds: ['Gnaeus_Pompeius_Magnus'],
      traits: ['veteran', 'oratorDeliberative'],
      skills: {
        intelligence: Math.round(Math.random() * 10) + 10,
        stewardship: Math.round(Math.random() * 10),
        eloquence: Math.round(Math.random() * 10),
        combat: Math.round(Math.random() * 10) + 7
      },
      inheritance: 0,
      flagPlayScenarioModIsPompey: true,
      flagAssignedPersonalityTrait: true
    },
    // 'Gnaeus_Pompeius_Magnus_Mother': {
    //   id: 'Gnaeus_Pompeius_Magnus_Mother',
    //   dynastyId: 'Mother_Gen',
    //   // isDead: true,
    //   gender: 'female',
    //   isMale: false,
    //   praenomen: 'Mother',
    //   agnomen: '',
    //   birthMonth: 11,
    //   birthYear: 619,
    //   // deathMonth: 3,
    //   // deathYear: 667,
    //   job: null,
    //   jobLevel: 0,
    //   spouseId: 'Gnaeus_Pompeius_Magnus_Father',
    //   fatherId: null,
    //   motherId: null,
    //   childrenIds: ['Gnaeus_Pompeius_Magnus'],
    //   traits: ['veteran', 'oratorDeliberative'],
    //   skills: {
    //     intelligence: Math.round(Math.random() * 10) + 10,
    //     stewardship: Math.round(Math.random() * 10),
    //     eloquence: Math.round(Math.random() * 10),
    //     combat: Math.round(Math.random() * 10) + 7
    //   },
    //   inheritance: 0,
    //   flagAssignedPersonalityTrait: true
    // },
    'Gnaeus_Pompeius_Magnus': {
      id: 'Gnaeus_Pompeius_Magnus',
      dynastyId: 'Pompeius_Strabo',
      isDead: false,
      gender: 'male',
      isMale: true,
      praenomen: 'Gnaeus',
      agnomen: '',
      cognomen: 'Magnus',
      birthMonth: 1,
      birthYear: 638,//648
      job: null,
      jobLevel: 0,
      spouseId: null,
      fatherId: 'Gnaeus_Pompeius_Magnus_Father',
      motherId: null,
      childrenIds: [],
      traits: ['genius', 'erudite', 'oratorJudicial', 'philosopher', 'honorable', 'formerPlebianTribune', 'formerPraetor'],
      skills: {
        intelligence: Math.round(Math.random() * 10) + 20,
        stewardship: Math.round(Math.random() * 10) + 10,
        eloquence: Math.round(Math.random() * 10) + 15,
        combat: Math.round(Math.random() * 10) + 10
      },
      look: {
        group: 'roman',
        type: 'black'
      },
      flagAssignedPersonalityTrait: true,
      flagPlayScenarioModIsPompey:true,
      flagPompey:true,
      SpouseData: [
        {
          time:20,
          characterFeatures: {
            isDead: false,
            isMale: false,
            praenomen: 'Antistia',
            agnomen: '',
            birthMonth: 3,
            birthYear: 638,
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
            nomen: '',
            cognomen: '',
            prestige: 40000,
            heritage: 'roman_plebian'
          }
        },
        {
          time:24,
          characterFeatures: {
            isDead: false,
            isMale: false,
            praenomen: 'Aemilia',
            agnomen: '',
            birthMonth: 3,
            birthYear: 652,
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
            id: 'Aemilia',
            nomen: '',
            cognomen: 'Scaura',
            prestige: 40000,
            heritage: 'roman_patrician'
          }
        },
        {
          time:27,//675
          characterFeatures: {
            isDead: false,
            isMale: false,
            praenomen: 'Mucia',
            agnomen: '',
            birthMonth: 3,
            birthYear: 659,
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
            id: 'Mucia',
            nomen: '',
            cognomen: 'Tertia',
            prestige: 40000,
            heritage: 'roman_patrician'
          }
        },
        {
          time:47,
          characterFeatures: {
            isDead: false,
            isMale: false,
            praenomen: 'Julia',
            agnomen: '',
            birthMonth: 3,
            birthYear: 678,
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
            id: 'Julia',
            nomen: '',
            cognomen: 'Caesares ',
            prestige: 40000,
            heritage: 'roman_patrician'
          }
        },
        {
          time:54,//702//age:54
          characterFeatures: {
            isDead: false,
            isMale: false,
            praenomen: 'Cornelia',
            agnomen: '',
            birthMonth: 3,
            birthYear: 681,
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
            id: 'Cornelia',
            nomen: 'Cornelia',
            cognomen: 'Metella',
            prestige: 40000,
            heritage: 'roman_patrician'
          }
        }
      ]
    }
  }
}
