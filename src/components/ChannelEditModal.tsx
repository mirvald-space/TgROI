import { useState, useEffect } from 'react';
import { useChannels } from '@/context/ChannelsContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert } from '@/components/ui/alert';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { MARKET_DATA } from '@/context/ChannelsContext';

interface ChannelEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  channelId: string;
}

// Тип категории канала для безопасной индексации
type ChannelCategory = 'micro' | 'small' | 'medium' | 'large';

export default function ChannelEditModal({
  isOpen,
  onClose,
  channelId,
}: ChannelEditModalProps) {
  const { channels, editChannel } = useChannels();
  const [error, setError] = useState<string | null>(null);
  
  // Find the channel to edit
  const channelToEdit = channels.find(channel => channel.id === channelId);

  // Form state
  const [formData, setFormData] = useState<{
    name: string;
    subscribers: string;
    reach: string;
    price: string;
    err: string;
    errType: '24h' | 'overall';
  }>({
    name: '',
    subscribers: '',
    reach: '',
    price: '',
    err: '',
    errType: '24h',
  });

  // Update form data when channel changes
  useEffect(() => {
    if (channelToEdit) {
      setFormData({
        name: channelToEdit.name,
        subscribers: channelToEdit.subscribers.toString(),
        reach: channelToEdit.reach.toString(),
        price: channelToEdit.price.toString(),
        err: channelToEdit.err.toString(),
        errType: channelToEdit.errType,
      });
    }
  }, [channelToEdit]);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle ERR type change
  const handleErrTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, errType: e.target.value as '24h' | 'overall' }));
  };

  // Рассчитать рекомендуемый охват на основе количества подписчиков
  const getRecommendedReach = (): string => {
    const subscribers = Number(formData.subscribers);
    if (isNaN(subscribers) || subscribers <= 0) return "";
    
    // Типичный охват составляет 20-40% от подписчиков
    const minReach = Math.round(subscribers * 0.2);
    const maxReach = Math.round(subscribers * 0.4);
    
    return `≈ ${minReach.toLocaleString()}-${maxReach.toLocaleString()}`;
  };

  // Получить диапазон CPM на основе размера канала
  const getRecommendedPrice = (): string => {
    const subscribers = Number(formData.subscribers);
    const reach = Number(formData.reach);
    if (isNaN(subscribers) || subscribers <= 0 || isNaN(reach) || reach <= 0) return "";
    
    let category: ChannelCategory = 'micro';
    if (subscribers >= 1000000) category = 'large';
    else if (subscribers >= 100000) category = 'medium';
    else if (subscribers >= 10000) category = 'small';
    
    const { min, max } = MARKET_DATA.cpm[category];
    const minPrice = Math.round(min * reach / 1000);
    const maxPrice = Math.round(max * reach / 1000);
    
    return `≈ $${minPrice}-${maxPrice} (CPM $${min}-${max})`;
  };

  // Получить типичный ERR на основе типа (24h или overall)
  const getRecommendedErr = (): string => {
    if (formData.errType === '24h') {
      return `Хорошо: ${MARKET_DATA.openRate.average}-${MARKET_DATA.openRate.high}%, Отлично: >=${MARKET_DATA.openRate.excellent}%`;
    } else {
      return `Нормально: ${MARKET_DATA.err.average}%, Хорошо: >=${MARKET_DATA.err.high}%`;
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!channelToEdit) {
      setError('Канал не найден');
      return;
    }

    // Validate form data
    if (!formData.name.trim()) {
      setError('Укажите название канала');
      return;
    }

    const subscribers = Number(formData.subscribers);
    const reach = Number(formData.reach);
    const price = Number(formData.price);
    const err = Number(formData.err);

    // Validate numeric values
    if (isNaN(subscribers) || subscribers <= 0) {
      setError('Количество подписчиков должно быть положительным числом');
      return;
    }

    if (isNaN(reach) || reach <= 0) {
      setError('Охват должен быть положительным числом');
      return;
    }

    if (isNaN(price) || price <= 0) {
      setError('Цена должна быть положительным числом');
      return;
    }

    if (isNaN(err) || err <= 0 || err > 100) {
      setError('ERR% должен быть между 0 и 100');
      return;
    }

    // Edit channel in context
    editChannel(channelToEdit.id, {
      name: formData.name.trim(),
      subscribers,
      reach,
      price,
      err,
      errType: formData.errType,
    });

    // Close modal
    onClose();
  };

  // If no channel is found, return null
  if (!channelToEdit) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Редактировать канал</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            {error && (
              <Alert variant="destructive" className="mb-4">
                {error}
              </Alert>
            )}

            <div className="grid gap-2">
              <Label htmlFor="name">Название канала</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Мой Telegram канал"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="subscribers">Подписчики</Label>
              <Input
                id="subscribers"
                name="subscribers"
                type="number"
                min="0"
                value={formData.subscribers}
                onChange={handleChange}
                placeholder="100000"
              />
              <p className="text-xs text-gray-500">
                Общее количество подписчиков канала
              </p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="reach">Охват поста</Label>
              <Input
                id="reach"
                name="reach"
                type="number"
                min="0"
                value={formData.reach}
                onChange={handleChange}
                placeholder="25000"
              />
              <p className="text-xs text-gray-500">
                Средний охват одного рекламного поста {getRecommendedReach()}
              </p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="price">Цена рекламы ($)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                placeholder="500"
              />
              <p className="text-xs text-gray-500">
                {getRecommendedPrice() || "Рыночный диапазон зависит от размера канала и охвата"}
              </p>
            </div>

            <div className="grid gap-2">
              <Label>Тип ERR</Label>
              <div className="flex gap-4">
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="errType"
                    value="24h"
                    checked={formData.errType === '24h'}
                    onChange={handleErrTypeChange}
                  />
                  <span>ERR 24</span>
                </label>
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="errType"
                    value="overall"
                    checked={formData.errType === 'overall'}
                    onChange={handleErrTypeChange}
                  />
                  <span>ERR</span>
                </label>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="err">ERR%</Label>
              <Input
                id="err"
                name="err"
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={formData.err}
                onChange={handleChange}
                placeholder="5.5"
              />
              <p className="text-xs text-gray-500">
                {formData.errType === '24h'
                  ? 'Средний процент подписчиков, увидевших один пост за 24 часа (лучше брать среднее по последним 3–5 постам)'
                  : 'Средний процент подписчиков, увидевших посты за месяц или за всё время'}
              </p>
              <p className="text-xs text-gray-500">
                {getRecommendedErr()}
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" type="button" onClick={onClose}>
              Отмена
            </Button>
            <Button type="submit">
              Сохранить
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 