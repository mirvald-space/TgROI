"use client";

import { ChannelsProvider } from '@/context/ChannelsContext';
import ChannelForm from '@/components/ChannelForm';
import ChannelTable from '@/components/ChannelTable';

export default function Home() {
  return (
    <ChannelsProvider>
      <main className="container mx-auto py-8 px-4">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Калькулятор эффективности рекламы в Telegram</h1>
          <p className="text-gray-500">
            Анализируйте и сравнивайте эффективность рекламы в Telegram-каналах
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div>
            <ChannelForm />
          </div>
          <div className="lg:col-span-2">
            <ChannelTable />
          </div>
        </div>
      </main>
    </ChannelsProvider>
  );
}
