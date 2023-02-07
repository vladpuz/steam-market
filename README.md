# steam-market

Steam community market API client. Designed for use with [steam-user](https://github.com/DoctorMcKay/node-steam-user ).

This package is intended for educational purposes only. Use it at your own risk, automation on
the community market is prohibited by the rules of the steam subscriber agreement.

> You may not use Cheats, automation software (bots), mods, hacks, or any other unauthorized third-party software, to
> modify or automate any Subscription Marketplace process.

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

# API

## Table of contents

### Enumerations

- [ECurrencyCode](#enumsecurrencycodemd)

### Classes

- [default](#classesdefaultmd)

### Interfaces

- [Action](#interfacesactionmd)
- [Asset](#interfacesassetmd)
- [AssetResponse](#interfacesassetresponsemd)
- [BuyOrder](#interfacesbuyordermd)
- [BuyOrderResponse](#interfacesbuyorderresponsemd)
- [BuyOrderStatus](#interfacesbuyorderstatusmd)
- [BuyOrderStatusResponse](#interfacesbuyorderstatusresponsemd)
- [CreateBuyOrder](#interfacescreatebuyordermd)
- [CreateBuyOrderOptions](#interfacescreatebuyorderoptionsmd)
- [CreateBuyOrderResponse](#interfacescreatebuyorderresponsemd)
- [CreateSellOrder](#interfacescreatesellordermd)
- [CreateSellOrderOptions](#interfacescreatesellorderoptionsmd)
- [CreateSellOrderResponse](#interfacescreatesellorderresponsemd)
- [Description](#interfacesdescriptionmd)
- [Event](#interfaceseventmd)
- [EventResponse](#interfaceseventresponsemd)
- [ItemOrdersHistogram](#interfacesitemordershistogrammd)
- [ItemOrdersHistogramResponse](#interfacesitemordershistogramresponsemd)
- [Listing](#interfaceslistingmd)
- [ListingResponse](#interfaceslistingresponsemd)
- [MarketOptions](#interfacesmarketoptionsmd)
- [MyHistory](#interfacesmyhistorymd)
- [MyHistoryResponse](#interfacesmyhistoryresponsemd)
- [MyListings](#interfacesmylistingsmd)
- [MyListingsResponse](#interfacesmylistingsresponsemd)
- [PriceHistory](#interfacespricehistorymd)
- [PriceHistoryResponse](#interfacespricehistoryresponsemd)
- [PriceOverview](#interfacespriceoverviewmd)
- [PriceOverviewResponse](#interfacespriceoverviewresponsemd)
- [Purchase](#interfacespurchasemd)
- [PurchaseResponse](#interfacespurchaseresponsemd)
- [Search](#interfacessearchmd)
- [SearchOptions](#interfacessearchoptionsmd)
- [SearchResponse](#interfacessearchresponsemd)

# Class: default

## Table of contents

### Constructors

- [constructor](#constructor)

### Methods

- [buyOrderStatus](#buyorderstatus)
- [buyOrderStatusQuery](#buyorderstatusquery)
- [cancelBuyOrder](#cancelbuyorder)
- [cancelBuyOrderQuery](#cancelbuyorderquery)
- [cancelSellOrder](#cancelsellorder)
- [cancelSellOrderQuery](#cancelsellorderquery)
- [createBuyOrder](#createbuyorder)
- [createBuyOrderQuery](#createbuyorderquery)
- [createSellOrder](#createsellorder)
- [createSellOrderQuery](#createsellorderquery)
- [getCookies](#getcookies)
- [getCountry](#getcountry)
- [getCurrency](#getcurrency)
- [getDigits](#getdigits)
- [getLanguage](#getlanguage)
- [getSessionId](#getsessionid)
- [getUnits](#getunits)
- [getVanityURL](#getvanityurl)
- [itemNameId](#itemnameid)
- [itemNameIdQuery](#itemnameidquery)
- [itemOrdersHistogram](#itemordershistogram)
- [itemOrdersHistogramQuery](#itemordershistogramquery)
- [myHistory](#myhistory)
- [myHistoryQuery](#myhistoryquery)
- [myListings](#mylistings)
- [myListingsQuery](#mylistingsquery)
- [priceHistory](#pricehistory)
- [priceHistoryQuery](#pricehistoryquery)
- [priceOverview](#priceoverview)
- [priceOverviewQuery](#priceoverviewquery)
- [search](#search)
- [searchQuery](#searchquery)
- [setCookies](#setcookies)
- [setCountry](#setcountry)
- [setCurrency](#setcurrency)
- [setVanityURL](#setvanityurl)

## Constructors

### constructor

• **new default**(`options?`)

#### Parameters

| Name       | Type       |
|:-----------|:-----------|
| `options?` | ``null`` \ | [`MarketOptions`](#interfacesmarketoptionsmd) |

#### Defined in

[SteamMarket.ts:43](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/SteamMarket.ts#L43)

## Methods

### buyOrderStatus

▸ **buyOrderStatus**(`appId`, `marketHashName`, `buyOrderId`):
`Promise`<[`BuyOrderStatus`](#interfacesbuyorderstatusmd)\>

#### Parameters

| Name             | Type     |
|:-----------------|:---------|
| `appId`          | `number` |
| `marketHashName` | `string` |
| `buyOrderId`     | `number` |

#### Returns

`Promise`<[`BuyOrderStatus`](#interfacesbuyorderstatusmd)\>

#### Defined in

[SteamMarket.ts:636](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/SteamMarket.ts#L636)

___

### buyOrderStatusQuery

▸ **buyOrderStatusQuery**(`appId`, `marketHashName`, `buyOrderId`):
`Promise`<[`BuyOrderStatusResponse`](#interfacesbuyorderstatusresponsemd)\>

#### Parameters

| Name             | Type     |
|:-----------------|:---------|
| `appId`          | `number` |
| `marketHashName` | `string` |
| `buyOrderId`     | `number` |

#### Returns

`Promise`<[`BuyOrderStatusResponse`](#interfacesbuyorderstatusresponsemd)\>

#### Defined in

[SteamMarket.ts:617](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/SteamMarket.ts#L617)

___

### cancelBuyOrder

▸ **cancelBuyOrder**(`buyOrderId`): `Promise`<``null``\>

#### Parameters

| Name         | Type     |
|:-------------|:---------|
| `buyOrderId` | `number` |

#### Returns

`Promise`<``null``\>

#### Defined in

[SteamMarket.ts:670](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/SteamMarket.ts#L670)

___

### cancelBuyOrderQuery

▸ **cancelBuyOrderQuery**(`buyOrderId`): `Promise`<``null``\>

#### Parameters

| Name         | Type     |
|:-------------|:---------|
| `buyOrderId` | `number` |

#### Returns

`Promise`<``null``\>

#### Defined in

[SteamMarket.ts:653](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/SteamMarket.ts#L653)

___

### cancelSellOrder

▸ **cancelSellOrder**(`listingId`): `Promise`<[]\>

#### Parameters

| Name        | Type     |
|:------------|:---------|
| `listingId` | `number` |

#### Returns

`Promise`<[]\>

#### Defined in

[SteamMarket.ts:690](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/SteamMarket.ts#L690)

___

### cancelSellOrderQuery

▸ **cancelSellOrderQuery**(`listingId`): `Promise`<[]\>

#### Parameters

| Name        | Type     |
|:------------|:---------|
| `listingId` | `number` |

#### Returns

`Promise`<[]\>

#### Defined in

[SteamMarket.ts:674](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/SteamMarket.ts#L674)

___

### createBuyOrder

▸ **createBuyOrder**(`appId`, `options`): `Promise`<[`CreateBuyOrder`](#interfacescreatebuyordermd)\>

#### Parameters

| Name      | Type                                                          |
|:----------|:--------------------------------------------------------------|
| `appId`   | `number`                                                      |
| `options` | [`CreateBuyOrderOptions`](#interfacescreatebuyorderoptionsmd) |

#### Returns

`Promise`<[`CreateBuyOrder`](#interfacescreatebuyordermd)\>

#### Defined in

[SteamMarket.ts:575](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/SteamMarket.ts#L575)

___

### createBuyOrderQuery

▸ **createBuyOrderQuery**(`appId`, `options`):
`Promise`<[`CreateBuyOrderResponse`](#interfacescreatebuyorderresponsemd)\>

#### Parameters

| Name      | Type                                                          |
|:----------|:--------------------------------------------------------------|
| `appId`   | `number`                                                      |
| `options` | [`CreateBuyOrderOptions`](#interfacescreatebuyorderoptionsmd) |

#### Returns

`Promise`<[`CreateBuyOrderResponse`](#interfacescreatebuyorderresponsemd)\>

#### Defined in

[SteamMarket.ts:552](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/SteamMarket.ts#L552)

___

### createSellOrder

▸ **createSellOrder**(`appId`, `options`): `Promise`<[`CreateSellOrder`](#interfacescreatesellordermd)\>

#### Parameters

| Name      | Type                                                            |
|:----------|:----------------------------------------------------------------|
| `appId`   | `number`                                                        |
| `options` | [`CreateSellOrderOptions`](#interfacescreatesellorderoptionsmd) |

#### Returns

`Promise`<[`CreateSellOrder`](#interfacescreatesellordermd)\>

#### Defined in

[SteamMarket.ts:605](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/SteamMarket.ts#L605)

___

### createSellOrderQuery

▸ **createSellOrderQuery**(`appId`, `options`):
`Promise`<[`CreateSellOrderResponse`](#interfacescreatesellorderresponsemd)\>

#### Parameters

| Name      | Type                                                            |
|:----------|:----------------------------------------------------------------|
| `appId`   | `number`                                                        |
| `options` | [`CreateSellOrderOptions`](#interfacescreatesellorderoptionsmd) |

#### Returns

`Promise`<[`CreateSellOrderResponse`](#interfacescreatesellorderresponsemd)\>

#### Defined in

[SteamMarket.ts:584](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/SteamMarket.ts#L584)

___

### getCookies

▸ **getCookies**(): `string`[]

#### Returns

`string`[]

#### Defined in

[SteamMarket.ts:202](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/SteamMarket.ts#L202)

___

### getCountry

▸ **getCountry**(): `string`

#### Returns

`string`

#### Defined in

[SteamMarket.ts:222](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/SteamMarket.ts#L222)

___

### getCurrency

▸ **getCurrency**(): [`ECurrencyCode`](#enumsecurrencycodemd)

#### Returns

[`ECurrencyCode`](#enumsecurrencycodemd)

#### Defined in

[SteamMarket.ts:210](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/SteamMarket.ts#L210)

___

### getDigits

▸ **getDigits**(): `number`

#### Returns

`number`

#### Defined in

[SteamMarket.ts:214](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/SteamMarket.ts#L214)

___

### getLanguage

▸ **getLanguage**(): `string`

#### Returns

`string`

#### Defined in

[SteamMarket.ts:226](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/SteamMarket.ts#L226)

___

### getSessionId

▸ **getSessionId**(): `string`

#### Returns

`string`

#### Defined in

[SteamMarket.ts:206](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/SteamMarket.ts#L206)

___

### getUnits

▸ **getUnits**(): `number`

#### Returns

`number`

#### Defined in

[SteamMarket.ts:218](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/SteamMarket.ts#L218)

___

### getVanityURL

▸ **getVanityURL**(): `string`

#### Returns

`string`

#### Defined in

[SteamMarket.ts:230](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/SteamMarket.ts#L230)

___

### itemNameId

▸ **itemNameId**(`appId`, `marketHashName`): `Promise`<`number`\>

#### Parameters

| Name             | Type     |
|:-----------------|:---------|
| `appId`          | `number` |
| `marketHashName` | `string` |

#### Returns

`Promise`<`number`\>

#### Defined in

[SteamMarket.ts:313](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/SteamMarket.ts#L313)

___

### itemNameIdQuery

▸ **itemNameIdQuery**(`appId`, `marketHashName`): `Promise`<`string`\>

#### Parameters

| Name             | Type     |
|:-----------------|:---------|
| `appId`          | `number` |
| `marketHashName` | `string` |

#### Returns

`Promise`<`string`\>

#### Defined in

[SteamMarket.ts:302](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/SteamMarket.ts#L302)

___

### itemOrdersHistogram

▸ **itemOrdersHistogram**(`appId`, `marketHashName`, `itemNameId`):
`Promise`<[`ItemOrdersHistogram`](#interfacesitemordershistogrammd)\>

#### Parameters

| Name             | Type     |
|:-----------------|:---------|
| `appId`          | `number` |
| `marketHashName` | `string` |
| `itemNameId`     | `number` |

#### Returns

`Promise`<[`ItemOrdersHistogram`](#interfacesitemordershistogrammd)\>

#### Defined in

[SteamMarket.ts:352](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/SteamMarket.ts#L352)

___

### itemOrdersHistogramQuery

▸ **itemOrdersHistogramQuery**(`appId`, `marketHashName`, `itemNameId`):
`Promise`<[`ItemOrdersHistogramResponse`](#interfacesitemordershistogramresponsemd)\>

#### Parameters

| Name             | Type     |
|:-----------------|:---------|
| `appId`          | `number` |
| `marketHashName` | `string` |
| `itemNameId`     | `number` |

#### Returns

`Promise`<[`ItemOrdersHistogramResponse`](#interfacesitemordershistogramresponsemd)\>

#### Defined in

[SteamMarket.ts:329](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/SteamMarket.ts#L329)

___

### myHistory

▸ **myHistory**(`start?`, `count?`): `Promise`<[`MyHistory`](#interfacesmyhistorymd)\>

#### Parameters

| Name     | Type       |
|:---------|:-----------|
| `start?` | ``null`` \ | `number` |
| `count?` | ``null`` \ | `number` |

#### Returns

`Promise`<[`MyHistory`](#interfacesmyhistorymd)\>

#### Defined in

[SteamMarket.ts:506](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/SteamMarket.ts#L506)

___

### myHistoryQuery

▸ **myHistoryQuery**(`start?`, `count?`): `Promise`<[`MyHistoryResponse`](#interfacesmyhistoryresponsemd)\>

#### Parameters

| Name     | Type       |
|:---------|:-----------|
| `start?` | ``null`` \ | `number` |
| `count?` | ``null`` \ | `number` |

#### Returns

`Promise`<[`MyHistoryResponse`](#interfacesmyhistoryresponsemd)\>

#### Defined in

[SteamMarket.ts:489](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/SteamMarket.ts#L489)

___

### myListings

▸ **myListings**(`start?`, `count?`): `Promise`<[`MyListings`](#interfacesmylistingsmd)\>

#### Parameters

| Name     | Type       |
|:---------|:-----------|
| `start?` | ``null`` \ | `number` |
| `count?` | ``null`` \ | `number` |

#### Returns

`Promise`<[`MyListings`](#interfacesmylistingsmd)\>

#### Defined in

[SteamMarket.ts:463](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/SteamMarket.ts#L463)

___

### myListingsQuery

▸ **myListingsQuery**(`start?`, `count?`): `Promise`<[`MyListingsResponse`](#interfacesmylistingsresponsemd)\>

#### Parameters

| Name     | Type       |
|:---------|:-----------|
| `start?` | ``null`` \ | `number` |
| `count?` | ``null`` \ | `number` |

#### Returns

`Promise`<[`MyListingsResponse`](#interfacesmylistingsresponsemd)\>

#### Defined in

[SteamMarket.ts:446](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/SteamMarket.ts#L446)

___

### priceHistory

▸ **priceHistory**(`appId`, `marketHashName`): `Promise`<[`PriceHistory`](#interfacespricehistorymd)\>

#### Parameters

| Name             | Type     |
|:-----------------|:---------|
| `appId`          | `number` |
| `marketHashName` | `string` |

#### Returns

`Promise`<[`PriceHistory`](#interfacespricehistorymd)\>

#### Defined in

[SteamMarket.ts:431](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/SteamMarket.ts#L431)

___

### priceHistoryQuery

▸ **priceHistoryQuery**(`appId`, `marketHashName`):
`Promise`<[`PriceHistoryResponse`](#interfacespricehistoryresponsemd)\>

#### Parameters

| Name             | Type     |
|:-----------------|:---------|
| `appId`          | `number` |
| `marketHashName` | `string` |

#### Returns

`Promise`<[`PriceHistoryResponse`](#interfacespricehistoryresponsemd)\>

#### Defined in

[SteamMarket.ts:413](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/SteamMarket.ts#L413)

___

### priceOverview

▸ **priceOverview**(`appId`, `marketHashName`): `Promise`<[`PriceOverview`](#interfacespriceoverviewmd)\>

#### Parameters

| Name             | Type     |
|:-----------------|:---------|
| `appId`          | `number` |
| `marketHashName` | `string` |

#### Returns

`Promise`<[`PriceOverview`](#interfacespriceoverviewmd)\>

#### Defined in

[SteamMarket.ts:402](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/SteamMarket.ts#L402)

___

### priceOverviewQuery

▸ **priceOverviewQuery**(`appId`, `marketHashName`):
`Promise`<[`PriceOverviewResponse`](#interfacespriceoverviewresponsemd)\>

#### Parameters

| Name             | Type     |
|:-----------------|:---------|
| `appId`          | `number` |
| `marketHashName` | `string` |

#### Returns

`Promise`<[`PriceOverviewResponse`](#interfacespriceoverviewresponsemd)\>

#### Defined in

[SteamMarket.ts:385](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/SteamMarket.ts#L385)

___

### search

▸ **search**(`appId`, `options?`): `Promise`<[`Search`](#interfacessearchmd)\>

#### Parameters

| Name       | Type       |
|:-----------|:-----------|
| `appId`    | `number`   |
| `options?` | ``null`` \ | [`SearchOptions`](#interfacessearchoptionsmd) |

#### Returns

`Promise`<[`Search`](#interfacessearchmd)\>

#### Defined in

[SteamMarket.ts:258](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/SteamMarket.ts#L258)

___

### searchQuery

▸ **searchQuery**(`appId`, `options?`): `Promise`<[`SearchResponse`](#interfacessearchresponsemd)\>

#### Parameters

| Name       | Type       |
|:-----------|:-----------|
| `appId`    | `number`   |
| `options?` | ``null`` \ | [`SearchOptions`](#interfacessearchoptionsmd) |

#### Returns

`Promise`<[`SearchResponse`](#interfacessearchresponsemd)\>

#### Defined in

[SteamMarket.ts:234](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/SteamMarket.ts#L234)

___

### setCookies

▸ **setCookies**(`cookies`): `void`

#### Parameters

| Name      | Type       |
|:----------|:-----------|
| `cookies` | `string`[] |

#### Returns

`void`

#### Defined in

[SteamMarket.ts:164](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/SteamMarket.ts#L164)

___

### setCountry

▸ **setCountry**(`country`): `void`

#### Parameters

| Name      | Type     |
|:----------|:---------|
| `country` | `string` |

#### Returns

`void`

#### Defined in

[SteamMarket.ts:187](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/SteamMarket.ts#L187)

___

### setCurrency

▸ **setCurrency**(`currency`): `void`

#### Parameters

| Name       | Type                                     |
|:-----------|:-----------------------------------------|
| `currency` | [`ECurrencyCode`](#enumsecurrencycodemd) |

#### Returns

`void`

#### Defined in

[SteamMarket.ts:175](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/SteamMarket.ts#L175)

___

### setVanityURL

▸ **setVanityURL**(`vanityURL`): `void`

#### Parameters

| Name        | Type     |
|:------------|:---------|
| `vanityURL` | `string` |

#### Returns

`void`

#### Defined in

[SteamMarket.ts:198](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/SteamMarket.ts#L198)

# Interface: Action

## Table of contents

### Properties

- [link](#link)
- [name](#name)

## Properties

### link

• **link**: `string`

#### Defined in

[types/Action.ts:2](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Action.ts#L2)

___

### name

• **name**: `string`

#### Defined in

[types/Action.ts:3](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Action.ts#L3)

# Interface: Asset

## Table of contents

### Properties

- [actions](#actions)
- [amount](#amount)
- [appIcon](#appicon)
- [appId](#appid)
- [backgroundColor](#backgroundcolor)
- [classId](#classid)
- [commodity](#commodity)
- [containedItem](#containeditem)
- [contextId](#contextid)
- [currency](#currency)
- [descriptions](#descriptions)
- [fraudWarnings](#fraudwarnings)
- [iconUrl](#iconurl)
- [iconUrlLarge](#iconurllarge)
- [id](#id)
- [instanceId](#instanceid)
- [itemExpiration](#itemexpiration)
- [marketActions](#marketactions)
- [marketBuyCountryRestriction](#marketbuycountryrestriction)
- [marketFee](#marketfee)
- [marketFeeApp](#marketfeeapp)
- [marketHashName](#markethashname)
- [marketMarketableRestriction](#marketmarketablerestriction)
- [marketName](#marketname)
- [marketSellCountryRestriction](#marketsellcountryrestriction)
- [marketTradableRestriction](#markettradablerestriction)
- [marketable](#marketable)
- [name](#name)
- [nameColor](#namecolor)
- [newContextId](#newcontextid)
- [newId](#newid)
- [originalAmount](#originalamount)
- [owner](#owner)
- [ownerActions](#owneractions)
- [ownerDescriptions](#ownerdescriptions)
- [rollbackNewContextId](#rollbacknewcontextid)
- [rollbackNewId](#rollbacknewid)
- [status](#status)
- [tags](#tags)
- [tradable](#tradable)
- [type](#type)
- [unownedContextId](#unownedcontextid)
- [unownedId](#unownedid)

## Properties

### actions

• `Optional` **actions**: ``null`` \| [`Action`](#interfacesactionmd)[]

#### Defined in

[types/Asset.ts:21](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Asset.ts#L21)

___

### amount

• `Optional` **amount**: ``null`` \| `number`

#### Defined in

[types/Asset.ts:11](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Asset.ts#L11)

___

### appIcon

• `Optional` **appIcon**: ``null`` \| `string`

#### Defined in

[types/Asset.ts:42](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Asset.ts#L42)

___

### appId

• **appId**: `number`

#### Defined in

[types/Asset.ts:6](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Asset.ts#L6)

___

### backgroundColor

• **backgroundColor**: `string`

#### Defined in

[types/Asset.ts:16](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Asset.ts#L16)

___

### classId

• **classId**: `number`

#### Defined in

[types/Asset.ts:9](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Asset.ts#L9)

___

### commodity

• **commodity**: `boolean`

#### Defined in

[types/Asset.ts:34](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Asset.ts#L34)

___

### containedItem

• `Optional` **containedItem**: ``null``

#### Defined in

[types/Asset.ts:32](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Asset.ts#L32)

___

### contextId

• `Optional` **contextId**: ``null`` \| `number`

#### Defined in

[types/Asset.ts:7](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Asset.ts#L7)

___

### currency

• `Optional` **currency**: ``null`` \| `number`

#### Defined in

[types/Asset.ts:5](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Asset.ts#L5)

___

### descriptions

• **descriptions**: [`Description`](#interfacesdescriptionmd)[]

#### Defined in

[types/Asset.ts:19](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Asset.ts#L19)

___

### fraudWarnings

• `Optional` **fraudWarnings**: ``null`` \| []

#### Defined in

[types/Asset.ts:24](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Asset.ts#L24)

___

### iconUrl

• **iconUrl**: `string`

#### Defined in

[types/Asset.ts:17](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Asset.ts#L17)

___

### iconUrlLarge

• **iconUrlLarge**: `string`

#### Defined in

[types/Asset.ts:18](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Asset.ts#L18)

___

### id

• `Optional` **id**: ``null`` \| `number`

#### Defined in

[types/Asset.ts:8](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Asset.ts#L8)

___

### instanceId

• **instanceId**: `number`

#### Defined in

[types/Asset.ts:10](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Asset.ts#L10)

___

### itemExpiration

• `Optional` **itemExpiration**: ``null``

#### Defined in

[types/Asset.ts:39](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Asset.ts#L39)

___

### marketActions

• `Optional` **marketActions**: ``null`` \| [`Action`](#interfacesactionmd)[]

#### Defined in

[types/Asset.ts:33](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Asset.ts#L33)

___

### marketBuyCountryRestriction

• `Optional` **marketBuyCountryRestriction**: ``null``

#### Defined in

[types/Asset.ts:40](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Asset.ts#L40)

___

### marketFee

• `Optional` **marketFee**: ``null`` \| `number`

#### Defined in

[types/Asset.ts:30](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Asset.ts#L30)

___

### marketFeeApp

• `Optional` **marketFeeApp**: ``null`` \| `number`

#### Defined in

[types/Asset.ts:31](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Asset.ts#L31)

___

### marketHashName

• **marketHashName**: `string`

#### Defined in

[types/Asset.ts:29](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Asset.ts#L29)

___

### marketMarketableRestriction

• `Optional` **marketMarketableRestriction**: ``null`` \| `number`

#### Defined in

[types/Asset.ts:36](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Asset.ts#L36)

___

### marketName

• **marketName**: `string`

#### Defined in

[types/Asset.ts:28](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Asset.ts#L28)

___

### marketSellCountryRestriction

• `Optional` **marketSellCountryRestriction**: ``null``

#### Defined in

[types/Asset.ts:41](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Asset.ts#L41)

___

### marketTradableRestriction

• **marketTradableRestriction**: `number`

#### Defined in

[types/Asset.ts:35](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Asset.ts#L35)

___

### marketable

• **marketable**: `boolean`

#### Defined in

[types/Asset.ts:37](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Asset.ts#L37)

___

### name

• **name**: `string`

#### Defined in

[types/Asset.ts:25](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Asset.ts#L25)

___

### nameColor

• `Optional` **nameColor**: ``null`` \| `string`

#### Defined in

[types/Asset.ts:26](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Asset.ts#L26)

___

### newContextId

• `Optional` **newContextId**: ``null`` \| `string`

#### Defined in

[types/Asset.ts:47](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Asset.ts#L47)

___

### newId

• `Optional` **newId**: ``null`` \| `string`

#### Defined in

[types/Asset.ts:46](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Asset.ts#L46)

___

### originalAmount

• `Optional` **originalAmount**: ``null`` \| `number`

#### Defined in

[types/Asset.ts:13](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Asset.ts#L13)

___

### owner

• `Optional` **owner**: ``null`` \| `boolean`

#### Defined in

[types/Asset.ts:43](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Asset.ts#L43)

___

### ownerActions

• `Optional` **ownerActions**: ``null`` \| [`Action`](#interfacesactionmd)[]

#### Defined in

[types/Asset.ts:23](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Asset.ts#L23)

___

### ownerDescriptions

• `Optional` **ownerDescriptions**: ``null`` \| [`Description`](#interfacesdescriptionmd)[]

#### Defined in

[types/Asset.ts:22](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Asset.ts#L22)

___

### rollbackNewContextId

• `Optional` **rollbackNewContextId**: ``null`` \| `string`

#### Defined in

[types/Asset.ts:45](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Asset.ts#L45)

___

### rollbackNewId

• `Optional` **rollbackNewId**: ``null`` \| `string`

#### Defined in

[types/Asset.ts:44](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Asset.ts#L44)

___

### status

• `Optional` **status**: ``null`` \| `number`

#### Defined in

[types/Asset.ts:12](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Asset.ts#L12)

___

### tags

• `Optional` **tags**: ``null`` \| []

#### Defined in

[types/Asset.ts:38](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Asset.ts#L38)

___

### tradable

• **tradable**: `boolean`

#### Defined in

[types/Asset.ts:20](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Asset.ts#L20)

___

### type

• **type**: `string`

#### Defined in

[types/Asset.ts:27](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Asset.ts#L27)

___

### unownedContextId

• `Optional` **unownedContextId**: ``null`` \| `number`

#### Defined in

[types/Asset.ts:15](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Asset.ts#L15)

___

### unownedId

• `Optional` **unownedId**: ``null`` \| `number`

#### Defined in

[types/Asset.ts:14](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Asset.ts#L14)

# Interface: AssetResponse

## Table of contents

### Properties

- [actions](#actions)
- [amount](#amount)
- [app\_icon](#app_icon)
- [appid](#appid)
- [background\_color](#background_color)
- [classid](#classid)
- [commodity](#commodity)
- [contained\_item](#contained_item)
- [contextid](#contextid)
- [currency](#currency)
- [descriptions](#descriptions)
- [fraudwarnings](#fraudwarnings)
- [icon\_url](#icon_url)
- [icon\_url\_large](#icon_url_large)
- [id](#id)
- [instanceid](#instanceid)
- [item\_expiration](#item_expiration)
- [market\_actions](#market_actions)
- [market\_buy\_country\_restriction](#market_buy_country_restriction)
- [market\_fee](#market_fee)
- [market\_fee\_app](#market_fee_app)
- [market\_hash\_name](#market_hash_name)
- [market\_marketable\_restriction](#market_marketable_restriction)
- [market\_name](#market_name)
- [market\_sell\_country\_restriction](#market_sell_country_restriction)
- [market\_tradable\_restriction](#market_tradable_restriction)
- [marketable](#marketable)
- [name](#name)
- [name\_color](#name_color)
- [new\_contextid](#new_contextid)
- [new\_id](#new_id)
- [original\_amount](#original_amount)
- [owner](#owner)
- [owner\_actions](#owner_actions)
- [owner\_descriptions](#owner_descriptions)
- [rollback\_new\_contextid](#rollback_new_contextid)
- [rollback\_new\_id](#rollback_new_id)
- [status](#status)
- [tags](#tags)
- [tradable](#tradable)
- [type](#type)
- [unowned\_contextid](#unowned_contextid)
- [unowned\_id](#unowned_id)

## Properties

### actions

• `Optional` **actions**: ``null`` \| [`Action`](#interfacesactionmd)[]

#### Defined in

[types/AssetResponse.ts:21](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/AssetResponse.ts#L21)

___

### amount

• `Optional` **amount**: ``null`` \| `string`

#### Defined in

[types/AssetResponse.ts:11](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/AssetResponse.ts#L11)

___

### app\_icon

• `Optional` **app\_icon**: ``null`` \| `string`

#### Defined in

[types/AssetResponse.ts:42](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/AssetResponse.ts#L42)

___

### appid

• **appid**: `number`

#### Defined in

[types/AssetResponse.ts:6](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/AssetResponse.ts#L6)

___

### background\_color

• **background\_color**: `string`

#### Defined in

[types/AssetResponse.ts:16](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/AssetResponse.ts#L16)

___

### classid

• **classid**: `string`

#### Defined in

[types/AssetResponse.ts:9](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/AssetResponse.ts#L9)

___

### commodity

• **commodity**: `number`

#### Defined in

[types/AssetResponse.ts:34](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/AssetResponse.ts#L34)

___

### contained\_item

• `Optional` **contained\_item**: ``null``

#### Defined in

[types/AssetResponse.ts:32](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/AssetResponse.ts#L32)

___

### contextid

• `Optional` **contextid**: ``null`` \| `string`

#### Defined in

[types/AssetResponse.ts:7](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/AssetResponse.ts#L7)

___

### currency

• `Optional` **currency**: ``null`` \| `number`

#### Defined in

[types/AssetResponse.ts:5](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/AssetResponse.ts#L5)

___

### descriptions

• **descriptions**: [`Description`](#interfacesdescriptionmd)[]

#### Defined in

[types/AssetResponse.ts:19](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/AssetResponse.ts#L19)

___

### fraudwarnings

• `Optional` **fraudwarnings**: ``null`` \| []

#### Defined in

[types/AssetResponse.ts:24](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/AssetResponse.ts#L24)

___

### icon\_url

• **icon\_url**: `string`

#### Defined in

[types/AssetResponse.ts:17](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/AssetResponse.ts#L17)

___

### icon\_url\_large

• **icon\_url\_large**: `string`

#### Defined in

[types/AssetResponse.ts:18](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/AssetResponse.ts#L18)

___

### id

• `Optional` **id**: ``null`` \| `string`

#### Defined in

[types/AssetResponse.ts:8](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/AssetResponse.ts#L8)

___

### instanceid

• **instanceid**: `string`

#### Defined in

[types/AssetResponse.ts:10](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/AssetResponse.ts#L10)

___

### item\_expiration

• `Optional` **item\_expiration**: ``null``

#### Defined in

[types/AssetResponse.ts:39](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/AssetResponse.ts#L39)

___

### market\_actions

• `Optional` **market\_actions**: ``null`` \| [`Action`](#interfacesactionmd)[]

#### Defined in

[types/AssetResponse.ts:33](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/AssetResponse.ts#L33)

___

### market\_buy\_country\_restriction

• `Optional` **market\_buy\_country\_restriction**: ``null``

#### Defined in

[types/AssetResponse.ts:40](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/AssetResponse.ts#L40)

___

### market\_fee

• `Optional` **market\_fee**: ``null`` \| `number`

#### Defined in

[types/AssetResponse.ts:30](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/AssetResponse.ts#L30)

___

### market\_fee\_app

• `Optional` **market\_fee\_app**: ``null`` \| `number`

#### Defined in

[types/AssetResponse.ts:31](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/AssetResponse.ts#L31)

___

### market\_hash\_name

• **market\_hash\_name**: `string`

#### Defined in

[types/AssetResponse.ts:29](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/AssetResponse.ts#L29)

___

### market\_marketable\_restriction

• `Optional` **market\_marketable\_restriction**: ``null`` \| `number`

#### Defined in

[types/AssetResponse.ts:36](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/AssetResponse.ts#L36)

___

### market\_name

• **market\_name**: `string`

#### Defined in

[types/AssetResponse.ts:28](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/AssetResponse.ts#L28)

___

### market\_sell\_country\_restriction

• `Optional` **market\_sell\_country\_restriction**: ``null``

#### Defined in

[types/AssetResponse.ts:41](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/AssetResponse.ts#L41)

___

### market\_tradable\_restriction

• **market\_tradable\_restriction**: `number`

#### Defined in

[types/AssetResponse.ts:35](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/AssetResponse.ts#L35)

___

### marketable

• **marketable**: `number`

#### Defined in

[types/AssetResponse.ts:37](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/AssetResponse.ts#L37)

___

### name

• **name**: `string`

#### Defined in

[types/AssetResponse.ts:25](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/AssetResponse.ts#L25)

___

### name\_color

• `Optional` **name\_color**: ``null`` \| `string`

#### Defined in

[types/AssetResponse.ts:26](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/AssetResponse.ts#L26)

___

### new\_contextid

• `Optional` **new\_contextid**: ``null`` \| `string`

#### Defined in

[types/AssetResponse.ts:47](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/AssetResponse.ts#L47)

___

### new\_id

• `Optional` **new\_id**: ``null`` \| `string`

#### Defined in

[types/AssetResponse.ts:46](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/AssetResponse.ts#L46)

___

### original\_amount

• `Optional` **original\_amount**: ``null`` \| `string`

#### Defined in

[types/AssetResponse.ts:13](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/AssetResponse.ts#L13)

___

### owner

• `Optional` **owner**: ``null`` \| `number`

#### Defined in

[types/AssetResponse.ts:43](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/AssetResponse.ts#L43)

___

### owner\_actions

• `Optional` **owner\_actions**: ``null`` \| [`Action`](#interfacesactionmd)[]

#### Defined in

[types/AssetResponse.ts:23](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/AssetResponse.ts#L23)

___

### owner\_descriptions

• `Optional` **owner\_descriptions**: ``null`` \| [`Description`](#interfacesdescriptionmd)[]

#### Defined in

[types/AssetResponse.ts:22](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/AssetResponse.ts#L22)

___

### rollback\_new\_contextid

• `Optional` **rollback\_new\_contextid**: ``null`` \| `string`

#### Defined in

[types/AssetResponse.ts:45](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/AssetResponse.ts#L45)

___

### rollback\_new\_id

• `Optional` **rollback\_new\_id**: ``null`` \| `string`

#### Defined in

[types/AssetResponse.ts:44](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/AssetResponse.ts#L44)

___

### status

• `Optional` **status**: ``null`` \| `number`

#### Defined in

[types/AssetResponse.ts:12](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/AssetResponse.ts#L12)

___

### tags

• `Optional` **tags**: ``null`` \| []

#### Defined in

[types/AssetResponse.ts:38](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/AssetResponse.ts#L38)

___

### tradable

• **tradable**: `number`

#### Defined in

[types/AssetResponse.ts:20](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/AssetResponse.ts#L20)

___

### type

• **type**: `string`

#### Defined in

[types/AssetResponse.ts:27](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/AssetResponse.ts#L27)

___

### unowned\_contextid

• `Optional` **unowned\_contextid**: ``null`` \| `string`

#### Defined in

[types/AssetResponse.ts:15](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/AssetResponse.ts#L15)

___

### unowned\_id

• `Optional` **unowned\_id**: ``null`` \| `string`

#### Defined in

[types/AssetResponse.ts:14](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/AssetResponse.ts#L14)

# Interface: BuyOrder

## Table of contents

### Properties

- [appId](#appid)
- [buyOrderId](#buyorderid)
- [description](#description)
- [hashName](#hashname)
- [price](#price)
- [quantity](#quantity)
- [quantityRemaining](#quantityremaining)
- [walletCurrency](#walletcurrency)

## Properties

### appId

• **appId**: `number`

#### Defined in

[types/BuyOrder.ts:4](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/BuyOrder.ts#L4)

___

### buyOrderId

• **buyOrderId**: `number`

#### Defined in

[types/BuyOrder.ts:10](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/BuyOrder.ts#L10)

___

### description

• **description**: [`Asset`](#interfacesassetmd)

#### Defined in

[types/BuyOrder.ts:11](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/BuyOrder.ts#L11)

___

### hashName

• **hashName**: `string`

#### Defined in

[types/BuyOrder.ts:5](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/BuyOrder.ts#L5)

___

### price

• **price**: `number`

#### Defined in

[types/BuyOrder.ts:7](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/BuyOrder.ts#L7)

___

### quantity

• **quantity**: `number`

#### Defined in

[types/BuyOrder.ts:8](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/BuyOrder.ts#L8)

___

### quantityRemaining

• **quantityRemaining**: `number`

#### Defined in

[types/BuyOrder.ts:9](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/BuyOrder.ts#L9)

___

### walletCurrency

• **walletCurrency**: `number`

#### Defined in

[types/BuyOrder.ts:6](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/BuyOrder.ts#L6)

# Interface: BuyOrderResponse

## Table of contents

### Properties

- [appid](#appid)
- [buy\_orderid](#buy_orderid)
- [description](#description)
- [hash\_name](#hash_name)
- [price](#price)
- [quantity](#quantity)
- [quantity\_remaining](#quantity_remaining)
- [wallet\_currency](#wallet_currency)

## Properties

### appid

• **appid**: `number`

#### Defined in

[types/BuyOrderResponse.ts:4](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/BuyOrderResponse.ts#L4)

___

### buy\_orderid

• **buy\_orderid**: `string`

#### Defined in

[types/BuyOrderResponse.ts:10](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/BuyOrderResponse.ts#L10)

___

### description

• **description**: [`AssetResponse`](#interfacesassetresponsemd)

#### Defined in

[types/BuyOrderResponse.ts:11](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/BuyOrderResponse.ts#L11)

___

### hash\_name

• **hash\_name**: `string`

#### Defined in

[types/BuyOrderResponse.ts:5](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/BuyOrderResponse.ts#L5)

___

### price

• **price**: `string`

#### Defined in

[types/BuyOrderResponse.ts:7](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/BuyOrderResponse.ts#L7)

___

### quantity

• **quantity**: `string`

#### Defined in

[types/BuyOrderResponse.ts:8](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/BuyOrderResponse.ts#L8)

___

### quantity\_remaining

• **quantity\_remaining**: `string`

#### Defined in

[types/BuyOrderResponse.ts:9](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/BuyOrderResponse.ts#L9)

___

### wallet\_currency

• **wallet\_currency**: `number`

#### Defined in

[types/BuyOrderResponse.ts:6](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/BuyOrderResponse.ts#L6)

# Interface: BuyOrderStatus

## Table of contents

### Properties

- [active](#active)
- [purchased](#purchased)
- [purchases](#purchases)
- [quantity](#quantity)
- [quantityRemaining](#quantityremaining)
- [success](#success)

## Properties

### active

• **active**: `boolean`

#### Defined in

[types/BuyOrderStatus.ts:3](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/BuyOrderStatus.ts#L3)

___

### purchased

• **purchased**: `number`

#### Defined in

[types/BuyOrderStatus.ts:4](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/BuyOrderStatus.ts#L4)

___

### purchases

• **purchases**: []

#### Defined in

[types/BuyOrderStatus.ts:7](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/BuyOrderStatus.ts#L7)

___

### quantity

• **quantity**: `number`

#### Defined in

[types/BuyOrderStatus.ts:5](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/BuyOrderStatus.ts#L5)

___

### quantityRemaining

• **quantityRemaining**: `number`

#### Defined in

[types/BuyOrderStatus.ts:6](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/BuyOrderStatus.ts#L6)

___

### success

• **success**: `boolean`

#### Defined in

[types/BuyOrderStatus.ts:2](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/BuyOrderStatus.ts#L2)

# Interface: BuyOrderStatusResponse

## Table of contents

### Properties

- [active](#active)
- [purchased](#purchased)
- [purchases](#purchases)
- [quantity](#quantity)
- [quantity\_remaining](#quantity_remaining)
- [success](#success)

## Properties

### active

• **active**: `number`

#### Defined in

[types/BuyOrderStatusResponse.ts:3](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/BuyOrderStatusResponse.ts#L3)

___

### purchased

• **purchased**: `number`

#### Defined in

[types/BuyOrderStatusResponse.ts:4](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/BuyOrderStatusResponse.ts#L4)

___

### purchases

• **purchases**: []

#### Defined in

[types/BuyOrderStatusResponse.ts:7](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/BuyOrderStatusResponse.ts#L7)

___

### quantity

• **quantity**: `number`

#### Defined in

[types/BuyOrderStatusResponse.ts:5](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/BuyOrderStatusResponse.ts#L5)

___

### quantity\_remaining

• **quantity\_remaining**: `number`

#### Defined in

[types/BuyOrderStatusResponse.ts:6](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/BuyOrderStatusResponse.ts#L6)

___

### success

• **success**: `number`

#### Defined in

[types/BuyOrderStatusResponse.ts:2](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/BuyOrderStatusResponse.ts#L2)

# Interface: CreateBuyOrder

## Table of contents

### Properties

- [buyOrderId](#buyorderid)
- [success](#success)

## Properties

### buyOrderId

• **buyOrderId**: `number`

#### Defined in

[types/CreateBuyOrder.ts:3](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/CreateBuyOrder.ts#L3)

___

### success

• **success**: `boolean`

#### Defined in

[types/CreateBuyOrder.ts:2](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/CreateBuyOrder.ts#L2)

# Interface: CreateBuyOrderOptions

## Table of contents

### Properties

- [amount](#amount)
- [marketHashName](#markethashname)
- [price](#price)

## Properties

### amount

• **amount**: `number`

#### Defined in

[types/CreateBuyOrderOptions.ts:4](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/CreateBuyOrderOptions.ts#L4)

___

### marketHashName

• **marketHashName**: `string`

#### Defined in

[types/CreateBuyOrderOptions.ts:2](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/CreateBuyOrderOptions.ts#L2)

___

### price

• **price**: `number`

#### Defined in

[types/CreateBuyOrderOptions.ts:3](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/CreateBuyOrderOptions.ts#L3)

# Interface: CreateBuyOrderResponse

## Table of contents

### Properties

- [buy\_orderid](#buy_orderid)
- [success](#success)

## Properties

### buy\_orderid

• **buy\_orderid**: `string`

#### Defined in

[types/CreateBuyOrderResponse.ts:3](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/CreateBuyOrderResponse.ts#L3)

___

### success

• **success**: `number`

#### Defined in

[types/CreateBuyOrderResponse.ts:2](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/CreateBuyOrderResponse.ts#L2)

# Interface: CreateSellOrder

## Table of contents

### Properties

- [emailDomain](#emaildomain)
- [needsEmailConfirmation](#needsemailconfirmation)
- [needsMobileConfirmation](#needsmobileconfirmation)
- [requiresConfirmation](#requiresconfirmation)
- [success](#success)

## Properties

### emailDomain

• **emailDomain**: `string`

#### Defined in

[types/CreateSellOrder.ts:6](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/CreateSellOrder.ts#L6)

___

### needsEmailConfirmation

• **needsEmailConfirmation**: `boolean`

#### Defined in

[types/CreateSellOrder.ts:5](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/CreateSellOrder.ts#L5)

___

### needsMobileConfirmation

• **needsMobileConfirmation**: `boolean`

#### Defined in

[types/CreateSellOrder.ts:4](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/CreateSellOrder.ts#L4)

___

### requiresConfirmation

• **requiresConfirmation**: `boolean`

#### Defined in

[types/CreateSellOrder.ts:3](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/CreateSellOrder.ts#L3)

___

### success

• **success**: `boolean`

#### Defined in

[types/CreateSellOrder.ts:2](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/CreateSellOrder.ts#L2)

# Interface: CreateSellOrderOptions

## Table of contents

### Properties

- [amount](#amount)
- [assetId](#assetid)
- [contextId](#contextid)
- [price](#price)

## Properties

### amount

• **amount**: `number`

#### Defined in

[types/CreateSellOrderOptions.ts:5](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/CreateSellOrderOptions.ts#L5)

___

### assetId

• **assetId**: `number`

#### Defined in

[types/CreateSellOrderOptions.ts:2](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/CreateSellOrderOptions.ts#L2)

___

### contextId

• **contextId**: `number`

#### Defined in

[types/CreateSellOrderOptions.ts:3](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/CreateSellOrderOptions.ts#L3)

___

### price

• **price**: `number`

#### Defined in

[types/CreateSellOrderOptions.ts:4](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/CreateSellOrderOptions.ts#L4)

# Interface: CreateSellOrderResponse

## Table of contents

### Properties

- [email\_domain](#email_domain)
- [needs\_email\_confirmation](#needs_email_confirmation)
- [needs\_mobile\_confirmation](#needs_mobile_confirmation)
- [requires\_confirmation](#requires_confirmation)
- [success](#success)

## Properties

### email\_domain

• **email\_domain**: `string`

#### Defined in

[types/CreateSellOrderResponse.ts:6](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/CreateSellOrderResponse.ts#L6)

___

### needs\_email\_confirmation

• **needs\_email\_confirmation**: `boolean`

#### Defined in

[types/CreateSellOrderResponse.ts:5](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/CreateSellOrderResponse.ts#L5)

___

### needs\_mobile\_confirmation

• **needs\_mobile\_confirmation**: `boolean`

#### Defined in

[types/CreateSellOrderResponse.ts:4](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/CreateSellOrderResponse.ts#L4)

___

### requires\_confirmation

• **requires\_confirmation**: `number`

#### Defined in

[types/CreateSellOrderResponse.ts:3](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/CreateSellOrderResponse.ts#L3)

___

### success

• **success**: `boolean`

#### Defined in

[types/CreateSellOrderResponse.ts:2](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/CreateSellOrderResponse.ts#L2)

# Interface: Description

## Table of contents

### Properties

- [color](#color)
- [label](#label)
- [type](#type)
- [value](#value)

## Properties

### color

• `Optional` **color**: ``null`` \| `string`

#### Defined in

[types/Description.ts:4](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Description.ts#L4)

___

### label

• `Optional` **label**: ``null`` \| `string`

#### Defined in

[types/Description.ts:5](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Description.ts#L5)

___

### type

• `Optional` **type**: ``null`` \| `string`

#### Defined in

[types/Description.ts:2](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Description.ts#L2)

___

### value

• **value**: `string`

#### Defined in

[types/Description.ts:3](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Description.ts#L3)

# Interface: Event

## Table of contents

### Properties

- [dateEvent](#dateevent)
- [eventType](#eventtype)
- [listingId](#listingid)
- [purchaseId](#purchaseid)
- [steamIdActor](#steamidactor)
- [timeEvent](#timeevent)
- [timeEventFraction](#timeeventfraction)

## Properties

### dateEvent

• **dateEvent**: `string`

#### Defined in

[types/Event.ts:8](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Event.ts#L8)

___

### eventType

• **eventType**: `number`

#### Defined in

[types/Event.ts:4](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Event.ts#L4)

___

### listingId

• **listingId**: `number`

#### Defined in

[types/Event.ts:2](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Event.ts#L2)

___

### purchaseId

• `Optional` **purchaseId**: ``null`` \| `number`

#### Defined in

[types/Event.ts:3](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Event.ts#L3)

___

### steamIdActor

• **steamIdActor**: `number`

#### Defined in

[types/Event.ts:7](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Event.ts#L7)

___

### timeEvent

• **timeEvent**: `number`

#### Defined in

[types/Event.ts:5](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Event.ts#L5)

___

### timeEventFraction

• **timeEventFraction**: `number`

#### Defined in

[types/Event.ts:6](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Event.ts#L6)

# Interface: EventResponse

## Table of contents

### Properties

- [date\_event](#date_event)
- [event\_type](#event_type)
- [listingid](#listingid)
- [purchaseid](#purchaseid)
- [steamid\_actor](#steamid_actor)
- [time\_event](#time_event)
- [time\_event\_fraction](#time_event_fraction)

## Properties

### date\_event

• **date\_event**: `string`

#### Defined in

[types/EventResponse.ts:8](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/EventResponse.ts#L8)

___

### event\_type

• **event\_type**: `number`

#### Defined in

[types/EventResponse.ts:4](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/EventResponse.ts#L4)

___

### listingid

• **listingid**: `string`

#### Defined in

[types/EventResponse.ts:2](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/EventResponse.ts#L2)

___

### purchaseid

• `Optional` **purchaseid**: ``null`` \| `string`

#### Defined in

[types/EventResponse.ts:3](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/EventResponse.ts#L3)

___

### steamid\_actor

• **steamid\_actor**: `string`

#### Defined in

[types/EventResponse.ts:7](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/EventResponse.ts#L7)

___

### time\_event

• **time\_event**: `number`

#### Defined in

[types/EventResponse.ts:5](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/EventResponse.ts#L5)

___

### time\_event\_fraction

• **time\_event\_fraction**: `number`

#### Defined in

[types/EventResponse.ts:6](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/EventResponse.ts#L6)

# Interface: ItemOrdersHistogram

## Table of contents

### Properties

- [buyOrderGraph](#buyordergraph)
- [buyOrderSummary](#buyordersummary)
- [buyOrderTable](#buyordertable)
- [graphMaxX](#graphmaxx)
- [graphMaxY](#graphmaxy)
- [graphMinX](#graphminx)
- [highestBuyOrder](#highestbuyorder)
- [lowestSellOrder](#lowestsellorder)
- [pricePrefix](#priceprefix)
- [priceSuffix](#pricesuffix)
- [sellOrderGraph](#sellordergraph)
- [sellOrderSummary](#sellordersummary)
- [sellOrderTable](#sellordertable)
- [success](#success)

## Properties

### buyOrderGraph

• **buyOrderGraph**: { `description`: `string` ; `price`: `number` ; `volume`: `number`  }[]

#### Defined in

[types/ItemOrdersHistogram.ts:9](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ItemOrdersHistogram.ts#L9)

___

### buyOrderSummary

• **buyOrderSummary**: `string`

#### Defined in

[types/ItemOrdersHistogram.ts:6](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ItemOrdersHistogram.ts#L6)

___

### buyOrderTable

• **buyOrderTable**: `string`

#### Defined in

[types/ItemOrdersHistogram.ts:5](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ItemOrdersHistogram.ts#L5)

___

### graphMaxX

• **graphMaxX**: `number`

#### Defined in

[types/ItemOrdersHistogram.ts:21](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ItemOrdersHistogram.ts#L21)

___

### graphMaxY

• **graphMaxY**: `number`

#### Defined in

[types/ItemOrdersHistogram.ts:19](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ItemOrdersHistogram.ts#L19)

___

### graphMinX

• **graphMinX**: `number`

#### Defined in

[types/ItemOrdersHistogram.ts:20](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ItemOrdersHistogram.ts#L20)

___

### highestBuyOrder

• **highestBuyOrder**: `number`

#### Defined in

[types/ItemOrdersHistogram.ts:7](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ItemOrdersHistogram.ts#L7)

___

### lowestSellOrder

• **lowestSellOrder**: `number`

#### Defined in

[types/ItemOrdersHistogram.ts:8](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ItemOrdersHistogram.ts#L8)

___

### pricePrefix

• **pricePrefix**: `string`

#### Defined in

[types/ItemOrdersHistogram.ts:22](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ItemOrdersHistogram.ts#L22)

___

### priceSuffix

• **priceSuffix**: `string`

#### Defined in

[types/ItemOrdersHistogram.ts:23](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ItemOrdersHistogram.ts#L23)

___

### sellOrderGraph

• **sellOrderGraph**: { `description`: `string` ; `price`: `number` ; `volume`: `number`  }[]

#### Defined in

[types/ItemOrdersHistogram.ts:14](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ItemOrdersHistogram.ts#L14)

___

### sellOrderSummary

• **sellOrderSummary**: `string`

#### Defined in

[types/ItemOrdersHistogram.ts:4](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ItemOrdersHistogram.ts#L4)

___

### sellOrderTable

• **sellOrderTable**: `string`

#### Defined in

[types/ItemOrdersHistogram.ts:3](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ItemOrdersHistogram.ts#L3)

___

### success

• **success**: `boolean`

#### Defined in

[types/ItemOrdersHistogram.ts:2](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ItemOrdersHistogram.ts#L2)

# Interface: ItemOrdersHistogramResponse

## Table of contents

### Properties

- [buy\_order\_graph](#buy_order_graph)
- [buy\_order\_summary](#buy_order_summary)
- [buy\_order\_table](#buy_order_table)
- [graph\_max\_x](#graph_max_x)
- [graph\_max\_y](#graph_max_y)
- [graph\_min\_x](#graph_min_x)
- [highest\_buy\_order](#highest_buy_order)
- [lowest\_sell\_order](#lowest_sell_order)
- [price\_prefix](#price_prefix)
- [price\_suffix](#price_suffix)
- [sell\_order\_graph](#sell_order_graph)
- [sell\_order\_summary](#sell_order_summary)
- [sell\_order\_table](#sell_order_table)
- [success](#success)

## Properties

### buy\_order\_graph

• **buy\_order\_graph**: [`number`, `number`, `string`][]

#### Defined in

[types/ItemOrdersHistogramResponse.ts:9](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ItemOrdersHistogramResponse.ts#L9)

___

### buy\_order\_summary

• **buy\_order\_summary**: `string`

#### Defined in

[types/ItemOrdersHistogramResponse.ts:6](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ItemOrdersHistogramResponse.ts#L6)

___

### buy\_order\_table

• **buy\_order\_table**: `string`

#### Defined in

[types/ItemOrdersHistogramResponse.ts:5](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ItemOrdersHistogramResponse.ts#L5)

___

### graph\_max\_x

• **graph\_max\_x**: `number`

#### Defined in

[types/ItemOrdersHistogramResponse.ts:13](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ItemOrdersHistogramResponse.ts#L13)

___

### graph\_max\_y

• **graph\_max\_y**: `number`

#### Defined in

[types/ItemOrdersHistogramResponse.ts:11](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ItemOrdersHistogramResponse.ts#L11)

___

### graph\_min\_x

• **graph\_min\_x**: `number`

#### Defined in

[types/ItemOrdersHistogramResponse.ts:12](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ItemOrdersHistogramResponse.ts#L12)

___

### highest\_buy\_order

• **highest\_buy\_order**: `string`

#### Defined in

[types/ItemOrdersHistogramResponse.ts:7](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ItemOrdersHistogramResponse.ts#L7)

___

### lowest\_sell\_order

• **lowest\_sell\_order**: `string`

#### Defined in

[types/ItemOrdersHistogramResponse.ts:8](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ItemOrdersHistogramResponse.ts#L8)

___

### price\_prefix

• **price\_prefix**: `string`

#### Defined in

[types/ItemOrdersHistogramResponse.ts:14](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ItemOrdersHistogramResponse.ts#L14)

___

### price\_suffix

• **price\_suffix**: `string`

#### Defined in

[types/ItemOrdersHistogramResponse.ts:15](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ItemOrdersHistogramResponse.ts#L15)

___

### sell\_order\_graph

• **sell\_order\_graph**: [`number`, `number`, `string`][]

#### Defined in

[types/ItemOrdersHistogramResponse.ts:10](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ItemOrdersHistogramResponse.ts#L10)

___

### sell\_order\_summary

• **sell\_order\_summary**: `string`

#### Defined in

[types/ItemOrdersHistogramResponse.ts:4](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ItemOrdersHistogramResponse.ts#L4)

___

### sell\_order\_table

• **sell\_order\_table**: `string`

#### Defined in

[types/ItemOrdersHistogramResponse.ts:3](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ItemOrdersHistogramResponse.ts#L3)

___

### success

• **success**: `number`

#### Defined in

[types/ItemOrdersHistogramResponse.ts:2](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ItemOrdersHistogramResponse.ts#L2)

# Interface: Listing

## Table of contents

### Properties

- [active](#active)
- [asset](#asset)
- [cancelReason](#cancelreason)
- [cancelReasonShort](#cancelreasonshort)
- [convertedCurrencyId](#convertedcurrencyid)
- [convertedFee](#convertedfee)
- [convertedFeePerUnit](#convertedfeeperunit)
- [convertedPrice](#convertedprice)
- [convertedPricePerUnit](#convertedpriceperunit)
- [convertedPublisherFee](#convertedpublisherfee)
- [convertedPublisherFeePerUnit](#convertedpublisherfeeperunit)
- [convertedSteamFee](#convertedsteamfee)
- [convertedSteamFeePerUnit](#convertedsteamfeeperunit)
- [currencyId](#currencyid)
- [fee](#fee)
- [feePerUnit](#feeperunit)
- [itemExpired](#itemexpired)
- [listingId](#listingid)
- [originalAmountListed](#originalamountlisted)
- [originalPrice](#originalprice)
- [originalPricePerUnit](#originalpriceperunit)
- [price](#price)
- [publisherFee](#publisherfee)
- [publisherFeeApp](#publisherfeeapp)
- [publisherFeePerUnit](#publisherfeeperunit)
- [publisherFeePercent](#publisherfeepercent)
- [status](#status)
- [steamFee](#steamfee)
- [steamFeePerUnit](#steamfeeperunit)
- [steamIdLister](#steamidlister)
- [timeCreated](#timecreated)
- [timeCreatedStr](#timecreatedstr)
- [timeFinishHold](#timefinishhold)

## Properties

### active

• `Optional` **active**: ``null`` \| `number`

#### Defined in

[types/Listing.ts:16](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Listing.ts#L16)

___

### asset

• **asset**: [`Asset`](#interfacesassetmd)

#### Defined in

[types/Listing.ts:6](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Listing.ts#L6)

___

### cancelReason

• `Optional` **cancelReason**: ``null`` \| `string`

#### Defined in

[types/Listing.ts:23](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Listing.ts#L23)

___

### cancelReasonShort

• `Optional` **cancelReasonShort**: ``null`` \| `string`

#### Defined in

[types/Listing.ts:24](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Listing.ts#L24)

___

### convertedCurrencyId

• `Optional` **convertedCurrencyId**: ``null`` \| `number`

#### Defined in

[types/Listing.ts:14](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Listing.ts#L14)

___

### convertedFee

• `Optional` **convertedFee**: ``null`` \| `number`

#### Defined in

[types/Listing.ts:13](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Listing.ts#L13)

___

### convertedFeePerUnit

• `Optional` **convertedFeePerUnit**: ``null`` \| `number`

#### Defined in

[types/Listing.ts:32](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Listing.ts#L32)

___

### convertedPrice

• `Optional` **convertedPrice**: ``null`` \| `number`

#### Defined in

[types/Listing.ts:12](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Listing.ts#L12)

___

### convertedPricePerUnit

• `Optional` **convertedPricePerUnit**: ``null`` \| `number`

#### Defined in

[types/Listing.ts:31](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Listing.ts#L31)

___

### convertedPublisherFee

• `Optional` **convertedPublisherFee**: ``null`` \| `number`

#### Defined in

[types/Listing.ts:20](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Listing.ts#L20)

___

### convertedPublisherFeePerUnit

• `Optional` **convertedPublisherFeePerUnit**: ``null`` \| `number`

#### Defined in

[types/Listing.ts:34](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Listing.ts#L34)

___

### convertedSteamFee

• `Optional` **convertedSteamFee**: ``null`` \| `number`

#### Defined in

[types/Listing.ts:18](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Listing.ts#L18)

___

### convertedSteamFeePerUnit

• `Optional` **convertedSteamFeePerUnit**: ``null`` \| `number`

#### Defined in

[types/Listing.ts:33](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Listing.ts#L33)

___

### currencyId

• **currencyId**: `number`

#### Defined in

[types/Listing.ts:11](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Listing.ts#L11)

___

### fee

• **fee**: `number`

#### Defined in

[types/Listing.ts:10](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Listing.ts#L10)

___

### feePerUnit

• `Optional` **feePerUnit**: ``null`` \| `number`

#### Defined in

[types/Listing.ts:28](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Listing.ts#L28)

___

### itemExpired

• `Optional` **itemExpired**: ``null`` \| `number`

#### Defined in

[types/Listing.ts:25](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Listing.ts#L25)

___

### listingId

• **listingId**: `number`

#### Defined in

[types/Listing.ts:4](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Listing.ts#L4)

___

### originalAmountListed

• `Optional` **originalAmountListed**: ``null`` \| `number`

#### Defined in

[types/Listing.ts:26](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Listing.ts#L26)

___

### originalPrice

• **originalPrice**: `number`

#### Defined in

[types/Listing.ts:9](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Listing.ts#L9)

___

### originalPricePerUnit

• `Optional` **originalPricePerUnit**: ``null`` \| `number`

#### Defined in

[types/Listing.ts:27](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Listing.ts#L27)

___

### price

• **price**: `number`

#### Defined in

[types/Listing.ts:8](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Listing.ts#L8)

___

### publisherFee

• `Optional` **publisherFee**: ``null`` \| `number`

#### Defined in

[types/Listing.ts:19](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Listing.ts#L19)

___

### publisherFeeApp

• **publisherFeeApp**: `number`

#### Defined in

[types/Listing.ts:22](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Listing.ts#L22)

___

### publisherFeePerUnit

• `Optional` **publisherFeePerUnit**: ``null`` \| `number`

#### Defined in

[types/Listing.ts:30](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Listing.ts#L30)

___

### publisherFeePercent

• **publisherFeePercent**: `number`

#### Defined in

[types/Listing.ts:21](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Listing.ts#L21)

___

### status

• `Optional` **status**: ``null`` \| `number`

#### Defined in

[types/Listing.ts:15](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Listing.ts#L15)

___

### steamFee

• `Optional` **steamFee**: ``null`` \| `number`

#### Defined in

[types/Listing.ts:17](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Listing.ts#L17)

___

### steamFeePerUnit

• `Optional` **steamFeePerUnit**: ``null`` \| `number`

#### Defined in

[types/Listing.ts:29](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Listing.ts#L29)

___

### steamIdLister

• `Optional` **steamIdLister**: ``null`` \| `number`

#### Defined in

[types/Listing.ts:7](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Listing.ts#L7)

___

### timeCreated

• `Optional` **timeCreated**: ``null`` \| `number`

#### Defined in

[types/Listing.ts:5](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Listing.ts#L5)

___

### timeCreatedStr

• `Optional` **timeCreatedStr**: ``null`` \| `string`

#### Defined in

[types/Listing.ts:36](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Listing.ts#L36)

___

### timeFinishHold

• `Optional` **timeFinishHold**: ``null`` \| `number`

#### Defined in

[types/Listing.ts:35](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Listing.ts#L35)

# Interface: ListingResponse

## Table of contents

### Properties

- [active](#active)
- [asset](#asset)
- [cancel\_reason](#cancel_reason)
- [cancel\_reason\_short](#cancel_reason_short)
- [converted\_currencyid](#converted_currencyid)
- [converted\_fee](#converted_fee)
- [converted\_fee\_per\_unit](#converted_fee_per_unit)
- [converted\_price](#converted_price)
- [converted\_price\_per\_unit](#converted_price_per_unit)
- [converted\_publisher\_fee](#converted_publisher_fee)
- [converted\_publisher\_fee\_per\_unit](#converted_publisher_fee_per_unit)
- [converted\_steam\_fee](#converted_steam_fee)
- [converted\_steam\_fee\_per\_unit](#converted_steam_fee_per_unit)
- [currencyid](#currencyid)
- [fee](#fee)
- [fee\_per\_unit](#fee_per_unit)
- [item\_expired](#item_expired)
- [listingid](#listingid)
- [original\_amount\_listed](#original_amount_listed)
- [original\_price](#original_price)
- [original\_price\_per\_unit](#original_price_per_unit)
- [price](#price)
- [publisher\_fee](#publisher_fee)
- [publisher\_fee\_app](#publisher_fee_app)
- [publisher\_fee\_per\_unit](#publisher_fee_per_unit)
- [publisher\_fee\_percent](#publisher_fee_percent)
- [status](#status)
- [steam\_fee](#steam_fee)
- [steam\_fee\_per\_unit](#steam_fee_per_unit)
- [steamid\_lister](#steamid_lister)
- [time\_created](#time_created)
- [time\_created\_str](#time_created_str)
- [time\_finish\_hold](#time_finish_hold)

## Properties

### active

• `Optional` **active**: ``null`` \| `number`

#### Defined in

[types/ListingResponse.ts:16](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ListingResponse.ts#L16)

___

### asset

• **asset**: [`AssetResponse`](#interfacesassetresponsemd)

#### Defined in

[types/ListingResponse.ts:6](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ListingResponse.ts#L6)

___

### cancel\_reason

• `Optional` **cancel\_reason**: ``null`` \| `string`

#### Defined in

[types/ListingResponse.ts:23](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ListingResponse.ts#L23)

___

### cancel\_reason\_short

• `Optional` **cancel\_reason\_short**: ``null`` \| `string`

#### Defined in

[types/ListingResponse.ts:24](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ListingResponse.ts#L24)

___

### converted\_currencyid

• `Optional` **converted\_currencyid**: ``null`` \| `string`

#### Defined in

[types/ListingResponse.ts:14](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ListingResponse.ts#L14)

___

### converted\_fee

• `Optional` **converted\_fee**: ``null`` \| `number`

#### Defined in

[types/ListingResponse.ts:13](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ListingResponse.ts#L13)

___

### converted\_fee\_per\_unit

• `Optional` **converted\_fee\_per\_unit**: ``null`` \| `number`

#### Defined in

[types/ListingResponse.ts:32](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ListingResponse.ts#L32)

___

### converted\_price

• `Optional` **converted\_price**: ``null`` \| `number`

#### Defined in

[types/ListingResponse.ts:12](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ListingResponse.ts#L12)

___

### converted\_price\_per\_unit

• `Optional` **converted\_price\_per\_unit**: ``null`` \| `number`

#### Defined in

[types/ListingResponse.ts:31](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ListingResponse.ts#L31)

___

### converted\_publisher\_fee

• `Optional` **converted\_publisher\_fee**: ``null`` \| `number`

#### Defined in

[types/ListingResponse.ts:20](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ListingResponse.ts#L20)

___

### converted\_publisher\_fee\_per\_unit

• `Optional` **converted\_publisher\_fee\_per\_unit**: ``null`` \| `number`

#### Defined in

[types/ListingResponse.ts:34](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ListingResponse.ts#L34)

___

### converted\_steam\_fee

• `Optional` **converted\_steam\_fee**: ``null`` \| `number`

#### Defined in

[types/ListingResponse.ts:18](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ListingResponse.ts#L18)

___

### converted\_steam\_fee\_per\_unit

• `Optional` **converted\_steam\_fee\_per\_unit**: ``null`` \| `number`

#### Defined in

[types/ListingResponse.ts:33](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ListingResponse.ts#L33)

___

### currencyid

• **currencyid**: `string`

#### Defined in

[types/ListingResponse.ts:11](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ListingResponse.ts#L11)

___

### fee

• **fee**: `number`

#### Defined in

[types/ListingResponse.ts:10](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ListingResponse.ts#L10)

___

### fee\_per\_unit

• `Optional` **fee\_per\_unit**: ``null`` \| `number`

#### Defined in

[types/ListingResponse.ts:28](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ListingResponse.ts#L28)

___

### item\_expired

• `Optional` **item\_expired**: ``null`` \| `number`

#### Defined in

[types/ListingResponse.ts:25](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ListingResponse.ts#L25)

___

### listingid

• **listingid**: `string`

#### Defined in

[types/ListingResponse.ts:4](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ListingResponse.ts#L4)

___

### original\_amount\_listed

• `Optional` **original\_amount\_listed**: ``null`` \| `number`

#### Defined in

[types/ListingResponse.ts:26](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ListingResponse.ts#L26)

___

### original\_price

• **original\_price**: `number`

#### Defined in

[types/ListingResponse.ts:9](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ListingResponse.ts#L9)

___

### original\_price\_per\_unit

• `Optional` **original\_price\_per\_unit**: ``null`` \| `number`

#### Defined in

[types/ListingResponse.ts:27](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ListingResponse.ts#L27)

___

### price

• **price**: `number`

#### Defined in

[types/ListingResponse.ts:8](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ListingResponse.ts#L8)

___

### publisher\_fee

• `Optional` **publisher\_fee**: ``null`` \| `number`

#### Defined in

[types/ListingResponse.ts:19](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ListingResponse.ts#L19)

___

### publisher\_fee\_app

• **publisher\_fee\_app**: `number`

#### Defined in

[types/ListingResponse.ts:22](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ListingResponse.ts#L22)

___

### publisher\_fee\_per\_unit

• `Optional` **publisher\_fee\_per\_unit**: ``null`` \| `number`

#### Defined in

[types/ListingResponse.ts:30](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ListingResponse.ts#L30)

___

### publisher\_fee\_percent

• **publisher\_fee\_percent**: `string`

#### Defined in

[types/ListingResponse.ts:21](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ListingResponse.ts#L21)

___

### status

• `Optional` **status**: ``null`` \| `number`

#### Defined in

[types/ListingResponse.ts:15](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ListingResponse.ts#L15)

___

### steam\_fee

• `Optional` **steam\_fee**: ``null`` \| `number`

#### Defined in

[types/ListingResponse.ts:17](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ListingResponse.ts#L17)

___

### steam\_fee\_per\_unit

• `Optional` **steam\_fee\_per\_unit**: ``null`` \| `number`

#### Defined in

[types/ListingResponse.ts:29](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ListingResponse.ts#L29)

___

### steamid\_lister

• `Optional` **steamid\_lister**: ``null`` \| `string`

#### Defined in

[types/ListingResponse.ts:7](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ListingResponse.ts#L7)

___

### time\_created

• `Optional` **time\_created**: ``null`` \| `number`

#### Defined in

[types/ListingResponse.ts:5](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ListingResponse.ts#L5)

___

### time\_created\_str

• `Optional` **time\_created\_str**: ``null`` \| `string`

#### Defined in

[types/ListingResponse.ts:36](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ListingResponse.ts#L36)

___

### time\_finish\_hold

• `Optional` **time\_finish\_hold**: ``null`` \| `number`

#### Defined in

[types/ListingResponse.ts:35](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ListingResponse.ts#L35)

# Interface: MarketOptions

## Table of contents

### Properties

- [additionalHeaders](#additionalheaders)
- [httpProxy](#httpproxy)
- [socksProxy](#socksproxy)

## Properties

### additionalHeaders

• `Optional` **additionalHeaders**: `Record`<`string`, `string`\>

#### Defined in

[types/MarketOptions.ts:2](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/MarketOptions.ts#L2)

___

### httpProxy

• `Optional` **httpProxy**: ``null`` \| `string`

#### Defined in

[types/MarketOptions.ts:3](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/MarketOptions.ts#L3)

___

### socksProxy

• `Optional` **socksProxy**: ``null`` \| `string`

#### Defined in

[types/MarketOptions.ts:4](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/MarketOptions.ts#L4)

# Interface: MyHistory

## Table of contents

### Properties

- [assets](#assets)
- [events](#events)
- [listings](#listings)
- [pageSize](#pagesize)
- [purchases](#purchases)
- [start](#start)
- [success](#success)
- [totalCount](#totalcount)

## Properties

### assets

• **assets**: [`Asset`](#interfacesassetmd)[]

#### Defined in

[types/MyHistory.ts:11](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/MyHistory.ts#L11)

___

### events

• **events**: [`Event`](#interfaceseventmd)[]

#### Defined in

[types/MyHistory.ts:12](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/MyHistory.ts#L12)

___

### listings

• **listings**: [`Listing`](#interfaceslistingmd)[]

#### Defined in

[types/MyHistory.ts:14](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/MyHistory.ts#L14)

___

### pageSize

• **pageSize**: `number`

#### Defined in

[types/MyHistory.ts:8](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/MyHistory.ts#L8)

___

### purchases

• **purchases**: [`Purchase`](#interfacespurchasemd)[]

#### Defined in

[types/MyHistory.ts:13](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/MyHistory.ts#L13)

___

### start

• **start**: `number`

#### Defined in

[types/MyHistory.ts:10](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/MyHistory.ts#L10)

___

### success

• **success**: `boolean`

#### Defined in

[types/MyHistory.ts:7](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/MyHistory.ts#L7)

___

### totalCount

• **totalCount**: `number`

#### Defined in

[types/MyHistory.ts:9](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/MyHistory.ts#L9)

# Interface: MyHistoryResponse

## Table of contents

### Properties

- [assets](#assets)
- [events](#events)
- [listings](#listings)
- [pagesize](#pagesize)
- [purchases](#purchases)
- [start](#start)
- [success](#success)
- [total\_count](#total_count)

## Properties

### assets

• **assets
**: `Record`<`string`, `Record`<`string`, `Record`<`string`, [`AssetResponse`](#interfacesassetresponsemd)\>\>\>

#### Defined in

[types/MyHistoryResponse.ts:11](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/MyHistoryResponse.ts#L11)

___

### events

• **events**: [`EventResponse`](#interfaceseventresponsemd)[]

#### Defined in

[types/MyHistoryResponse.ts:12](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/MyHistoryResponse.ts#L12)

___

### listings

• **listings**: `Record`<`string`, [`ListingResponse`](#interfaceslistingresponsemd)\>

#### Defined in

[types/MyHistoryResponse.ts:14](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/MyHistoryResponse.ts#L14)

___

### pagesize

• **pagesize**: `number`

#### Defined in

[types/MyHistoryResponse.ts:8](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/MyHistoryResponse.ts#L8)

___

### purchases

• **purchases**: `Record`<`string`, [`PurchaseResponse`](#interfacespurchaseresponsemd)\>

#### Defined in

[types/MyHistoryResponse.ts:13](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/MyHistoryResponse.ts#L13)

___

### start

• **start**: `number`

#### Defined in

[types/MyHistoryResponse.ts:10](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/MyHistoryResponse.ts#L10)

___

### success

• **success**: `boolean`

#### Defined in

[types/MyHistoryResponse.ts:7](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/MyHistoryResponse.ts#L7)

___

### total\_count

• **total\_count**: `number`

#### Defined in

[types/MyHistoryResponse.ts:9](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/MyHistoryResponse.ts#L9)

# Interface: MyListings

## Table of contents

### Properties

- [assets](#assets)
- [buyOrders](#buyorders)
- [listings](#listings)
- [listingsOnHold](#listingsonhold)
- [listingsToConfirm](#listingstoconfirm)
- [numActiveListings](#numactivelistings)
- [pageSize](#pagesize)
- [start](#start)
- [success](#success)
- [totalCount](#totalcount)

## Properties

### assets

• **assets**: [`Asset`](#interfacesassetmd)[]

#### Defined in

[types/MyListings.ts:9](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/MyListings.ts#L9)

___

### buyOrders

• **buyOrders**: [`BuyOrder`](#interfacesbuyordermd)[]

#### Defined in

[types/MyListings.ts:15](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/MyListings.ts#L15)

___

### listings

• **listings**: [`Listing`](#interfaceslistingmd)[]

#### Defined in

[types/MyListings.ts:12](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/MyListings.ts#L12)

___

### listingsOnHold

• **listingsOnHold**: [`Listing`](#interfaceslistingmd)[]

#### Defined in

[types/MyListings.ts:13](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/MyListings.ts#L13)

___

### listingsToConfirm

• **listingsToConfirm**: [`Listing`](#interfaceslistingmd)[]

#### Defined in

[types/MyListings.ts:14](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/MyListings.ts#L14)

___

### numActiveListings

• **numActiveListings**: `number`

#### Defined in

[types/MyListings.ts:11](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/MyListings.ts#L11)

___

### pageSize

• **pageSize**: `number`

#### Defined in

[types/MyListings.ts:7](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/MyListings.ts#L7)

___

### start

• **start**: `number`

#### Defined in

[types/MyListings.ts:10](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/MyListings.ts#L10)

___

### success

• **success**: `boolean`

#### Defined in

[types/MyListings.ts:6](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/MyListings.ts#L6)

___

### totalCount

• **totalCount**: `number`

#### Defined in

[types/MyListings.ts:8](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/MyListings.ts#L8)

# Interface: MyListingsResponse

## Table of contents

### Properties

- [assets](#assets)
- [buy\_orders](#buy_orders)
- [listings](#listings)
- [listings\_on\_hold](#listings_on_hold)
- [listings\_to\_confirm](#listings_to_confirm)
- [num\_active\_listings](#num_active_listings)
- [pagesize](#pagesize)
- [start](#start)
- [success](#success)
- [total\_count](#total_count)

## Properties

### assets

• **assets
**: `Record`<`string`, `Record`<`string`, `Record`<`string`, [`AssetResponse`](#interfacesassetresponsemd)\>\>\>

#### Defined in

[types/MyListingsResponse.ts:9](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/MyListingsResponse.ts#L9)

___

### buy\_orders

• **buy\_orders**: [`BuyOrderResponse`](#interfacesbuyorderresponsemd)[]

#### Defined in

[types/MyListingsResponse.ts:15](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/MyListingsResponse.ts#L15)

___

### listings

• **listings**: [`ListingResponse`](#interfaceslistingresponsemd)[]

#### Defined in

[types/MyListingsResponse.ts:12](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/MyListingsResponse.ts#L12)

___

### listings\_on\_hold

• **listings\_on\_hold**: [`ListingResponse`](#interfaceslistingresponsemd)[]

#### Defined in

[types/MyListingsResponse.ts:13](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/MyListingsResponse.ts#L13)

___

### listings\_to\_confirm

• **listings\_to\_confirm**: [`ListingResponse`](#interfaceslistingresponsemd)[]

#### Defined in

[types/MyListingsResponse.ts:14](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/MyListingsResponse.ts#L14)

___

### num\_active\_listings

• **num\_active\_listings**: `number`

#### Defined in

[types/MyListingsResponse.ts:11](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/MyListingsResponse.ts#L11)

___

### pagesize

• **pagesize**: `number`

#### Defined in

[types/MyListingsResponse.ts:7](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/MyListingsResponse.ts#L7)

___

### start

• **start**: `number`

#### Defined in

[types/MyListingsResponse.ts:10](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/MyListingsResponse.ts#L10)

___

### success

• **success**: `boolean`

#### Defined in

[types/MyListingsResponse.ts:6](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/MyListingsResponse.ts#L6)

___

### total\_count

• **total\_count**: `number`

#### Defined in

[types/MyListingsResponse.ts:8](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/MyListingsResponse.ts#L8)

# Interface: PriceHistory

## Table of contents

### Properties

- [pricePrefix](#priceprefix)
- [priceSuffix](#pricesuffix)
- [prices](#prices)
- [success](#success)

## Properties

### pricePrefix

• **pricePrefix**: `string`

#### Defined in

[types/PriceHistory.ts:3](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/PriceHistory.ts#L3)

___

### priceSuffix

• **priceSuffix**: `string`

#### Defined in

[types/PriceHistory.ts:4](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/PriceHistory.ts#L4)

___

### prices

• **prices**: { `datetime`: `string` ; `price`: `number` ; `volume`: `number`  }[]

#### Defined in

[types/PriceHistory.ts:5](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/PriceHistory.ts#L5)

___

### success

• **success**: `boolean`

#### Defined in

[types/PriceHistory.ts:2](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/PriceHistory.ts#L2)

# Interface: PriceHistoryResponse

## Table of contents

### Properties

- [price\_prefix](#price_prefix)
- [price\_suffix](#price_suffix)
- [prices](#prices)
- [success](#success)

## Properties

### price\_prefix

• **price\_prefix**: `string`

#### Defined in

[types/PriceHistoryResponse.ts:3](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/PriceHistoryResponse.ts#L3)

___

### price\_suffix

• **price\_suffix**: `string`

#### Defined in

[types/PriceHistoryResponse.ts:4](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/PriceHistoryResponse.ts#L4)

___

### prices

• **prices**: [`string`, `number`, `string`][]

#### Defined in

[types/PriceHistoryResponse.ts:5](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/PriceHistoryResponse.ts#L5)

___

### success

• **success**: `boolean`

#### Defined in

[types/PriceHistoryResponse.ts:2](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/PriceHistoryResponse.ts#L2)

# Interface: PriceOverview

## Table of contents

### Properties

- [lowestPrice](#lowestprice)
- [medianPrice](#medianprice)
- [success](#success)
- [volume](#volume)

## Properties

### lowestPrice

• **lowestPrice**: `string`

#### Defined in

[types/PriceOverview.ts:3](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/PriceOverview.ts#L3)

___

### medianPrice

• **medianPrice**: `string`

#### Defined in

[types/PriceOverview.ts:5](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/PriceOverview.ts#L5)

___

### success

• **success**: `boolean`

#### Defined in

[types/PriceOverview.ts:2](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/PriceOverview.ts#L2)

___

### volume

• **volume**: `number`

#### Defined in

[types/PriceOverview.ts:4](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/PriceOverview.ts#L4)

# Interface: PriceOverviewResponse

## Table of contents

### Properties

- [lowest\_price](#lowest_price)
- [median\_price](#median_price)
- [success](#success)
- [volume](#volume)

## Properties

### lowest\_price

• **lowest\_price**: `string`

#### Defined in

[types/PriceOverviewResponse.ts:3](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/PriceOverviewResponse.ts#L3)

___

### median\_price

• **median\_price**: `string`

#### Defined in

[types/PriceOverviewResponse.ts:5](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/PriceOverviewResponse.ts#L5)

___

### success

• **success**: `boolean`

#### Defined in

[types/PriceOverviewResponse.ts:2](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/PriceOverviewResponse.ts#L2)

___

### volume

• **volume**: `string`

#### Defined in

[types/PriceOverviewResponse.ts:4](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/PriceOverviewResponse.ts#L4)

# Interface: Purchase

## Table of contents

### Properties

- [asset](#asset)
- [avatarActor](#avataractor)
- [currencyId](#currencyid)
- [failed](#failed)
- [fundsHeld](#fundsheld)
- [fundsReturned](#fundsreturned)
- [fundsRevoked](#fundsrevoked)
- [listingId](#listingid)
- [needsRollback](#needsrollback)
- [paidAmount](#paidamount)
- [paidFee](#paidfee)
- [personaActor](#personaactor)
- [publisherFee](#publisherfee)
- [publisherFeeApp](#publisherfeeapp)
- [publisherFeePercent](#publisherfeepercent)
- [purchaseId](#purchaseid)
- [receivedAmount](#receivedamount)
- [receivedCurrencyId](#receivedcurrencyid)
- [steamFee](#steamfee)
- [steamIdPurchaser](#steamidpurchaser)
- [timeFundsHeldUntil](#timefundshelduntil)
- [timeSold](#timesold)

## Properties

### asset

• **asset**: [`Asset`](#interfacesassetmd)

#### Defined in

[types/Purchase.ts:10](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Purchase.ts#L10)

___

### avatarActor

• **avatarActor**: `string`

#### Defined in

[types/Purchase.ts:21](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Purchase.ts#L21)

___

### currencyId

• **currencyId**: `number`

#### Defined in

[types/Purchase.ts:13](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Purchase.ts#L13)

___

### failed

• **failed**: `number`

#### Defined in

[types/Purchase.ts:9](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Purchase.ts#L9)

___

### fundsHeld

• `Optional` **fundsHeld**: ``null`` \| `number`

#### Defined in

[types/Purchase.ts:23](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Purchase.ts#L23)

___

### fundsReturned

• **fundsReturned**: `number`

#### Defined in

[types/Purchase.ts:20](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Purchase.ts#L20)

___

### fundsRevoked

• `Optional` **fundsRevoked**: ``null`` \| `number`

#### Defined in

[types/Purchase.ts:25](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Purchase.ts#L25)

___

### listingId

• **listingId**: `number`

#### Defined in

[types/Purchase.ts:4](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Purchase.ts#L4)

___

### needsRollback

• **needsRollback**: `number`

#### Defined in

[types/Purchase.ts:8](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Purchase.ts#L8)

___

### paidAmount

• **paidAmount**: `number`

#### Defined in

[types/Purchase.ts:11](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Purchase.ts#L11)

___

### paidFee

• **paidFee**: `number`

#### Defined in

[types/Purchase.ts:12](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Purchase.ts#L12)

___

### personaActor

• **personaActor**: `string`

#### Defined in

[types/Purchase.ts:22](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Purchase.ts#L22)

___

### publisherFee

• **publisherFee**: `number`

#### Defined in

[types/Purchase.ts:15](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Purchase.ts#L15)

___

### publisherFeeApp

• **publisherFeeApp**: `number`

#### Defined in

[types/Purchase.ts:17](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Purchase.ts#L17)

___

### publisherFeePercent

• **publisherFeePercent**: `number`

#### Defined in

[types/Purchase.ts:16](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Purchase.ts#L16)

___

### purchaseId

• **purchaseId**: `number`

#### Defined in

[types/Purchase.ts:5](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Purchase.ts#L5)

___

### receivedAmount

• **receivedAmount**: `number`

#### Defined in

[types/Purchase.ts:18](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Purchase.ts#L18)

___

### receivedCurrencyId

• **receivedCurrencyId**: `number`

#### Defined in

[types/Purchase.ts:19](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Purchase.ts#L19)

___

### steamFee

• **steamFee**: `number`

#### Defined in

[types/Purchase.ts:14](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Purchase.ts#L14)

___

### steamIdPurchaser

• **steamIdPurchaser**: `number`

#### Defined in

[types/Purchase.ts:7](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Purchase.ts#L7)

___

### timeFundsHeldUntil

• `Optional` **timeFundsHeldUntil**: ``null`` \| `number`

#### Defined in

[types/Purchase.ts:24](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Purchase.ts#L24)

___

### timeSold

• **timeSold**: `number`

#### Defined in

[types/Purchase.ts:6](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Purchase.ts#L6)

# Interface: PurchaseResponse

## Table of contents

### Properties

- [asset](#asset)
- [avatar\_actor](#avatar_actor)
- [currencyid](#currencyid)
- [failed](#failed)
- [funds\_held](#funds_held)
- [funds\_returned](#funds_returned)
- [funds\_revoked](#funds_revoked)
- [listingid](#listingid)
- [needs\_rollback](#needs_rollback)
- [paid\_amount](#paid_amount)
- [paid\_fee](#paid_fee)
- [persona\_actor](#persona_actor)
- [publisher\_fee](#publisher_fee)
- [publisher\_fee\_app](#publisher_fee_app)
- [publisher\_fee\_percent](#publisher_fee_percent)
- [purchaseid](#purchaseid)
- [received\_amount](#received_amount)
- [received\_currencyid](#received_currencyid)
- [steam\_fee](#steam_fee)
- [steamid\_purchaser](#steamid_purchaser)
- [time\_funds\_held\_until](#time_funds_held_until)
- [time\_sold](#time_sold)

## Properties

### asset

• **asset**: [`AssetResponse`](#interfacesassetresponsemd)

#### Defined in

[types/PurchaseResponse.ts:10](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/PurchaseResponse.ts#L10)

___

### avatar\_actor

• **avatar\_actor**: `string`

#### Defined in

[types/PurchaseResponse.ts:21](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/PurchaseResponse.ts#L21)

___

### currencyid

• **currencyid**: `string`

#### Defined in

[types/PurchaseResponse.ts:13](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/PurchaseResponse.ts#L13)

___

### failed

• **failed**: `number`

#### Defined in

[types/PurchaseResponse.ts:9](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/PurchaseResponse.ts#L9)

___

### funds\_held

• `Optional` **funds\_held**: ``null`` \| `number`

#### Defined in

[types/PurchaseResponse.ts:23](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/PurchaseResponse.ts#L23)

___

### funds\_returned

• **funds\_returned**: `number`

#### Defined in

[types/PurchaseResponse.ts:20](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/PurchaseResponse.ts#L20)

___

### funds\_revoked

• `Optional` **funds\_revoked**: ``null`` \| `number`

#### Defined in

[types/PurchaseResponse.ts:25](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/PurchaseResponse.ts#L25)

___

### listingid

• **listingid**: `string`

#### Defined in

[types/PurchaseResponse.ts:4](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/PurchaseResponse.ts#L4)

___

### needs\_rollback

• **needs\_rollback**: `number`

#### Defined in

[types/PurchaseResponse.ts:8](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/PurchaseResponse.ts#L8)

___

### paid\_amount

• **paid\_amount**: `number`

#### Defined in

[types/PurchaseResponse.ts:11](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/PurchaseResponse.ts#L11)

___

### paid\_fee

• **paid\_fee**: `number`

#### Defined in

[types/PurchaseResponse.ts:12](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/PurchaseResponse.ts#L12)

___

### persona\_actor

• **persona\_actor**: `string`

#### Defined in

[types/PurchaseResponse.ts:22](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/PurchaseResponse.ts#L22)

___

### publisher\_fee

• **publisher\_fee**: `number`

#### Defined in

[types/PurchaseResponse.ts:15](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/PurchaseResponse.ts#L15)

___

### publisher\_fee\_app

• **publisher\_fee\_app**: `number`

#### Defined in

[types/PurchaseResponse.ts:17](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/PurchaseResponse.ts#L17)

___

### publisher\_fee\_percent

• **publisher\_fee\_percent**: `string`

#### Defined in

[types/PurchaseResponse.ts:16](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/PurchaseResponse.ts#L16)

___

### purchaseid

• **purchaseid**: `string`

#### Defined in

[types/PurchaseResponse.ts:5](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/PurchaseResponse.ts#L5)

___

### received\_amount

• **received\_amount**: `number`

#### Defined in

[types/PurchaseResponse.ts:18](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/PurchaseResponse.ts#L18)

___

### received\_currencyid

• **received\_currencyid**: `string`

#### Defined in

[types/PurchaseResponse.ts:19](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/PurchaseResponse.ts#L19)

___

### steam\_fee

• **steam\_fee**: `number`

#### Defined in

[types/PurchaseResponse.ts:14](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/PurchaseResponse.ts#L14)

___

### steamid\_purchaser

• **steamid\_purchaser**: `string`

#### Defined in

[types/PurchaseResponse.ts:7](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/PurchaseResponse.ts#L7)

___

### time\_funds\_held\_until

• `Optional` **time\_funds\_held\_until**: ``null`` \| `number`

#### Defined in

[types/PurchaseResponse.ts:24](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/PurchaseResponse.ts#L24)

___

### time\_sold

• **time\_sold**: `number`

#### Defined in

[types/PurchaseResponse.ts:6](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/PurchaseResponse.ts#L6)

# Interface: Search

## Table of contents

### Properties

- [pageSize](#pagesize)
- [results](#results)
- [searchData](#searchdata)
- [start](#start)
- [success](#success)
- [totalCount](#totalcount)

## Properties

### pageSize

• **pageSize**: `number`

#### Defined in

[types/Search.ts:4](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Search.ts#L4)

___

### results

• **results
**: { `appIcon`: `string` ; `appName`: `string` ; `assetDescription`: { `appId`: `number` ; `backgroundColor`: `string` ; `classId`: `string` ; `commodity`: `boolean` ; `iconUrl`: `string` ; `instanceId`: `string` ; `marketHashName`: `string` ; `marketName`: `string` ; `name`: `string` ; `nameColor`: `string` ; `tradable`: `boolean` ; `type`: `string`  } ; `hashName`: `string` ; `name`: `string` ; `salePriceText`: `string` ; `sellListings`: `number` ; `sellPrice`: `number` ; `sellPriceText`: `string`  }[]

#### Defined in

[types/Search.ts:14](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Search.ts#L14)

___

### searchData

• **searchData**: `Object`

#### Type declaration

| Name                 | Type      |
|:---------------------|:----------|
| `classPrefix`        | `string`  |
| `pageSize`           | `number`  |
| `prefix`             | `string`  |
| `query`              | `string`  |
| `searchDescriptions` | `boolean` |
| `totalCount`         | `number`  |

#### Defined in

[types/Search.ts:6](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Search.ts#L6)

___

### start

• **start**: `number`

#### Defined in

[types/Search.ts:3](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Search.ts#L3)

___

### success

• **success**: `boolean`

#### Defined in

[types/Search.ts:2](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Search.ts#L2)

___

### totalCount

• **totalCount**: `number`

#### Defined in

[types/Search.ts:5](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/Search.ts#L5)

# Interface: SearchOptions

## Table of contents

### Properties

- [count](#count)
- [query](#query)
- [searchDescriptions](#searchdescriptions)
- [sortColumn](#sortcolumn)
- [sortDir](#sortdir)
- [start](#start)

## Properties

### count

• `Optional` **count**: ``null`` \| `number`

#### Defined in

[types/SearchOptions.ts:4](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/SearchOptions.ts#L4)

___

### query

• `Optional` **query**: ``null`` \| `string`

#### Defined in

[types/SearchOptions.ts:2](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/SearchOptions.ts#L2)

___

### searchDescriptions

• `Optional` **searchDescriptions**: ``null`` \| `boolean`

#### Defined in

[types/SearchOptions.ts:5](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/SearchOptions.ts#L5)

___

### sortColumn

• `Optional` **sortColumn**: ``null`` \| `string`

#### Defined in

[types/SearchOptions.ts:6](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/SearchOptions.ts#L6)

___

### sortDir

• `Optional` **sortDir**: ``null`` \| ``"desc"`` \| ``"asc"``

#### Defined in

[types/SearchOptions.ts:7](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/SearchOptions.ts#L7)

___

### start

• `Optional` **start**: ``null`` \| `number`

#### Defined in

[types/SearchOptions.ts:3](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/SearchOptions.ts#L3)

# Interface: SearchResponse

## Table of contents

### Properties

- [pagesize](#pagesize)
- [results](#results)
- [searchdata](#searchdata)
- [start](#start)
- [success](#success)
- [total\_count](#total_count)

## Properties

### pagesize

• **pagesize**: `number`

#### Defined in

[types/SearchResponse.ts:4](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/SearchResponse.ts#L4)

___

### results

• **results
**: { `app_icon`: `string` ; `app_name`: `string` ; `asset_description`: { `appid`: `number` ; `background_color`: `string` ; `classid`: `string` ; `commodity`: `number` ; `icon_url`: `string` ; `instanceid`: `string` ; `market_hash_name`: `string` ; `market_name`: `string` ; `name`: `string` ; `name_color`: `string` ; `tradable`: `number` ; `type`: `string`  } ; `hash_name`: `string` ; `name`: `string` ; `sale_price_text`: `string` ; `sell_listings`: `number` ; `sell_price`: `number` ; `sell_price_text`: `string`  }[]

#### Defined in

[types/SearchResponse.ts:14](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/SearchResponse.ts#L14)

___

### searchdata

• **searchdata**: `Object`

#### Type declaration

| Name                  | Type      |
|:----------------------|:----------|
| `class_prefix`        | `string`  |
| `pagesize`            | `number`  |
| `prefix`              | `string`  |
| `query`               | `string`  |
| `search_descriptions` | `boolean` |
| `total_count`         | `number`  |

#### Defined in

[types/SearchResponse.ts:6](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/SearchResponse.ts#L6)

___

### start

• **start**: `number`

#### Defined in

[types/SearchResponse.ts:3](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/SearchResponse.ts#L3)

___

### success

• **success**: `boolean`

#### Defined in

[types/SearchResponse.ts:2](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/SearchResponse.ts#L2)

___

### total\_count

• **total\_count**: `number`

#### Defined in

[types/SearchResponse.ts:5](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/SearchResponse.ts#L5)

# Enumeration: ECurrencyCode

## Table of contents

### Enumeration Members

- [AED](#aed)
- [ARS](#ars)
- [AUD](#aud)
- [BRL](#brl)
- [BYN](#byn)
- [CAD](#cad)
- [CHF](#chf)
- [CLP](#clp)
- [CNY](#cny)
- [COP](#cop)
- [CRC](#crc)
- [EUR](#eur)
- [GBP](#gbp)
- [HKD](#hkd)
- [IDR](#idr)
- [ILS](#ils)
- [INR](#inr)
- [Invalid](#invalid)
- [JPY](#jpy)
- [KRW](#krw)
- [KWD](#kwd)
- [KZT](#kzt)
- [MXN](#mxn)
- [MYR](#myr)
- [NOK](#nok)
- [NZD](#nzd)
- [PEN](#pen)
- [PHP](#php)
- [PLN](#pln)
- [QAR](#qar)
- [RUB](#rub)
- [SAR](#sar)
- [SGD](#sgd)
- [THB](#thb)
- [TRY](#try)
- [TWD](#twd)
- [UAH](#uah)
- [USD](#usd)
- [UYU](#uyu)
- [VND](#vnd)
- [ZAR](#zar)

## Enumeration Members

### AED

• **AED** = ``32``

#### Defined in

[types/ECurrencyCode.ts:34](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ECurrencyCode.ts#L34)

___

### ARS

• **ARS** = ``34``

#### Defined in

[types/ECurrencyCode.ts:35](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ECurrencyCode.ts#L35)

___

### AUD

• **AUD** = ``21``

#### Defined in

[types/ECurrencyCode.ts:23](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ECurrencyCode.ts#L23)

___

### BRL

• **BRL** = ``7``

#### Defined in

[types/ECurrencyCode.ts:9](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ECurrencyCode.ts#L9)

___

### BYN

• **BYN** = ``36``

#### Defined in

[types/ECurrencyCode.ts:37](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ECurrencyCode.ts#L37)

___

### CAD

• **CAD** = ``20``

#### Defined in

[types/ECurrencyCode.ts:22](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ECurrencyCode.ts#L22)

___

### CHF

• **CHF** = ``4``

#### Defined in

[types/ECurrencyCode.ts:6](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ECurrencyCode.ts#L6)

___

### CLP

• **CLP** = ``25``

#### Defined in

[types/ECurrencyCode.ts:27](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ECurrencyCode.ts#L27)

___

### CNY

• **CNY** = ``23``

#### Defined in

[types/ECurrencyCode.ts:25](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ECurrencyCode.ts#L25)

___

### COP

• **COP** = ``27``

#### Defined in

[types/ECurrencyCode.ts:29](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ECurrencyCode.ts#L29)

___

### CRC

• **CRC** = ``40``

#### Defined in

[types/ECurrencyCode.ts:41](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ECurrencyCode.ts#L41)

___

### EUR

• **EUR** = ``3``

#### Defined in

[types/ECurrencyCode.ts:5](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ECurrencyCode.ts#L5)

___

### GBP

• **GBP** = ``2``

#### Defined in

[types/ECurrencyCode.ts:4](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ECurrencyCode.ts#L4)

___

### HKD

• **HKD** = ``29``

#### Defined in

[types/ECurrencyCode.ts:31](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ECurrencyCode.ts#L31)

___

### IDR

• **IDR** = ``10``

#### Defined in

[types/ECurrencyCode.ts:12](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ECurrencyCode.ts#L12)

___

### ILS

• **ILS** = ``35``

#### Defined in

[types/ECurrencyCode.ts:36](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ECurrencyCode.ts#L36)

___

### INR

• **INR** = ``24``

#### Defined in

[types/ECurrencyCode.ts:26](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ECurrencyCode.ts#L26)

___

### Invalid

• **Invalid** = ``0``

#### Defined in

[types/ECurrencyCode.ts:2](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ECurrencyCode.ts#L2)

___

### JPY

• **JPY** = ``8``

#### Defined in

[types/ECurrencyCode.ts:10](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ECurrencyCode.ts#L10)

___

### KRW

• **KRW** = ``16``

#### Defined in

[types/ECurrencyCode.ts:18](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ECurrencyCode.ts#L18)

___

### KWD

• **KWD** = ``38``

#### Defined in

[types/ECurrencyCode.ts:39](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ECurrencyCode.ts#L39)

___

### KZT

• **KZT** = ``37``

#### Defined in

[types/ECurrencyCode.ts:38](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ECurrencyCode.ts#L38)

___

### MXN

• **MXN** = ``19``

#### Defined in

[types/ECurrencyCode.ts:21](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ECurrencyCode.ts#L21)

___

### MYR

• **MYR** = ``11``

#### Defined in

[types/ECurrencyCode.ts:13](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ECurrencyCode.ts#L13)

___

### NOK

• **NOK** = ``9``

#### Defined in

[types/ECurrencyCode.ts:11](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ECurrencyCode.ts#L11)

___

### NZD

• **NZD** = ``22``

#### Defined in

[types/ECurrencyCode.ts:24](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ECurrencyCode.ts#L24)

___

### PEN

• **PEN** = ``26``

#### Defined in

[types/ECurrencyCode.ts:28](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ECurrencyCode.ts#L28)

___

### PHP

• **PHP** = ``12``

#### Defined in

[types/ECurrencyCode.ts:14](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ECurrencyCode.ts#L14)

___

### PLN

• **PLN** = ``6``

#### Defined in

[types/ECurrencyCode.ts:8](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ECurrencyCode.ts#L8)

___

### QAR

• **QAR** = ``39``

#### Defined in

[types/ECurrencyCode.ts:40](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ECurrencyCode.ts#L40)

___

### RUB

• **RUB** = ``5``

#### Defined in

[types/ECurrencyCode.ts:7](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ECurrencyCode.ts#L7)

___

### SAR

• **SAR** = ``31``

#### Defined in

[types/ECurrencyCode.ts:33](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ECurrencyCode.ts#L33)

___

### SGD

• **SGD** = ``13``

#### Defined in

[types/ECurrencyCode.ts:15](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ECurrencyCode.ts#L15)

___

### THB

• **THB** = ``14``

#### Defined in

[types/ECurrencyCode.ts:16](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ECurrencyCode.ts#L16)

___

### TRY

• **TRY** = ``17``

#### Defined in

[types/ECurrencyCode.ts:19](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ECurrencyCode.ts#L19)

___

### TWD

• **TWD** = ``30``

#### Defined in

[types/ECurrencyCode.ts:32](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ECurrencyCode.ts#L32)

___

### UAH

• **UAH** = ``18``

#### Defined in

[types/ECurrencyCode.ts:20](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ECurrencyCode.ts#L20)

___

### USD

• **USD** = ``1``

#### Defined in

[types/ECurrencyCode.ts:3](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ECurrencyCode.ts#L3)

___

### UYU

• **UYU** = ``41``

#### Defined in

[types/ECurrencyCode.ts:42](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ECurrencyCode.ts#L42)

___

### VND

• **VND** = ``15``

#### Defined in

[types/ECurrencyCode.ts:17](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ECurrencyCode.ts#L17)

___

### ZAR

• **ZAR** = ``28``

#### Defined in

[types/ECurrencyCode.ts:30](https://github.com/vladislav-puzyrev/steam-market/blob/898a44d/src/types/ECurrencyCode.ts#L30)
