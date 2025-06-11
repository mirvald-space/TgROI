import { useChannels } from '@/context/ChannelsContext';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatCurrency, formatNumber } from '@/lib/calculations';

export default function ChannelTable() {
  const { sortedChannels, deleteChannel, sortType, setSortType } = useChannels();

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

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-4">
        <p className="text-sm">Сортировать по:</p>
        <div className="flex gap-2">
          <Button 
            variant={sortType === "efficiency" ? "default" : "outline"} 
            size="sm"
            onClick={() => handleSortChange("efficiency")}
          >
            Эффективность
          </Button>
          <Button 
            variant={sortType === "cpm" ? "default" : "outline"} 
            size="sm"
            onClick={() => handleSortChange("cpm")}
          >
            CPM
          </Button>
          <Button 
            variant={sortType === "costPerSubscriber" ? "default" : "outline"} 
            size="sm"
            onClick={() => handleSortChange("costPerSubscriber")}
          >
            Цена/Подписчик
          </Button>
        </div>
      </div>

      <Table>
        <TableCaption>Сравнение Telegram каналов</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Канал</TableHead>
            <TableHead className="text-right">Подписчики</TableHead>
            <TableHead className="text-right">Охват</TableHead>
            <TableHead className="text-right">Цена</TableHead>
            <TableHead className="text-right">ERR%</TableHead>
            <TableHead className="text-right">CPM</TableHead>
            <TableHead className="text-right">Цена/Подп.</TableHead>
            <TableHead className="text-right">Эффективность</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedChannels.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-4">
                Каналы еще не добавлены. Добавьте канал через форму.
              </TableCell>
            </TableRow>
          ) : (
            sortedChannels.map((channel) => (
              <TableRow key={channel.id}>
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
                <TableCell className="text-right">{formatCurrency(channel.cpm)}</TableCell>
                <TableCell className="text-right">{formatCurrency(channel.costPerSubscriber)}</TableCell>
                <TableCell className="text-right">
                  <Badge className={getEfficiencyColor(channel.efficiencyScore)}>
                    {formatNumber(channel.efficiencyScore)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-red-500 hover:text-red-700"
                    onClick={() => deleteChannel(channel.id)}
                  >
                    Удалить
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
} 