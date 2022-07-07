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
    insulae: 4
  },
	dynasties: {
		Vipsanius_Agrippa: {
      id: 'Vipsanius_Agrippa',
      nomen: 'Vipsanius',
      cognomen: 'Agrippa',
      prestige: 150000,
      heritage: 'roman_plebian'
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
    'Marcus_Vipsanius_Agrippa_Father':{
      id: 'Marcus_Vipsanius_Agrippa_Father',
      dynastyId: 'Vipsanius_Agrippa',
      isAlive: true,
      isMale: true,
      praenomen: 'Gothicus',
      agnomen: '',
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
      dynastyId: 'Aurelius_Cotta',
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
      inheritance: 50000
		},
		'Marcus_Vipsanius_Agrippa': {
      id: 'Marcus_Vipsanius_Agrippa',
      dynastyId: 'Vipsanius_Agrippa',
      isAlive: true,
      isMale: true,
      praenomen: 'Marcus',
      agnomen: '',
      birthMonth: 3,
      birthYear: 690,
      job: null,
      jobLevel: 0,
      fatherId: 'Marcus_Vipsanius_Agrippa_Father',
      motherId: 'Aurelia_Mother',
      childrenIds: [],
      traits: ['strong', 'genius', 'honorable', 'erudite'],
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
