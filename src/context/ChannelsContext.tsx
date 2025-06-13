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

interface ChannelsContextType {
  channels: Channel[];
  addChannel: (channel: Omit<Channel, "id" | "cpm" | "costPerSubscriber" | "efficiencyScore" | "isRecommended">) => void;
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

  // Function to add a new channel
  const addChannel = (channelData: Omit<Channel, "id" | "cpm" | "costPerSubscriber" | "efficiencyScore" | "isRecommended">) => {
    // Calculate metrics
    const cpm = (channelData.price / channelData.reach) * 1000;
    const costPerSubscriber = channelData.price / (channelData.reach * (channelData.err / 100));
    
    // Calculate efficiency score (lower is better)
    // Normalized weighted combination of CPM and Cost Per Subscriber
    const normalizedCPM = cpm / 50; // Assuming average CPM is around $50
    const normalizedCPS = costPerSubscriber / 0.5; // Assuming average CPS is around $0.5
    const efficiencyScore = (normalizedCPM * 0.6) + (normalizedCPS * 0.4);
    
    // Determine if channel is recommended (efficiency score < 1 is good)
    const isRecommended = efficiencyScore < 1;
    
    const newChannel: Channel = {
      id: Date.now().toString(),
      ...channelData,
      cpm,
      costPerSubscriber,
      efficiencyScore,
      isRecommended
    };
    
    setChannels(prev => [...prev, newChannel]);
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