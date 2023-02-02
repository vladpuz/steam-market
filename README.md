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
- [AssetResult](#interfacesassetresultmd)
- [BuyOrderResult](#interfacesbuyorderresultmd)
- [BuyOrderStatusResult](#interfacesbuyorderstatusresultmd)
- [CreateBuyOrderOptions](#interfacescreatebuyorderoptionsmd)
- [CreateBuyOrderResult](#interfacescreatebuyorderresultmd)
- [CreateSellOrderOptions](#interfacescreatesellorderoptionsmd)
- [CreateSellOrderResult](#interfacescreatesellorderresultmd)
- [Description](#interfacesdescriptionmd)
- [EventResult](#interfaceseventresultmd)
- [ItemOrdersHistogramResult](#interfacesitemordershistogramresultmd)
- [ListingResult](#interfaceslistingresultmd)
- [MarketOptions](#interfacesmarketoptionsmd)
- [MyHistoryResult](#interfacesmyhistoryresultmd)
- [MyListingsResult](#interfacesmylistingsresultmd)
- [PriceHistoryResult](#interfacespricehistoryresultmd)
- [PriceOverviewResult](#interfacespriceoverviewresultmd)
- [PurchaseResult](#interfacespurchaseresultmd)
- [SearchOptions](#interfacessearchoptionsmd)
- [SearchResult](#interfacessearchresultmd)

# Class: default

## Table of contents

### Constructors

- [constructor](#constructor)

### Methods

- [buyOrderStatus](#buyorderstatus)
- [cancelBuyOrder](#cancelbuyorder)
- [cancelSellOrder](#cancelsellorder)
- [createBuyOrder](#createbuyorder)
- [createSellOrder](#createsellorder)
- [getCookies](#getcookies)
- [getCountry](#getcountry)
- [getCurrency](#getcurrency)
- [getDigits](#getdigits)
- [getLanguage](#getlanguage)
- [getSessionId](#getsessionid)
- [getUnits](#getunits)
- [getVanityURL](#getvanityurl)
- [itemNameId](#itemnameid)
- [itemOrdersHistogram](#itemordershistogram)
- [myHistory](#myhistory)
- [myListings](#mylistings)
- [priceHistory](#pricehistory)
- [priceOverview](#priceoverview)
- [search](#search)
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

[SteamMarket.ts:43](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/SteamMarket.ts#L43)

## Methods

### buyOrderStatus

▸ **buyOrderStatus**
(`appId`, `marketHashName`, `buyOrderId`): `Promise`<[`BuyOrderStatusResult`](#interfacesbuyorderstatusresultmd)\>

#### Parameters

| Name             | Type     |
|:-----------------|:---------|
| `appId`          | `number` |
| `marketHashName` | `number` |
| `buyOrderId`     | `number` |

#### Returns

`Promise`<[`BuyOrderStatusResult`](#interfacesbuyorderstatusresultmd)\>

#### Defined in

[SteamMarket.ts:502](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/SteamMarket.ts#L502)

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

[SteamMarket.ts:581](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/SteamMarket.ts#L581)

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

[SteamMarket.ts:598](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/SteamMarket.ts#L598)

___

### createBuyOrder

▸ **createBuyOrder**(`appId`, `options`): `Promise`<[`CreateBuyOrderResult`](#interfacescreatebuyorderresultmd)\>

#### Parameters

| Name      | Type                                                          |
|:----------|:--------------------------------------------------------------|
| `appId`   | `number`                                                      |
| `options` | [`CreateBuyOrderOptions`](#interfacescreatebuyorderoptionsmd) |

#### Returns

`Promise`<[`CreateBuyOrderResult`](#interfacescreatebuyorderresultmd)\>

#### Defined in

[SteamMarket.ts:528](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/SteamMarket.ts#L528)

___

### createSellOrder

▸ **createSellOrder**(`appId`, `options`): `Promise`<[`CreateSellOrderResult`](#interfacescreatesellorderresultmd)\>

#### Parameters

| Name      | Type                                                            |
|:----------|:----------------------------------------------------------------|
| `appId`   | `number`                                                        |
| `options` | [`CreateSellOrderOptions`](#interfacescreatesellorderoptionsmd) |

#### Returns

`Promise`<[`CreateSellOrderResult`](#interfacescreatesellorderresultmd)\>

#### Defined in

[SteamMarket.ts:554](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/SteamMarket.ts#L554)

___

### getCookies

▸ **getCookies**(): `string`[]

#### Returns

`string`[]

#### Defined in

[SteamMarket.ts:198](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/SteamMarket.ts#L198)

___

### getCountry

▸ **getCountry**(): `string`

#### Returns

`string`

#### Defined in

[SteamMarket.ts:218](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/SteamMarket.ts#L218)

___

### getCurrency

▸ **getCurrency**(): [`ECurrencyCode`](#enumsecurrencycodemd)

#### Returns

[`ECurrencyCode`](#enumsecurrencycodemd)

#### Defined in

[SteamMarket.ts:206](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/SteamMarket.ts#L206)

___

### getDigits

▸ **getDigits**(): `number`

#### Returns

`number`

#### Defined in

[SteamMarket.ts:210](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/SteamMarket.ts#L210)

___

### getLanguage

▸ **getLanguage**(): `string`

#### Returns

`string`

#### Defined in

[SteamMarket.ts:222](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/SteamMarket.ts#L222)

___

### getSessionId

▸ **getSessionId**(): `string`

#### Returns

`string`

#### Defined in

[SteamMarket.ts:202](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/SteamMarket.ts#L202)

___

### getUnits

▸ **getUnits**(): `number`

#### Returns

`number`

#### Defined in

[SteamMarket.ts:214](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/SteamMarket.ts#L214)

___

### getVanityURL

▸ **getVanityURL**(): `string`

#### Returns

`string`

#### Defined in

[SteamMarket.ts:226](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/SteamMarket.ts#L226)

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

[SteamMarket.ts:292](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/SteamMarket.ts#L292)

___

### itemOrdersHistogram

▸ **itemOrdersHistogram**
(`appId`, `marketHashName`, `itemNameId`): `Promise`<[`ItemOrdersHistogramResult`](#interfacesitemordershistogramresultmd)\>

#### Parameters

| Name             | Type     |
|:-----------------|:---------|
| `appId`          | `number` |
| `marketHashName` | `string` |
| `itemNameId`     | `number` |

#### Returns

`Promise`<[`ItemOrdersHistogramResult`](#interfacesitemordershistogramresultmd)\>

#### Defined in

[SteamMarket.ts:313](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/SteamMarket.ts#L313)

___

### myHistory

▸ **myHistory**(`start?`, `count?`): `Promise`<[`MyHistoryResult`](#interfacesmyhistoryresultmd)\>

#### Parameters

| Name     | Type       |
|:---------|:-----------|
| `start?` | ``null`` \ | `number` |
| `count?` | ``null`` \ | `number` |

#### Returns

`Promise`<[`MyHistoryResult`](#interfacesmyhistoryresultmd)\>

#### Defined in

[SteamMarket.ts:445](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/SteamMarket.ts#L445)

___

### myListings

▸ **myListings**(`start?`, `count?`): `Promise`<[`MyListingsResult`](#interfacesmylistingsresultmd)\>

#### Parameters

| Name     | Type       |
|:---------|:-----------|
| `start?` | ``null`` \ | `number` |
| `count?` | ``null`` \ | `number` |

#### Returns

`Promise`<[`MyListingsResult`](#interfacesmylistingsresultmd)\>

#### Defined in

[SteamMarket.ts:408](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/SteamMarket.ts#L408)

___

### priceHistory

▸ **priceHistory**(`appId`, `marketHashName`): `Promise`<[`PriceHistoryResult`](#interfacespricehistoryresultmd)\>

#### Parameters

| Name             | Type     |
|:-----------------|:---------|
| `appId`          | `number` |
| `marketHashName` | `string` |

#### Returns

`Promise`<[`PriceHistoryResult`](#interfacespricehistoryresultmd)\>

#### Defined in

[SteamMarket.ts:381](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/SteamMarket.ts#L381)

___

### priceOverview

▸ **priceOverview**(`appId`, `marketHashName`): `Promise`<[`PriceOverviewResult`](#interfacespriceoverviewresultmd)\>

#### Parameters

| Name             | Type     |
|:-----------------|:---------|
| `appId`          | `number` |
| `marketHashName` | `string` |

#### Returns

`Promise`<[`PriceOverviewResult`](#interfacespriceoverviewresultmd)\>

#### Defined in

[SteamMarket.ts:359](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/SteamMarket.ts#L359)

___

### search

▸ **search**(`appId`, `options?`): `Promise`<[`SearchResult`](#interfacessearchresultmd)\>

#### Parameters

| Name       | Type       |
|:-----------|:-----------|
| `appId`    | `number`   |
| `options?` | ``null`` \ | [`SearchOptions`](#interfacessearchoptionsmd) |

#### Returns

`Promise`<[`SearchResult`](#interfacessearchresultmd)\>

#### Defined in

[SteamMarket.ts:230](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/SteamMarket.ts#L230)

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

[SteamMarket.ts:160](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/SteamMarket.ts#L160)

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

[SteamMarket.ts:183](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/SteamMarket.ts#L183)

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

[SteamMarket.ts:171](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/SteamMarket.ts#L171)

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

[SteamMarket.ts:194](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/SteamMarket.ts#L194)

# Interface: Action

## Table of contents

### Properties

- [link](#link)
- [name](#name)

## Properties

### link

• **link**: `string`

#### Defined in

[types/Action.ts:2](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/Action.ts#L2)

___

### name

• **name**: `string`

#### Defined in

[types/Action.ts:3](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/Action.ts#L3)

# Interface: AssetResult

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

[types/AssetResult.ts:21](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/AssetResult.ts#L21)

___

### amount

• `Optional` **amount**: ``null`` \| `number`

#### Defined in

[types/AssetResult.ts:11](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/AssetResult.ts#L11)

___

### appIcon

• `Optional` **appIcon**: ``null`` \| `string`

#### Defined in

[types/AssetResult.ts:42](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/AssetResult.ts#L42)

___

### appId

• **appId**: `number`

#### Defined in

[types/AssetResult.ts:6](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/AssetResult.ts#L6)

___

### backgroundColor

• **backgroundColor**: `string`

#### Defined in

[types/AssetResult.ts:16](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/AssetResult.ts#L16)

___

### classId

• **classId**: `number`

#### Defined in

[types/AssetResult.ts:9](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/AssetResult.ts#L9)

___

### commodity

• **commodity**: `boolean`

#### Defined in

[types/AssetResult.ts:34](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/AssetResult.ts#L34)

___

### containedItem

• `Optional` **containedItem**: ``null``

#### Defined in

[types/AssetResult.ts:32](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/AssetResult.ts#L32)

___

### contextId

• `Optional` **contextId**: ``null`` \| `number`

#### Defined in

[types/AssetResult.ts:7](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/AssetResult.ts#L7)

___

### currency

• `Optional` **currency**: ``null`` \| `number`

#### Defined in

[types/AssetResult.ts:5](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/AssetResult.ts#L5)

___

### descriptions

• **descriptions**: [`Description`](#interfacesdescriptionmd)[]

#### Defined in

[types/AssetResult.ts:19](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/AssetResult.ts#L19)

___

### fraudWarnings

• `Optional` **fraudWarnings**: ``null`` \| []

#### Defined in

[types/AssetResult.ts:24](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/AssetResult.ts#L24)

___

### iconUrl

• **iconUrl**: `string`

#### Defined in

[types/AssetResult.ts:17](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/AssetResult.ts#L17)

___

### iconUrlLarge

• **iconUrlLarge**: `string`

#### Defined in

[types/AssetResult.ts:18](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/AssetResult.ts#L18)

___

### id

• `Optional` **id**: ``null`` \| `number`

#### Defined in

[types/AssetResult.ts:8](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/AssetResult.ts#L8)

___

### instanceId

• **instanceId**: `number`

#### Defined in

[types/AssetResult.ts:10](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/AssetResult.ts#L10)

___

### itemExpiration

• `Optional` **itemExpiration**: ``null``

#### Defined in

[types/AssetResult.ts:39](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/AssetResult.ts#L39)

___

### marketActions

• `Optional` **marketActions**: ``null`` \| [`Action`](#interfacesactionmd)[]

#### Defined in

[types/AssetResult.ts:33](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/AssetResult.ts#L33)

___

### marketBuyCountryRestriction

• `Optional` **marketBuyCountryRestriction**: ``null``

#### Defined in

[types/AssetResult.ts:40](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/AssetResult.ts#L40)

___

### marketFee

• `Optional` **marketFee**: ``null`` \| `number`

#### Defined in

[types/AssetResult.ts:30](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/AssetResult.ts#L30)

___

### marketFeeApp

• `Optional` **marketFeeApp**: ``null`` \| `number`

#### Defined in

[types/AssetResult.ts:31](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/AssetResult.ts#L31)

___

### marketHashName

• **marketHashName**: `string`

#### Defined in

[types/AssetResult.ts:29](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/AssetResult.ts#L29)

___

### marketMarketableRestriction

• `Optional` **marketMarketableRestriction**: ``null`` \| `number`

#### Defined in

[types/AssetResult.ts:36](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/AssetResult.ts#L36)

___

### marketName

• **marketName**: `string`

#### Defined in

[types/AssetResult.ts:28](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/AssetResult.ts#L28)

___

### marketSellCountryRestriction

• `Optional` **marketSellCountryRestriction**: ``null``

#### Defined in

[types/AssetResult.ts:41](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/AssetResult.ts#L41)

___

### marketTradableRestriction

• **marketTradableRestriction**: `number`

#### Defined in

[types/AssetResult.ts:35](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/AssetResult.ts#L35)

___

### marketable

• **marketable**: `boolean`

#### Defined in

[types/AssetResult.ts:37](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/AssetResult.ts#L37)

___

### name

• **name**: `string`

#### Defined in

[types/AssetResult.ts:25](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/AssetResult.ts#L25)

___

### nameColor

• `Optional` **nameColor**: ``null`` \| `string`

#### Defined in

[types/AssetResult.ts:26](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/AssetResult.ts#L26)

___

### newContextId

• `Optional` **newContextId**: ``null`` \| `string`

#### Defined in

[types/AssetResult.ts:47](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/AssetResult.ts#L47)

___

### newId

• `Optional` **newId**: ``null`` \| `string`

#### Defined in

[types/AssetResult.ts:46](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/AssetResult.ts#L46)

___

### originalAmount

• `Optional` **originalAmount**: ``null`` \| `number`

#### Defined in

[types/AssetResult.ts:13](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/AssetResult.ts#L13)

___

### owner

• `Optional` **owner**: ``null`` \| `boolean`

#### Defined in

[types/AssetResult.ts:43](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/AssetResult.ts#L43)

___

### ownerActions

• `Optional` **ownerActions**: ``null`` \| [`Action`](#interfacesactionmd)[]

#### Defined in

[types/AssetResult.ts:23](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/AssetResult.ts#L23)

___

### ownerDescriptions

• `Optional` **ownerDescriptions**: ``null`` \| [`Description`](#interfacesdescriptionmd)[]

#### Defined in

[types/AssetResult.ts:22](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/AssetResult.ts#L22)

___

### rollbackNewContextId

• `Optional` **rollbackNewContextId**: ``null`` \| `string`

#### Defined in

[types/AssetResult.ts:45](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/AssetResult.ts#L45)

___

### rollbackNewId

• `Optional` **rollbackNewId**: ``null`` \| `string`

#### Defined in

[types/AssetResult.ts:44](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/AssetResult.ts#L44)

___

### status

• `Optional` **status**: ``null`` \| `number`

#### Defined in

[types/AssetResult.ts:12](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/AssetResult.ts#L12)

___

### tags

• `Optional` **tags**: ``null`` \| []

#### Defined in

[types/AssetResult.ts:38](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/AssetResult.ts#L38)

___

### tradable

• **tradable**: `boolean`

#### Defined in

[types/AssetResult.ts:20](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/AssetResult.ts#L20)

___

### type

• **type**: `string`

#### Defined in

[types/AssetResult.ts:27](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/AssetResult.ts#L27)

___

### unownedContextId

• `Optional` **unownedContextId**: ``null`` \| `number`

#### Defined in

[types/AssetResult.ts:15](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/AssetResult.ts#L15)

___

### unownedId

• `Optional` **unownedId**: ``null`` \| `number`

#### Defined in

[types/AssetResult.ts:14](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/AssetResult.ts#L14)

# Interface: BuyOrderResult

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

[types/BuyOrderResult.ts:4](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/BuyOrderResult.ts#L4)

___

### buyOrderId

• **buyOrderId**: `number`

#### Defined in

[types/BuyOrderResult.ts:10](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/BuyOrderResult.ts#L10)

___

### description

• **description**: [`AssetResult`](#interfacesassetresultmd)

#### Defined in

[types/BuyOrderResult.ts:11](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/BuyOrderResult.ts#L11)

___

### hashName

• **hashName**: `string`

#### Defined in

[types/BuyOrderResult.ts:5](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/BuyOrderResult.ts#L5)

___

### price

• **price**: `number`

#### Defined in

[types/BuyOrderResult.ts:7](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/BuyOrderResult.ts#L7)

___

### quantity

• **quantity**: `number`

#### Defined in

[types/BuyOrderResult.ts:8](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/BuyOrderResult.ts#L8)

___

### quantityRemaining

• **quantityRemaining**: `number`

#### Defined in

[types/BuyOrderResult.ts:9](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/BuyOrderResult.ts#L9)

___

### walletCurrency

• **walletCurrency**: `number`

#### Defined in

[types/BuyOrderResult.ts:6](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/BuyOrderResult.ts#L6)

# Interface: BuyOrderStatusResult

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

[types/BuyOrderStatusResult.ts:3](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/BuyOrderStatusResult.ts#L3)

___

### purchased

• **purchased**: `number`

#### Defined in

[types/BuyOrderStatusResult.ts:4](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/BuyOrderStatusResult.ts#L4)

___

### purchases

• **purchases**: []

#### Defined in

[types/BuyOrderStatusResult.ts:7](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/BuyOrderStatusResult.ts#L7)

___

### quantity

• **quantity**: `number`

#### Defined in

[types/BuyOrderStatusResult.ts:5](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/BuyOrderStatusResult.ts#L5)

___

### quantityRemaining

• **quantityRemaining**: `number`

#### Defined in

[types/BuyOrderStatusResult.ts:6](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/BuyOrderStatusResult.ts#L6)

___

### success

• **success**: `boolean`

#### Defined in

[types/BuyOrderStatusResult.ts:2](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/BuyOrderStatusResult.ts#L2)

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

[types/CreateBuyOrderOptions.ts:4](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/CreateBuyOrderOptions.ts#L4)

___

### marketHashName

• **marketHashName**: `string`

#### Defined in

[types/CreateBuyOrderOptions.ts:2](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/CreateBuyOrderOptions.ts#L2)

___

### price

• **price**: `number`

#### Defined in

[types/CreateBuyOrderOptions.ts:3](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/CreateBuyOrderOptions.ts#L3)

# Interface: CreateBuyOrderResult

## Table of contents

### Properties

- [buyOrderId](#buyorderid)
- [success](#success)

## Properties

### buyOrderId

• **buyOrderId**: `number`

#### Defined in

[types/CreateBuyOrderResult.ts:3](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/CreateBuyOrderResult.ts#L3)

___

### success

• **success**: `boolean`

#### Defined in

[types/CreateBuyOrderResult.ts:2](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/CreateBuyOrderResult.ts#L2)

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

[types/CreateSellOrderOptions.ts:5](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/CreateSellOrderOptions.ts#L5)

___

### assetId

• **assetId**: `number`

#### Defined in

[types/CreateSellOrderOptions.ts:2](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/CreateSellOrderOptions.ts#L2)

___

### contextId

• **contextId**: `number`

#### Defined in

[types/CreateSellOrderOptions.ts:3](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/CreateSellOrderOptions.ts#L3)

___

### price

• **price**: `number`

#### Defined in

[types/CreateSellOrderOptions.ts:4](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/CreateSellOrderOptions.ts#L4)

# Interface: CreateSellOrderResult

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

[types/CreateSellOrderResult.ts:6](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/CreateSellOrderResult.ts#L6)

___

### needsEmailConfirmation

• **needsEmailConfirmation**: `boolean`

#### Defined in

[types/CreateSellOrderResult.ts:5](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/CreateSellOrderResult.ts#L5)

___

### needsMobileConfirmation

• **needsMobileConfirmation**: `boolean`

#### Defined in

[types/CreateSellOrderResult.ts:4](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/CreateSellOrderResult.ts#L4)

___

### requiresConfirmation

• **requiresConfirmation**: `boolean`

#### Defined in

[types/CreateSellOrderResult.ts:3](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/CreateSellOrderResult.ts#L3)

___

### success

• **success**: `boolean`

#### Defined in

[types/CreateSellOrderResult.ts:2](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/CreateSellOrderResult.ts#L2)

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

[types/Description.ts:4](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/Description.ts#L4)

___

### label

• `Optional` **label**: ``null`` \| `string`

#### Defined in

[types/Description.ts:5](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/Description.ts#L5)

___

### type

• `Optional` **type**: ``null`` \| `string`

#### Defined in

[types/Description.ts:2](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/Description.ts#L2)

___

### value

• **value**: `string`

#### Defined in

[types/Description.ts:3](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/Description.ts#L3)

# Interface: EventResult

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

[types/EventResult.ts:8](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/EventResult.ts#L8)

___

### eventType

• **eventType**: `number`

#### Defined in

[types/EventResult.ts:4](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/EventResult.ts#L4)

___

### listingId

• **listingId**: `number`

#### Defined in

[types/EventResult.ts:2](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/EventResult.ts#L2)

___

### purchaseId

• `Optional` **purchaseId**: ``null`` \| `number`

#### Defined in

[types/EventResult.ts:3](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/EventResult.ts#L3)

___

### steamIdActor

• **steamIdActor**: `number`

#### Defined in

[types/EventResult.ts:7](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/EventResult.ts#L7)

___

### timeEvent

• **timeEvent**: `number`

#### Defined in

[types/EventResult.ts:5](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/EventResult.ts#L5)

___

### timeEventFraction

• **timeEventFraction**: `number`

#### Defined in

[types/EventResult.ts:6](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/EventResult.ts#L6)

# Interface: ItemOrdersHistogramResult

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

[types/ItemOrdersHistogramResult.ts:9](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ItemOrdersHistogramResult.ts#L9)

___

### buyOrderSummary

• **buyOrderSummary**: `string`

#### Defined in

[types/ItemOrdersHistogramResult.ts:6](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ItemOrdersHistogramResult.ts#L6)

___

### buyOrderTable

• **buyOrderTable**: `string`

#### Defined in

[types/ItemOrdersHistogramResult.ts:5](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ItemOrdersHistogramResult.ts#L5)

___

### graphMaxX

• **graphMaxX**: `number`

#### Defined in

[types/ItemOrdersHistogramResult.ts:21](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ItemOrdersHistogramResult.ts#L21)

___

### graphMaxY

• **graphMaxY**: `number`

#### Defined in

[types/ItemOrdersHistogramResult.ts:19](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ItemOrdersHistogramResult.ts#L19)

___

### graphMinX

• **graphMinX**: `number`

#### Defined in

[types/ItemOrdersHistogramResult.ts:20](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ItemOrdersHistogramResult.ts#L20)

___

### highestBuyOrder

• **highestBuyOrder**: `number`

#### Defined in

[types/ItemOrdersHistogramResult.ts:7](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ItemOrdersHistogramResult.ts#L7)

___

### lowestSellOrder

• **lowestSellOrder**: `number`

#### Defined in

[types/ItemOrdersHistogramResult.ts:8](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ItemOrdersHistogramResult.ts#L8)

___

### pricePrefix

• **pricePrefix**: `string`

#### Defined in

[types/ItemOrdersHistogramResult.ts:22](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ItemOrdersHistogramResult.ts#L22)

___

### priceSuffix

• **priceSuffix**: `string`

#### Defined in

[types/ItemOrdersHistogramResult.ts:23](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ItemOrdersHistogramResult.ts#L23)

___

### sellOrderGraph

• **sellOrderGraph**: { `description`: `string` ; `price`: `number` ; `volume`: `number`  }[]

#### Defined in

[types/ItemOrdersHistogramResult.ts:14](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ItemOrdersHistogramResult.ts#L14)

___

### sellOrderSummary

• **sellOrderSummary**: `string`

#### Defined in

[types/ItemOrdersHistogramResult.ts:4](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ItemOrdersHistogramResult.ts#L4)

___

### sellOrderTable

• **sellOrderTable**: `string`

#### Defined in

[types/ItemOrdersHistogramResult.ts:3](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ItemOrdersHistogramResult.ts#L3)

___

### success

• **success**: `boolean`

#### Defined in

[types/ItemOrdersHistogramResult.ts:2](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ItemOrdersHistogramResult.ts#L2)

# Interface: ListingResult

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

[types/ListingResult.ts:16](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ListingResult.ts#L16)

___

### asset

• **asset**: [`AssetResult`](#interfacesassetresultmd)

#### Defined in

[types/ListingResult.ts:6](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ListingResult.ts#L6)

___

### cancelReason

• `Optional` **cancelReason**: ``null`` \| `string`

#### Defined in

[types/ListingResult.ts:23](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ListingResult.ts#L23)

___

### cancelReasonShort

• `Optional` **cancelReasonShort**: ``null`` \| `string`

#### Defined in

[types/ListingResult.ts:24](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ListingResult.ts#L24)

___

### convertedCurrencyId

• `Optional` **convertedCurrencyId**: ``null`` \| `number`

#### Defined in

[types/ListingResult.ts:14](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ListingResult.ts#L14)

___

### convertedFee

• `Optional` **convertedFee**: ``null`` \| `number`

#### Defined in

[types/ListingResult.ts:13](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ListingResult.ts#L13)

___

### convertedFeePerUnit

• `Optional` **convertedFeePerUnit**: ``null`` \| `number`

#### Defined in

[types/ListingResult.ts:32](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ListingResult.ts#L32)

___

### convertedPrice

• `Optional` **convertedPrice**: ``null`` \| `number`

#### Defined in

[types/ListingResult.ts:12](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ListingResult.ts#L12)

___

### convertedPricePerUnit

• `Optional` **convertedPricePerUnit**: ``null`` \| `number`

#### Defined in

[types/ListingResult.ts:31](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ListingResult.ts#L31)

___

### convertedPublisherFee

• `Optional` **convertedPublisherFee**: ``null`` \| `number`

#### Defined in

[types/ListingResult.ts:20](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ListingResult.ts#L20)

___

### convertedPublisherFeePerUnit

• `Optional` **convertedPublisherFeePerUnit**: ``null`` \| `number`

#### Defined in

[types/ListingResult.ts:34](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ListingResult.ts#L34)

___

### convertedSteamFee

• `Optional` **convertedSteamFee**: ``null`` \| `number`

#### Defined in

[types/ListingResult.ts:18](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ListingResult.ts#L18)

___

### convertedSteamFeePerUnit

• `Optional` **convertedSteamFeePerUnit**: ``null`` \| `number`

#### Defined in

[types/ListingResult.ts:33](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ListingResult.ts#L33)

___

### currencyId

• **currencyId**: `number`

#### Defined in

[types/ListingResult.ts:11](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ListingResult.ts#L11)

___

### fee

• **fee**: `number`

#### Defined in

[types/ListingResult.ts:10](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ListingResult.ts#L10)

___

### feePerUnit

• `Optional` **feePerUnit**: ``null`` \| `number`

#### Defined in

[types/ListingResult.ts:28](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ListingResult.ts#L28)

___

### itemExpired

• `Optional` **itemExpired**: ``null`` \| `number`

#### Defined in

[types/ListingResult.ts:25](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ListingResult.ts#L25)

___

### listingId

• **listingId**: `number`

#### Defined in

[types/ListingResult.ts:4](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ListingResult.ts#L4)

___

### originalAmountListed

• `Optional` **originalAmountListed**: ``null`` \| `number`

#### Defined in

[types/ListingResult.ts:26](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ListingResult.ts#L26)

___

### originalPrice

• **originalPrice**: `number`

#### Defined in

[types/ListingResult.ts:9](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ListingResult.ts#L9)

___

### originalPricePerUnit

• `Optional` **originalPricePerUnit**: ``null`` \| `number`

#### Defined in

[types/ListingResult.ts:27](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ListingResult.ts#L27)

___

### price

• **price**: `number`

#### Defined in

[types/ListingResult.ts:8](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ListingResult.ts#L8)

___

### publisherFee

• `Optional` **publisherFee**: ``null`` \| `number`

#### Defined in

[types/ListingResult.ts:19](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ListingResult.ts#L19)

___

### publisherFeeApp

• **publisherFeeApp**: `number`

#### Defined in

[types/ListingResult.ts:22](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ListingResult.ts#L22)

___

### publisherFeePerUnit

• `Optional` **publisherFeePerUnit**: ``null`` \| `number`

#### Defined in

[types/ListingResult.ts:30](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ListingResult.ts#L30)

___

### publisherFeePercent

• **publisherFeePercent**: `number`

#### Defined in

[types/ListingResult.ts:21](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ListingResult.ts#L21)

___

### status

• `Optional` **status**: ``null`` \| `number`

#### Defined in

[types/ListingResult.ts:15](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ListingResult.ts#L15)

___

### steamFee

• `Optional` **steamFee**: ``null`` \| `number`

#### Defined in

[types/ListingResult.ts:17](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ListingResult.ts#L17)

___

### steamFeePerUnit

• `Optional` **steamFeePerUnit**: ``null`` \| `number`

#### Defined in

[types/ListingResult.ts:29](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ListingResult.ts#L29)

___

### steamIdLister

• `Optional` **steamIdLister**: ``null`` \| `number`

#### Defined in

[types/ListingResult.ts:7](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ListingResult.ts#L7)

___

### timeCreated

• `Optional` **timeCreated**: ``null`` \| `number`

#### Defined in

[types/ListingResult.ts:5](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ListingResult.ts#L5)

___

### timeCreatedStr

• `Optional` **timeCreatedStr**: ``null`` \| `string`

#### Defined in

[types/ListingResult.ts:36](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ListingResult.ts#L36)

___

### timeFinishHold

• `Optional` **timeFinishHold**: ``null`` \| `number`

#### Defined in

[types/ListingResult.ts:35](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ListingResult.ts#L35)

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

[types/MarketOptions.ts:2](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/MarketOptions.ts#L2)

___

### httpProxy

• `Optional` **httpProxy**: ``null`` \| `string`

#### Defined in

[types/MarketOptions.ts:3](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/MarketOptions.ts#L3)

___

### socksProxy

• `Optional` **socksProxy**: ``null`` \| `string`

#### Defined in

[types/MarketOptions.ts:4](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/MarketOptions.ts#L4)

# Interface: MyHistoryResult

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

• **assets**: [`AssetResult`](#interfacesassetresultmd)[]

#### Defined in

types/MyHistoryResult.ts:11

___

### events

• **events**: [`EventResult`](#interfaceseventresultmd)[]

#### Defined in

types/MyHistoryResult.ts:12

___

### listings

• **listings**: [`ListingResult`](#interfaceslistingresultmd)[]

#### Defined in

types/MyHistoryResult.ts:14

___

### pageSize

• **pageSize**: `number`

#### Defined in

types/MyHistoryResult.ts:8

___

### purchases

• **purchases**: [`PurchaseResult`](#interfacespurchaseresultmd)[]

#### Defined in

types/MyHistoryResult.ts:13

___

### start

• **start**: `number`

#### Defined in

types/MyHistoryResult.ts:10

___

### success

• **success**: `boolean`

#### Defined in

types/MyHistoryResult.ts:7

___

### totalCount

• **totalCount**: `number`

#### Defined in

types/MyHistoryResult.ts:9

# Interface: MyListingsResult

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

• **assets**: [`AssetResult`](#interfacesassetresultmd)[]

#### Defined in

[types/MyListingsResult.ts:9](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/MyListingsResult.ts#L9)

___

### buyOrders

• **buyOrders**: [`BuyOrderResult`](#interfacesbuyorderresultmd)[]

#### Defined in

[types/MyListingsResult.ts:15](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/MyListingsResult.ts#L15)

___

### listings

• **listings**: [`ListingResult`](#interfaceslistingresultmd)[]

#### Defined in

[types/MyListingsResult.ts:12](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/MyListingsResult.ts#L12)

___

### listingsOnHold

• **listingsOnHold**: [`ListingResult`](#interfaceslistingresultmd)[]

#### Defined in

[types/MyListingsResult.ts:13](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/MyListingsResult.ts#L13)

___

### listingsToConfirm

• **listingsToConfirm**: [`ListingResult`](#interfaceslistingresultmd)[]

#### Defined in

[types/MyListingsResult.ts:14](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/MyListingsResult.ts#L14)

___

### numActiveListings

• **numActiveListings**: `number`

#### Defined in

[types/MyListingsResult.ts:11](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/MyListingsResult.ts#L11)

___

### pageSize

• **pageSize**: `number`

#### Defined in

[types/MyListingsResult.ts:7](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/MyListingsResult.ts#L7)

___

### start

• **start**: `number`

#### Defined in

[types/MyListingsResult.ts:10](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/MyListingsResult.ts#L10)

___

### success

• **success**: `boolean`

#### Defined in

[types/MyListingsResult.ts:6](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/MyListingsResult.ts#L6)

___

### totalCount

• **totalCount**: `number`

#### Defined in

[types/MyListingsResult.ts:8](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/MyListingsResult.ts#L8)

# Interface: PriceHistoryResult

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

[types/PriceHistoryResult.ts:3](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/PriceHistoryResult.ts#L3)

___

### priceSuffix

• **priceSuffix**: `string`

#### Defined in

[types/PriceHistoryResult.ts:4](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/PriceHistoryResult.ts#L4)

___

### prices

• **prices**: { `datetime`: `string` ; `price`: `number` ; `volume`: `number`  }[]

#### Defined in

[types/PriceHistoryResult.ts:5](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/PriceHistoryResult.ts#L5)

___

### success

• **success**: `boolean`

#### Defined in

[types/PriceHistoryResult.ts:2](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/PriceHistoryResult.ts#L2)

# Interface: PriceOverviewResult

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

[types/PriceOverviewResult.ts:3](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/PriceOverviewResult.ts#L3)

___

### medianPrice

• **medianPrice**: `string`

#### Defined in

[types/PriceOverviewResult.ts:5](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/PriceOverviewResult.ts#L5)

___

### success

• **success**: `boolean`

#### Defined in

[types/PriceOverviewResult.ts:2](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/PriceOverviewResult.ts#L2)

___

### volume

• **volume**: `number`

#### Defined in

[types/PriceOverviewResult.ts:4](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/PriceOverviewResult.ts#L4)

# Interface: PurchaseResult

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

• **asset**: [`AssetResult`](#interfacesassetresultmd)

#### Defined in

[types/PurchaseResult.ts:10](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/PurchaseResult.ts#L10)

___

### avatarActor

• **avatarActor**: `string`

#### Defined in

[types/PurchaseResult.ts:21](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/PurchaseResult.ts#L21)

___

### currencyId

• **currencyId**: `number`

#### Defined in

[types/PurchaseResult.ts:13](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/PurchaseResult.ts#L13)

___

### failed

• **failed**: `number`

#### Defined in

[types/PurchaseResult.ts:9](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/PurchaseResult.ts#L9)

___

### fundsHeld

• `Optional` **fundsHeld**: ``null`` \| `number`

#### Defined in

[types/PurchaseResult.ts:23](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/PurchaseResult.ts#L23)

___

### fundsReturned

• **fundsReturned**: `number`

#### Defined in

[types/PurchaseResult.ts:20](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/PurchaseResult.ts#L20)

___

### fundsRevoked

• `Optional` **fundsRevoked**: ``null`` \| `number`

#### Defined in

[types/PurchaseResult.ts:25](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/PurchaseResult.ts#L25)

___

### listingId

• **listingId**: `number`

#### Defined in

[types/PurchaseResult.ts:4](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/PurchaseResult.ts#L4)

___

### needsRollback

• **needsRollback**: `number`

#### Defined in

[types/PurchaseResult.ts:8](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/PurchaseResult.ts#L8)

___

### paidAmount

• **paidAmount**: `number`

#### Defined in

[types/PurchaseResult.ts:11](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/PurchaseResult.ts#L11)

___

### paidFee

• **paidFee**: `number`

#### Defined in

[types/PurchaseResult.ts:12](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/PurchaseResult.ts#L12)

___

### personaActor

• **personaActor**: `string`

#### Defined in

[types/PurchaseResult.ts:22](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/PurchaseResult.ts#L22)

___

### publisherFee

• **publisherFee**: `number`

#### Defined in

[types/PurchaseResult.ts:15](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/PurchaseResult.ts#L15)

___

### publisherFeeApp

• **publisherFeeApp**: `number`

#### Defined in

[types/PurchaseResult.ts:17](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/PurchaseResult.ts#L17)

___

### publisherFeePercent

• **publisherFeePercent**: `number`

#### Defined in

[types/PurchaseResult.ts:16](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/PurchaseResult.ts#L16)

___

### purchaseId

• **purchaseId**: `number`

#### Defined in

[types/PurchaseResult.ts:5](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/PurchaseResult.ts#L5)

___

### receivedAmount

• **receivedAmount**: `number`

#### Defined in

[types/PurchaseResult.ts:18](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/PurchaseResult.ts#L18)

___

### receivedCurrencyId

• **receivedCurrencyId**: `number`

#### Defined in

[types/PurchaseResult.ts:19](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/PurchaseResult.ts#L19)

___

### steamFee

• **steamFee**: `number`

#### Defined in

[types/PurchaseResult.ts:14](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/PurchaseResult.ts#L14)

___

### steamIdPurchaser

• **steamIdPurchaser**: `number`

#### Defined in

[types/PurchaseResult.ts:7](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/PurchaseResult.ts#L7)

___

### timeFundsHeldUntil

• `Optional` **timeFundsHeldUntil**: ``null`` \| `number`

#### Defined in

[types/PurchaseResult.ts:24](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/PurchaseResult.ts#L24)

___

### timeSold

• **timeSold**: `number`

#### Defined in

[types/PurchaseResult.ts:6](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/PurchaseResult.ts#L6)

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

[types/SearchOptions.ts:4](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/SearchOptions.ts#L4)

___

### query

• `Optional` **query**: ``null`` \| `string`

#### Defined in

[types/SearchOptions.ts:2](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/SearchOptions.ts#L2)

___

### searchDescriptions

• `Optional` **searchDescriptions**: ``null`` \| `boolean`

#### Defined in

[types/SearchOptions.ts:5](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/SearchOptions.ts#L5)

___

### sortColumn

• `Optional` **sortColumn**: ``null`` \| `string`

#### Defined in

[types/SearchOptions.ts:6](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/SearchOptions.ts#L6)

___

### sortDir

• `Optional` **sortDir**: ``null`` \| ``"desc"`` \| ``"asc"``

#### Defined in

[types/SearchOptions.ts:7](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/SearchOptions.ts#L7)

___

### start

• `Optional` **start**: ``null`` \| `number`

#### Defined in

[types/SearchOptions.ts:3](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/SearchOptions.ts#L3)

# Interface: SearchResult

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

[types/SearchResult.ts:4](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/SearchResult.ts#L4)

___

### results

• **results
**: { `appIcon`: `string` ; `appName`: `string` ; `assetDescription`: { `appId`: `number` ; `backgroundColor`: `string` ; `classId`: `string` ; `commodity`: `boolean` ; `iconUrl`: `string` ; `instanceId`: `string` ; `marketHashName`: `string` ; `marketName`: `string` ; `name`: `string` ; `nameColor`: `string` ; `tradable`: `boolean` ; `type`: `string`  } ; `hashName`: `string` ; `name`: `string` ; `salePriceText`: `string` ; `sellListings`: `number` ; `sellPrice`: `number` ; `sellPriceText`: `string`  }[]

#### Defined in

[types/SearchResult.ts:14](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/SearchResult.ts#L14)

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

[types/SearchResult.ts:6](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/SearchResult.ts#L6)

___

### start

• **start**: `number`

#### Defined in

[types/SearchResult.ts:3](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/SearchResult.ts#L3)

___

### success

• **success**: `boolean`

#### Defined in

[types/SearchResult.ts:2](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/SearchResult.ts#L2)

___

### totalCount

• **totalCount**: `number`

#### Defined in

[types/SearchResult.ts:5](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/SearchResult.ts#L5)

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

[types/ECurrencyCode.ts:34](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ECurrencyCode.ts#L34)

___

### ARS

• **ARS** = ``34``

#### Defined in

[types/ECurrencyCode.ts:35](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ECurrencyCode.ts#L35)

___

### AUD

• **AUD** = ``21``

#### Defined in

[types/ECurrencyCode.ts:23](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ECurrencyCode.ts#L23)

___

### BRL

• **BRL** = ``7``

#### Defined in

[types/ECurrencyCode.ts:9](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ECurrencyCode.ts#L9)

___

### BYN

• **BYN** = ``36``

#### Defined in

[types/ECurrencyCode.ts:37](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ECurrencyCode.ts#L37)

___

### CAD

• **CAD** = ``20``

#### Defined in

[types/ECurrencyCode.ts:22](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ECurrencyCode.ts#L22)

___

### CHF

• **CHF** = ``4``

#### Defined in

[types/ECurrencyCode.ts:6](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ECurrencyCode.ts#L6)

___

### CLP

• **CLP** = ``25``

#### Defined in

[types/ECurrencyCode.ts:27](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ECurrencyCode.ts#L27)

___

### CNY

• **CNY** = ``23``

#### Defined in

[types/ECurrencyCode.ts:25](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ECurrencyCode.ts#L25)

___

### COP

• **COP** = ``27``

#### Defined in

[types/ECurrencyCode.ts:29](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ECurrencyCode.ts#L29)

___

### CRC

• **CRC** = ``40``

#### Defined in

[types/ECurrencyCode.ts:41](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ECurrencyCode.ts#L41)

___

### EUR

• **EUR** = ``3``

#### Defined in

[types/ECurrencyCode.ts:5](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ECurrencyCode.ts#L5)

___

### GBP

• **GBP** = ``2``

#### Defined in

[types/ECurrencyCode.ts:4](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ECurrencyCode.ts#L4)

___

### HKD

• **HKD** = ``29``

#### Defined in

[types/ECurrencyCode.ts:31](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ECurrencyCode.ts#L31)

___

### IDR

• **IDR** = ``10``

#### Defined in

[types/ECurrencyCode.ts:12](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ECurrencyCode.ts#L12)

___

### ILS

• **ILS** = ``35``

#### Defined in

[types/ECurrencyCode.ts:36](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ECurrencyCode.ts#L36)

___

### INR

• **INR** = ``24``

#### Defined in

[types/ECurrencyCode.ts:26](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ECurrencyCode.ts#L26)

___

### Invalid

• **Invalid** = ``0``

#### Defined in

[types/ECurrencyCode.ts:2](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ECurrencyCode.ts#L2)

___

### JPY

• **JPY** = ``8``

#### Defined in

[types/ECurrencyCode.ts:10](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ECurrencyCode.ts#L10)

___

### KRW

• **KRW** = ``16``

#### Defined in

[types/ECurrencyCode.ts:18](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ECurrencyCode.ts#L18)

___

### KWD

• **KWD** = ``38``

#### Defined in

[types/ECurrencyCode.ts:39](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ECurrencyCode.ts#L39)

___

### KZT

• **KZT** = ``37``

#### Defined in

[types/ECurrencyCode.ts:38](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ECurrencyCode.ts#L38)

___

### MXN

• **MXN** = ``19``

#### Defined in

[types/ECurrencyCode.ts:21](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ECurrencyCode.ts#L21)

___

### MYR

• **MYR** = ``11``

#### Defined in

[types/ECurrencyCode.ts:13](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ECurrencyCode.ts#L13)

___

### NOK

• **NOK** = ``9``

#### Defined in

[types/ECurrencyCode.ts:11](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ECurrencyCode.ts#L11)

___

### NZD

• **NZD** = ``22``

#### Defined in

[types/ECurrencyCode.ts:24](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ECurrencyCode.ts#L24)

___

### PEN

• **PEN** = ``26``

#### Defined in

[types/ECurrencyCode.ts:28](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ECurrencyCode.ts#L28)

___

### PHP

• **PHP** = ``12``

#### Defined in

[types/ECurrencyCode.ts:14](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ECurrencyCode.ts#L14)

___

### PLN

• **PLN** = ``6``

#### Defined in

[types/ECurrencyCode.ts:8](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ECurrencyCode.ts#L8)

___

### QAR

• **QAR** = ``39``

#### Defined in

[types/ECurrencyCode.ts:40](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ECurrencyCode.ts#L40)

___

### RUB

• **RUB** = ``5``

#### Defined in

[types/ECurrencyCode.ts:7](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ECurrencyCode.ts#L7)

___

### SAR

• **SAR** = ``31``

#### Defined in

[types/ECurrencyCode.ts:33](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ECurrencyCode.ts#L33)

___

### SGD

• **SGD** = ``13``

#### Defined in

[types/ECurrencyCode.ts:15](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ECurrencyCode.ts#L15)

___

### THB

• **THB** = ``14``

#### Defined in

[types/ECurrencyCode.ts:16](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ECurrencyCode.ts#L16)

___

### TRY

• **TRY** = ``17``

#### Defined in

[types/ECurrencyCode.ts:19](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ECurrencyCode.ts#L19)

___

### TWD

• **TWD** = ``30``

#### Defined in

[types/ECurrencyCode.ts:32](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ECurrencyCode.ts#L32)

___

### UAH

• **UAH** = ``18``

#### Defined in

[types/ECurrencyCode.ts:20](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ECurrencyCode.ts#L20)

___

### USD

• **USD** = ``1``

#### Defined in

[types/ECurrencyCode.ts:3](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ECurrencyCode.ts#L3)

___

### UYU

• **UYU** = ``41``

#### Defined in

[types/ECurrencyCode.ts:42](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ECurrencyCode.ts#L42)

___

### VND

• **VND** = ``15``

#### Defined in

[types/ECurrencyCode.ts:17](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ECurrencyCode.ts#L17)

___

### ZAR

• **ZAR** = ``28``

#### Defined in

[types/ECurrencyCode.ts:30](https://github.com/vladislav-puzyrev/steam-market/blob/2de8f55/src/types/ECurrencyCode.ts#L30)
