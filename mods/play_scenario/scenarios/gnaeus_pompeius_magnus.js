{
  title: 'Gnaeus Pompeius Magnus, 658 A.U.C',
  info: 'Start as Gnaeus Pompeius Strabo, a Roman general, politician and father of Pompey the Great.',
  characterId: 'Gnaeus_Pompeius_Magnus_Father',
  date: {
    day: 1,
    month: 4,
    year: 658
  },
  cash: 100000,
  influence: 20000,
  property: {
    horse: 5,
    farmland: 20,
    vinyard: 30,
    orchard: 25,
    fishingBoat: 10,
    donkey: 80,
    sheep: 80,
    goat: 80,
    pig: 40,
    cattle: 40,
    chicken: 25,
  },
  dynasties: {
    'Pompeius_Strabo': {
      id: 'Pompeius_Strabo',
      prestige: 1500,
      nomen:'Pompeius',
      heritage: 'roman_plebian'
    },
  },
  characters: {
    'Gnaeus_Pompeius_Magnus_Father': {
      id: 'Gnaeus_Pompeius_Magnus_Father',
      dynastyId: 'Pompeius_Strabo',
      isDead: false,
      gender: 'male',
      isMale: true,
      praenomen: 'Gnaeus',
      cognomen: 'Strabo',
      agnomen: '',
      birthMonth: 11,
      birthYear: 619,
      job: null,
      jobLevel: 0,
      spouseId: null,
      fatherId: null,
      motherId: null,
      childrenIds: ['Gnaeus_Pompeius_Magnus','Pompeia'],
      traits: ['veteran','sly', 'oratorDeliberative','formerMilitaryTribune',],
      skills: {
        intelligence: Math.round(Math.random() * 10) + 10,
        stewardship: Math.round(Math.random() * 10)+ 15,
        eloquence: Math.round(Math.random() * 10),
        combat: Math.round(Math.random() * 10) + 7
      },
      inheritance: 0,
      flagPlayScenarioModIsPompey: true,
      flagPlayScenarioModPompeyIsFather:true,
      flagAssignedPersonalityTrait: true
    },

    "Pompeia":{
      id: 'Gnaeus_Pompeius_Magnus',
      dynastyId: 'Pompeius_Strabo',
      isDead: false,
      gender: 'female',
      isMale: false,
      praenomen: 'Pompeia',
      agnomen: '',
      cognomen: 'Strabonia',
      birthMonth: 1,
      birthYear: 641,//648
      job: null,
      jobLevel: 0,
      spouseId: null,
      fatherId: 'Gnaeus_Pompeius_Magnus_Father',
      motherId: null,
      childrenIds: [],
      traits: ['genius', 'erudite'],
      skills: {
        intelligence: Math.round(Math.random() * 10) + 20,
        stewardship: Math.round(Math.random() * 10) + 10,
        eloquence: Math.round(Math.random() * 10) + 15,
        combat: Math.round(Math.random() * 10) + 10
      },
      look: {
        group: 'roman',
        type: 'auburn'
      },
      flagAssignedPersonalityTrait: true,
      flagPlayScenarioModPompeyIsFather:false,
      flagPlayScenarioModIsPompey:true,
    },

    'Gnaeus_Pompeius_Magnus': {
      id: 'Gnaeus_Pompeius_Magnus',
      dynastyId: 'Pompeius_Strabo',
      isDead: false,
      gender: 'male',
      isMale: true,
      praenomen: 'Gnaeus',
      nomen: 'Pompeius',
      agnomen: '',
      cognomen: 'Magnus',
      birthMonth: 1,
      birthYear: 648,//648
      job: null,
      jobLevel: 0,
      spouseId: null,
      fatherId: 'Gnaeus_Pompeius_Magnus_Father',
      motherId: null,
      childrenIds: [],
      traits:  ['trusting','ambitious','erudite',],
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
      flagPlayScenarioModPompeyIsFather:false,
      flagPlayScenarioModIsPompey:true,
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
      ]
    }
  }
}
