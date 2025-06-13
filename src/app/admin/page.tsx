'use client';
import ChannelTable from '@/components/ChannelTable';
import ChannelFormModal from '@/components/ChannelFormModal';
import { useChannels } from '@/context/ChannelsContext';

export default function AdminPage() {
  const { channels } = useChannels();

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Админка: управление каналами</h1>
        <ChannelFormModal />
      </div>
      <ChannelTable channels={channels} />
    </div>
  );
} 