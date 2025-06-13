import { createContext, useState, useContext, useEffect, ReactNode } from "react";

// Define the Channel interface
export interface Channel {
  id: string;
  name: string;
  subscribers: number;
  reach: number;
  price: number;
  err: number;
  cpm: number;
  costPerSubscriber: number;
  efficiencyScore: number;
  isRecommended: boolean;
  errType: '24h' | 'overall';
}

// Рыночные данные для сравнения (2025)
export const MARKET_DATA = {
  cpm: {
    micro: { min: 0.4, max: 1.5, avg: 0.95 },     // до 10K
    small: { min: 1.5, max: 3, avg: 2.25 },       // 10K-100K
    medium: { min: 3, max: 5, avg: 4 },           // 100K-1M
    large: { min: 5, max: 8, avg: 6.5 },          // 1M+
  },
  costPerSubscriber: {
    standard: 1.25,  // €1-1.5 стандарт в долларах
    complex: 4,      // До $3-5 для сложных ЦА
  },
  err: {
    low: 5,           // Низкий ERR < 5%
    average: 7.5,     // Средний ERR 5-10%
    high: 10,         // Высокий ERR > 10%
  },
  openRate: {
    low: 30,          // < 30%
    average: 40,      // 30-50%
    high: 60,         // 50-70%
    excellent: 70,    // > 70%
  }
};

interface ChannelsContextType {
  channels: Channel[];
  addChannel: (channel: Omit<Channel, "id" | "cpm" | "costPerSubscriber" | "efficiencyScore" | "isRecommended">) => void;
  editChannel: (id: string, channelData: Omit<Channel, "id" | "cpm" | "costPerSubscriber" | "efficiencyScore" | "isRecommended">) => void;
  deleteChannel: (id: string) => void;
  sortedChannels: Channel[];
  sortType: "efficiency" | "cpm" | "costPerSubscriber";
  setSortType: (type: "efficiency" | "cpm" | "costPerSubscriber") => void;
}

const ChannelsContext = createContext<ChannelsContextType | undefined>(undefined);

export function ChannelsProvider({ children }: { children: ReactNode }) {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [sortType, setSortType] = useState<"efficiency" | "cpm" | "costPerSubscriber">("efficiency");

  // Load channels from localStorage on initial render
  useEffect(() => {
    const savedChannels = localStorage.getItem("channels");
    if (savedChannels) {
      setChannels(JSON.parse(savedChannels));
    }
  }, []);

  // Save channels to localStorage when they change
  useEffect(() => {
    localStorage.setItem("channels", JSON.stringify(channels));
  }, [channels]);

  // Определить подходящую категорию CPM на основе количества подписчиков
  const getChannelCategory = (subscribers: number) => {
    if (subscribers < 10000) return 'micro';
    if (subscribers < 100000) return 'small';
    if (subscribers < 1000000) return 'medium';
    return 'large';
  };

  // Calculate channel metrics
  const calculateChannelMetrics = (channelData: Omit<Channel, "id" | "cpm" | "costPerSubscriber" | "efficiencyScore" | "isRecommended">) => {
    // Базовые расчеты
    const cpm = (channelData.price / channelData.reach) * 1000;
    const costPerSubscriber = channelData.price / (channelData.reach * (channelData.err / 100));
    
    // Категория канала по размеру
    const category = getChannelCategory(channelData.subscribers);
    
    // Нормализованный CPM (от 0 до 10, где 10 - идеальный показатель)
    // CPM_normalized = CPM/средний_CPM_по_нише × 10
    const avgCpmForCategory = MARKET_DATA.cpm[category].avg;
    const normalizedCPM = Math.min(10, (avgCpmForCategory / cpm) * 10);
    
    // Нормализованный ERR (от 0 до 10, где 10 - идеальный показатель)
    // Если ERR канала равен высокому показателю рынка или выше, то это 10
    const normalizedERR = Math.min(10, (channelData.err / MARKET_DATA.err.high) * 10);
    
    // Нормализованная стоимость подписчика (от 0 до 10)
    const normalizedCPS = Math.min(10, (MARKET_DATA.costPerSubscriber.standard / costPerSubscriber) * 10);
    
    // Комплексная формула эффективности: (ER × 0.4) + (OR × 0.3) + ((10-CPM_normalized) × 0.3)
    // Для нашего случая: (ERR × 0.4) + ((10-normalizedCPM) × 0.3) + (normalizedCPS × 0.3)
    // Итоговый показатель эффективности (ниже 1 - лучше среднего, выше 1 - хуже среднего)
    const rawEfficiencyScore = 10 / ((normalizedERR * 0.4) + (normalizedCPM * 0.3) + (normalizedCPS * 0.3));
    const efficiencyScore = parseFloat(rawEfficiencyScore.toFixed(2));
    
    // Канал рекомендуется, если эффективность лучше среднего по рынку (меньше 1)
    const isRecommended = efficiencyScore < 1;

    return {
      cpm,
      costPerSubscriber,
      efficiencyScore,
      isRecommended
    };
  };

  // Function to add a new channel
  const addChannel = (channelData: Omit<Channel, "id" | "cpm" | "costPerSubscriber" | "efficiencyScore" | "isRecommended">) => {
    const metrics = calculateChannelMetrics(channelData);
    
    const newChannel: Channel = {
      id: Date.now().toString(),
      ...channelData,
      ...metrics
    };
    
    setChannels(prev => [...prev, newChannel]);
  };

  // Function to edit a channel
  const editChannel = (id: string, channelData: Omit<Channel, "id" | "cpm" | "costPerSubscriber" | "efficiencyScore" | "isRecommended">) => {
    const metrics = calculateChannelMetrics(channelData);

    setChannels(prev => prev.map(channel => 
      channel.id === id ? { ...channel, ...channelData, ...metrics } : channel
    ));
  };

  // Function to delete a channel
  const deleteChannel = (id: string) => {
    setChannels(prev => prev.filter(channel => channel.id !== id));
  };

  // Get sorted channels based on sortType
  const sortedChannels = [...channels].sort((a, b) => {
    if (sortType === "efficiency") {
      return a.efficiencyScore - b.efficiencyScore;
    } else if (sortType === "cpm") {
      return a.cpm - b.cpm;
    } else {
      return a.costPerSubscriber - b.costPerSubscriber;
    }
  });

  return (
    <ChannelsContext.Provider 
      value={{ 
        channels, 
        addChannel,
        editChannel,
        deleteChannel, 
        sortedChannels, 
        sortType, 
        setSortType 
      }}
    >
      {children}
    </ChannelsContext.Provider>
  );
}

export function useChannels() {
  const context = useContext(ChannelsContext);
  if (context === undefined) {
    throw new Error("useChannels must be used within a ChannelsProvider");
  }
  return context;
} 