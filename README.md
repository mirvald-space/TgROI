# TgROI - Telegram Ad Efficiency Calculator

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black" alt="Next.js 14">
  <img src="https://img.shields.io/badge/TypeScript-blue" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind-CSS-38bdf8" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT">
</p>

<p align="center">
  <img width="800" src="https://via.placeholder.com/800x450?text=TgROI+Screenshot" alt="TgROI Screenshot">
</p>

<p align="center">
  <a href="#-about">🇬🇧 English</a> |
  <a href="#-про-проект">🇺🇦 Українська</a> |
  <a href="#-о-проекте">🇷🇺 Русский</a>
</p>

---

## 🇬🇧 ABOUT

### 📊 Telegram Ad Efficiency Calculator

TgROI is a web application for analyzing the efficiency of advertising in Telegram channels, helping marketers and business owners make informed decisions when choosing channels for ad placement.

### 🎯 Target Audience

- **Marketers and SMM specialists**: objective comparison of advertising platforms
- **Business owners**: advertising budget optimization
- **Telegram channel owners**: setting competitive prices
- **Bloggers and influencers**: analysis of platforms for collaborations

### ⚡️ Features

- Calculation of key efficiency metrics (CPM, cost per subscriber)
- Integral evaluation of channel efficiency (combines CPM and cost per subscriber into a single score)
- Automatic recommendations for channel selection
- Sorting by various parameters
- Data storage in localStorage
- Channel management (add, edit, delete)
- Real-time recommendations based on market data 2025
- Comprehensive efficiency visualization

### 🔄 Efficiency Score Explained

The Efficiency Score is a comprehensive indicator of the cost-effectiveness of advertising in a channel:

- It combines ERR (40%), CPM (30%), and Cost Per Subscriber (30%) metrics
- Lower score means better efficiency (more cost-effective advertising)
- Values are normalized against market averages (2025 data):
  - **< 0.8**: Excellent (green) - significantly more efficient than market average
  - **0.8 - 1.1**: Good (light green) - better than market average
  - **1.1 - 1.3**: Normal (yellow) - around market average
  - **1.3 - 1.7**: Mediocre (orange) - worse than market average
  - **> 1.7**: Low (red) - significantly less efficient than market average

### 📈 Market Data (2025)

The application uses the latest market data for Telegram advertising in 2025:

**CPM by channel size:**
- Micro (up to 10K): $0.4-1.5 CPM
- Small (10K-100K): $1.5-3 CPM
- Medium (100K-1M): $3-5 CPM
- Large (1M+): $5-8 CPM

**Standard Cost Per Subscriber:** $1-1.5 (up to $3-5 for complex audiences)

**ERR metrics:**
- Low: <5%
- Average: 5-10%
- Good: >10%

**Open Rate:**
- Low: <30%
- Average: 30-50%
- Good: 50-70%
- Excellent: >70%

### 🛠️ Technologies

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **UI components**: shadcn/ui
- **Data storage**: localStorage

### 🚀 Installation and Launch

```bash
# Clone repository
git clone https://github.com/mirvald-space/TgROI.git
cd TgROI

# Install dependencies
npm install

# Development mode
npm run dev

# Production build
npm run build
npm start
```

### 📝 License

This project is distributed under the MIT license.

---

## 🇺🇦 ПРО ПРОЕКТ

### 📊 Калькулятор ефективності реклами в Telegram

TgROI — це веб-додаток для аналізу ефективності реклами в Telegram-каналах, що допомагає маркетологам та власникам бізнесу приймати обґрунтовані рішення при виборі каналів для розміщення реклами.

### 🎯 Для кого

- **Маркетологи та SMM-фахівці**: об'єктивне порівняння рекламних майданчиків
- **Власники бізнесу**: оптимізація рекламного бюджету
- **Власники Telegram-каналів**: встановлення конкурентоспроможних цін
- **Блогери та інфлюенсери**: аналіз майданчиків для колаборацій

### ⚡️ Можливості

- Розрахунок ключових метрик ефективності (CPM, вартість за підписника)
- Інтегральна оцінка ефективності каналів (поєднує CPM та вартість підписника в єдиний показник)
- Автоматичні рекомендації щодо вибору каналів
- Сортування за різними параметрами
- Збереження даних у localStorage
- Керування каналами (додавання, редагування, видалення)
- Рекомендації у реальному часі на основі ринкових даних 2025 року
- Комплексна візуалізація ефективності

### 🔄 Пояснення оцінки ефективності

Оцінка ефективності — це комплексний показник співвідношення ціни та якості реклами в каналі:

