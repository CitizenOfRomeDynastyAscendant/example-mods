{
  title: 'Marcus Vipsanius Agrippa, 690 A.U.C',
  info: 'Start as Marcus, a Roman general, statesman, and architect who was a close friend, son-in-law, and lieutenant to the first Roman emperor Augustus',
  characterId: 'Marcus_Vipsanius_Agrippa',
  date: {
    day: 1,
    month: 4,
    year: 716
  },
  cash: 10000,
  influence: 10000,
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
    'Vipsanius_Agrippa': {
      id: 'Vipsanius_Agrippa',
      nomen: 'Vipsanius',
      cognomen: 'Agrippa',
      prestige: 1500,
      heritage: 'roman_plebian'
    },
    Aurelius_Mysticus: {
      id: 'Aurelius_Mysticus',
      nomen: 'Aurelius',
      cognomen: 'Mysticus',
      prestige: 100,
      heritage: 'roman_freedman'
    }
  },
  characters: {
    'Marcus_Vipsanius_Agrippa_Father': {
      id: 'Marcus_Vipsanius_Agrippa_Father',
      dynastyId: 'Vipsanius_Agrippa',
      isDead: true,
      isMale: true,
      praenomen: 'Lucius',
      agnomen: '',
      birthMonth: 11,
      birthYear: 664,
      deathMonth: 3,
      deathYear: 705,
      job: null,
      jobLevel: 0,
      spouseId: 'Aurelia_Mother',
      fatherId: null,
      motherId: null,
      childrenIds: ['Lucius_Vipsanius', 'Vipsania_Polla', 'Marcus_Vipsanius_Agrippa'],
      traits: ['veteran', 'oratorDeliberative'],
      skills: {
        intelligence: Math.round(Math.random() * 10) + 10,
        stewardship: Math.round(Math.random() * 10),
        eloquence: Math.round(Math.random() * 10),
        combat: Math.round(Math.random() * 10) + 7
      },
      inheritance: 0,
      flagAssignedPersonalityTrait: true
    },
    'Aurelia_Mother': {
      id: 'Aurelia_Mother',
      dynastyId: 'Aurelius_Mysticus',
      isDead: false,
      isMale: false,
      praenomen: 'Aurelia',
      agnomen: '',
      birthMonth: 9,
      birthYear: 669,
      job: 'physician',
      jobLevel: 6,
      spouseId: 'Marcus_Vipsanius_Agrippa_Father',
      fatherId: null,
      motherId: null,
      childrenIds: ['Lucius_Vipsanius', 'Vipsania_Polla', 'Marcus_Vipsanius_Agrippa'],
      traits: ['educated', 'illness', 'mystic'],
      skills: {
        intelligence: Math.round(Math.random() * 10) + 10,
        stewardship: Math.round(Math.random() * 10) + 10,
        eloquence: Math.round(Math.random() * 10) + 10,
        combat: Math.round(Math.random() * 10) + 10
      },
      look: {
        group: 'roman',
        type: 'auburn'
      },
      inheritance: 0,
      flagAssignedPersonalityTrait: true
    },
    'Marcus_Vipsanius_Agrippa': {
      id: 'Marcus_Vipsanius_Agrippa',
      dynastyId: 'Vipsanius_Agrippa',
      isDead: false,
      isMale: true,
      praenomen: 'Marcus',
      agnomen: '',
      cognomen: 'Agrippa',
      birthMonth: 1,
      birthYear: 690,
      job: null,
      jobLevel: 0,
      spouseId: null,
      fatherId: 'Marcus_Vipsanius_Agrippa_Father',
      motherId: 'Aurelia_Mother',
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
      flagPlayScenarioModIsMarcusAgrippa: true
    },
    'Vipsania_Polla': {
      id: 'Vipsania_Polla',
      dynastyId: 'Vipsanius_Agrippa',
      isDead: false,
      isMale: false,
      praenomen: 'Vipsania Polla',
      nomen: ' ',
      agnomen: '',
      cognomen: ' ',
      birthMonth: 2,
      birthYear: 684,
      job: null,
      jobLevel: 0,
      fatherId: 'Marcus_Vipsanius_Agrippa_Father',
      motherId: 'Aurelia_Mother',
      childrenIds: [],
      traits: ['oratorDeliberative', 'honorable'],
      skills: {
        intelligence: Math.round(Math.random() * 10) + 10,
        stewardship: Math.round(Math.random() * 10) + 5,
        eloquence: Math.round(Math.random() * 10) + 10,
        combat: Math.round(Math.random() * 10) + 5
      },
      look: {
        group: 'roman',
        type: 'black'
      },
      flagAssignedPersonalityTrait: true
    },
    'Lucius_Vipsanius': {
      id: 'Lucius_Vipsanius',
      dynastyId: 'Vipsanius_Agrippa',
      isDead: false,
      isMale: true,
      praenomen: 'Lucius',
      agnomen: '',
      birthMonth: 3,
      birthYear: 685,
      job: null,
      jobLevel: 0,
      fatherId: 'Marcus_Vipsanius_Agrippa_Father',
      motherId: 'Aurelia_Mother',
      childrenIds: [],
      traits: ['oratorJudicial'],
      skills: {
        intelligence: Math.round(Math.random() * 10) + 10,
        stewardship: Math.round(Math.random() * 10),
        eloquence: Math.round(Math.random() * 10),
        combat: Math.round(Math.random() * 10) + 10
      },
      look: {
        group: 'roman',
        type: 'black'
      },
      flagAssignedPersonalityTrait: false
    }
  }
}
