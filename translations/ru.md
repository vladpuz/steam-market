# steam-market

Клиент API торговой площадки steam. Спроектирован для использования
со [steam-user](https://github.com/DoctorMcKay/node-steam-user).

Этот пакет предназначен только для образовательных целей. Используйте его на свой страх и риск, автоматизация на
торговой площадке запрещена правилами соглашения подписчика steam.

> Вы не имеете права использовать чит-коды, программное обеспечение для автоматизации действий или процессов (боты),
> модификации, средства взлома или иное несанкционированное программное обеспечение сторонних производителей для
> изменения или автоматизации любых процессов на Торговой площадке подписок.

## Установка

```bash
npm install steam-market
```

## Использование

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
const items = await market.search(730)
console.log(items)
```

### Без входа

```javascript
import SteamMarket, { ECurrencyCode } from 'steam-market'

const market = new SteamMarket()

// Если необходимо задаем валюту и язык
market.setCurrency(ECurrencyCode.RUB) // По умолчанию ECurrencyCode.USD
market.setCountry('RU') // По умолчанию 'US'

// Используем только доступные методы
const appId = 730
const marketHashName = 'G3SG1 | Digital Mesh (Well-Worn)'

const items = await market.search(appId)
console.log('search', items.success)

const itemNameId = await market.itemNameId(appId, marketHashName)
console.log('itemNameId', itemNameId)

const itemOrdersHistogram = await market.itemOrdersHistogram(appId, marketHashName, itemNameId)
console.log('itemOrdersHistogram', itemOrdersHistogram.success)

const priceOverview = await market.priceOverview(appId, marketHashName)
console.log('priceOverview', priceOverview.success)
```

## Смотрите также

| Модули                                                                                   | Описание                                   | Автор             |
|------------------------------------------------------------------------------------------|--------------------------------------------|-------------------|
| [steam-totp](https://github.com/DoctorMcKay/node-steam-totp)                             | Генерация кодов авторизации TOTP для steam | DoctorMcKay       |
| [steam-user](https://github.com/DoctorMcKay/node-steam-user)                             | Взаимодействие с сетью steam               | DoctorMcKay       |
| [steamcommunity](https://github.com/DoctorMcKay/node-steamcommunity)                     | Взаимодействие с сообществом steam         | DoctorMcKay       |
| [steam-tradeoffer-manager](https://github.com/DoctorMcKay/node-steam-tradeoffer-manager) | Управление предложениями обмена steam      | DoctorMcKay       |
| [steam-market](https://github.com/vladislav-puzyrev/steam-market) (ВЫ ЗДЕСЬ)             | Клиент API торговой площадки steam         | Vladislav Puzyrev |
| [steam-robot](https://github.com/vladislav-puzyrev/steam-robot)                          | Создание steam ботов на основе middlewares | Vladislav Puzyrev |
