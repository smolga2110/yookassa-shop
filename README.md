# YooKassa Shop 
Демонстрационный интернет-магазин с полной интеграцией платежной системы ЮKassa. Проект состоит из React-фронтенда и Express-бэкенда, реализующего создание платежей и управление товарами.

## Основные возможности
Каталог товаров с фильтрацией по наличию

Корзина покупок с контекстом React

Полная интеграция с ЮKassa для обработки платежей

Адаптивный интерфейс с Tailwind CSS

Типизация TypeScript как на клиенте, так и на сервере

## Архитектура
```
yookassa-shop/
├── frontend/                 # React-приложение
│   ├── provider/            # Контекст корзины
│   ├── pages/              # Страницы приложения
│   └── components/         # UI-компоненты
└── server/                 # Express-сервер
    ├── routes/            # Маршруты API
    ├── data/             # JSON-данные товаров
    └── server.ts         # Точка входа сервера
```
## Технологический стек
Фронтенд
React 18 с TypeScript

React Router для навигации

React Context API для состояния корзины

Tailwind CSS для стилизации

Fetch API для коммуникации с бэкендом

Бэкенд
Node.js с Express

TypeScript для типизации

@a2seven/yoo-checkout SDK для ЮKassa

CORS и dotenv для конфигурации

## Установка и запуск
### Предварительные требования

Аккаунт в ЮKassa для получения SHOPID и SECRETKEY

### Шаг 1: Клонирование репозитория
```bash
git clone https://github.com/smolga2110/yookassa-shop.git
cd yookassa-shop
```
### Шаг 2: Настройка бэкенда
```bash
cd server
npm install
```
Создайте файл .env в папке server/:

```env
SHOPID=shop_id_юkassa
SECRETKEY=секретный_ключ_юkassa
```
Запуск сервера:

```bash
npm run dev
# Сервер запустится на http://localhost:3000
```
### Шаг 3: Настройка фронтенда
```bash
cd ../frontend
npm install
```
Запуск клиента:

```bash
npm run dev
# Приложение откроется на http://localhost:5173
```
## Конфигурация API
Маршруты бэкенда
```javascript
GET	/api/items/	Получение всех товаров	
POST /api/items/cart	Получение товаров по ID	{ ids: number[] }
POST /api/payment/	Создание платежа в ЮKassa	{ totalCost: number }
GET	/api/payment/test	Тестовый запрос платежа
```
Примеры запросов
Получение товаров в корзине:

```javascript
fetch("http://localhost:3000/api/items/cart", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ids: [1, 3, 5] })
})
```
Создание платежа:

```javascript
fetch("http://localhost:3000/api/payment/", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ totalCost: 150000 })
})
```
## Интеграция с ЮKassa
Проект использует официальный SDK [@a2seven/yoo-checkout](https://github.com/a2seven/yoocheckout) для работы с платежами:

### Процесс оплаты:
Пользователь добавляет товары в корзину

При нажатии "Оплатить" отправляется запрос на /api/payment/

Сервер создает платеж через ЮKassa API

Пользователь перенаправляется на страницу подтверждения платежа

После оплаты - возврат в магазин по return_url

## Компоненты фронтенда
CartProvider (Context)
Управляет состоянием корзины через React Context:

changeId(id) - добавление товара

removeId(id) - удаление товара

id[] - массив ID товаров в корзине

Unit (Список товаров)
Отображает каталог товаров с:

Форматированием цен в RUB

Индикацией наличия

Кнопками добавления/удаления из корзины

CartList (Корзина)
Показывает выбранные товары и:

Подсчитывает общую сумму

Отправляет запрос на создание платежа

Перенаправляет на страницу оплаты

## Структура данных
Модель товара (items.json)
```javascript
interface Item {
    id: number;           // Уникальный идентификатор
    category: string;     // Категория товара
    name: string;         // Название товара
    price: number;        // Цена в рублях
    in_stock: boolean;    // Наличие на складе
    image_url: string;    // URL изображения
}
```
## Ответы API
// GET /api/items/
interface ApiResponse {
    items: Item[];
}

// POST /api/items/cart
interface CartResponse {
    items: Item[];  // Только товары с ID из запроса
