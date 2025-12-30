export interface CraneType {
  id: string;
  name: string;
  shortName: string;
  description: string;
  tonnageRanges: TonnageRange[];
  bestFor: string[];
  considerations: string[];
}

export interface TonnageRange {
  min: number;
  max: number;
  label: string;
  dailyRateMin: number;
  dailyRateMax: number;
  weeklyRateMin?: number;
  weeklyRateMax?: number;
}

export const craneTypes: CraneType[] = [
  {
    id: 'city',
    name: 'City Crane',
    shortName: 'City',
    description: 'Compact mobile cranes ideal for urban sites with restricted access',
    tonnageRanges: [
      { min: 13, max: 25, label: '13-25t', dailyRateMin: 400, dailyRateMax: 500 },
      { min: 25, max: 50, label: '25-50t', dailyRateMin: 500, dailyRateMax: 650 }
    ],
    bestFor: ['Urban construction sites', 'Tight access locations', 'Residential projects', 'Quick setup jobs'],
    considerations: ['Limited lifting capacity', 'Shorter reach than larger cranes']
  },
  {
    id: 'mobile',
    name: 'Mobile Crane',
    shortName: 'Mobile',
    description: 'Versatile wheeled cranes that can travel on roads between sites',
    tonnageRanges: [
      { min: 20, max: 35, label: '20-35t', dailyRateMin: 550, dailyRateMax: 750 },
      { min: 35, max: 50, label: '35-50t', dailyRateMin: 700, dailyRateMax: 900 },
      { min: 50, max: 80, label: '50-80t', dailyRateMin: 850, dailyRateMax: 1200 },
      { min: 80, max: 100, label: '80-100t', dailyRateMin: 1100, dailyRateMax: 1500 }
    ],
    bestFor: ['General construction', 'Industrial lifts', 'Infrastructure projects', 'Multiple site visits'],
    considerations: ['Requires firm ground', 'Outriggers need space', 'Road travel possible']
  },
  {
    id: 'all-terrain',
    name: 'All-Terrain Crane',
    shortName: 'All-Terrain',
    description: 'Heavy-duty cranes with all-wheel drive for challenging ground conditions',
    tonnageRanges: [
      { min: 35, max: 60, label: '35-60t', dailyRateMin: 800, dailyRateMax: 1100 },
      { min: 60, max: 100, label: '60-100t', dailyRateMin: 1000, dailyRateMax: 1500 },
      { min: 100, max: 160, label: '100-160t', dailyRateMin: 1400, dailyRateMax: 2000 },
      { min: 160, max: 220, label: '160-220t', dailyRateMin: 1800, dailyRateMax: 2500 }
    ],
    bestFor: ['Rough terrain sites', 'Windfarm installations', 'Heavy industrial lifts', 'Remote locations'],
    considerations: ['Higher transport costs', 'May need escort vehicles', 'Premium pricing']
  },
  {
    id: 'crawler',
    name: 'Crawler Crane',
    shortName: 'Crawler',
    description: 'Track-mounted cranes for heavy lifts on soft or uneven ground',
    tonnageRanges: [
      { min: 50, max: 100, label: '50-100t', dailyRateMin: 1000, dailyRateMax: 1500 },
      { min: 100, max: 200, label: '100-200t', dailyRateMin: 1400, dailyRateMax: 2200 },
      { min: 200, max: 400, label: '200-400t', dailyRateMin: 2000, dailyRateMax: 3500 },
      { min: 400, max: 750, label: '400-750t', dailyRateMin: 3500, dailyRateMax: 6000 }
    ],
    bestFor: ['Soft ground conditions', 'Long-term projects', 'Very heavy lifts', 'Power station work'],
    considerations: ['Cannot travel on roads', 'Requires transport to site', 'Longer setup time']
  },
  {
    id: 'tower',
    name: 'Tower Crane',
    shortName: 'Tower',
    description: 'Fixed cranes for long-term construction projects with high lifting needs',
    tonnageRanges: [
      { min: 4, max: 8, label: '4-8t', dailyRateMin: 350, dailyRateMax: 500, weeklyRateMin: 2000, weeklyRateMax: 2800 },
      { min: 8, max: 12, label: '8-12t', dailyRateMin: 450, dailyRateMax: 650, weeklyRateMin: 2500, weeklyRateMax: 3500 },
      { min: 12, max: 20, label: '12-20t', dailyRateMin: 550, dailyRateMax: 800, weeklyRateMin: 3000, weeklyRateMax: 4500 }
    ],
    bestFor: ['High-rise construction', 'Long-term projects', 'Repetitive lifting', 'City centre sites'],
    considerations: ['Installation required', 'Minimum hire periods', 'Planning permissions may apply']
  },
  {
    id: 'hiab',
    name: 'HIAB / Truck-Mounted',
    shortName: 'HIAB',
    description: 'Lorry-mounted cranes for delivery and unloading operations',
    tonnageRanges: [
      { min: 3, max: 10, label: '3-10t', dailyRateMin: 280, dailyRateMax: 400 },
      { min: 10, max: 20, label: '10-20t', dailyRateMin: 380, dailyRateMax: 550 },
      { min: 20, max: 35, label: '20-35t', dailyRateMin: 500, dailyRateMax: 700 }
    ],
    bestFor: ['Material deliveries', 'Machinery placement', 'Quick lifts', 'Haulage with lifting'],
    considerations: ['Limited reach', 'Combined with transport', 'Self-drive options available']
  },
  {
    id: 'spider',
    name: 'Spider Crane',
    shortName: 'Spider',
    description: 'Compact tracked cranes for indoor and restricted access work',
    tonnageRanges: [
      { min: 1, max: 3, label: '1-3t', dailyRateMin: 350, dailyRateMax: 500 },
      { min: 3, max: 6, label: '3-6t', dailyRateMin: 450, dailyRateMax: 650 },
      { min: 6, max: 10, label: '6-10t', dailyRateMin: 600, dailyRateMax: 850 }
    ],
    bestFor: ['Indoor work', 'Glass installation', 'Atriums', 'Restricted access'],
    considerations: ['Limited capacity', 'Specialist operator often required']
  }
];

export const getCraneById = (id: string): CraneType | undefined => {
  return craneTypes.find(crane => crane.id === id);
};

export const getTonnageOptions = (craneId: string): TonnageRange[] => {
  const crane = getCraneById(craneId);
  return crane?.tonnageRanges || [];
};
