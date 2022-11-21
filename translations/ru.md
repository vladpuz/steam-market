# steam-market

Клиент API торговой площадки steam. Спроектирован для совместного использования со
[steam-user](https://github.com/DoctorMcKay/node-steam-user).

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

```javascript
import SteamTotp from 'steam-totp'
import SteamUser from 'steam-user'
import SteamMarket from 'steam-market'

// Оборачиваем код в асинхронную функцию для использования await
const main = async () => {
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
}

main()
```

## Смотрите также

| Модули                                                                                   | Описание                                   | Автор             |
|------------------------------------------------------------------------------------------|--------------------------------------------|-------------------|
| [steam-totp](https://github.com/DoctorMcKay/node-steam-totp)                             | Генерация кодов авторизации TOTP для steam | DoctorMcKay       |
| [steam-user](https://github.com/DoctorMcKay/node-steam-user)                             | Взаимодействие с сетью steam               | DoctorMcKay       |
| [steamcommunity](https://github.com/DoctorMcKay/node-steamcommunity)                     | Взаимодействие с сообществом steam         | DoctorMcKay       |
| [steam-tradeoffer-manager](https://github.com/DoctorMcKay/node-steam-tradeoffer-manager) | Управление предложениями обмена steam      | DoctorMcKay       |
| [steam-market](https://github.com/vladislav-puzyrev/steam-market) (ВЫ ЗДЕСЬ)             | Клиент API торговой площадки steam         | Vladislav Puzyrev |
