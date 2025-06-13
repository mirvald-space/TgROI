import { useChannels, Channel } from '@/context/ChannelsContext';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatNumber } from '@/lib/calculations';
import RoiForecast from './RoiForecast';
import { useState } from 'react';

interface ChannelCardProps {
  channel: Channel;
}

export default function ChannelCard({ channel }: ChannelCardProps) {
  const { deleteChannel } = useChannels();
  const [showRoiForecast, setShowRoiForecast] = useState(false);

  // Determine efficiency color
  const getEfficiencyColor = (score: number) => {
    if (score < 0.8) return "bg-green-500 hover:bg-green-600";
    if (score < 1.2) return "bg-yellow-500 hover:bg-yellow-600";
    return "bg-red-500 hover:bg-red-600";
  };

  // Format metrics with appropriate units
  const formattedCPM = formatCurrency(channel.cpm);
  const formattedCostPerSubscriber = formatCurrency(channel.costPerSubscriber);
  const formattedEfficiency = formatNumber(channel.efficiencyScore);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{channel.name}</CardTitle>
            <CardDescription>{channel.subscribers.toLocaleString()} подписчиков</CardDescription>
          </div>
          <Badge className={channel.isRecommended ? "bg-green-500" : "bg-red-500"}>
            {channel.isRecommended ? "Рекомендуется" : "Не рекомендуется"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Охват поста</p>
            <p className="text-lg font-medium">{channel.reach.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Цена</p>
            <p className="text-lg font-medium">{formatCurrency(channel.price)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">ERR%</p>
            <p className="text-lg font-medium">
              {channel.err.toFixed(1)}%
              <span className="ml-2 text-xs text-gray-500">
                {channel.errType === '24h' ? '24ч' : 'Общий'}
              </span>
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">CPM</p>
            <p className="text-lg font-medium">{formattedCPM}</p>
          </div>
        </div>

        <div className="pt-2">
          <p className="text-sm text-gray-500">Стоимость за подписчика</p>
          <p className="text-lg font-medium">{formattedCostPerSubscriber}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Оценка эффективности</p>
          <div className="flex items-center gap-2">
            <Badge className={getEfficiencyColor(channel.efficiencyScore)}>
              {formattedEfficiency}
            </Badge>
            <p className="text-xs text-gray-500">
              (Чем ниже, тем лучше)
            </p>
          </div>
        </div>
        
        <div className="pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowRoiForecast(!showRoiForecast)}
            className="w-full"
          >
            {showRoiForecast ? "Скрыть прогноз ROI" : "Показать прогноз ROI"}
          </Button>
        </div>

        {showRoiForecast && (
          <div className="pt-4">
            <RoiForecast 
              price={channel.price}
              reach={channel.reach}
              err={channel.err}
            />
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          variant="destructive" 
          className="w-full" 
          onClick={() => deleteChannel(channel.id)}
        >
          Удалить канал
        </Button>
      </CardFooter>
    </Card>
  );
} 