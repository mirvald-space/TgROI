# TgAnalytics - Агрегатор аналитики Telegram-каналов

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black" alt="Next.js 14">
  <img src="https://img.shields.io/badge/TypeScript-blue" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind-CSS-38bdf8" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT">
</p>

<p align="center">
  <img width="800" src="https://via.placeholder.com/800x450?text=TgAnalytics+Screenshot" alt="TgAnalytics Screenshot">
</p>

<p align="center">
  <a href="#-о-проекте">🇷🇺 Русский</a> |
  <a href="#-про-проект">🇺🇦 Українська</a> |
  <a href="#-about">🇬🇧 English</a>
</p>

---

## 🇷🇺 О ПРОЕКТЕ

### 📊 Агрегатор аналитики Telegram-каналов

TgAnalytics — это сервис для анализа эффективности рекламы в Telegram-каналах. Платформа собирает данные о ценах на рекламу и основные показатели эффективности каналов, помогая рекламодателям принимать более обоснованные решения при выборе каналов для размещения.

### 🎯 Для кого

- **Рекламодатели и маркетологи**: поиск эффективных каналов для размещения рекламы
- **Владельцы бизнеса**: оптимизация распределения рекламного бюджета
- **Медиабаеры**: быстрый доступ к сравнительным данным по каналам
- **Владельцы Telegram-каналов**: понимание конкурентных цен

### ⚡️ Функции

- **Актуальные цены на рекламу**: Информация о стоимости размещений по категориям каналов
- **Анализ ключевых метрик**: ERR, CPM, стоимость за подписчика
- **Сравнительная аналитика**: Сопоставление показателей каналов со средними по рынку
- **Профили каналов**: Добавление и отслеживание интересующих вас каналов
- **Оценка эффективности**: Расчет комплексного показателя эффективности

### 🔄 Показатель эффективности

Наш показатель эффективности оценивает каналы по следующим параметрам:
- ERR (коэффициент вовлеченности)
- OR (открываемость постов)
- CPM (стоимость за тысячу просмотров)

Значения нормализуются относительно рыночных данных:
- **< 0.7**: Отлично - значительно лучше среднерыночных показателей
- **0.7 - 0.9**: Хорошо - выше среднего по рынку
- **0.9 - 1.1**: Нормально - соответствует рыночным показателям
- **1.1 - 1.5**: Ниже среднего - хуже рыночных показателей
- **> 1.5**: Плохо - значительно ниже рыночных показателей

### 📈 Рыночные данные (2025)

Данные о рекламе в Telegram на 2025 год:

**CPM по размеру канала:**
- Микро (до 10К): $0.4-1.5 CPM
- Средние (10-100К): $1.5-3 CPM
- Крупные (100К-1М): $3-5 CPM
- Очень крупные (1М+): $5-8 CPM

**Показатели эффективности:**
- OR (открываемость): 30-50% — хорошо, 50-70% — отлично, 70%+ — топ
- ER (вовлечённость): 7-10% — сильный канал, выше 10% — отличный
- Охват: около 25% каналов получают менее 20% охвата

### 🛠️ Технологии

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **UI компоненты**: shadcn/ui
- **Данные**: localStorage + планируемая интеграция с базами данных

---

## 🇺🇦 ПРО ПРОЕКТ

### 📊 Агрегатор аналітики Telegram-каналів

TgAnalytics — це сервіс для аналізу ефективності реклами в Telegram-каналах. Платформа збирає дані про ціни на рекламу та основні показники ефективності каналів, допомагаючи рекламодавцям приймати більш обґрунтовані рішення при виборі каналів для розміщення.

### 🎯 Для кого

- **Рекламодавці та маркетологи**: пошук ефективних каналів для розміщення реклами
- **Власники бізнесу**: оптимізація розподілу рекламного бюджету
- **Медіабаєри**: швидкий доступ до порівняльних даних по каналах
- **Власники Telegram-каналів**: розуміння конкурентних цін

### ⚡️ Функції

