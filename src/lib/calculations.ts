/**
 * Calculate Cost Per Mille (CPM)
 * Formula: (price / reach) * 1000
 */
export function calculateCPM(price: number, reach: number): number {
  return (price / reach) * 1000;
}

/**
 * Calculate Cost Per Subscriber
 * Formula: price / (reach * ERR/100)
 */
export function calculateCostPerSubscriber(price: number, reach: number, err: number): number {
  return price / (reach * (err / 100));
}

/**
 * Calculate Efficiency Score (lower is better)
 * Normalized weighted combination of CPM and Cost Per Subscriber
 */
export function calculateEfficiencyScore(cpm: number, costPerSubscriber: number): number {
  const normalizedCPM = cpm / 50; // Assuming average CPM is around $50
  const normalizedCPS = costPerSubscriber / 0.5; // Assuming average CPS is around $0.5
  
  // Weight CPM as 60% of score, Cost Per Subscriber as 40%
  return (normalizedCPM * 0.6) + (normalizedCPS * 0.4);
}

/**
 * Determine if a channel is recommended based on efficiency score
 * Score < 1 is considered good
 */
export function isRecommended(efficiencyScore: number): boolean {
  return efficiencyScore < 1;
}

/**
 * Format currency as USD
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}

/**
 * Format number with 2 decimal places
 */
export function formatNumber(value: number): string {
  return value.toFixed(2);
} 