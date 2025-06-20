import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Channel } from '@/types';
import { formatCurrency, formatNumber } from '@/lib/calculations';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Tooltip } from './ui/tooltip';
import ChannelEditModal from './ChannelEditModal';
import { useChannels } from '@/context/ChannelsContext';

interface ChannelTableProps {
  channels: Channel[];
  isAdmin?: boolean;
}

export default function ChannelTable({ channels, isAdmin = false }: ChannelTableProps) {
  const { deleteChannel } = useChannels();
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'reach' | 'efficiency'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filteredChannels, setFilteredChannels] = useState<Channel[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState<'all' | 'recommended'>('all');
  const [editId, setEditId] = useState<string | null>(null);
  
  // Sort and filter channels
  useEffect(() => {
    // Проверка на null или undefined
    const channelsToProcess = channels || [];
    let sorted = [...channelsToProcess];
    
    // Apply filter
    if (filterBy === 'recommended') {
      sorted = sorted.filter(channel => channel.isRecommended);
    }
    
    // Apply search
    if (searchTerm) {
      sorted = sorted.filter(channel => 
        channel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (channel.topic && channel.topic.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Apply sorting
    sorted.sort((a, b) => {
      if (sortBy === 'name') {
        return sortOrder === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortBy === 'price') {
        return sortOrder === 'asc'
          ? a.price - b.price
          : b.price - a.price;
      } else if (sortBy === 'reach') {
        return sortOrder === 'asc'
          ? a.reach - b.reach
          : b.reach - a.reach;
      } else if (sortBy === 'efficiency') {
        return sortOrder === 'asc'
          ? a.efficiencyScore - b.efficiencyScore
          : b.efficiencyScore - a.efficiencyScore;
      }
      return 0;
    });
    
    setFilteredChannels(sorted);
  }, [channels, sortBy, sortOrder, searchTerm, filterBy]);
  
  const toggleSort = (column: 'name' | 'price' | 'reach' | 'efficiency') => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  // Get efficiency class based on score
  const getEfficiencyClass = (score: number) => {
    if (score < 0.7) return 'bg-green-500';
    if (score < 0.9) return 'bg-green-300';
    if (score < 1.1) return 'bg-yellow-400';
    if (score < 1.5) return 'bg-orange-400';
    return 'bg-red-500';
  };

  // Найти максимальную дату created_at среди каналов
  const lastUpdated = channels.length > 0
    ? channels.reduce((max, ch) => {
        if (ch.created_at && (!max || new Date(ch.created_at) > new Date(max))) {
          return ch.created_at;
        }
        return max;
      }, '')
    : null;

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between mb-4 gap-2">
        <div className="relative max-w-sm">
          <input
            type="text"
            placeholder="Поиск по названию или тематике..."
            className="border rounded py-2 px-3 w-full"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-end w-full sm:w-auto">
          <div className="text-xs text-gray-500 sm:mr-4 text-right">
            Последнее обновление:{' '}
            {lastUpdated ? format(new Date(lastUpdated), 'dd.MM.yyyy HH:mm') : '—'}
          </div>
          <div className="flex gap-2">
            <Button
              variant={filterBy === 'all' ? 'default' : 'outline'}
              onClick={() => setFilterBy('all')}
            >
              Все каналы
            </Button>
            <Button
              variant={filterBy === 'recommended' ? 'default' : 'outline'}
              onClick={() => setFilterBy('recommended')}
            >
              Рекомендуемые
            </Button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th 
                className="cursor-pointer px-4 py-2 text-left border-b"
                onClick={() => toggleSort('name')}
              >
                Название {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th className="px-4 py-2 text-left border-b">Подписчики</th>
              <th className="px-4 py-2 text-left border-b">Тематика</th>
              <th className="px-4 py-2 text-left border-b">География</th>
              <th 
                className="cursor-pointer px-4 py-2 text-left border-b"
                onClick={() => toggleSort('price')}
              >
                Цена {sortBy === 'price' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="cursor-pointer px-4 py-2 text-left border-b"
                onClick={() => toggleSort('reach')}
              >
                Охват {sortBy === 'reach' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th className="px-4 py-2 text-left border-b">ERR (%)</th>
              <th className="px-4 py-2 text-left border-b">CPM</th>
              <th className="px-4 py-2 text-left border-b">Стоимость подписчика</th>
              <th 
                className="cursor-pointer px-4 py-2 text-left border-b"
                onClick={() => toggleSort('efficiency')}
              >
                Эффективность {sortBy === 'efficiency' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th className="px-4 py-2 text-center border-b">Действия</th>
            </tr>
          </thead>
          <tbody>
            {filteredChannels.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-4 py-6 text-center border-b">
                  {channels && channels.length > 0 
                    ? 'Не найдено каналов, соответствующих критериям поиска' 
                    : 'Не добавлено ни одного канала. Добавьте каналы через форму.'}
                </td>
              </tr>
            ) : (
              filteredChannels.map((channel) => {
                return (
                  <tr key={channel.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b">{channel.name}</td>
                    <td className="px-4 py-2 border-b">{channel.subscribers.toLocaleString()}</td>
                    <td className="px-4 py-2 border-b">
                      <Badge variant="outline" className="bg-gray-100">
                        {channel.topic || "Не указана"}
                      </Badge>
                    </td>
                    <td className="px-4 py-2 border-b">
                      <Badge variant="outline" className="bg-gray-100">
                        {channel.geo || "Не указана"}
                      </Badge>
                    </td>
                    <td className="px-4 py-2 border-b">
                      <Tooltip content={channel.price_updated_at ? `Обновлено: ${format(new Date(channel.price_updated_at), 'dd.MM.yyyy HH:mm')}` : 'Нет данных'}>
                        <span>{formatCurrency(channel.price)}</span>
                      </Tooltip>
                    </td>
                    <td className="px-4 py-2 border-b">{channel.reach.toLocaleString()}</td>
                    <td className="px-4 py-2 border-b">{channel.err}%</td>
                    <td className="px-4 py-2 border-b">{formatCurrency(channel.cpm)}</td>
                    <td className="px-4 py-2 border-b">{formatCurrency(channel.costPerSubscriber)}</td>
                    <td className="px-4 py-2 border-b">
                      <Badge className={getEfficiencyClass(channel.efficiencyScore)}>
                        {formatNumber(channel.efficiencyScore)}
                        {channel.isRecommended && ' ✓'}
                      </Badge>
                    </td>
                    <td className="px-4 py-2 border-b text-center">
                      <a href={`https://t.me/${channel.username}`} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" variant="outline" className={isAdmin ? "mr-2" : undefined}>
                          Перейти
                        </Button>
                      </a>
                      {isAdmin && (
                        <>
                          <Button size="sm" variant="secondary" className="mr-2" onClick={() => setEditId(channel.id)}>
                            Редактировать
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => deleteChannel(channel.id)}>
                            Удалить
                          </Button>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
        {isAdmin && editId && (
          <ChannelEditModal channelId={editId} isOpen={!!editId} onClose={() => setEditId(null)} />
        )}
      </div>
    </div>
  );
} 