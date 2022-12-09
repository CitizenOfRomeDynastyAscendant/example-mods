{
  title: 'Marcus Antonius, 683 A.U.C',
  info: 'Start as Julia, the mother of the triumvir general Mark Antony, right after her husband\'s execution',
  characterId: 'Julia',
  date: {
    day: 14,
    month: 6,
    year: 683
  },
  cash: 2000,
  influence: 1000,
  property: {
    farmland: 15,
    vinyard: 10,
  },
  dynasties: {
    Antonius: {
      id: 'Antonius',
      nomen: 'Antonius',
      cognomen: '',
      prestige: 1500,
      heritage: 'roman_plebian'
    },
  },
  characters: {
    'Julia': {
      id: 'Julia',
      dynastyId: 'Antonius',
      isDead: false,
      gender: 'female',
      isMale: false,
      praenomen: 'Julia',
      agnomen: '',
      cognomen: 'Caesar',
      birthMonth: 3,
      birthYear: 650,
      job: null,
      jobLevel: 0,
      spouseId: 'Marcus_Antonius_Creticus',
      fatherId: null,
      motherId: null,
      childrenIds: ['Antonia', 'Mark_Antony', 'Gaius', 'Lucius'],
      traits: ['educated', 'stress'],
      skills: {
        intelligence: Math.round(Math.random() * 10) + 20,
        stewardship: Math.round(Math.random() * 10) + 20,
        eloquence: Math.round(Math.random() * 10) + 20,
        combat: Math.round(Math.random() * 10) + 20
      },
      look: {
        group: 'roman',
        type: 'black'
      },
      flagServedPraetor: true,
      inheritance: 0
    },
    'Marcus_Antonius_Creticus': {
      id: 'Marcus_Antonius_Creticus',
      dynastyId: 'Antonius',
      isDead: true,
      gender: 'male',
      isMale: true,
      praenomen: 'Marcus',
      agnomen: 'Creticus',
      birthMonth: 5,
      birthYear: 644,
      deathday: 1,
      deathMonth: 5,
      deathYear: 683,
      deathCause: 'executed',
      job: 'praetor',
      jobLevel: 0,
      spouseId: 'Julia',
      fatherId: null,
      motherId: null,
      childrenIds: ['Antonia', 'Mark_Antony', 'Gaius', 'Lucius'],
      traits: ['educated'],
      skills: {
        intelligence: Math.round(Math.random() * 10) + 10,
        stewardship: Math.round(Math.random() * 10) + 10,
        eloquence: Math.round(Math.random() * 10) + 10,
        combat: Math.round(Math.random() * 10) + 10
      },
      look: {
        group: 'roman',
        type: 'brown'
      },
      inheritance: 50000,
      flagServedPraetor: true,
    },
    'Antonia': {
      id: 'Antonia',
      dynastyId: 'Antonius',
      isDead: false,
      gender: 'female',
      isMale: false,
      praenomen: 'Antonia',
      agnomen: '',
      birthDay: 14,
      birthMonth: 1,
      birthYear: 670,
      job: null,
      jobLevel: 0,
      spouseId: null,
      fatherId: 'Marcus_Antonius_Creticus',
      motherId: 'Julia',
      childrenIds: [],
      traits: ['literate'],
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
      flagIsBusy: true,
      flagAttendingLudus: 'private',
      actions: {
        beginLudusEducation: {
          isAvailable: false
        },
        endLudusEducation: {
          isAvailable: false
        }
      },
      statuses: {}
    },
    'Mark_Antony': {
      id: 'Mark_Antony',
      dynastyId: 'Antonius',
      isDead: false,
      gender: 'male',
      isMale: true,
      praenomen: 'Marcus',
      agnomen: '',
      birthDay: 14,
      birthMonth: 1,
      birthYear: 671,
      job: null,
      jobLevel: 0,
      spouseId: null,
      fatherId: 'Marcus_Antonius_Creticus',
      motherId: 'Julia',
      childrenIds: [],
      traits: ['literate', 'rude', 'gregarious'],
      skills: {
        intelligence: Math.round(Math.random() * 10) + 10,
        stewardship: Math.round(Math.random() * 10) + 10,
        eloquence: Math.round(Math.random() * 10) + 10,
        combat: Math.round(Math.random() * 10) + 10
      },
      look: {
        group: 'roman',
        type: 'black'
      },
      inheritance: 0,
      flagIsBusy: true,
      flagAssignedPersonalityTrait: true,
      flagAttendingLudus: 'private',
      actions: {
        beginLudusEducation: {
          isAvailable: false
        },
        endLudusEducation: {
          isAvailable: false
        }
      },
      statuses: {}
    },
    'Gaius': {
      id: 'Gaius',
      dynastyId: 'Antonius',
      isDead: false,
      gender: 'male',
      isMale: true,
      praenomen: 'Gaius',
      agnomen: '',
      birthMonth: 1,
      birthYear: 672,
      job: null,
      jobLevel: 0,
      spouseId: null,
      fatherId: 'Marcus_Antonius_Creticus',
      motherId: 'Julia',
      childrenIds: [],
      traits: ['literate', 'rude', 'gregarious'],
      skills: {
        intelligence: Math.round(Math.random() * 10) + 10,
        stewardship: Math.round(Math.random() * 10) + 10,
        eloquence: Math.round(Math.random() * 10) + 10,
        combat: Math.round(Math.random() * 10) + 10
      },
      look: {
        group: 'roman',
        type: 'brown'
      },
      inheritance: 0,
      flagIsBusy: true,
      flagAssignedPersonalityTrait: true,
      flagAttendingLudus: 'private',
      actions: {
        beginLudusEducation: {
          isAvailable: false
        },
        endLudusEducation: {
          isAvailable: false
        }
      },
      statuses: {}
    },
    'Lucius': {
      id: 'Lucius',
      dynastyId: 'Antonius',
      isDead: false,
      gender: 'male',
      isMale: true,
      praenomen: 'Lucius',
      agnomen: '',
      birthMonth: 1,
      birthYear: 676,
      job: null,
      jobLevel: 0,
      spouseId: null,
      fatherId: 'Marcus_Antonius_Creticus',
      motherId: 'Julia',
      childrenIds: [],
      traits: ['literate', 'rude', 'gregarious'],
      skills: {
        intelligence: Math.round(Math.random() * 10) + 10,
        stewardship: Math.round(Math.random() * 10) + 10,
        eloquence: Math.round(Math.random() * 10) + 10,
        combat: Math.round(Math.random() * 10) + 10
      },
      look: {
        group: 'roman',
        type: 'brown_curly'
      },
      inheritance: 0,
      flagIsBusy: true,
      flagAssignedPersonalityTrait: true,
      flagAttendingLudus: 'private',
      actions: {
        beginLudusEducation: {
          isAvailable: false
        },
        endLudusEducation: {
          isAvailable: false
        }
      },
      statuses: {}
    },
  }
}

