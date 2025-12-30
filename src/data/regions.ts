export interface Region {
  id: string;
  name: string;
  shortName: string;
  multiplier: number;
  description: string;
  majorCities: string[];
}

export const regions: Region[] = [
  {
    id: 'london',
    name: 'Greater London',
    shortName: 'London',
    multiplier: 1.30,
    description: 'Premium pricing due to congestion, access restrictions, and demand',
    majorCities: ['Central London', 'City of London', 'Canary Wharf', 'Stratford'],
  },
  {
    id: 'south-east',
    name: 'South East England',
    shortName: 'South East',
    multiplier: 1.15,
    description: 'Above average due to proximity to London and high demand',
    majorCities: ['Brighton', 'Reading', 'Oxford', 'Southampton', 'Guildford'],
  },
  {
    id: 'south-west',
    name: 'South West England',
    shortName: 'South West',
    multiplier: 1.05,
    description: 'Slightly above baseline, tourist areas can be higher',
    majorCities: ['Bristol', 'Plymouth', 'Exeter', 'Bath', 'Bournemouth'],
  },
  {
    id: 'east',
    name: 'East of England',
    shortName: 'East',
    multiplier: 1.08,
    description: 'Moderately above baseline, Cambridge premium',
    majorCities: ['Cambridge', 'Norwich', 'Ipswich', 'Peterborough', 'Colchester'],
  },
  {
    id: 'midlands',
    name: 'Midlands',
    shortName: 'Midlands',
    multiplier: 1.00,
    description: 'Baseline pricing - good availability and competition',
    majorCities: ['Birmingham', 'Nottingham', 'Leicester', 'Coventry', 'Derby'],
  },
  {
    id: 'north-west',
    name: 'North West England',
    shortName: 'North West',
    multiplier: 0.95,
    description: 'Slightly below baseline, competitive market',
    majorCities: ['Manchester', 'Liverpool', 'Preston', 'Chester', 'Warrington'],
  },
  {
    id: 'yorkshire',
    name: 'Yorkshire & Humber',
    shortName: 'Yorkshire',
    multiplier: 0.95,
    description: 'Competitive pricing, good crane availability',
    majorCities: ['Leeds', 'Sheffield', 'York', 'Bradford', 'Hull'],
  },
  {
    id: 'north-east',
    name: 'North East England',
    shortName: 'North East',
    multiplier: 0.90,
    description: 'Below average pricing, industrial heritage',
    majorCities: ['Newcastle', 'Sunderland', 'Middlesbrough', 'Durham', 'Darlington'],
  },
  {
    id: 'scotland',
    name: 'Scotland',
    shortName: 'Scotland',
    multiplier: 0.95,
    description: 'Competitive, may vary for remote locations',
    majorCities: ['Glasgow', 'Edinburgh', 'Aberdeen', 'Dundee', 'Inverness'],
  },
  {
    id: 'wales',
    name: 'Wales',
    shortName: 'Wales',
    multiplier: 0.95,
    description: 'Competitive pricing, Cardiff slightly higher',
    majorCities: ['Cardiff', 'Swansea', 'Newport', 'Wrexham', 'Bangor'],
  },
  {
    id: 'northern-ireland',
    name: 'Northern Ireland',
    shortName: 'N. Ireland',
    multiplier: 0.92,
    description: 'Lower pricing, separate market dynamics',
    majorCities: ['Belfast', 'Derry', 'Lisburn', 'Newry', 'Bangor'],
  },
];

export const getRegionById = (id: string): Region | undefined => {
  return regions.find(region => region.id === id);
};

export const getRegionMultiplier = (regionId: string): number => {
  const region = getRegionById(regionId);
  return region?.multiplier || 1.0;
};

// Helper to format multiplier as percentage change
export const formatMultiplierChange = (multiplier: number): string => {
  if (multiplier === 1.0) return 'Baseline';
  const change = (multiplier - 1) * 100;
  const sign = change > 0 ? '+' : '';
  return `${sign}${change.toFixed(0)}%`;
};
