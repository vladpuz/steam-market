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

// We also set the vanityURL after initializing the client object
market.setVanityURL(client.vanityURL ?? client.steamID?.getSteamID64() ?? '')

// Now the market object is fully configured and ready for use
const items = await market.search(730)
console.log(items)
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
- [ItemOrdersHistogramResult](#interfacesitemordershistogramresultmd)
- [ListingResult](#interfaceslistingresultmd)
- [MarketOptions](#interfacesmarketoptionsmd)
- [MyListingsResult](#interfacesmylistingsresultmd)
- [PriceHistoryResult](#interfacespricehistoryresultmd)
- [PriceOverviewResult](#interfacespriceoverviewresultmd)
- [SearchOptions](#interfacessearchoptionsmd)
- [SearchResult](#interfacessearchresultmd)

# Class: default

## Table of contents

### Constructors

- [constructor](#constructor)

### Properties

- [country](#country)
- [currency](#currency)
- [digits](#digits)
- [language](#language)
- [server](#server)
- [sessionId](#sessionid)
- [units](#units)
- [vanityURL](#vanityurl)

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

[SteamMarket.ts:43](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/SteamMarket.ts#L43)

## Properties

### country

• `Private` **country**: `string` = `'US'`

#### Defined in

[SteamMarket.ts:39](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/SteamMarket.ts#L39)

___

### currency

• `Private` **currency**: [`ECurrencyCode`](#enumsecurrencycodemd) = `ECurrencyCode.USD`

#### Defined in

[SteamMarket.ts:36](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/SteamMarket.ts#L36)

___

### digits

• `Private` **digits**: `number` = `2`

#### Defined in

[SteamMarket.ts:37](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/SteamMarket.ts#L37)

___

### language

• `Private` **language**: `string` = `'english'`

#### Defined in

[SteamMarket.ts:40](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/SteamMarket.ts#L40)

___

### server

• `Private` `Readonly` **server**: `Axios`

#### Defined in

[SteamMarket.ts:34](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/SteamMarket.ts#L34)

___

### sessionId

• `Private` **sessionId**: `string` = `''`

#### Defined in

[SteamMarket.ts:35](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/SteamMarket.ts#L35)

___

### units

• `Private` **units**: `number` = `100`

#### Defined in

[SteamMarket.ts:38](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/SteamMarket.ts#L38)

___

### vanityURL

• `Private` **vanityURL**: `string` = `''`

#### Defined in

[SteamMarket.ts:41](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/SteamMarket.ts#L41)

## Methods

### buyOrderStatus

▸ **buyOrderStatus
**(`appId`, `marketHashName`, `buyOrderId`): `Promise`<[`BuyOrderStatusResult`](#interfacesbuyorderstatusresultmd)\>

#### Parameters

| Name             | Type     |
|:-----------------|:---------|
| `appId`          | `number` |
| `marketHashName` | `number` |
| `buyOrderId`     | `number` |

#### Returns

`Promise`<[`BuyOrderStatusResult`](#interfacesbuyorderstatusresultmd)\>

#### Defined in

[SteamMarket.ts:441](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/SteamMarket.ts#L441)

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

[SteamMarket.ts:520](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/SteamMarket.ts#L520)

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

[SteamMarket.ts:537](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/SteamMarket.ts#L537)

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

[SteamMarket.ts:467](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/SteamMarket.ts#L467)

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

[SteamMarket.ts:493](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/SteamMarket.ts#L493)

___

### getCookies

▸ **getCookies**(): `string`[]

#### Returns

`string`[]

#### Defined in

[SteamMarket.ts:103](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/SteamMarket.ts#L103)

___

### getCountry

▸ **getCountry**(): `string`

#### Returns

`string`

#### Defined in

[SteamMarket.ts:123](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/SteamMarket.ts#L123)

___

### getCurrency

▸ **getCurrency**(): [`ECurrencyCode`](#enumsecurrencycodemd)

#### Returns

[`ECurrencyCode`](#enumsecurrencycodemd)

#### Defined in

[SteamMarket.ts:111](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/SteamMarket.ts#L111)

___

### getDigits

▸ **getDigits**(): `number`

#### Returns

`number`

#### Defined in

[SteamMarket.ts:115](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/SteamMarket.ts#L115)

___

### getLanguage

▸ **getLanguage**(): `string`

#### Returns

`string`

#### Defined in

[SteamMarket.ts:127](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/SteamMarket.ts#L127)

___

### getSessionId

▸ **getSessionId**(): `string`

#### Returns

`string`

#### Defined in

[SteamMarket.ts:107](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/SteamMarket.ts#L107)

___

### getUnits

▸ **getUnits**(): `number`

#### Returns

`number`

#### Defined in

[SteamMarket.ts:119](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/SteamMarket.ts#L119)

___

### getVanityURL

▸ **getVanityURL**(): `string`

#### Returns

`string`

#### Defined in

[SteamMarket.ts:131](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/SteamMarket.ts#L131)

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

[SteamMarket.ts:243](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/SteamMarket.ts#L243)

___

### itemOrdersHistogram

▸ **itemOrdersHistogram
**(`appId`, `marketHashName`, `itemNameId`): `Promise`<[`ItemOrdersHistogramResult`](#interfacesitemordershistogramresultmd)\>

#### Parameters

| Name             | Type     |
|:-----------------|:---------|
| `appId`          | `number` |
| `marketHashName` | `string` |
| `itemNameId`     | `number` |

#### Returns

`Promise`<[`ItemOrdersHistogramResult`](#interfacesitemordershistogramresultmd)\>

#### Defined in

[SteamMarket.ts:197](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/SteamMarket.ts#L197)

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

[SteamMarket.ts:313](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/SteamMarket.ts#L313)

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

[SteamMarket.ts:286](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/SteamMarket.ts#L286)

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

[SteamMarket.ts:264](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/SteamMarket.ts#L264)

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

[SteamMarket.ts:135](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/SteamMarket.ts#L135)

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

[SteamMarket.ts:65](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/SteamMarket.ts#L65)

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

[SteamMarket.ts:88](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/SteamMarket.ts#L88)

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

[SteamMarket.ts:76](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/SteamMarket.ts#L76)

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

[SteamMarket.ts:99](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/SteamMarket.ts#L99)

# Interface: Action

## Table of contents

### Properties

- [link](#link)
- [name](#name)

## Properties

### link

• **link**: `string`

#### Defined in

[types/Action.ts:2](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/Action.ts#L2)

___

### name

• **name**: `string`

#### Defined in

[types/Action.ts:3](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/Action.ts#L3)

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
- [originalAmount](#originalamount)
- [owner](#owner)
- [ownerActions](#owneractions)
- [ownerDescriptions](#ownerdescriptions)
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

[types/AssetResult.ts:21](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/AssetResult.ts#L21)

___

### amount

• `Optional` **amount**: ``null`` \| `number`

#### Defined in

[types/AssetResult.ts:11](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/AssetResult.ts#L11)

___

### appIcon

• `Optional` **appIcon**: ``null`` \| `string`

#### Defined in

[types/AssetResult.ts:42](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/AssetResult.ts#L42)

___

### appId

• **appId**: `number`

#### Defined in

[types/AssetResult.ts:6](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/AssetResult.ts#L6)

___

### backgroundColor

• **backgroundColor**: `string`

#### Defined in

[types/AssetResult.ts:16](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/AssetResult.ts#L16)

___

### classId

• **classId**: `number`

#### Defined in

[types/AssetResult.ts:9](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/AssetResult.ts#L9)

___

### commodity

• **commodity**: `boolean`

#### Defined in

[types/AssetResult.ts:34](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/AssetResult.ts#L34)

___

### containedItem

• `Optional` **containedItem**: ``null``

#### Defined in

[types/AssetResult.ts:32](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/AssetResult.ts#L32)

___

### contextId

• `Optional` **contextId**: ``null`` \| `number`

#### Defined in

[types/AssetResult.ts:7](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/AssetResult.ts#L7)

___

### currency

• `Optional` **currency**: ``null`` \| `number`

#### Defined in

[types/AssetResult.ts:5](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/AssetResult.ts#L5)

___

### descriptions

• **descriptions**: [`Description`](#interfacesdescriptionmd)[]

#### Defined in

[types/AssetResult.ts:19](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/AssetResult.ts#L19)

___

### fraudWarnings

• `Optional` **fraudWarnings**: ``null`` \| []

#### Defined in

[types/AssetResult.ts:24](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/AssetResult.ts#L24)

___

### iconUrl

• **iconUrl**: `string`

#### Defined in

[types/AssetResult.ts:17](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/AssetResult.ts#L17)

___

### iconUrlLarge

• **iconUrlLarge**: `string`

#### Defined in

[types/AssetResult.ts:18](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/AssetResult.ts#L18)

___

### id

• `Optional` **id**: ``null`` \| `number`

#### Defined in

[types/AssetResult.ts:8](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/AssetResult.ts#L8)

___

### instanceId

• **instanceId**: `number`

#### Defined in

[types/AssetResult.ts:10](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/AssetResult.ts#L10)

___

### itemExpiration

• `Optional` **itemExpiration**: ``null``

#### Defined in

[types/AssetResult.ts:39](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/AssetResult.ts#L39)

___

### marketActions

• `Optional` **marketActions**: ``null`` \| [`Action`](#interfacesactionmd)[]

#### Defined in

[types/AssetResult.ts:33](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/AssetResult.ts#L33)

___

### marketBuyCountryRestriction

• `Optional` **marketBuyCountryRestriction**: ``null``

#### Defined in

[types/AssetResult.ts:40](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/AssetResult.ts#L40)

___

### marketFee

• `Optional` **marketFee**: ``null`` \| `number`

#### Defined in

[types/AssetResult.ts:30](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/AssetResult.ts#L30)

___

### marketFeeApp

• `Optional` **marketFeeApp**: ``null`` \| `number`

#### Defined in

[types/AssetResult.ts:31](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/AssetResult.ts#L31)

___

### marketHashName

• **marketHashName**: `string`

#### Defined in

[types/AssetResult.ts:29](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/AssetResult.ts#L29)

___

### marketMarketableRestriction

• `Optional` **marketMarketableRestriction**: ``null`` \| `number`

#### Defined in

[types/AssetResult.ts:36](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/AssetResult.ts#L36)

___

### marketName

• **marketName**: `string`

#### Defined in

[types/AssetResult.ts:28](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/AssetResult.ts#L28)

___

### marketSellCountryRestriction

• `Optional` **marketSellCountryRestriction**: ``null``

#### Defined in

[types/AssetResult.ts:41](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/AssetResult.ts#L41)

___

### marketTradableRestriction

• **marketTradableRestriction**: `number`

#### Defined in

[types/AssetResult.ts:35](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/AssetResult.ts#L35)

___

### marketable

• **marketable**: `boolean`

#### Defined in

[types/AssetResult.ts:37](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/AssetResult.ts#L37)

___

### name

• **name**: `string`

#### Defined in

[types/AssetResult.ts:25](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/AssetResult.ts#L25)

___

### nameColor

• `Optional` **nameColor**: ``null`` \| `string`

#### Defined in

[types/AssetResult.ts:26](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/AssetResult.ts#L26)

___

### originalAmount

• `Optional` **originalAmount**: ``null`` \| `number`

#### Defined in

[types/AssetResult.ts:13](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/AssetResult.ts#L13)

___

### owner

• `Optional` **owner**: ``null`` \| `boolean`

#### Defined in

[types/AssetResult.ts:43](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/AssetResult.ts#L43)

___

### ownerActions

• `Optional` **ownerActions**: ``null`` \| [`Action`](#interfacesactionmd)[]

#### Defined in

[types/AssetResult.ts:23](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/AssetResult.ts#L23)

___

### ownerDescriptions

• `Optional` **ownerDescriptions**: ``null`` \| [`Description`](#interfacesdescriptionmd)[]

#### Defined in

[types/AssetResult.ts:22](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/AssetResult.ts#L22)

___

### status

• `Optional` **status**: ``null`` \| `number`

#### Defined in

[types/AssetResult.ts:12](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/AssetResult.ts#L12)

___

### tags

• `Optional` **tags**: ``null`` \| []

#### Defined in

[types/AssetResult.ts:38](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/AssetResult.ts#L38)

___

### tradable

• **tradable**: `boolean`

#### Defined in

[types/AssetResult.ts:20](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/AssetResult.ts#L20)

___

### type

• **type**: `string`

#### Defined in

[types/AssetResult.ts:27](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/AssetResult.ts#L27)

___

### unownedContextId

• `Optional` **unownedContextId**: ``null`` \| `number`

#### Defined in

[types/AssetResult.ts:15](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/AssetResult.ts#L15)

___

### unownedId

• `Optional` **unownedId**: ``null`` \| `number`

#### Defined in

[types/AssetResult.ts:14](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/AssetResult.ts#L14)

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

[types/BuyOrderResult.ts:4](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/BuyOrderResult.ts#L4)

___

### buyOrderId

• **buyOrderId**: `number`

#### Defined in

[types/BuyOrderResult.ts:10](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/BuyOrderResult.ts#L10)

___

### description

• **description**: [`AssetResult`](#interfacesassetresultmd)

#### Defined in

[types/BuyOrderResult.ts:11](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/BuyOrderResult.ts#L11)

___

### hashName

• **hashName**: `string`

#### Defined in

[types/BuyOrderResult.ts:5](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/BuyOrderResult.ts#L5)

___

### price

• **price**: `number`

#### Defined in

[types/BuyOrderResult.ts:7](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/BuyOrderResult.ts#L7)

___

### quantity

• **quantity**: `number`

#### Defined in

[types/BuyOrderResult.ts:8](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/BuyOrderResult.ts#L8)

___

### quantityRemaining

• **quantityRemaining**: `number`

#### Defined in

[types/BuyOrderResult.ts:9](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/BuyOrderResult.ts#L9)

___

### walletCurrency

• **walletCurrency**: `number`

#### Defined in

[types/BuyOrderResult.ts:6](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/BuyOrderResult.ts#L6)

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

[types/BuyOrderStatusResult.ts:3](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/BuyOrderStatusResult.ts#L3)

___

### purchased

• **purchased**: `number`

#### Defined in

[types/BuyOrderStatusResult.ts:4](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/BuyOrderStatusResult.ts#L4)

___

### purchases

• **purchases**: []

#### Defined in

[types/BuyOrderStatusResult.ts:7](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/BuyOrderStatusResult.ts#L7)

___

### quantity

• **quantity**: `number`

#### Defined in

[types/BuyOrderStatusResult.ts:5](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/BuyOrderStatusResult.ts#L5)

___

### quantityRemaining

• **quantityRemaining**: `number`

#### Defined in

[types/BuyOrderStatusResult.ts:6](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/BuyOrderStatusResult.ts#L6)

___

### success

• **success**: `boolean`

#### Defined in

[types/BuyOrderStatusResult.ts:2](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/BuyOrderStatusResult.ts#L2)

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

[types/CreateBuyOrderOptions.ts:4](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/CreateBuyOrderOptions.ts#L4)

___

### marketHashName

• **marketHashName**: `string`

#### Defined in

[types/CreateBuyOrderOptions.ts:2](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/CreateBuyOrderOptions.ts#L2)

___

### price

• **price**: `number`

#### Defined in

[types/CreateBuyOrderOptions.ts:3](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/CreateBuyOrderOptions.ts#L3)

# Interface: CreateBuyOrderResult

## Table of contents

### Properties

- [buyOrderId](#buyorderid)
- [success](#success)

## Properties

### buyOrderId

• **buyOrderId**: `number`

#### Defined in

[types/CreateBuyOrderResult.ts:3](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/CreateBuyOrderResult.ts#L3)

___

### success

• **success**: `boolean`

#### Defined in

[types/CreateBuyOrderResult.ts:2](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/CreateBuyOrderResult.ts#L2)

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

[types/CreateSellOrderOptions.ts:5](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/CreateSellOrderOptions.ts#L5)

___

### assetId

• **assetId**: `number`

#### Defined in

[types/CreateSellOrderOptions.ts:2](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/CreateSellOrderOptions.ts#L2)

___

### contextId

• **contextId**: `number`

#### Defined in

[types/CreateSellOrderOptions.ts:3](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/CreateSellOrderOptions.ts#L3)

___

### price

• **price**: `number`

#### Defined in

[types/CreateSellOrderOptions.ts:4](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/CreateSellOrderOptions.ts#L4)

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

[types/CreateSellOrderResult.ts:6](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/CreateSellOrderResult.ts#L6)

___

### needsEmailConfirmation

• **needsEmailConfirmation**: `boolean`

#### Defined in

[types/CreateSellOrderResult.ts:5](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/CreateSellOrderResult.ts#L5)

___

### needsMobileConfirmation

• **needsMobileConfirmation**: `boolean`

#### Defined in

[types/CreateSellOrderResult.ts:4](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/CreateSellOrderResult.ts#L4)

___

### requiresConfirmation

• **requiresConfirmation**: `boolean`

#### Defined in

[types/CreateSellOrderResult.ts:3](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/CreateSellOrderResult.ts#L3)

___

### success

• **success**: `boolean`

#### Defined in

[types/CreateSellOrderResult.ts:2](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/CreateSellOrderResult.ts#L2)

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

[types/Description.ts:4](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/Description.ts#L4)

___

### label

• `Optional` **label**: ``null`` \| `string`

#### Defined in

[types/Description.ts:5](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/Description.ts#L5)

___

### type

• `Optional` **type**: ``null`` \| `string`

#### Defined in

[types/Description.ts:2](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/Description.ts#L2)

___

### value

• **value**: `string`

#### Defined in

[types/Description.ts:3](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/Description.ts#L3)

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

[types/ItemOrdersHistogramResult.ts:9](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ItemOrdersHistogramResult.ts#L9)

___

### buyOrderSummary

• **buyOrderSummary**: `string`

#### Defined in

[types/ItemOrdersHistogramResult.ts:6](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ItemOrdersHistogramResult.ts#L6)

___

### buyOrderTable

• **buyOrderTable**: `string`

#### Defined in

[types/ItemOrdersHistogramResult.ts:5](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ItemOrdersHistogramResult.ts#L5)

___

### graphMaxX

• **graphMaxX**: `number`

#### Defined in

[types/ItemOrdersHistogramResult.ts:21](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ItemOrdersHistogramResult.ts#L21)

___

### graphMaxY

• **graphMaxY**: `number`

#### Defined in

[types/ItemOrdersHistogramResult.ts:19](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ItemOrdersHistogramResult.ts#L19)

___

### graphMinX

• **graphMinX**: `number`

#### Defined in

[types/ItemOrdersHistogramResult.ts:20](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ItemOrdersHistogramResult.ts#L20)

___

### highestBuyOrder

• **highestBuyOrder**: `number`

#### Defined in

[types/ItemOrdersHistogramResult.ts:7](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ItemOrdersHistogramResult.ts#L7)

___

### lowestSellOrder

• **lowestSellOrder**: `number`

#### Defined in

[types/ItemOrdersHistogramResult.ts:8](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ItemOrdersHistogramResult.ts#L8)

___

### pricePrefix

• **pricePrefix**: `string`

#### Defined in

[types/ItemOrdersHistogramResult.ts:22](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ItemOrdersHistogramResult.ts#L22)

___

### priceSuffix

• **priceSuffix**: `string`

#### Defined in

[types/ItemOrdersHistogramResult.ts:23](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ItemOrdersHistogramResult.ts#L23)

___

### sellOrderGraph

• **sellOrderGraph**: { `description`: `string` ; `price`: `number` ; `volume`: `number`  }[]

#### Defined in

[types/ItemOrdersHistogramResult.ts:14](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ItemOrdersHistogramResult.ts#L14)

___

### sellOrderSummary

• **sellOrderSummary**: `string`

#### Defined in

[types/ItemOrdersHistogramResult.ts:4](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ItemOrdersHistogramResult.ts#L4)

___

### sellOrderTable

• **sellOrderTable**: `string`

#### Defined in

[types/ItemOrdersHistogramResult.ts:3](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ItemOrdersHistogramResult.ts#L3)

___

### success

• **success**: `boolean`

#### Defined in

[types/ItemOrdersHistogramResult.ts:2](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ItemOrdersHistogramResult.ts#L2)

# Interface: ListingResult

## Table of contents

### Properties

- [active](#active)
- [asset](#asset)
- [cancelReason](#cancelreason)
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

• **active**: `number`

#### Defined in

[types/ListingResult.ts:16](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ListingResult.ts#L16)

___

### asset

• **asset**: [`AssetResult`](#interfacesassetresultmd)

#### Defined in

[types/ListingResult.ts:6](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ListingResult.ts#L6)

___

### cancelReason

• **cancelReason**: `number`

#### Defined in

[types/ListingResult.ts:23](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ListingResult.ts#L23)

___

### convertedCurrencyId

• **convertedCurrencyId**: `number`

#### Defined in

[types/ListingResult.ts:14](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ListingResult.ts#L14)

___

### convertedFee

• **convertedFee**: `number`

#### Defined in

[types/ListingResult.ts:13](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ListingResult.ts#L13)

___

### convertedFeePerUnit

• **convertedFeePerUnit**: `number`

#### Defined in

[types/ListingResult.ts:31](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ListingResult.ts#L31)

___

### convertedPrice

• **convertedPrice**: `number`

#### Defined in

[types/ListingResult.ts:12](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ListingResult.ts#L12)

___

### convertedPricePerUnit

• **convertedPricePerUnit**: `number`

#### Defined in

[types/ListingResult.ts:30](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ListingResult.ts#L30)

___

### convertedPublisherFee

• **convertedPublisherFee**: `number`

#### Defined in

[types/ListingResult.ts:20](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ListingResult.ts#L20)

___

### convertedPublisherFeePerUnit

• **convertedPublisherFeePerUnit**: `number`

#### Defined in

[types/ListingResult.ts:33](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ListingResult.ts#L33)

___

### convertedSteamFee

• **convertedSteamFee**: `number`

#### Defined in

[types/ListingResult.ts:18](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ListingResult.ts#L18)

___

### convertedSteamFeePerUnit

• **convertedSteamFeePerUnit**: `number`

#### Defined in

[types/ListingResult.ts:32](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ListingResult.ts#L32)

___

### currencyId

• **currencyId**: `number`

#### Defined in

[types/ListingResult.ts:11](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ListingResult.ts#L11)

___

### fee

• **fee**: `number`

#### Defined in

[types/ListingResult.ts:10](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ListingResult.ts#L10)

___

### feePerUnit

• **feePerUnit**: `number`

#### Defined in

[types/ListingResult.ts:27](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ListingResult.ts#L27)

___

### itemExpired

• **itemExpired**: `number`

#### Defined in

[types/ListingResult.ts:24](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ListingResult.ts#L24)

___

### listingId

• **listingId**: `number`

#### Defined in

[types/ListingResult.ts:4](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ListingResult.ts#L4)

___

### originalAmountListed

• **originalAmountListed**: `number`

#### Defined in

[types/ListingResult.ts:25](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ListingResult.ts#L25)

___

### originalPrice

• **originalPrice**: `number`

#### Defined in

[types/ListingResult.ts:9](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ListingResult.ts#L9)

___

### originalPricePerUnit

• **originalPricePerUnit**: `number`

#### Defined in

[types/ListingResult.ts:26](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ListingResult.ts#L26)

___

### price

• **price**: `number`

#### Defined in

[types/ListingResult.ts:8](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ListingResult.ts#L8)

___

### publisherFee

• **publisherFee**: `number`

#### Defined in

[types/ListingResult.ts:19](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ListingResult.ts#L19)

___

### publisherFeeApp

• **publisherFeeApp**: `number`

#### Defined in

[types/ListingResult.ts:22](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ListingResult.ts#L22)

___

### publisherFeePerUnit

• **publisherFeePerUnit**: `number`

#### Defined in

[types/ListingResult.ts:29](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ListingResult.ts#L29)

___

### publisherFeePercent

• **publisherFeePercent**: `number`

#### Defined in

[types/ListingResult.ts:21](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ListingResult.ts#L21)

___

### status

• **status**: `number`

#### Defined in

[types/ListingResult.ts:15](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ListingResult.ts#L15)

___

### steamFee

• **steamFee**: `number`

#### Defined in

[types/ListingResult.ts:17](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ListingResult.ts#L17)

___

### steamFeePerUnit

• **steamFeePerUnit**: `number`

#### Defined in

[types/ListingResult.ts:28](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ListingResult.ts#L28)

___

### steamIdLister

• **steamIdLister**: `number`

#### Defined in

[types/ListingResult.ts:7](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ListingResult.ts#L7)

___

### timeCreated

• **timeCreated**: `number`

#### Defined in

[types/ListingResult.ts:5](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ListingResult.ts#L5)

___

### timeCreatedStr

• **timeCreatedStr**: `string`

#### Defined in

[types/ListingResult.ts:35](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ListingResult.ts#L35)

___

### timeFinishHold

• **timeFinishHold**: `number`

#### Defined in

[types/ListingResult.ts:34](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ListingResult.ts#L34)

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

[types/MarketOptions.ts:2](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/MarketOptions.ts#L2)

___

### httpProxy

• `Optional` **httpProxy**: ``null`` \| `string`

#### Defined in

[types/MarketOptions.ts:3](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/MarketOptions.ts#L3)

___

### socksProxy

• `Optional` **socksProxy**: ``null`` \| `string`

#### Defined in

[types/MarketOptions.ts:4](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/MarketOptions.ts#L4)

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

[types/MyListingsResult.ts:9](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/MyListingsResult.ts#L9)

___

### buyOrders

• **buyOrders**: [`BuyOrderResult`](#interfacesbuyorderresultmd)[]

#### Defined in

[types/MyListingsResult.ts:15](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/MyListingsResult.ts#L15)

___

### listings

• **listings**: [`ListingResult`](#interfaceslistingresultmd)[]

#### Defined in

[types/MyListingsResult.ts:12](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/MyListingsResult.ts#L12)

___

### listingsOnHold

• **listingsOnHold**: [`ListingResult`](#interfaceslistingresultmd)[]

#### Defined in

[types/MyListingsResult.ts:13](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/MyListingsResult.ts#L13)

___

### listingsToConfirm

• **listingsToConfirm**: [`ListingResult`](#interfaceslistingresultmd)[]

#### Defined in

[types/MyListingsResult.ts:14](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/MyListingsResult.ts#L14)

___

### numActiveListings

• **numActiveListings**: `number`

#### Defined in

[types/MyListingsResult.ts:11](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/MyListingsResult.ts#L11)

___

### pageSize

• **pageSize**: `number`

#### Defined in

[types/MyListingsResult.ts:7](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/MyListingsResult.ts#L7)

___

### start

• **start**: `number`

#### Defined in

[types/MyListingsResult.ts:10](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/MyListingsResult.ts#L10)

___

### success

• **success**: `boolean`

#### Defined in

[types/MyListingsResult.ts:6](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/MyListingsResult.ts#L6)

___

### totalCount

• **totalCount**: `number`

#### Defined in

[types/MyListingsResult.ts:8](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/MyListingsResult.ts#L8)

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

[types/PriceHistoryResult.ts:3](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/PriceHistoryResult.ts#L3)

___

### priceSuffix

• **priceSuffix**: `string`

#### Defined in

[types/PriceHistoryResult.ts:4](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/PriceHistoryResult.ts#L4)

___

### prices

• **prices**: { `datetime`: `string` ; `price`: `number` ; `volume`: `number`  }[]

#### Defined in

[types/PriceHistoryResult.ts:5](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/PriceHistoryResult.ts#L5)

___

### success

• **success**: `boolean`

#### Defined in

[types/PriceHistoryResult.ts:2](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/PriceHistoryResult.ts#L2)

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

[types/PriceOverviewResult.ts:3](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/PriceOverviewResult.ts#L3)

___

### medianPrice

• **medianPrice**: `string`

#### Defined in

[types/PriceOverviewResult.ts:5](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/PriceOverviewResult.ts#L5)

___

### success

• **success**: `boolean`

#### Defined in

[types/PriceOverviewResult.ts:2](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/PriceOverviewResult.ts#L2)

___

### volume

• **volume**: `number`

#### Defined in

[types/PriceOverviewResult.ts:4](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/PriceOverviewResult.ts#L4)

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

[types/SearchOptions.ts:4](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/SearchOptions.ts#L4)

___

### query

• `Optional` **query**: ``null`` \| `string`

#### Defined in

[types/SearchOptions.ts:2](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/SearchOptions.ts#L2)

___

### searchDescriptions

• `Optional` **searchDescriptions**: ``null`` \| `boolean`

#### Defined in

[types/SearchOptions.ts:5](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/SearchOptions.ts#L5)

___

### sortColumn

• `Optional` **sortColumn**: ``null`` \| `string`

#### Defined in

[types/SearchOptions.ts:6](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/SearchOptions.ts#L6)

___

### sortDir

• `Optional` **sortDir**: ``null`` \| ``"desc"`` \| ``"asc"``

#### Defined in

[types/SearchOptions.ts:7](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/SearchOptions.ts#L7)

___

### start

• `Optional` **start**: ``null`` \| `number`

#### Defined in

[types/SearchOptions.ts:3](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/SearchOptions.ts#L3)

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

[types/SearchResult.ts:4](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/SearchResult.ts#L4)

___

### results

• **results
**: { `appIcon`: `string` ; `appName`: `string` ; `assetDescription`: { `appId`: `number` ; `backgroundColor`: `string` ; `classId`: `string` ; `commodity`: `boolean` ; `iconUrl`: `string` ; `instanceId`: `string` ; `marketHashName`: `string` ; `marketName`: `string` ; `name`: `string` ; `nameColor`: `string` ; `tradable`: `boolean` ; `type`: `string`  } ; `hashName`: `string` ; `name`: `string` ; `salePriceText`: `string` ; `sellListings`: `number` ; `sellPrice`: `number` ; `sellPriceText`: `string`  }[]

#### Defined in

[types/SearchResult.ts:14](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/SearchResult.ts#L14)

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

[types/SearchResult.ts:6](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/SearchResult.ts#L6)

___

### start

• **start**: `number`

#### Defined in

[types/SearchResult.ts:3](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/SearchResult.ts#L3)

___

### success

• **success**: `boolean`

#### Defined in

[types/SearchResult.ts:2](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/SearchResult.ts#L2)

___

### totalCount

• **totalCount**: `number`

#### Defined in

[types/SearchResult.ts:5](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/SearchResult.ts#L5)

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

[types/ECurrencyCode.ts:34](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ECurrencyCode.ts#L34)

___

### ARS

• **ARS** = ``34``

#### Defined in

[types/ECurrencyCode.ts:35](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ECurrencyCode.ts#L35)

___

### AUD

• **AUD** = ``21``

#### Defined in

[types/ECurrencyCode.ts:23](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ECurrencyCode.ts#L23)

___

### BRL

• **BRL** = ``7``

#### Defined in

[types/ECurrencyCode.ts:9](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ECurrencyCode.ts#L9)

___

### BYN

• **BYN** = ``36``

#### Defined in

[types/ECurrencyCode.ts:37](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ECurrencyCode.ts#L37)

___

### CAD

• **CAD** = ``20``

#### Defined in

[types/ECurrencyCode.ts:22](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ECurrencyCode.ts#L22)

___

### CHF

• **CHF** = ``4``

#### Defined in

[types/ECurrencyCode.ts:6](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ECurrencyCode.ts#L6)

___

### CLP

• **CLP** = ``25``

#### Defined in

[types/ECurrencyCode.ts:27](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ECurrencyCode.ts#L27)

___

### CNY

• **CNY** = ``23``

#### Defined in

[types/ECurrencyCode.ts:25](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ECurrencyCode.ts#L25)

___

### COP

• **COP** = ``27``

#### Defined in

[types/ECurrencyCode.ts:29](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ECurrencyCode.ts#L29)

___

### CRC

• **CRC** = ``40``

#### Defined in

[types/ECurrencyCode.ts:41](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ECurrencyCode.ts#L41)

___

### EUR

• **EUR** = ``3``

#### Defined in

[types/ECurrencyCode.ts:5](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ECurrencyCode.ts#L5)

___

### GBP

• **GBP** = ``2``

#### Defined in

[types/ECurrencyCode.ts:4](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ECurrencyCode.ts#L4)

___

### HKD

• **HKD** = ``29``

#### Defined in

[types/ECurrencyCode.ts:31](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ECurrencyCode.ts#L31)

___

### IDR

• **IDR** = ``10``

#### Defined in

[types/ECurrencyCode.ts:12](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ECurrencyCode.ts#L12)

___

### ILS

• **ILS** = ``35``

#### Defined in

[types/ECurrencyCode.ts:36](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ECurrencyCode.ts#L36)

___

### INR

• **INR** = ``24``

#### Defined in

[types/ECurrencyCode.ts:26](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ECurrencyCode.ts#L26)

___

### Invalid

• **Invalid** = ``0``

#### Defined in

[types/ECurrencyCode.ts:2](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ECurrencyCode.ts#L2)

___

### JPY

• **JPY** = ``8``

#### Defined in

[types/ECurrencyCode.ts:10](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ECurrencyCode.ts#L10)

___

### KRW

• **KRW** = ``16``

#### Defined in

[types/ECurrencyCode.ts:18](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ECurrencyCode.ts#L18)

___

### KWD

• **KWD** = ``38``

#### Defined in

[types/ECurrencyCode.ts:39](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ECurrencyCode.ts#L39)

___

### KZT

• **KZT** = ``37``

#### Defined in

[types/ECurrencyCode.ts:38](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ECurrencyCode.ts#L38)

___

### MXN

• **MXN** = ``19``

#### Defined in

[types/ECurrencyCode.ts:21](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ECurrencyCode.ts#L21)

___

### MYR

• **MYR** = ``11``

#### Defined in

[types/ECurrencyCode.ts:13](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ECurrencyCode.ts#L13)

___

### NOK

• **NOK** = ``9``

#### Defined in

[types/ECurrencyCode.ts:11](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ECurrencyCode.ts#L11)

___

### NZD

• **NZD** = ``22``

#### Defined in

[types/ECurrencyCode.ts:24](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ECurrencyCode.ts#L24)

___

### PEN

• **PEN** = ``26``

#### Defined in

[types/ECurrencyCode.ts:28](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ECurrencyCode.ts#L28)

___

### PHP

• **PHP** = ``12``

#### Defined in

[types/ECurrencyCode.ts:14](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ECurrencyCode.ts#L14)

___

### PLN

• **PLN** = ``6``

#### Defined in

[types/ECurrencyCode.ts:8](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ECurrencyCode.ts#L8)

___

### QAR

• **QAR** = ``39``

#### Defined in

[types/ECurrencyCode.ts:40](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ECurrencyCode.ts#L40)

___

### RUB

• **RUB** = ``5``

#### Defined in

[types/ECurrencyCode.ts:7](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ECurrencyCode.ts#L7)

___

### SAR

• **SAR** = ``31``

#### Defined in

[types/ECurrencyCode.ts:33](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ECurrencyCode.ts#L33)

___

### SGD

• **SGD** = ``13``

#### Defined in

[types/ECurrencyCode.ts:15](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ECurrencyCode.ts#L15)

___

### THB

• **THB** = ``14``

#### Defined in

[types/ECurrencyCode.ts:16](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ECurrencyCode.ts#L16)

___

### TRY

• **TRY** = ``17``

#### Defined in

[types/ECurrencyCode.ts:19](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ECurrencyCode.ts#L19)

___

### TWD

• **TWD** = ``30``

#### Defined in

[types/ECurrencyCode.ts:32](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ECurrencyCode.ts#L32)

___

### UAH

• **UAH** = ``18``

#### Defined in

[types/ECurrencyCode.ts:20](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ECurrencyCode.ts#L20)

___

### USD

• **USD** = ``1``

#### Defined in

[types/ECurrencyCode.ts:3](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ECurrencyCode.ts#L3)

___

### UYU

• **UYU** = ``41``

#### Defined in

[types/ECurrencyCode.ts:42](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ECurrencyCode.ts#L42)

___

### VND

• **VND** = ``15``

#### Defined in

[types/ECurrencyCode.ts:17](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ECurrencyCode.ts#L17)

___

### ZAR

• **ZAR** = ``28``

#### Defined in

[types/ECurrencyCode.ts:30](https://github.com/vladislav-puzyrev/steam-market/blob/44c1197/src/types/ECurrencyCode.ts#L30)
