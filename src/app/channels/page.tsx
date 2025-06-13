"use client";

import { ChannelsProvider, useChannels } from '@/context/ChannelsContext';
import ChannelTable from '@/components/ChannelTable';
import Header from '@/components/Header';

function ChannelsContent() {
  // Получаем каналы из контекста
  const { channels } = useChannels();

  return (
    <>
      <Header />
      <main className="container mx-auto py-8 px-4">
        <div className="w-full">
          <h1 className="text-2xl font-bold mb-6">Список каналов</h1>
          <ChannelTable channels={channels} />
        </div>
      </main>
    </>
  );
}

export default function ChannelsPage() {
  return (
    <ChannelsProvider>
      <ChannelsContent />
    </ChannelsProvider>
  );
} 