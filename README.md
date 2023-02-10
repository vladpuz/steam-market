# steam-market

Steam community market API client. Designed for use with [steam-user](https://github.com/DoctorMcKay/node-steam-user ).

This package is intended for educational purposes only. Use it at your own risk, automation on
the community market is prohibited by the rules of the steam subscriber agreement.

> You may not use Cheats, automation software (bots), mods, hacks, or any other unauthorized third-party software, to
> modify or automate any Subscription Marketplace process.

TypeDoc documentation is available on [wiki](https://github.com/vladislav-puzyrev/steam-market/wiki)

## Install

```bash
npm install steam-market
```

## Usage

### With log in

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

// Awaiting for all events of the client object to be executed to configure the market before using it
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

// Also set the vanityURL after initializing the client object
market.setVanityURL(client.vanityURL ?? client.steamID?.getSteamID64() ?? '')

// Now the market object is fully configured and ready for use
const items = await market.search(730)
console.log(items)
```

### Without log in

```javascript
import SteamMarket, { ECurrencyCode } from 'steam-market'

const market = new SteamMarket()

// If necessary, set the currency and language
market.setCurrency(ECurrencyCode.RUB) // Default ECurrencyCode.USD
market.setCountry('RU') // Default 'US'

// Use only available without log in methods
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

## See also

| Modules                                                                                  | Description                              | Author            |
|------------------------------------------------------------------------------------------|------------------------------------------|-------------------|
| [steam-totp](https://github.com/DoctorMcKay/node-steam-totp)                             | Generating TOTP auth codes for steam     | DoctorMcKay       |
| [steam-user](https://github.com/DoctorMcKay/node-steam-user)                             | Interaction with the steam network       | DoctorMcKay       |
| [steamcommunity](https://github.com/DoctorMcKay/node-steamcommunity)                     | Interaction with the steam community     | DoctorMcKay       |
| [steam-tradeoffer-manager](https://github.com/DoctorMcKay/node-steam-tradeoffer-manager) | Steam trade offer management             | DoctorMcKay       |
| [steam-market](https://github.com/vladislav-puzyrev/steam-market) (YOU HERE)             | Steam community market API client        | Vladislav Puzyrev |
| [steam-robot](https://github.com/vladislav-puzyrev/steam-robot)                          | Creating steam bots based on middlewares | Vladislav Puzyrev |
