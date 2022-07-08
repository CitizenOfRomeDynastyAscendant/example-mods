{
	title: 'Marcus Vipsanius Agrippa, Quintilis, 690 A.U.C',
  info: 'Start as the father of Marcus, a Roman general, statesman, and architect who was a close friend, son-in-law, and lieutenant to the first Roman emperor Augustus',
  characterId: 'Marcus_Vipsanius_Agrippa_Father',
	date: {
		day: 14,
		month: 6,
		year: 696
	},
  cash: 3000,
  influence: 10000,
  property: {
    horse: 1,
    insulae: 4,
    tradeships: 2
  },
	dynasties: {
		'Vipsanius_ ': {
      id: 'Vipsanius_ ',
      nomen: 'Vipsanius',
      cognomen: ' ',
      prestige: 1500,
      heritage: 'roman_plebian'
		},
		Aurelius_Mysticus: {
      id: 'Aurelius_Mysticus',
      nomen: 'Aurelius',
      cognomen: 'Mysticus',
      prestige: 10000,
      heritage: 'roman_novus_homo'
		}
	},
	characters: {
    'Marcus_Vipsanius_Agrippa_Father': {
      id: 'Marcus_Vipsanius_Agrippa_Father',
      dynastyId: 'Vipsanius_ ',
      isAlive: true,
      isMale: true,
      praenomen: 'Lucius',
      agnomen: 'Major',
      birthMonth: 6,
      birthYear: 664,
      job: 'trader',
      jobLevel: 7,
      spouseId: 'Aurelia_Mother',
      fatherId: null,
      motherId: null,
      childrenIds: ['Marcus_Vipsanius_Agrippa'],
      traits: ['literate', 'veteran', 'gladiator', 'content', 'ace'],
      skills: {
        intelligence: Math.round(Math.random() * 10) + 10,
        stewardship: Math.round(Math.random() * 10),
        eloquence: Math.round(Math.random() * 10),
        combat: Math.round(Math.random() * 10) + 7
      },
      flagAssignedPersonalityTrait: true
    },
		'Aurelia_Mother': {
      id: 'Aurelia_Mother',
      dynastyId: 'Aurelius_Mysticus',
      isAlive: true,
      isMale: false,
      praenomen: 'Aurelia',
      agnomen: '',
      birthMonth: 9,
      birthYear: 669,
      job: 'physician',
      jobLevel: 1,
      spouseId: 'Marcus_Vipsanius_Agrippa_Father',
      fatherId: null,
      motherId: null,
      childrenIds: ['Marcus_Vipsanius_Agrippa'],
      traits: ['educated', 'illness', 'mystic'],
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
		'Marcus_Vipsanius_Agrippa': {
      id: 'Marcus_Vipsanius_Agrippa',
      dynastyId: 'Vipsanius_ ',
      isAlive: true,
      isMale: true,
      praenomen: 'Marcus',
      agnomen: '',
      cognomen: 'Agrippa',
      birthMonth: 3,
      birthYear: 690,
      job: null,
      jobLevel: 0,
      fatherId: 'Marcus_Vipsanius_Agrippa_Father',
      motherId: 'Aurelia_Mother',
      childrenIds: [],
      traits: ['genius', 'honorable', 'erudite'],
      skills: {
        intelligence: Math.round(Math.random() * 10) + 10,
        stewardship: Math.round(Math.random() * 10) + 10,
        eloquence: Math.round(Math.random() * 10) + 10,
        combat: Math.round(Math.random() * 10) + 5
      },
      look: {
        group: 'roman',
        type: 'black'
      },
      inheritance: 0,
      flagIsBusy: true,
      flagAttendingLudus: 'private',
      flagAssignedPersonalityTrait: true,
      actions: {
        beginLudusEducation: {
          isAvailable: false
        },
        endLudusEducation: {
          isAvailable: false
        }
      },
      statuses: {}
		}
  }
}