- **Актуальні ціни на рекламу**: Інформація про вартість розміщень за категоріями каналів
- **Аналіз ключових метрик**: ERR, CPM, вартість за підписника
- **Порівняльна аналітика**: Зіставлення показників каналів із середніми по ринку
- **Профілі каналів**: Додавання та відстеження каналів, які вас цікавлять
- **Оцінка ефективності**: Розрахунок комплексного показника ефективності

### 🔄 Показник ефективності

Наш показник ефективності оцінює канали за наступними параметрами:
- ERR (коефіцієнт залучення)
- OR (відкриваність постів)
- CPM (вартість за тисячу переглядів)

Значення нормалізуються відносно ринкових даних:
- **< 0.7**: Відмінно - значно краще середньоринкових показників
- **0.7 - 0.9**: Добре - вище середнього по ринку
- **0.9 - 1.1**: Нормально - відповідає ринковим показникам
- **1.1 - 1.5**: Нижче середнього - гірше ринкових показників
- **> 1.5**: Погано - значно нижче ринкових показників

### 📈 Ринкові дані (2025)

Дані про рекламу в Telegram на 2025 рік:

**CPM за розміром каналу:**
- Мікро (до 10К): $0.4-1.5 CPM
- Середні (10-100К): $1.5-3 CPM
- Великі (100К-1М): $3-5 CPM
- Дуже великі (1М+): $5-8 CPM

**Показники ефективності:**
- OR (відкриваність): 30-50% — добре, 50-70% — відмінно, 70%+ — топ
- ER (залученість): 7-10% — сильний канал, вище 10% — відмінний
- Охоплення: близько 25% каналів отримують менше 20% охоплення

### 🛠️ Технології

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **UI компоненти**: shadcn/ui
- **Дані**: localStorage + планована інтеграція з базами даних

---

## 🇬🇧 ABOUT

### 📊 Telegram Channels Analytics Aggregator

TgAnalytics is a service for analyzing advertising effectiveness in Telegram channels. The platform collects data on advertising prices and key channel performance metrics, helping advertisers make more informed decisions when choosing channels for placement.

### 🎯 Target Audience

- **Advertisers and marketers**: finding effective channels for placing ads
- **Business owners**: optimization of advertising budget allocation
- **Media buyers**: quick access to comparative channel data
- **Telegram channel owners**: understanding competitive pricing

### ⚡️ Features

- **Current advertising prices**: Information on placement costs by channel categories
- **Key metrics analysis**: ERR, CPM, cost per subscriber
- **Comparative analytics**: Comparison of channel metrics with market averages
- **Channel profiles**: Adding and tracking channels of interest
- **Effectiveness assessment**: Calculation of a comprehensive effectiveness indicator

### 🔄 Effectiveness Indicator

Our effectiveness indicator evaluates channels based on the following parameters:
- ERR (engagement rate)
- OR (post opening rate)
- CPM (cost per thousand impressions)

Values are normalized relative to market data:
- **< 0.7**: Excellent - significantly better than market average
- **0.7 - 0.9**: Good - above market average
- **0.9 - 1.1**: Normal - corresponds to market indicators
- **1.1 - 1.5**: Below average - worse than market indicators
- **> 1.5**: Poor - significantly below market indicators

### 📈 Market Data (2025)

Telegram advertising data for 2025:

**CPM by channel size:**
- Micro (up to 10K): $0.4-1.5 CPM
- Medium (10-100K): $1.5-3 CPM
- Large (100K-1M): $3-5 CPM
- Very large (1M+): $5-8 CPM

**Performance indicators:**
- OR (opening rate): 30-50% — good, 50-70% — excellent, 70%+ — top
- ER (engagement): 7-10% — strong channel, above 10% — excellent
- Reach: about 25% of channels get less than 20% reach

### 🛠️ Technologies

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **UI components**: shadcn/ui
- **Data**: localStorage + planned integration with databases

### 🚀 Installation and Launch

```bash
# Clone repository
git clone https://github.com/username/TgAnalytics.git
cd TgAnalytics

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### 📝 License

This project is distributed under the MIT license.

---

<p align="center">
  <sub>Developed with ❤️ by <a href="https://github.com/mirvald-space">Mirvald Space</a></sub>
</p>
