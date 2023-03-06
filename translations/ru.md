# steam-market

Клиент API торговой площадки Steam. Спроектирован для использования
со [steam-user](https://github.com/DoctorMcKay/node-steam-user).

Если вы создаете бота для Steam возможно вам больше
подходит [steam-robot](https://github.com/vladislav-puzyrev/steam-robot).

Этот пакет предназначен только для образовательных целей. Используйте его на свой страх и риск, автоматизация на
торговой площадке запрещена правилами соглашения подписчика Steam:

> Вы не имеете права использовать чит-коды, программное обеспечение для автоматизации действий или процессов (боты),
> модификации, средства взлома или иное несанкционированное программное обеспечение сторонних производителей для
> изменения или автоматизации любых процессов на Торговой площадке подписок.

TypeDoc документация доступна на [wiki](https://github.com/vladislav-puzyrev/steam-market/wiki).

## Установка

### Без входа

Используя npm:

```bash
npm install steam-market
```

Используя yarn:

```bash
yarn add steam-market
```

### Со входом

Используя npm:

```bash
npm install steam-totp steam-user steam-market
```

Используя yarn:

```bash
yarn add steam-totp steam-user steam-market
```

## Использование

### Без входа

```javascript
import SteamMarket, { ECurrencyCode } from 'steam-market'

const market = new SteamMarket()

// Если необходимо задаем валюту и язык
market.setCurrency(ECurrencyCode.RUB) // По умолчанию ECurrencyCode.USD
market.setCountry('RU')               // По умолчанию 'US'

// Используем только доступные без входа методы
const appId = 730
const marketHashName = 'AWP | Asiimov (Field-Tested)'

const search = await market.search(appId)
console.log('search', search.success)

const listings = await market.listings(appId, marketHashName)
const itemNameId = await listings.itemNameId()
const priceHistory = await listings.priceHistory()
console.log('itemNameId', itemNameId)
console.log('priceHistory', priceHistory.success)

const itemOrdersHistogram = await market.itemOrdersHistogram(appId, marketHashName, itemNameId)
console.log('itemOrdersHistogram', itemOrdersHistogram.success)

const priceOverview = await market.priceOverview(appId, marketHashName)
console.log('priceOverview', priceOverview.success)
```

### Со входом

```javascript
import SteamTotp from 'steam-totp'
import SteamUser from 'steam-user'
import SteamMarket from 'steam-market'

const client = new SteamUser()
const market = new SteamMarket()

client.logOn({
  accountName: 'username',
  password: 'password',
  twoFactorCode: SteamTotp.generateAuthCode('sharedSecret')
})

// Дожидаемся выполнения всех событий объекта client для настройки market перед его использованием
await Promise.all([
  new Promise((resolve) => {
    client.on('webSession', (sessionId, cookies) => {
      market.setCookies(cookies)
      resolve()
    })
  }),
  new Promise((resolve) => {
    client.on('wallet', (hasWallet, currency) => {
      market.setCurrency(currency)
      resolve()
    })
  }),
  new Promise((resolve) => {
    client.on('accountInfo', (name, country) => {
      market.setCountry(country)
      resolve()
    })
  })
])

// Также устанавливаем vanityURL после инициализации объекта client
market.setVanityURL(client.vanityURL ?? client.steamID?.getSteamID64() ?? '')

// Теперь объект market полностью настроен и готов к использованию
// Далее показаны примеры использования авторизованных методов
const appId = 730
const marketHashName = 'AWP | Asiimov (Field-Tested)'

const priceHistory = await market.priceHistory(appId, marketHashName)
console.log('priceHistory', priceHistory.success)

const myListings = await market.myListings()
console.log('myListings', myListings.success)

const myHistory = await market.myHistory()
console.log('myHistory', myHistory.success)

const createBuyOrder = await market.createBuyOrder(appId, {
  marketHashName,
  price: 50,
  amount: 1
})
const buyOrderId = createBuyOrder.buyOrderId
console.log('createBuyOrder', createBuyOrder.success)

const assetId = myListings.assets[0].id ?? 0
const contextId = myListings.assets[0].contextId ?? 0
const createSellOrder = await market.createSellOrder(appId, {
  assetId,
  contextId,
  price: 250,
  amount: 1
})
console.log('createSellOrder', createSellOrder.success)

const buyOrderStatus = await market.buyOrderStatus(appId, marketHashName, buyOrderId)
console.log('buyOrderStatus', buyOrderStatus.success)

const cancelBuyOrder = await market.cancelBuyOrder(buyOrderId)
console.log('cancelBuyOrder', cancelBuyOrder)

const listingId = myListings.listings[0].listingId
const cancelSellOrder = await market.cancelSellOrder(listingId)
console.log('cancelSellOrder', cancelSellOrder)
```

## Смотрите также

| Модуль                                                                                   | Описание                                                                  | Автор             |
|------------------------------------------------------------------------------------------|---------------------------------------------------------------------------|-------------------|
| [steam-totp](https://github.com/DoctorMcKay/node-steam-totp)                             | Легкий модуль для генерации кодов авторизации TOTP в стиле Steam          | DoctorMcKay       |
| [steam-user](https://github.com/DoctorMcKay/node-steam-user)                             | Позволяет взаимодействовать с сетью Steam через клиентский протокол Steam | DoctorMcKay       |
| [steamcommunity](https://github.com/DoctorMcKay/node-steamcommunity)                     | Взаимодействуйте с различными интерфейсами в сообществе Steam из Node.js  | DoctorMcKay       |
| [steam-tradeoffer-manager](https://github.com/DoctorMcKay/node-steam-tradeoffer-manager) | Простое и разумное управление торговыми предложениями Steam               | DoctorMcKay       |
| [steam-market](https://github.com/vladislav-puzyrev/steam-market) (ВЫ ЗДЕСЬ)             | Клиент API торговой площадки Steam                                        | Vladislav Puzyrev |
| [steam-robot](https://github.com/vladislav-puzyrev/steam-robot)                          | Создание ботов Steam на основе middlewares                                | Vladislav Puzyrev |
