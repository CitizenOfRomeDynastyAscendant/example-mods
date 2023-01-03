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
      birthYear: 638,
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
    }
  }
}
