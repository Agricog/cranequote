import { craneTypes, getCraneById } from './craneTypes';
import { getRegionMultiplier } from './regions';

// Contract lift multiplier (includes operator, supervision, insurance, planning)
export const CONTRACT_LIFT_MULTIPLIER = {
  min: 1.8,
  max: 2.2,
  typical: 2.0,
};

// Transport cost configuration
export interface TransportCostConfig {
  baseCost: { min: number; max: number };
  perMile: { min: number; max: number };
  escortRequired: boolean;
  escortCost: { min: number; max: number };
}

export const transportCosts: Record<string, TransportCostConfig> = {
  small: {
    // Under 50t
    baseCost: { min: 100, max: 200 },
    perMile: { min: 2, max: 3 },
    escortRequired: false,
    escortCost: { min: 0, max: 0 },
  },
  medium: {
    // 50-100t
    baseCost: { min: 200, max: 350 },
    perMile: { min: 3, max: 5 },
    escortRequired: false,
    escortCost: { min: 0, max: 0 },
  },
  large: {
    // 100-200t
    baseCost: { min: 350, max: 500 },
    perMile: { min: 5, max: 8 },
    escortRequired: true,
    escortCost: { min: 200, max: 400 },
  },
  heavy: {
    // 200t+
    baseCost: { min: 500, max: 800 },
    perMile: { min: 8, max: 12 },
    escortRequired: true,
    escortCost: { min: 400, max: 700 },
  },
};

// Ancillary costs
export const ancillaryCosts = {
  permit: {
    roadClosure: { min: 100, max: 250 },
    councilPermit: { min: 50, max: 150 },
    airspace: { min: 150, max: 300 },
  },
  crew: {
    operator: { hourly: { min: 25, max: 50 }, daily: { min: 200, max: 400 } },
    slinger: { hourly: { min: 20, max: 35 }, daily: { min: 160, max: 280 } },
    banksman: { hourly: { min: 18, max: 30 }, daily: { min: 140, max: 240 } },
  },
  insurance: {
    daily: { min: 50, max: 150 },
  },
  setup: {
    small: { min: 100, max: 200 },
    medium: { min: 150, max: 300 },
    large: { min: 200, max: 400 },
    heavy: { min: 300, max: 600 },
  },
};

// Calculation functions
export interface HireCostResult {
  baseDailyRate: { min: number; max: number };
  regionalAdjusted: { min: number; max: number };
  contractLiftRate?: { min: number; max: number };
  totalForDuration: { min: number; max: number };
  perDay: { min: number; max: number };
  savings?: { weekly: number; monthly: number };
}

export const calculateHireCost = (
  craneTypeId: string,
  tonnageLabel: string,
  durationDays: number,
  regionId: string,
  isContractLift: boolean = false
): HireCostResult | null => {
  const crane = getCraneById(craneTypeId);
  if (!crane) return null;

  const tonnageRange = crane.tonnageRanges.find(t => t.label === tonnageLabel);
  if (!tonnageRange) return null;

  const regionMultiplier = getRegionMultiplier(regionId);

  // Base daily rate
  const baseDailyRate = {
    min: tonnageRange.dailyRateMin,
    max: tonnageRange.dailyRateMax,
  };

  // Apply regional multiplier
  const regionalAdjusted = {
    min: Math.round(baseDailyRate.min * regionMultiplier),
    max: Math.round(baseDailyRate.max * regionMultiplier),
  };

  // Apply contract lift multiplier if applicable
  let effectiveRate = regionalAdjusted;
  let contractLiftRate;
  
  if (isContractLift) {
    contractLiftRate = {
      min: Math.round(regionalAdjusted.min * CONTRACT_LIFT_MULTIPLIER.min),
      max: Math.round(regionalAdjusted.max * CONTRACT_LIFT_MULTIPLIER.max),
    };
    effectiveRate = contractLiftRate;
  }

  // Calculate duration discount for weekly rates
  let durationMultiplier = 1.0;
  if (durationDays >= 5 && durationDays < 20) {
    durationMultiplier = 0.9; // 10% discount for weekly
  } else if (durationDays >= 20) {
    durationMultiplier = 0.8; // 20% discount for monthly
  }

  const totalForDuration = {
    min: Math.round(effectiveRate.min * durationDays * durationMultiplier),
    max: Math.round(effectiveRate.max * durationDays * durationMultiplier),
  };

  const perDay = {
    min: Math.round(totalForDuration.min / durationDays),
    max: Math.round(totalForDuration.max / durationDays),
  };

  // Calculate potential savings
  const weeklyTotal = effectiveRate.min * 5 * 0.9;
  const dailyForWeek = effectiveRate.min * 5;
  const weeklySavings = Math.round(dailyForWeek - weeklyTotal);

  const monthlyTotal = effectiveRate.min * 20 * 0.8;
  const dailyForMonth = effectiveRate.min * 20;
  const monthlySavings = Math.round(dailyForMonth - monthlyTotal);

  return {
    baseDailyRate,
    regionalAdjusted,
    contractLiftRate,
    totalForDuration,
    perDay,
    savings: {
      weekly: weeklySavings,
      monthly: monthlySavings,
    },
  };
};

