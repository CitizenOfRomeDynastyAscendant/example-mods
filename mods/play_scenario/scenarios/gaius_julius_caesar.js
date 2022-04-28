{
	title: 'Gaius Julius Caesar, Quintilis, 661 A.U.C',
  info: 'Start as the father of the (in)famous Julius Caesar (~8 years old on this date)',
  characterId: 'Gaius_Julius_Caesar_Father',
	date: {
		day: 14,
		month: 6,
		year: 661
	},
  cash: 250000,
  influence: 30000,
  property: {
    farmland: 25,
    vinyard: 20,
    latifundiumAnimal: 2
  },
	dynasties: {
		Julius_Caesar: {
      id: 'Julius_Caesar',
      nomen: 'Julius',
      cognomen: 'Caesar',
      prestige: 150000,
      heritage: 'roman_patrician'
		},
		Aurelius_Cotta: {
      id: 'Aurelius_Cotta',
      nomen: 'Aurelius',
      cognomen: 'Cotta',
      prestige: 100000,
      heritage: 'roman_novus_homo'
		}
	},
	characters: {
		'Gaius_Julius_Caesar_Father': {
      id: 'Gaius_Julius_Caesar_Father',
      dynastyId: 'Julius_Caesar',
      isAlive: true,
      isMale: true,
      praenomen: 'Gaius',
      agnomen: '',
      birthMonth: 3,
      birthYear: 613,
      job: 'senator',
      jobLevel: 0,
      spouseId: 'Aurelia_Mother',
      fatherId: null,
      motherId: null,
      childrenIds: ['Julia_Major', 'Julia_Minor', 'Gaius_Julius_Caesar'],
      traits: ['oratorDeliberative', 'formerMagistrate', 'formerMilitaryTribune', 'veteran', 'senator', 'formerQuaestor', 'formerPraetor', 'formerProPraetor'],
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
      inheritance: 0
		},
		'Aurelia_Mother': {
      id: 'Aurelia_Mother',
      dynastyId: 'Aurelius_Cotta',
      isAlive: true,
      isMale: false,
      praenomen: 'Aurelia',
      agnomen: '',
      birthMonth: 5,
      birthYear: 633,
      job: null,
      jobLevel: 0,
      spouseId: 'Gaius_Julius_Caesar_Father',
      fatherId: null,
      motherId: null,
      childrenIds: ['Julia_Major', 'Julia_Minor', 'Gaius_Julius_Caesar'],
      traits: [],
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
      inheritance: 50000
		},
		'Julia_Major': {
      id: 'Julia_Major',
      dynastyId: 'Julius_Caesar',
      isAlive: true,
      isMale: false,
      praenomen: 'Julia',
      agnomen: 'Major',
      birthMonth: 8,
      birthYear: 651,
      job: null,
      jobLevel: 0,
      spouseId: null,
      fatherId: 'Gaius_Julius_Caesar_Father',
      motherId: 'Aurelia_Mother',
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
        type: 'black'
      },
      inheritance: 0
		},
		'Julia_Minor': {
      id: 'Julia_Minor',
      dynastyId: 'Julius_Caesar',
      isAlive: true,
      isMale: false,
      praenomen: 'Julia',
      agnomen: 'Minor',
      birthMonth: 2,
      birthYear: 652,
      job: null,
      jobLevel: 0,
      spouseId: null,
      fatherId: 'Gaius_Julius_Caesar_Father',
      motherId: 'Aurelia_Mother',
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
        type: 'brown'
      },
      inheritance: 0
		},
		'Gaius_Julius_Caesar': {
      id: 'Gaius_Julius_Caesar',
      dynastyId: 'Julius_Caesar',
      isAlive: true,
      isMale: true,
      praenomen: 'Gaius',
      agnomen: '',
      birthMonth: 6,
      birthYear: 653,
      job: null,
      jobLevel: 0,
      spouseId: null,
      fatherId: 'Gaius_Julius_Caesar_Father',
      motherId: 'Aurelia_Mother',
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
        type: 'black'
      },
      inheritance: 0
		}
	}
}
