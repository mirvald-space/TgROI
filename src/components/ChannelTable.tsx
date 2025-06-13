import React, { useState } from 'react';
import { useChannels } from '@/context/ChannelsContext';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatCurrency, formatNumber } from '@/lib/calculations';
import RoiForecast from './RoiForecast';

export default function ChannelTable() {
  const { sortedChannels, deleteChannel, sortType, setSortType } = useChannels();
  const [selectedChannelId, setSelectedChannelId] = useState<string | null>(null);

  // Determine efficiency color
  const getEfficiencyColor = (score: number) => {
    if (score < 0.8) return "bg-green-500";
    if (score < 1.2) return "bg-yellow-500";
    return "bg-red-500";
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
            По эффективности
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
          <TableCaption>Сравнение рекламных площадок Telegram</TableCaption>
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
              <TableHead className="text-right">Эффективность</TableHead>
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
                        <Badge className={getEfficiencyColor(channel.efficiencyScore)}>
                          {formatNumber(channel.efficiencyScore)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex flex-col gap-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => toggleRoiForecast(channel.id)}
                            className="whitespace-nowrap"
                          >
                            {selectedChannelId === channel.id ? "Скрыть ROI" : "Прогноз ROI"}
                          </Button>
                          <Button 
                            size="sm"
                            variant="destructive"
                            onClick={() => deleteChannel(channel.id)}
                          >
                            Удалить
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
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
    </div>
  );
} 