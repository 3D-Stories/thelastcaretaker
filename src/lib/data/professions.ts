import type { Profession } from '$lib/types';

export const professions: Profession[] = [
	// Engineer
	{
		name: 'Maintenance Engineer', category: 'Engineer', tier: 'T1',
		physicalReqs: { weight: 0, height: 0, lifeExp: 0, strength: 71, intellect: 0 },
		traitReqs: { adaptability: 0, creativity: 0, communication: 0, discipline: 5, empathy: 0, focus: 4, leadership: 0, logic: 3, patience: 0, wisdom: 0 }
	},
	{
		name: 'Systems Engineer', category: 'Engineer', tier: 'T2',
		physicalReqs: { weight: 0, height: 0, lifeExp: 0, strength: 70, intellect: 0 },
		traitReqs: { adaptability: 0, creativity: 0, communication: 0, discipline: 10, empathy: 0, focus: 10, leadership: 0, logic: 10, patience: 0, wisdom: 0 }
	},
	{
		name: 'Energy Engineer', category: 'Engineer', tier: 'T3',
		physicalReqs: { weight: 0, height: 0, lifeExp: 0, strength: 120, intellect: 0 },
		traitReqs: { adaptability: 0, creativity: 0, communication: 0, discipline: 30, empathy: 0, focus: 30, leadership: 0, logic: 30, patience: 0, wisdom: 0 }
	},
	{
		name: 'Quantum Engineer', category: 'Engineer', tier: 'T4',
		physicalReqs: { weight: 0, height: 0, lifeExp: 0, strength: 181, intellect: 0 },
		traitReqs: { adaptability: 0, creativity: 0, communication: 0, discipline: 61, empathy: 0, focus: 80, leadership: 0, logic: 80, patience: 0, wisdom: 0 }
	},

	// Arts & Culture
	{
		name: 'Visual Technician', category: 'Arts & Culture', tier: 'T1',
		physicalReqs: { weight: 0, height: 0, lifeExp: 50, strength: 0, intellect: 0 },
		traitReqs: { adaptability: 0, creativity: 5, communication: 4, discipline: 0, empathy: 3, focus: 0, leadership: 0, logic: 0, patience: 0, wisdom: 0 }
	},
	{
		name: 'Sculptor', category: 'Arts & Culture', tier: 'T2',
		physicalReqs: { weight: 0, height: 0, lifeExp: 80, strength: 0, intellect: 0 },
		traitReqs: { adaptability: 0, creativity: 20, communication: 10, discipline: 0, empathy: 15, focus: 0, leadership: 0, logic: 0, patience: 0, wisdom: 0 }
	},
	{
		name: 'Cultural Archivist', category: 'Arts & Culture', tier: 'T3',
		physicalReqs: { weight: 0, height: 0, lifeExp: 140, strength: 0, intellect: 0 },
		traitReqs: { adaptability: 0, creativity: 45, communication: 35, discipline: 0, empathy: 40, focus: 0, leadership: 0, logic: 0, patience: 0, wisdom: 0 }
	},
	{
		name: 'Existential Expressionist', category: 'Arts & Culture', tier: 'T4',
		physicalReqs: { weight: 0, height: 0, lifeExp: 200, strength: 0, intellect: 0 },
		traitReqs: { adaptability: 0, creativity: 120, communication: 60, discipline: 0, empathy: 80, focus: 0, leadership: 0, logic: 0, patience: 0, wisdom: 0 }
	},

	// Educator
	{
		name: 'Manual Holder', category: 'Educator', tier: 'T1',
		physicalReqs: { weight: 40, height: 100, lifeExp: 0, strength: 0, intellect: 0 },
		traitReqs: { adaptability: 0, creativity: 0, communication: 5, discipline: 0, empathy: 0, focus: 0, leadership: 0, logic: 0, patience: 10, wisdom: 10 }
	},
	{
		name: 'Teacher', category: 'Educator', tier: 'T2',
		physicalReqs: { weight: 60, height: 160, lifeExp: 0, strength: 0, intellect: 0 },
		traitReqs: { adaptability: 0, creativity: 0, communication: 15, discipline: 0, empathy: 0, focus: 0, leadership: 0, logic: 0, patience: 15, wisdom: 10 }
	},
	{
		name: 'Professor', category: 'Educator', tier: 'T3',
		physicalReqs: { weight: 90, height: 180, lifeExp: 0, strength: 0, intellect: 0 },
		traitReqs: { adaptability: 0, creativity: 0, communication: 20, discipline: 0, empathy: 0, focus: 0, leadership: 0, logic: 0, patience: 30, wisdom: 60 }
	},
	{
		name: 'Existential Chancellor', category: 'Educator', tier: 'T4',
		physicalReqs: { weight: 48, height: 200, lifeExp: 0, strength: 0, intellect: 0 },
		traitReqs: { adaptability: 0, creativity: 0, communication: 100, discipline: 0, empathy: 0, focus: 0, leadership: 0, logic: 0, patience: 80, wisdom: 120 }
	},

	// Agriculture
	{
		name: 'Nutrient Handler', category: 'Agriculture', tier: 'T1',
		physicalReqs: { weight: 0, height: 160, lifeExp: 50, strength: 0, intellect: 0 },
		traitReqs: { adaptability: 0, creativity: 5, communication: 0, discipline: 0, empathy: 0, focus: 0, leadership: 5, logic: 0, patience: 5, wisdom: 0 }
	},
	{
		name: 'Growth Specialist', category: 'Agriculture', tier: 'T2',
		physicalReqs: { weight: 0, height: 180, lifeExp: 60, strength: 0, intellect: 0 },
		traitReqs: { adaptability: 0, creativity: 20, communication: 0, discipline: 0, empathy: 0, focus: 0, leadership: 10, logic: 0, patience: 15, wisdom: 0 }
	},
	{
		name: 'Biosphere Director', category: 'Agriculture', tier: 'T3',
		physicalReqs: { weight: 0, height: 190, lifeExp: 120, strength: 0, intellect: 0 },
		traitReqs: { adaptability: 0, creativity: 35, communication: 0, discipline: 0, empathy: 0, focus: 0, leadership: 30, logic: 0, patience: 40, wisdom: 0 }
	},
	{
		name: 'Sustenance Architect', category: 'Agriculture', tier: 'T4',
		physicalReqs: { weight: 0, height: 200, lifeExp: 180, strength: 0, intellect: 0 },
		traitReqs: { adaptability: 0, creativity: 50, communication: 0, discipline: 0, empathy: 0, focus: 0, leadership: 50, logic: 0, patience: 50, wisdom: 0 }
	},

	// Logistics
	{
		name: 'Basic Supplier', category: 'Logistics', tier: 'T1',
		physicalReqs: { weight: 0, height: 100, lifeExp: 0, strength: 0, intellect: 0 },
		traitReqs: { adaptability: 0, creativity: 0, communication: 0, discipline: 3, empathy: 0, focus: 4, leadership: 0, logic: 2, patience: 0, wisdom: 0 }
	},
	{
		name: 'Distributor', category: 'Logistics', tier: 'T2',
		physicalReqs: { weight: 0, height: 160, lifeExp: 0, strength: 0, intellect: 0 },
		traitReqs: { adaptability: 0, creativity: 0, communication: 0, discipline: 12, empathy: 0, focus: 15, leadership: 0, logic: 10, patience: 0, wisdom: 0 }
	},
	{
		name: 'Resource Director', category: 'Logistics', tier: 'T3',
		physicalReqs: { weight: 0, height: 190, lifeExp: 0, strength: 0, intellect: 0 },
		traitReqs: { adaptability: 0, creativity: 0, communication: 0, discipline: 35, empathy: 0, focus: 40, leadership: 0, logic: 30, patience: 0, wisdom: 0 }
	},
	{
		name: 'Logistics High Command', category: 'Logistics', tier: 'T4',
		physicalReqs: { weight: 0, height: 220, lifeExp: 0, strength: 0, intellect: 0 },
		traitReqs: { adaptability: 0, creativity: 0, communication: 0, discipline: 82, empathy: 0, focus: 100, leadership: 0, logic: 120, patience: 0, wisdom: 0 }
	},

	// Military
	{
		name: 'Door Jammer', category: 'Military', tier: 'T1',
		physicalReqs: { weight: 0, height: 0, lifeExp: 0, strength: 60, intellect: 0 },
		traitReqs: { adaptability: 0, creativity: 0, communication: 0, discipline: 2, empathy: 0, focus: 2, leadership: 5, logic: 0, patience: 0, wisdom: 0 }
	},
	{
		name: 'Guard', category: 'Military', tier: 'T2',
		physicalReqs: { weight: 0, height: 0, lifeExp: 0, strength: 120, intellect: 0 },
		traitReqs: { adaptability: 0, creativity: 0, communication: 0, discipline: 15, empathy: 0, focus: 12, leadership: 10, logic: 0, patience: 0, wisdom: 0 }
	},
	{
		name: 'Station Protector', category: 'Military', tier: 'T3',
		physicalReqs: { weight: 0, height: 180, lifeExp: 0, strength: 130, intellect: 0 },
		traitReqs: { adaptability: 0, creativity: 0, communication: 0, discipline: 40, empathy: 0, focus: 35, leadership: 30, logic: 0, patience: 0, wisdom: 0 }
	},
	{
		name: 'Guardian of Humanity', category: 'Military', tier: 'T4',
		physicalReqs: { weight: 0, height: 200, lifeExp: 0, strength: 200, intellect: 0 },
		traitReqs: { adaptability: 0, creativity: 0, communication: 0, discipline: 100, empathy: 0, focus: 120, leadership: 80, logic: 0, patience: 0, wisdom: 0 }
	},

	// Science
	{
		name: 'Lab Technician', category: 'Science', tier: 'T1',
		physicalReqs: { weight: 0, height: 0, lifeExp: 0, strength: 0, intellect: 80 },
		traitReqs: { adaptability: 0, creativity: 0, communication: 0, discipline: 0, empathy: 0, focus: 0, leadership: 0, logic: 5, patience: 5, wisdom: 3 }
	},
	{
		name: 'Field Research Scientist', category: 'Science', tier: 'T2',
		physicalReqs: { weight: 0, height: 0, lifeExp: 0, strength: 0, intellect: 110 },
		traitReqs: { adaptability: 0, creativity: 0, communication: 0, discipline: 0, empathy: 0, focus: 0, leadership: 0, logic: 9, patience: 10, wisdom: 9 }
	},
	{
		name: 'Theoretical Scientist', category: 'Science', tier: 'T3',
		physicalReqs: { weight: 0, height: 0, lifeExp: 0, strength: 0, intellect: 170 },
		traitReqs: { adaptability: 0, creativity: 0, communication: 0, discipline: 0, empathy: 0, focus: 0, leadership: 0, logic: 25, patience: 30, wisdom: 40 }
	},
	{
		name: 'Quantum Physicist', category: 'Science', tier: 'T4',
		physicalReqs: { weight: 0, height: 0, lifeExp: 0, strength: 0, intellect: 221 },
		traitReqs: { adaptability: 0, creativity: 0, communication: 0, discipline: 0, empathy: 0, focus: 0, leadership: 0, logic: 120, patience: 80, wisdom: 100 }
	},

	// Healthcare
	{
		name: 'Health Assistant', category: 'Healthcare', tier: 'T1',
		physicalReqs: { weight: 50, height: 0, lifeExp: 0, strength: 0, intellect: 0 },
		traitReqs: { adaptability: 0, creativity: 0, communication: 0, discipline: 0, empathy: 5, focus: 0, leadership: 0, logic: 0, patience: 5, wisdom: 3 }
	},
	{
		name: 'Doctor', category: 'Healthcare', tier: 'T2',
		physicalReqs: { weight: 80, height: 0, lifeExp: 0, strength: 0, intellect: 0 },
		traitReqs: { adaptability: 0, creativity: 0, communication: 0, discipline: 0, empathy: 15, focus: 0, leadership: 0, logic: 0, patience: 12, wisdom: 10 }
	},
	{
		name: 'Neuro Specialist', category: 'Healthcare', tier: 'T3',
		physicalReqs: { weight: 120, height: 0, lifeExp: 0, strength: 0, intellect: 0 },
		traitReqs: { adaptability: 0, creativity: 0, communication: 0, discipline: 0, empathy: 40, focus: 0, leadership: 0, logic: 0, patience: 35, wisdom: 30 }
	},
	{
		name: 'Neural Architect', category: 'Healthcare', tier: 'T4',
		physicalReqs: { weight: 200, height: 0, lifeExp: 0, strength: 0, intellect: 0 },
		traitReqs: { adaptability: 0, creativity: 0, communication: 0, discipline: 0, empathy: 100, focus: 0, leadership: 0, logic: 0, patience: 80, wisdom: 120 }
	},

	// Leadership
	{
		name: 'Room Supervisor', category: 'Leadership', tier: 'T1',
		physicalReqs: { weight: 0, height: 0, lifeExp: 40, strength: 0, intellect: 0 },
		traitReqs: { adaptability: 0, creativity: 0, communication: 4, discipline: 0, empathy: 3, focus: 0, leadership: 5, logic: 0, patience: 0, wisdom: 0 }
	},
	{
		name: 'Station Quartermaster', category: 'Leadership', tier: 'T2',
		physicalReqs: { weight: 0, height: 0, lifeExp: 70, strength: 0, intellect: 0 },
		traitReqs: { adaptability: 0, creativity: 0, communication: 10, discipline: 0, empathy: 10, focus: 0, leadership: 15, logic: 0, patience: 0, wisdom: 0 }
	},
	{
		name: 'Settlement Governor', category: 'Leadership', tier: 'T3',
		physicalReqs: { weight: 0, height: 0, lifeExp: 100, strength: 0, intellect: 0 },
		traitReqs: { adaptability: 0, creativity: 0, communication: 35, discipline: 0, empathy: 30, focus: 0, leadership: 40, logic: 0, patience: 0, wisdom: 0 }
	},
	{
		name: 'Colonel of Humanity', category: 'Leadership', tier: 'T4',
		physicalReqs: { weight: 0, height: 0, lifeExp: 220, strength: 0, intellect: 0 },
		traitReqs: { adaptability: 0, creativity: 0, communication: 100, discipline: 0, empathy: 80, focus: 0, leadership: 120, logic: 0, patience: 0, wisdom: 0 }
	},

	// Explorer
	{
		name: 'Station Roamer', category: 'Explorer', tier: 'T1',
		physicalReqs: { weight: 0, height: 0, lifeExp: 20, strength: 60, intellect: 0 },
		traitReqs: { adaptability: 1, creativity: 2, communication: 0, discipline: 0, empathy: 0, focus: 5, leadership: 0, logic: 0, patience: 0, wisdom: 0 }
	},
	{
		name: 'Star Analyzer', category: 'Explorer', tier: 'T2',
		physicalReqs: { weight: 0, height: 0, lifeExp: 60, strength: 100, intellect: 0 },
		traitReqs: { adaptability: 15, creativity: 20, communication: 0, discipline: 0, empathy: 0, focus: 10, leadership: 0, logic: 0, patience: 0, wisdom: 0 }
	},
	{
		name: 'Mission Seeker', category: 'Explorer', tier: 'T3',
		physicalReqs: { weight: 0, height: 0, lifeExp: 90, strength: 100, intellect: 0 },
		traitReqs: { adaptability: 40, creativity: 36, communication: 0, discipline: 0, empathy: 0, focus: 30, leadership: 0, logic: 0, patience: 0, wisdom: 0 }
	},
	{
		name: 'Frontier Explorer', category: 'Explorer', tier: 'T4',
		physicalReqs: { weight: 0, height: 0, lifeExp: 140, strength: 120, intellect: 0 },
		traitReqs: { adaptability: 100, creativity: 80, communication: 0, discipline: 0, empathy: 0, focus: 120, leadership: 0, logic: 0, patience: 0, wisdom: 0 }
	}
];

export const professionCategories = [
	'Engineer',
	'Arts & Culture',
	'Educator',
	'Agriculture',
	'Logistics',
	'Military',
	'Science',
	'Healthcare',
	'Leadership',
	'Explorer'
] as const;
