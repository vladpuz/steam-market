# steam-market

Steam market API client. Designed for use with [steam-user](https://github.com/DoctorMcKay/node-steam-user).

If you are creating a bot for Steam, you may need more
suitable [steam-robot](https://github.com/vladislav-puzyrev/steam-robot).

This package is intended for educational purposes only. Use it at your own risk, automation on
the community market is prohibited by the rules of the Steam subscriber agreement:

> You may not use Cheats, automation software (bots), mods, hacks, or any other unauthorized third-party software, to
> modify or automate any Subscription Marketplace process.

TypeDoc documentation is available on [wiki](https://github.com/vladislav-puzyrev/steam-market/wiki).

## Install

### Without log in

```bash
npm install steam-market
```

### With log in

```bash
npm install steam-totp steam-user steam-market
```

## Usage

### Without log in

```javascript
import SteamMarket, { ECurrencyCode } from 'steam-market'

const market = new SteamMarket()

// If necessary, set the currency and language
market.setCurrency(ECurrencyCode.RUB) // Default ECurrencyCode.USD
market.setCountry('RU')               // Default 'US'

// Use only methods available without login
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

// Waiting for all client object events to set up market before using it
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

// The market object is now fully configured and ready to use
// The following shows examples of using authorized methods
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

## See also

| Module                                                                                   | Description                                                             | Author            |
|------------------------------------------------------------------------------------------|-------------------------------------------------------------------------|-------------------|
| [steam-totp](https://github.com/DoctorMcKay/node-steam-totp)                             | Lightweight module to generate Steam-style TOTP auth codes              | DoctorMcKay       |
| [steam-user](https://github.com/DoctorMcKay/node-steam-user)                             | Allows interaction with the Steam network via the Steam client protocol | DoctorMcKay       |
| [steamcommunity](https://github.com/DoctorMcKay/node-steamcommunity)                     | Interact with various interfaces on Steam Community from Node.js        | DoctorMcKay       |
| [steam-tradeoffer-manager](https://github.com/DoctorMcKay/node-steam-tradeoffer-manager) | Simple and sane Steam trade offer management                            | DoctorMcKay       |
| [steam-market](https://github.com/vladislav-puzyrev/steam-market) (YOU HERE)             | Steam market API client                                                 | Vladislav Puzyrev |
| [steam-robot](https://github.com/vladislav-puzyrev/steam-robot)                          | Steam bots creating based on middlewares                                | Vladislav Puzyrev |
