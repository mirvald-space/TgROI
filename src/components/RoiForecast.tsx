import React, { useState } from 'react';
import { calculateROIForecast, getRoiForecastCategory, formatCurrency, formatNumber } from '@/lib/calculations';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface RoiForecastProps {
  price: number;
  reach: number;
  err: number;
}

export default function RoiForecast({ price, reach, err }: RoiForecastProps) {
  // Default values for conversion rate and average order value
  const [conversionRate, setConversionRate] = useState<number>(2); // 2% default
  const [averageOrderValue, setAverageOrderValue] = useState<number>(50); // $50 default

  // Calculate ROI forecast
  const forecast = calculateROIForecast(
    price,
    reach,
    err,
    conversionRate,
    averageOrderValue
  );

  const roiCategory = getRoiForecastCategory(forecast.roiPercentage);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Прогноз ROI</CardTitle>
        <CardDescription>
          Расчет предполагаемого возврата инвестиций для данного канала
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Settings section */}
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="conversion-rate">Конверсия (%)</Label>
              <span>{conversionRate}%</span>
            </div>
            <div className="py-4">
              <input
                type="range"
                id="conversion-rate"
                min={0.1}
                max={10}
                step={0.1}
                value={conversionRate} 
                onChange={(e) => setConversionRate(parseFloat(e.target.value))} 
                className="w-full"
              />
            </div>
            <p className="text-xs text-gray-500">
              Процент пользователей, которые совершат целевое действие
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="order-value">Средний чек ($)</Label>
            <Input
              id="order-value"
              type="number"
              min={1}
              value={averageOrderValue}
              onChange={(e) => setAverageOrderValue(parseFloat(e.target.value) || 0)}
              className="w-full"
            />
            <p className="text-xs text-gray-500">
              Средняя стоимость покупки или ценность клиента (LTV)
            </p>
          </div>
        </div>

        {/* Results section */}
        <div className="space-y-4 pt-4 border-t">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Прогнозируемые клиенты</p>
              <p className="text-lg font-medium">{Math.round(forecast.potentialCustomers)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Прогнозируемый доход</p>
              <p className="text-lg font-medium">{formatCurrency(forecast.expectedRevenue)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Прогнозируемая прибыль</p>
              <p className="text-lg font-medium">{formatCurrency(forecast.expectedProfit)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Рекомендуемый бюджет</p>
              <p className="text-lg font-medium">{formatCurrency(forecast.recommendedBudget)}</p>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500">Прогнозируемый ROI</p>
            <div className="flex items-center gap-2 mt-1">
              <Badge className={roiCategory.color}>
                {formatNumber(forecast.roiPercentage)}%
              </Badge>
              <p className="text-sm">{roiCategory.description}</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="text-xs text-gray-500">
        Примечание: Прогноз основан на введенных данных и средних показателях. Фактические результаты могут отличаться.
      </CardFooter>
    </Card>
  );
} 