// Transport cost calculation
export interface TransportCostResult {
  baseCost: { min: number; max: number };
  mileageCost: { min: number; max: number };
  escortCost?: { min: number; max: number };
  total: { min: number; max: number };
  escortRequired: boolean;
}

export const calculateTransportCost = (
  tonnage: number,
  distanceMiles: number
): TransportCostResult => {
  let category: keyof typeof transportCosts;
  
  if (tonnage < 50) category = 'small';
  else if (tonnage < 100) category = 'medium';
  else if (tonnage < 200) category = 'large';
  else category = 'heavy';

  const config = transportCosts[category];

  const baseCost = config.baseCost;
  const mileageCost = {
    min: Math.round(config.perMile.min * distanceMiles),
    max: Math.round(config.perMile.max * distanceMiles),
  };

  let escortCost;
  if (config.escortRequired) {
    escortCost = config.escortCost;
  }

  const total = {
    min: baseCost.min + mileageCost.min + (escortCost?.min || 0),
    max: baseCost.max + mileageCost.max + (escortCost?.max || 0),
  };

  return {
    baseCost,
    mileageCost,
    escortCost,
    total,
    escortRequired: config.escortRequired,
  };
};

// Crane size recommendation based on lift requirements
export interface CraneSizeRecommendation {
  recommendedTonnage: { min: number; max: number };
  craneTypes: string[];
  warnings: string[];
  notes: string[];
}

export const recommendCraneSize = (
  loadWeightKg: number,
  radiusMeters: number,
  heightMeters: number,
  groundCondition: 'hard' | 'soft' | 'unknown' = 'hard',
  siteAccess: 'easy' | 'restricted' | 'tight' = 'easy'
): CraneSizeRecommendation => {
  // Convert to tonnes
  const loadTonnes = loadWeightKg / 1000;
  
  // Safety factor (typically 25% margin)
  const safetyFactor = 1.25;
  
  // Radius factor - capacity decreases significantly with distance
  // This is a simplified model; real load charts are complex
  let radiusFactor = 1.0;
  if (radiusMeters > 30) radiusFactor = 2.0;
  else if (radiusMeters > 20) radiusFactor = 1.6;
  else if (radiusMeters > 15) radiusFactor = 1.4;
  else if (radiusMeters > 10) radiusFactor = 1.2;

  // Height factor - affects required boom length
  let heightFactor = 1.0;
  if (heightMeters > 40) heightFactor = 1.3;
  else if (heightMeters > 25) heightFactor = 1.15;

  // Calculate required capacity
  const requiredCapacity = loadTonnes * safetyFactor * radiusFactor * heightFactor;

  // Add margin for practical selection
  const recommendedMin = Math.ceil(requiredCapacity * 0.9 / 5) * 5; // Round to nearest 5
  const recommendedMax = Math.ceil(requiredCapacity * 1.3 / 5) * 5;

  // Determine suitable crane types
  const suitableTypes: string[] = [];
  const warnings: string[] = [];
  const notes: string[] = [];

  // Check which crane types can handle this
  craneTypes.forEach(crane => {
    const maxTonnage = Math.max(...crane.tonnageRanges.map(r => r.max));
    if (maxTonnage >= recommendedMin) {
      suitableTypes.push(crane.id);
    }
  });

  // Ground condition considerations
  if (groundCondition === 'soft') {
    warnings.push('Soft ground may require crawler crane or ground matting');
    if (!suitableTypes.includes('crawler')) {
      suitableTypes.unshift('crawler');
    }
  }

  // Site access considerations
  if (siteAccess === 'tight') {
    warnings.push('Restricted access may limit crane options - city crane recommended');
    if (suitableTypes.includes('city')) {
      suitableTypes.unshift('city');
    }
  } else if (siteAccess === 'restricted') {
    notes.push('Consider access route for larger cranes');
  }

  // Height considerations
  if (heightMeters > 30) {
    notes.push('Height above 30m may require specialist lift planning');
  }

  // Heavy lift considerations
  if (requiredCapacity > 100) {
    notes.push('Heavy lift may require tandem crane operation or specialist equipment');
    warnings.push('Recommend professional lift survey before hire');
  }

  return {
    recommendedTonnage: { min: recommendedMin, max: recommendedMax },
    craneTypes: [...new Set(suitableTypes)].slice(0, 4), // Top 4 suitable types
    warnings,
    notes,
  };
};

// Format currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Format range
export const formatRange = (min: number, max: number): string => {
  return `${formatCurrency(min)} - ${formatCurrency(max)}`;
};
