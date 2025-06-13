export interface Channel {
  id: string;
  name: string;
  username: string;
  subscribers: number;
  reach: number;
  price: number;
  err: number;
  cpm: number;
  costPerSubscriber: number;
  efficiencyScore: number;
  isRecommended: boolean;
  errType: '24h' | 'overall';
  topic: string;
  category: string;
  geo: string;
  created_at?: string;
  price_updated_at?: string;
} 