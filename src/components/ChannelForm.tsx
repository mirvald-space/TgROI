import { useState } from 'react';
import { useChannels } from '@/context/ChannelsContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Alert } from '@/components/ui/alert';

interface ChannelFormProps {
  onSubmitSuccess?: () => void;
}

export default function ChannelForm({ onSubmitSuccess }: ChannelFormProps) {
  const { addChannel } = useChannels();
  const [error, setError] = useState<string | null>(null);

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

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle ERR type change
  const handleErrTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, errType: e.target.value as '24h' | 'overall' }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

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

    // Add channel to context
    addChannel({
      name: formData.name.trim(),
      subscribers,
      reach,
      price,
      err,
      errType: formData.errType,
    });

    // Reset form
    setFormData({
      name: '',
      subscribers: '',
      reach: '',
      price: '',
      err: '',
      errType: '24h',
    });

    // Call callback if provided
    if (onSubmitSuccess) {
      onSubmitSuccess();
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Добавить Telegram канал</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
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
            <p className="text-sm text-gray-500">
              {formData.errType === '24h'
                ? 'Средний процент подписчиков, увидевших один пост за 24 часа (лучше брать среднее по последним 3–5 постам)'
                : 'Средний процент подписчиков, увидевших посты за месяц или за всё время'}
            </p>
          </div>
        </CardContent>
        
        <CardFooter>
          <Button type="submit" className="w-full">
            Добавить канал
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
} 