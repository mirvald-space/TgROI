"use client";

import { ChannelsProvider } from '@/context/ChannelsContext';
import ChannelFormModal from '@/components/ChannelFormModal';
import ChannelTable from '@/components/ChannelTable';

export default function Home() {
  return (
    <ChannelsProvider>
      <main className="container mx-auto py-8 px-4">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">TgROI - Калькулятор эффективности рекламы в Telegram</h1>
            <p className="text-gray-500">
              Анализируйте и сравнивайте эффективность рекламы в Telegram-каналах
            </p>
          </div>
          
          <div className="ml-auto">
            <ChannelFormModal />
          </div>
        </header>

        <div className="w-full">
          <ChannelTable />
        </div>
      </main>
    </ChannelsProvider>
  );
}
