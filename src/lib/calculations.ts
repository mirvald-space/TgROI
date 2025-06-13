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

/**
 * Calculate Estimated ROI for advertising in a Telegram channel
 * @param price - Cost of advertising placement
 * @param reach - Expected reach of the ad
 * @param err - Engagement rate of the channel (%)
 * @param conversionRate - Expected conversion rate from audience to customers (%)
 * @param averageOrderValue - Average order value or customer LTV
 * @returns An object containing expected revenue, profit, and ROI percentage
 */
export function calculateROIForecast(
  price: number,
  reach: number, 
  err: number, 
  conversionRate: number, 
  averageOrderValue: number
): {
  potentialCustomers: number;
  expectedRevenue: number;
  expectedProfit: number;
  roi: number;
  roiPercentage: number;
  recommendedBudget: number;
} {
  // Calculate potential engaged users
  const engagedUsers = reach * (err / 100);
  
  // Calculate potential customers (based on conversion rate)
  const potentialCustomers = engagedUsers * (conversionRate / 100);
  
  // Calculate expected revenue
  const expectedRevenue = potentialCustomers * averageOrderValue;
  
  // Calculate expected profit
  const expectedProfit = expectedRevenue - price;
  
  // Calculate ROI
  const roi = expectedProfit / price;
  
  // ROI as percentage
  const roiPercentage = roi * 100;
  
  // Calculate recommended budget based on potential returns
  // Use a formula that scales with expected profit but is capped reasonably
  const recommendedBudget = Math.min(
    price * 1.5, // Don't recommend more than 50% increase
    Math.max(
      price, // Don't go below current price
      expectedProfit * 0.3 // Suggest spending up to 30% of expected profit
    )
  );
  
  return {
    potentialCustomers,
    expectedRevenue,
    expectedProfit,
    roi,
    roiPercentage,
    recommendedBudget
  };
}

/**
 * Get ROI forecast category based on ROI percentage
 * @param roiPercentage - ROI as a percentage
 * @returns String category indicating ROI quality
 */
export function getRoiForecastCategory(roiPercentage: number): {
  category: 'excellent' | 'good' | 'fair' | 'poor';
  description: string;
  color: string;
} {
  if (roiPercentage >= 200) {
    return {
      category: 'excellent',
      description: 'Отличный прогнозируемый возврат инвестиций',
      color: 'bg-green-500'
    };
  } else if (roiPercentage >= 100) {
    return {
      category: 'good',
      description: 'Хороший прогнозируемый возврат инвестиций',
      color: 'bg-green-400'
    };
  } else if (roiPercentage >= 30) {
    return {
      category: 'fair',
      description: 'Средний прогнозируемый возврат инвестиций',
      color: 'bg-yellow-500'
    };
  } else {
    return {
      category: 'poor',
      description: 'Низкий прогнозируемый возврат инвестиций',
      color: 'bg-red-500'
    };
  }
} 