import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatNumber } from '@/lib/calculations';
import { Channel } from '@/types';

interface ChannelCardProps {
  channel: Channel;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function ChannelCard({ channel, onEdit, onDelete }: ChannelCardProps) {
  // Get efficiency class based on score
  const getEfficiencyClass = (value: number) => {
    if (value < 1) return "text-green-500";
    if (value < 1.5) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{channel.name}</CardTitle>
        <CardDescription>
          <Badge variant="outline" className="mb-2">
            {channel.topic || "Без тематики"}
          </Badge>
          <Badge variant="secondary" className="ml-2">
            {channel.geo || "Гео не указано"}
          </Badge>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Подписчики</p>
            <p className="text-lg font-medium">{channel.subscribers.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Охват</p>
            <p className="text-lg font-medium">{channel.reach.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">ERR</p>
            <p className="text-lg font-medium">{channel.err}%</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Цена</p>
            <p className="text-lg font-medium">{formatCurrency(channel.price)}</p>
          </div>
        </div>
        
        <div className="pt-2 border-t">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">CPM</p>
              <p className={`text-lg font-medium ${getEfficiencyClass(channel.cpm / 5)}`}>
                {formatCurrency(channel.cpm)}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Стоимость подписчика</p>
              <p className={`text-lg font-medium ${getEfficiencyClass(channel.costPerSubscriber / 0.5)}`}>
                {formatCurrency(channel.costPerSubscriber)}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <a href={`https://t.me/${channel.username}`} target="_blank" rel="noopener noreferrer">
          <Button variant="outline">Перейти в канал</Button>
        </a>
        <div className="space-x-2">
          {onEdit && (
            <Button variant="ghost" onClick={() => onEdit(channel.id)}>
              Редактировать
            </Button>
          )}
          {onDelete && (
            <Button variant="ghost" className="text-red-500" onClick={() => onDelete(channel.id)}>
              Удалить
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
} 