"use client";

import { ChannelsProvider } from '@/context/ChannelsContext';
import ChannelTable from '@/components/ChannelTable';
import Header from '@/components/Header';

export default function ChannelsPage() {
  return (
    <ChannelsProvider>
      <Header />
      <main className="container mx-auto py-8 px-4">
        
        <div className="w-full">
          <ChannelTable />
        </div>
      </main>
    </ChannelsProvider>
  );
} 