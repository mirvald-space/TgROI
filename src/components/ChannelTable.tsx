import React, { useState } from 'react';
import { useChannels } from '@/context/ChannelsContext';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatCurrency, formatNumber } from '@/lib/calculations';
import RoiForecast from './RoiForecast';
import EfficiencyIndicator from './EfficiencyIndicator';
import ChannelEditModal from './ChannelEditModal';

export default function ChannelTable() {
  const { sortedChannels, deleteChannel, sortType, setSortType } = useChannels();
  const [selectedChannelId, setSelectedChannelId] = useState<string | null>(null);
  const [showEfficiencyDetails, setShowEfficiencyDetails] = useState<string | null>(null);
  const [editingChannelId, setEditingChannelId] = useState<string | null>(null);

  // Determine efficiency color based on 2025 market data
  const getEfficiencyColor = (score: number) => {
    if (score < 0.8) return "bg-green-500";  // Отличный показатель - значительно лучше среднего
    if (score < 1.1) return "bg-green-300";  // Хороший показатель - лучше среднего
    if (score < 1.3) return "bg-yellow-400"; // Нормальный показатель - примерно соответствует среднему
    if (score < 1.7) return "bg-orange-500"; // Посредственный показатель - хуже среднего
    return "bg-red-500";                     // Плохой показатель - значительно хуже среднего
  };

  // Get efficiency rating based on 2025 market data
  const getEfficiencyRating = (score: number): string => {
    if (score < 0.8) return "Отлично";
    if (score < 1.1) return "Хорошо";
    if (score < 1.3) return "Нормально";
    if (score < 1.7) return "Посредственно";
    return "Низкая";
  };

  // Handle sort change
  const handleSortChange = (type: "efficiency" | "cpm" | "costPerSubscriber") => {
    setSortType(type);
  };
  
  // Toggle ROI forecast for a channel
  const toggleRoiForecast = (channelId: string) => {
    if (selectedChannelId === channelId) {
      setSelectedChannelId(null);
    } else {
      setSelectedChannelId(channelId);
    }
  };

  // Toggle efficiency details
  const toggleEfficiencyDetails = (channelId: string) => {
    if (showEfficiencyDetails === channelId) {
      setShowEfficiencyDetails(null);
    } else {
      setShowEfficiencyDetails(channelId);
    }
  };

  // Open edit modal
  const openEditModal = (channelId: string) => {
    setEditingChannelId(channelId);
  };

  // Close edit modal
  const closeEditModal = () => {
    setEditingChannelId(null);
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Список каналов</h2>
        <div className="flex flex-wrap gap-2">
          <Button 
            size="sm"
            variant={sortType === "efficiency" ? "default" : "outline"}
            onClick={() => handleSortChange("efficiency")}
          >
            Сортировать по эффективности
          </Button>
          <Button 
            size="sm"
            variant={sortType === "cpm" ? "default" : "outline"}
            onClick={() => handleSortChange("cpm")}
          >
            По CPM
          </Button>
          <Button 
            size="sm"
            variant={sortType === "costPerSubscriber" ? "default" : "outline"}
            onClick={() => handleSortChange("costPerSubscriber")}
          >
            По стоимости подписчика
          </Button>
        </div>
      </div>
      
      <div className="w-full overflow-x-auto">
        <Table className="min-w-full">
          <TableCaption>Сравнение рекламных площадок Telegram (данные рынка 2025)</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Канал</TableHead>
              <TableHead className="text-right">Подписчики</TableHead>
              <TableHead className="text-right">Охват</TableHead>
              <TableHead className="text-right">Цена</TableHead>
              <TableHead className="text-right">ERR%</TableHead>
              <TableHead className="text-right">Тип ERR</TableHead>
              <TableHead className="text-right">CPM</TableHead>
              <TableHead className="text-right">Стоимость подписчика</TableHead>
              <TableHead className="text-right">
                Эффективность
                <span className="block text-xs font-normal mt-1">
                  (комплексный показатель)
                </span>
              </TableHead>
              <TableHead className="text-right w-[160px]">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedChannels.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} className="text-center py-4">
                  Каналы еще не добавлены. Добавьте канал через форму.
                </TableCell>
              </TableRow>
            ) : (
              <>
                {sortedChannels.map((channel) => (
                  <React.Fragment key={channel.id}>
                    <TableRow>
                      <TableCell className="font-medium">
                        {channel.name}
                        <div className="mt-1">
                          <Badge className={channel.isRecommended ? "bg-green-500" : "bg-red-500"}>
                            {channel.isRecommended ? "Рекомендуется" : "Не рекомендуется"}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">{channel.subscribers.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{channel.reach.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{formatCurrency(channel.price)}</TableCell>
                      <TableCell className="text-right">{channel.err.toFixed(1)}%</TableCell>
                      <TableCell className="text-right">
                        {channel.errType === '24h' ? (
                          <span title="ERR за 24 часа">24ч</span>
                        ) : (
                          <span title="ERR общий">Общий</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">{formatCurrency(channel.cpm)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(channel.costPerSubscriber)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex flex-col items-end gap-1">
                          <Badge 
                            className={`${getEfficiencyColor(channel.efficiencyScore)} cursor-pointer`}
                            onClick={() => toggleEfficiencyDetails(channel.id)}
                          >
                            {getEfficiencyRating(channel.efficiencyScore)}
                          </Badge>
                          <div className="text-xs text-gray-500">
                            {formatNumber(channel.efficiencyScore)}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="relative">
                          <Button 
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedChannelId(prev => prev === channel.id ? null : channel.id)}
                            className="whitespace-nowrap"
                          >
                            Действия
                          </Button>
                          {selectedChannelId === channel.id && (
                            <div className="absolute right-0 top-full z-10 mt-1 min-w-[150px] rounded-md border bg-white p-1 shadow-md">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="w-full justify-start"
                                onClick={() => toggleRoiForecast(channel.id)}
                              >
                                {selectedChannelId === channel.id ? "Скрыть ROI" : "Прогноз ROI"}
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="w-full justify-start"
                                onClick={() => openEditModal(channel.id)}
                              >
                                Редактировать
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="w-full justify-start text-red-600"
                                onClick={() => deleteChannel(channel.id)}
                              >
                                Удалить
                              </Button>
                            </div>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                    {showEfficiencyDetails === channel.id && (
                      <TableRow>
                        <TableCell colSpan={10} className="bg-slate-50 p-4 pb-6">
                          <div className="max-w-md mx-auto">
                            <EfficiencyIndicator 
                              score={channel.efficiencyScore}
                              marketAverage={1}
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                    {selectedChannelId === channel.id && (
                      <TableRow>
                        <TableCell colSpan={10} className="p-4 bg-slate-50">
                          <RoiForecast 
                            price={channel.price}
                            reach={channel.reach}
                            err={channel.err}
                          />
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
              </>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit Channel Modal */}
      {editingChannelId && (
        <ChannelEditModal
          isOpen={!!editingChannelId}
          onClose={closeEditModal}
          channelId={editingChannelId}
        />
      )}
    </div>
  );
} 