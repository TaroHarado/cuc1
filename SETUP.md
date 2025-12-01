# Инструкция по установке и запуску

## Шаг 1: Установка зависимостей

Запустите в терминале (в директории проекта):

```bash
npm install
```

Это установит все необходимые зависимости, включая:
- Next.js 16
- React 19
- Tailwind CSS 4
- Framer Motion
- Solana Wallet Adapters
- TypeScript

## Шаг 2: Запуск проекта

После установки зависимостей запустите dev-сервер:

```bash
npm run dev
```

Приложение будет доступно по адресу: http://localhost:3000

## Шаг 3: Настройка Phantom Wallet

1. Установите расширение Phantom для вашего браузера:
   - Chrome: https://phantom.app/
   - Firefox: https://addons.mozilla.org/en-US/firefox/addon/phantom-app/

2. Создайте или импортируйте кошелек

3. Переключите сеть на Devnet (для тестирования):
   - Откройте Phantom
   - Настройки → Developer Mode → Testnet Mode

## Шаг 4: Конфигурация (опционально)

Отредактируйте `lib/config.ts` для изменения:
- Цен (BASE_PRICE_PER_HOUR_EUR)
- Комиссии сервиса (SERVICE_FEE_PERCENT)
- Курса SOL/EUR (SOL_EUR_RATE)
- Сети Solana (devnet/mainnet)
- Адреса получателя платежей

## Важные замечания

- **Devnet**: По умолчанию приложение использует Solana Devnet для тестирования
- **Mock данные**: Все данные о нодах - это mock-данные. В продакшене нужно заменить `lib/mock-api.ts` на реальные API-вызовы
- **Платежи**: Адрес получателя по умолчанию - это placeholder. Обязательно измените его перед продакшеном

## Структура проекта

```
conshare/
├── app/              # Страницы Next.js
├── components/       # React компоненты
├── modules/          # Модули (wallet, pricing)
├── lib/              # Утилиты и конфигурация
└── public/          # Статические файлы
```

## Проблемы?

Если возникают ошибки при установке:
1. Убедитесь, что Node.js версии 18+
2. Попробуйте удалить `node_modules` и `package-lock.json`, затем запустите `npm install` снова
3. Для проблем с peer dependencies используйте `npm install --legacy-peer-deps`

