import { useState } from 'react';
import { useChannels } from '@/context/ChannelsContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Alert } from '@/components/ui/alert';

export default function ChannelForm() {
  const { addChannel } = useChannels();
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    subscribers: '',
    reach: '',
    price: '',
    err: '',
  });

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
    });

    // Reset form
    setFormData({
      name: '',
      subscribers: '',
      reach: '',
      price: '',
      err: '',
    });
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
              Процент пользователей, которые взаимодействуют с публикациями
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