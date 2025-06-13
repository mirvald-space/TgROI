"use client";

import { ChannelsProvider } from '@/context/ChannelsContext';
import Header from '@/components/Header';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Home() {
  return (
    <ChannelsProvider>
      <Header />
      <main className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-3">Анализ эффективности рекламы в Telegram-каналах</h1>
          <p className="text-gray-600 mb-6">
            Актуальные показатели для Telegram-рекламы в 2025 году
          </p>

          {/* CPM по размерам каналов */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">CPM по размерам каналов</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                  <div className="flex items-center">
                    <Badge variant="outline" className="mr-2">Микро</Badge>
                    <span>до 10К подписчиков</span>
                  </div>
                  <div className="font-mono font-bold">$0.4-1.5 CPM</div>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <div className="flex items-center">
                    <Badge variant="outline" className="mr-2">Средние</Badge>
                    <span>10-100К подписчиков</span>
                  </div>
                  <div className="font-mono font-bold">$1.5-3 CPM</div>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <div className="flex items-center">
                    <Badge variant="outline" className="mr-2">Крупные</Badge>
                    <span>100К-1М подписчиков</span>
                  </div>
                  <div className="font-mono font-bold">$3-5 CPM</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Badge variant="outline" className="mr-2">Очень крупные</Badge>
                    <span>более 1М подписчиков</span>
                  </div>
                  <div className="font-mono font-bold">$5-8 CPM</div>
                </div>
              </div>
            </Card>

            {/* Cost Per Subscriber */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Стоимость привлечения подписчика</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                  <div>Стандартная стоимость подписчика</div>
                  <div className="font-mono font-bold">€1-1.5</div>
                </div>
                <div className="flex justify-between items-center">
                  <div>Для сложных целевых аудиторий</div>
                  <div className="font-mono font-bold">$3-5</div>
                </div>
              </div>

              <h3 className="text-lg font-bold mt-6 mb-2">Охват аудитории</h3>
              <div className="bg-gray-50 rounded-lg p-4 text-sm">
                <ul className="list-disc ml-5 space-y-1">
                  <li>25.7% каналов получают менее 20% охвата</li>
                  <li>25.3% каналов получают 20-40% охвата</li>
                </ul>
              </div>
            </Card>
          </div>

          {/* KPI показатели и пороговые значения */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Ключевые показатели эффективности</h2>
              
              <h3 className="font-bold mb-2">OR (Открываемость постов):</h3>
              <div className="mb-4 bg-gray-50 p-3 rounded-lg">
                <div className="flex justify-between mb-1">
                  <span>Хорошо</span>
                  <span className="font-mono">30-50%</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span>Отлично</span>
                  <span className="font-mono">50-70%</span>
                </div>
                <div className="flex justify-between">
                  <span>Топ</span>
                  <span className="font-mono">70%+</span>
                </div>
              </div>
              
              <h3 className="font-bold mb-2">ER (Вовлечённость):</h3>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex justify-between mb-1">
                  <span>Сильный канал</span>
                  <span className="font-mono">7-10%</span>
                </div>
                <div className="flex justify-between">
                  <span>Отличный канал</span>
                  <span className="font-mono">более 10%</span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Пороговые значения эффективности</h2>
              
              <div className="space-y-4">
                <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                  <div className="font-bold text-green-800 mb-1">Отличные показатели</div>
                  <ul className="list-disc ml-5 space-y-1 text-sm">
                    <li>ERR: более 10%</li>
                    <li>OR: более 70%</li>
                    <li>CPM: менее $2</li>
                  </ul>
                </div>
                
                <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                  <div className="font-bold text-yellow-800 mb-1">Средние показатели</div>
                  <ul className="list-disc ml-5 space-y-1 text-sm">
                    <li>ERR: 5-10%</li>
                    <li>OR: 30-50%</li>
                    <li>CPM: $2-4</li>
                  </ul>
                </div>
                
                <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                  <div className="font-bold text-red-800 mb-1">Низкие показатели</div>
                  <ul className="list-disc ml-5 space-y-1 text-sm">
                    <li>ERR: менее 5%</li>
                    <li>OR: менее 30%</li>
                    <li>CPM: более $5</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>

          {/* Особенности по размерам и формула */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Особенности каналов по размерам</h2>
              <div className="space-y-4">
                <div className="border-b pb-2">
                  <div className="font-bold">Микро-каналы</div>
                  <p className="text-sm text-gray-600">Высокий ER (15-25%), низкий CPM</p>
                </div>
                <div className="border-b pb-2">
                  <div className="font-bold">Средние каналы</div>
                  <p className="text-sm text-gray-600">Сбалансированные показатели</p>
                </div>
                <div className="border-b pb-2">
                  <div className="font-bold">Крупные каналы</div>
                  <p className="text-sm text-gray-600">Стабильный охват, умеренный ER (8-15%)</p>
                </div>
                <div>
                  <div className="font-bold">Мега-каналы</div>
                  <p className="text-sm text-gray-600">Высокий CPM, но широкий охват</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Комплексный показатель эффективности</h2>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <div className="font-mono text-sm">
                  (ER × 0.4) + (OR × 0.3) + ((10-CPM_normalized) × 0.3)
                </div>
                <div className="mt-2 text-xs text-gray-600">
                  Где CPM_normalized = CPM/средний_CPM_по_нише × 10
                </div>
              </div>
              <div className="text-sm text-gray-600">
                <p className="mb-2"><strong>Источники:</strong> данные основаны на анализе vc.ru, Telegram Ads платформ, аналитических сервисов на 2025 год.</p>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </ChannelsProvider>
  );
}