- Поєднує метрики ERR (40%), CPM (30%) та Вартість за підписника (30%)
- Чим нижче значення, тим краща ефективність (більш вигідна реклама)
- Значення нормалізуються відносно середньоринкових (дані 2025 року):
  - **< 0.8**: Відмінно (зелений) - значно ефективніше за середній ринок
  - **0.8 - 1.1**: Добре (світло-зелений) - краще за середній ринок
  - **1.1 - 1.3**: Нормально (жовтий) - на рівні середнього ринку
  - **1.3 - 1.7**: Посередньо (помаранчевий) - гірше за середній ринок
  - **> 1.7**: Низько (червоний) - значно гірше за середній ринок

### 📈 Ринкові дані (2025)

Додаток використовує найновіші ринкові дані для Telegram-реклами на 2025 рік:

**CPM за розміром каналу:**
- Мікро (до 10К): $0.4-1.5 CPM
- Малі (10К-100К): $1.5-3 CPM
- Середні (100К-1М): $3-5 CPM
- Великі (1М+): $5-8 CPM

**Стандартна вартість підписника:** $1-1.5 (до $3-5 для складних аудиторій)

**Показники ERR:**
- Низький: <5%
- Середній: 5-10%
- Високий: >10%

**Показники відкриваності (Open Rate):**
- Низька: <30%
- Середня: 30-50%
- Добра: 50-70%
- Відмінна: >70%

### 🛠️ Технології

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **UI компоненти**: shadcn/ui
- **Зберігання даних**: localStorage

### 🚀 Встановлення та запуск

```bash
# Клонування репозиторію
git clone https://github.com/mirvald-space/TgROI.git
cd TgROI

# Встановлення залежностей
npm install

# Запуск у режимі розробки
npm run dev

# Збірка для продакшену
npm run build
npm start
```

### 📝 Ліцензія

Проект розповсюджується під ліцензією MIT.

---

## 🇷🇺 О ПРОЕКТЕ

### 📊 Калькулятор эффективности рекламы в Telegram

TgROI — это веб-приложение для анализа эффективности рекламы в Telegram-каналах, помогающее маркетологам и владельцам бизнеса принимать обоснованные решения при выборе каналов для размещения рекламы.

### 🎯 Для кого

- **Маркетологи и SMM-специалисты**: объективное сравнение рекламных площадок
- **Владельцы бизнеса**: оптимизация рекламного бюджета
- **Владельцы Telegram-каналов**: установка конкурентоспособных цен
- **Блогеры и инфлюенсеры**: анализ площадок для коллабораций

### ⚡️ Возможности

- Расчет ключевых метрик эффективности (CPM, стоимость за подписчика)
- Интегральная оценка эффективности каналов (объединяет CPM и стоимость подписчика в единый показатель)
- Автоматические рекомендации по выбору каналов
- Сортировка по различным параметрам
- Сохранение данных в localStorage
- Управление каналами (добавление, редактирование, удаление)
- Рекомендации в реальном времени на основе рыночных данных 2025 года
- Комплексная визуализация эффективности

### 🔄 Пояснение оценки эффективности

Оценка эффективности — это комплексный показатель соотношения цены и качества рекламы в канале:

- Объединяет метрики ERR (40%), CPM (30%) и Стоимость за подписчика (30%)
- Чем ниже значение, тем лучше эффективность (более выгодная реклама)
- Значения нормализуются относительно среднерыночных (данные 2025 года):
  - **< 0.8**: Отлично (зеленый) - значительно эффективнее среднего рынка
  - **0.8 - 1.1**: Хорошо (светло-зеленый) - лучше среднего рынка
  - **1.1 - 1.3**: Нормально (желтый) - на уровне среднего рынка
  - **1.3 - 1.7**: Посредственно (оранжевый) - хуже среднего рынка
  - **> 1.7**: Низко (красный) - значительно хуже среднего рынка

### 📈 Рыночные данные (2025)

Приложение использует новейшие рыночные данные для Telegram-рекламы на 2025 год:

**CPM по размеру канала:**
- Микро (до 10К): $0.4-1.5 CPM
- Малые (10К-100К): $1.5-3 CPM
- Средние (100К-1М): $3-5 CPM
- Крупные (1М+): $5-8 CPM

**Стандартная стоимость подписчика:** $1-1.5 (до $3-5 для сложных аудиторий)

**Показатели ERR:**
- Низкий: <5%
- Средний: 5-10%
- Высокий: >10%

**Показатели открываемости (Open Rate):**
- Низкая: <30%
- Средняя: 30-50%
- Хорошая: 50-70%
- Отличная: >70%

### 🛠️ Технологии

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **UI компоненты**: shadcn/ui
- **Хранение данных**: localStorage

### 🚀 Установка и запуск

```bash
# Клонирование репозитория
git clone https://github.com/mirvald-space/TgROI.git
cd TgROI

# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev

# Сборка для продакшена
npm run build
npm start
```

### 📝 Лицензия

Проект распространяется под лицензией MIT.

---

<p align="center">
  <sub>Developed with ❤️ by <a href="https://github.com/mirvald-space">Mirvald Space</a></sub>
</p>
