import React from 'react';

interface EfficiencyIndicatorProps {
  score: number;
  marketAverage: number;
}

export default function EfficiencyIndicator({ score, marketAverage = 1 }: EfficiencyIndicatorProps) {
  // Расчет процента отклонения от среднерыночного
  // Эффективность лучше, если ниже среднего (т.е. score < marketAverage)
  const percentDiff = ((score - marketAverage) / marketAverage) * 100;
  
  // Меньшее значение = лучше, большее = хуже
  const isMoreEfficient = score < marketAverage;
  
  // Ограничиваем позицию индикатора между 0 и 100%
  // Полная шкала представляет отклонение на 100% в обе стороны
  // При этом: левая сторона - хорошие значения (< 1), правая - плохие (> 1)
  const position = Math.min(Math.max(50 + (percentDiff / 2), 0), 100);

  // Определение статуса эффективности на основе значения score
  const getEfficiencyStatus = () => {
    if (score < 0.8) return { label: "Отличная", className: "text-green-600" };
    if (score < 1.1) return { label: "Хорошая", className: "text-green-500" };
    if (score < 1.3) return { label: "Нормальная", className: "text-yellow-500" };
    if (score < 1.7) return { label: "Посредственная", className: "text-orange-500" };
    return { label: "Низкая", className: "text-rose-500" };
  };

  const effStatus = getEfficiencyStatus();
  
  return (
    <div className="w-full px-4 py-4 rounded-lg bg-slate-50">
      {/* Заголовок с процентным отклонением от рынка */}
      <div className="text-lg font-semibold mb-2">
        <span className="text-gray-800">
          {isMoreEfficient ? "выше рынка" : "ниже рынка"}
        </span>{" "}
        <span className={isMoreEfficient ? "text-green-600" : "text-rose-500"}>
          на {Math.abs(percentDiff).toFixed(1)}%
        </span>
      </div>
      
      {/* Текущее значение с оценкой */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <div className="text-gray-500 mb-1">
            эффективность
          </div>
          <div className="text-2xl font-semibold">
            ~ {score.toFixed(2)}
          </div>
        </div>
        <div className={`text-lg font-medium ${effStatus.className}`}>
          {effStatus.label}
        </div>
      </div>
      
      {/* Шкала */}
      <div className="relative h-3 w-full bg-gradient-to-r from-green-400 via-yellow-300 to-red-400 rounded-full overflow-hidden mb-4">
        {/* Вертикальная пунктирная линия для среднего значения */}
        <div 
          className="absolute top-0 bottom-0 w-0.5 border-l-2 border-dashed border-gray-700" 
          style={{ left: '50%' }}
        ></div>
        
        {/* Вертикальная отметка текущего значения */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-black" 
          style={{ left: `${position}%` }}
        ></div>
      </div>
      
      {/* Сравнение с рынком */}
      <div className="flex justify-between text-sm text-gray-500">
        <div>
          Лучше рынка
          <div className="font-semibold text-green-600">&lt; {marketAverage}</div>
        </div>
        <div className="text-center">
          Средний показатель
          <div className="font-semibold text-gray-800">
            {marketAverage.toFixed(2)}
          </div>
        </div>
        <div className="text-right">
          Хуже рынка
          <div className="font-semibold text-rose-500">&gt; {marketAverage}</div>
        </div>
      </div>
    </div>
  );
} 