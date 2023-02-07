import axios from 'axios'
import proxyParser from 'proxy-string-parser'
import ISO4217 from 'currency-codes'
import ISO6391 from 'iso-639-1'
import { ECurrencyCode } from './types/ECurrencyCode.js'
import { MarketOptions } from './types/MarketOptions.js'
import { SearchOptions } from './types/SearchOptions.js'
import { CreateBuyOrderOptions } from './types/CreateBuyOrderOptions.js'
import { CreateSellOrderOptions } from './types/CreateSellOrderOptions.js'
import { Search } from './types/Search.js'
import { ItemOrdersHistogram } from './types/ItemOrdersHistogram.js'
import { PriceOverview } from './types/PriceOverview.js'
import { PriceHistory } from './types/PriceHistory.js'
import { MyListings } from './types/MyListings.js'
import { MyHistory } from './types/MyHistory.js'
import { CreateBuyOrder } from './types/CreateBuyOrder.js'
import { CreateSellOrder } from './types/CreateSellOrder.js'
import { BuyOrderStatus } from './types/BuyOrderStatus.js'
import { SearchResponse } from './types/SearchResponse.js'
import { ItemOrdersHistogramResponse } from './types/ItemOrdersHistogramResponse.js'
import { PriceOverviewResponse } from './types/PriceOverviewResponse.js'
import { PriceHistoryResponse } from './types/PriceHistoryResponse.js'
import { MyListingsResponse } from './types/MyListingsResponse.js'
import { MyHistoryResponse } from './types/MyHistoryResponse.js'
import { CreateBuyOrderResponse } from './types/CreateBuyOrderResponse.js'
import { CreateSellOrderResponse } from './types/CreateSellOrderResponse.js'
import { BuyOrderStatusResponse } from './types/BuyOrderStatusResponse.js'
import { Asset } from './types/Asset.js'
import { Listing } from './types/Listing.js'
import { AssetResponse } from './types/AssetResponse.js'
import { ListingResponse } from './types/ListingResponse.js'

class SteamMarket {
  private readonly server
  private sessionId = ''
  private currency = ECurrencyCode.USD
  private digits = 2
  private units = 100
  private country = 'US'
  private language = 'english'
  private vanityURL = ''

  public constructor (options?: MarketOptions | null) {
    const { additionalHeaders, httpProxy, socksProxy } = options ?? {}
    const proxy = httpProxy ?? socksProxy

    if ((httpProxy != null) && (socksProxy != null)) {
      throw new Error('Cannot specify both socksProxy and httpProxy options')
    }

    this.server = axios.create({
      baseURL: 'https://steamcommunity.com/market',
      headers: {
        Host: 'steamcommunity.com',
        Accept: 'text/html,*/*;q=0.9',
        'Accept-Encoding': 'gzip,identity,*;q=0',
        'Accept-Charset': 'ISO-8859-1,utf-8,*;q=0.7',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36',
        ...additionalHeaders
      },
      proxy: (proxy != null) ? proxyParser(proxy) : false,
      validateStatus: (status) => {
        if (status === 304) return true
        return status >= 200 && status < 300
      }
    })
  }

  private processAsset (asset: AssetResponse): Asset {
    return {
      currency: asset.currency,
      appId: asset.appid,
      contextId: Number(asset.contextid),
      id: Number(asset.id),
      classId: Number(asset.classid),
      instanceId: Number(asset.instanceid),
      amount: Number(asset.amount),
      status: asset.status,
      originalAmount: Number(asset.original_amount),
      unownedId: Number(asset.unowned_id),
      unownedContextId: Number(asset.unowned_contextid),
      backgroundColor: asset.background_color,
      iconUrl: asset.icon_url,
      iconUrlLarge: asset.icon_url_large,
      descriptions: asset.descriptions,
      tradable: Boolean(asset.tradable),
      actions: asset.actions,
      ownerDescriptions: asset.owner_descriptions,
      ownerActions: asset.owner_actions,
      fraudWarnings: asset.fraudwarnings,
      name: asset.name,
      nameColor: asset.name_color,
      type: asset.type,
      marketName: asset.market_name,
      marketHashName: asset.market_hash_name,
      marketFee: asset.market_fee,
      marketFeeApp: asset.market_fee_app,
      containedItem: asset.contained_item,
      marketActions: asset.market_actions,
      commodity: Boolean(asset.commodity),
      marketTradableRestriction: asset.market_tradable_restriction,
      marketMarketableRestriction: asset.market_marketable_restriction,
      marketable: Boolean(asset.marketable),
      tags: asset.tags,
      itemExpiration: asset.item_expiration,
      marketBuyCountryRestriction: asset.market_buy_country_restriction,
      marketSellCountryRestriction: asset.market_sell_country_restriction,
      appIcon: asset.app_icon,
      owner: Boolean(asset.owner)
    }
  }

  private processAssets (assets: Record<string, Record<string, Record<string, AssetResponse>>>): Asset[] {
    const array: Asset[] = []

    Object.values(assets).forEach((i) => {
      Object.values(i).forEach((j) => {
        Object.values(j).forEach((k) => {
          array.push(this.processAsset(k))
        })
      })
    })

    return array
  }

  private processListing (listing: ListingResponse): Listing {
    return {
      listingId: Number(listing.listingid),
      timeCreated: listing.time_created,
      asset: this.processAsset(listing.asset),
      steamIdLister: Number(listing.steamid_lister),
      price: listing.price,
      originalPrice: listing.original_price,
      fee: listing.fee,
      currencyId: Number(listing.currencyid),
      convertedPrice: listing.converted_price,
      convertedFee: listing.converted_fee,
      convertedCurrencyId: Number(listing.converted_currencyid),
      status: listing.status,
      active: listing.active,
      steamFee: listing.steam_fee,
      convertedSteamFee: listing.converted_steam_fee,
      publisherFee: listing.publisher_fee,
      convertedPublisherFee: listing.converted_publisher_fee,
      publisherFeePercent: Number(listing.publisher_fee_percent),
      publisherFeeApp: listing.publisher_fee_app,
      cancelReason: listing.cancel_reason,
      itemExpired: listing.item_expired,
      originalAmountListed: listing.original_amount_listed,
      originalPricePerUnit: listing.original_price_per_unit,
      feePerUnit: listing.fee_per_unit,
      steamFeePerUnit: listing.steam_fee_per_unit,
      publisherFeePerUnit: listing.publisher_fee_per_unit,
      convertedPricePerUnit: listing.converted_price_per_unit,
      convertedFeePerUnit: listing.converted_fee_per_unit,
      convertedSteamFeePerUnit: listing.converted_steam_fee_per_unit,
      convertedPublisherFeePerUnit: listing.converted_publisher_fee_per_unit,
      timeFinishHold: listing.time_finish_hold,
      timeCreatedStr: listing.time_created_str
    }
  }

  public setCookies (cookies: string[]): void {
    const sessionId = cookies.find((cookie) => cookie.split('=')[0] === 'sessionid')

    if (sessionId == null) {
      throw new Error('Invalid cookies value')
    }

    this.sessionId = sessionId.split('=')[1]
    this.server.defaults.headers.common.Cookie = cookies.join('; ')
  }

  public setCurrency (currency: ECurrencyCode): void {
    const info = ISO4217.code(ECurrencyCode[currency])

    if (info == null) {
      throw new Error('Invalid currency value')
    }

    this.units = Number(`1${'0'.repeat(info.digits)}`)
    this.digits = info.digits
    this.currency = currency
  }

  public setCountry (country: string): void {
    const language = ISO6391.getName(country.toLowerCase())

    if (language === '') {
      throw new Error('Invalid country value')
    }

    this.language = language.toLowerCase()
    this.country = country
  }

  public setVanityURL (vanityURL: string): void {
    this.vanityURL = vanityURL
  }

  public getCookies (): string[] {
    return this.server.defaults.headers.common.Cookie?.toString().split('; ') ?? []
  }

  public getSessionId (): string {
    return this.sessionId
  }

  public getCurrency (): ECurrencyCode {
    return this.currency
  }

  public getDigits (): number {
    return this.digits
  }

  public getUnits (): number {
    return this.units
  }

  public getCountry (): string {
    return this.country
  }

  public getLanguage (): string {
    return this.language
  }

  public getVanityURL (): string {
    return this.vanityURL
  }

  public async searchQuery (appId: number, options?: SearchOptions | null): Promise<SearchResponse> {
    const { query, start, count, searchDescriptions, sortColumn, sortDir } = options ?? {}

    const response = await this.server.get('/search/render', {
      params: {
        query: query ?? '',
        start: start ?? '0',
        count: count ?? '100',
        search_descriptions: (searchDescriptions === true) ? '1' : '0',
        sort_column: sortColumn ?? 'popular',
        sort_dir: sortDir ?? 'desc',
        appid: appId,
        norender: '1'
      },
      headers: {
        Referer: `https://steamcommunity.com/market/search?appid=${appId}`,
        'X-Prototype-Version': '1.7',
        'X-Requested-With': 'XMLHttpRequest'
      }
    })

    return response.data
  }

  public async search (appId: number, options?: SearchOptions | null): Promise<Search> {
    const response = await this.searchQuery(appId, options)

    return {
      success: response.success,
      start: response.start,
      pageSize: response.pagesize,
      totalCount: response.total_count,
      searchData: {
        query: response.searchdata.query,
        searchDescriptions: response.searchdata.search_descriptions,
        totalCount: response.searchdata.total_count,
        pageSize: response.searchdata.pagesize,
        prefix: response.searchdata.prefix,
        classPrefix: response.searchdata.class_prefix
      },
      results: response.results.map((result) => ({
        name: result.name,
        hashName: result.hash_name,
        sellListings: result.sell_listings,
        sellPrice: result.sell_price,
        sellPriceText: result.sell_price_text,
        appIcon: result.app_icon,
        appName: result.app_name,
        assetDescription: {
          appId: result.asset_description.appid,
          classId: result.asset_description.classid,
          instanceId: result.asset_description.instanceid,
          backgroundColor: result.asset_description.background_color,
          iconUrl: result.asset_description.icon_url,
          tradable: Boolean(result.asset_description.tradable),
          name: result.asset_description.name,
          nameColor: result.asset_description.name_color,
          type: result.asset_description.type,
          marketName: result.asset_description.market_name,
          marketHashName: result.asset_description.market_hash_name,
          commodity: Boolean(result.asset_description.commodity)
        },
        salePriceText: result.sale_price_text
      }
      ))
    }
  }

  public async itemNameIdQuery (appId: number, marketHashName: string): Promise<string> {
    const response = await this.server.get(`/listings/${appId}/${marketHashName}`, {
      headers: {
        Cookie: this.getCookies().filter((cookie) => cookie.split('=')[0] === 'steamLogin').join('; '),
        Referer: `https://steamcommunity.com/market/search?appid=${appId}`
      }
    })

    return response.data
  }

  public async itemNameId (appId: number, marketHashName: string): Promise<number> {
    const response = await this.itemNameIdQuery(appId, marketHashName)

    const startString = 'Market_LoadOrderSpread('
    const endString = ')'
    const startPosition = response.indexOf(startString, 0)
    const endPosition = response.indexOf(endString, startPosition)

    if (startPosition === -1 || endPosition === -1) {
      throw new Error('Value itemNameId not found')
    }

    const itemNameId = response.slice(startPosition + startString.length, endPosition).trim()
    return Number(itemNameId)
  }

  public async itemOrdersHistogramQuery (
    appId: number,
    marketHashName: string,
    itemNameId: number
  ): Promise<ItemOrdersHistogramResponse> {
    const response = await this.server.get('/itemordershistogram', {
      params: {
        country: this.country,
        language: this.language,
        currency: this.currency,
        item_nameid: itemNameId,
        two_factor: '0'
      },
      headers: {
        Referer: `https://steamcommunity.com/market/listings/${appId}/${marketHashName}`,
        'If-Modified-Since': new Date().toUTCString(),
        'X-Requested-With': 'XMLHttpRequest'
      }
    })

    return response.data
  }

  public async itemOrdersHistogram (
    appId: number,
    marketHashName: string,
    itemNameId: number
  ): Promise<ItemOrdersHistogram> {
    const response = await this.itemOrdersHistogramQuery(appId, marketHashName, itemNameId)

    return {
      success: Boolean(response.success),
      sellOrderTable: response.sell_order_table,
      sellOrderSummary: response.sell_order_summary,
      buyOrderTable: response.buy_order_table,
      buyOrderSummary: response.buy_order_summary,
      highestBuyOrder: Number((Number(response.highest_buy_order) / this.units).toFixed(this.digits)),
      lowestSellOrder: Number((Number(response.lowest_sell_order) / this.units).toFixed(this.digits)),
      buyOrderGraph: response.buy_order_graph.map((buyOrder) => ({
        price: buyOrder[0],
        volume: buyOrder[1],
        description: buyOrder[2]
      })),
      sellOrderGraph: response.sell_order_graph.map((sellOrder) => ({
        price: sellOrder[0],
        volume: sellOrder[1],
        description: sellOrder[2]
      })),
      graphMaxY: response.graph_max_y,
      graphMinX: response.graph_min_x,
      graphMaxX: response.graph_max_x,
      pricePrefix: response.price_prefix,
      priceSuffix: response.price_suffix
    }
  }

  public async priceOverviewQuery (appId: number, marketHashName: string): Promise<PriceOverviewResponse> {
    const response = await this.server.get('/priceoverview', {
      params: {
        appid: appId,
        currency: this.currency,
        market_hash_name: marketHashName
      },
      headers: {
        Referer: `https://steamcommunity.com/id/${this.vanityURL}/inventory?modal=1&market=1`,
        'X-Prototype-Version': '1.7',
        'X-Requested-With': 'XMLHttpRequest'
      }
    })

    return response.data
  }

  public async priceOverview (appId: number, marketHashName: string): Promise<PriceOverview> {
    const response = await this.priceOverviewQuery(appId, marketHashName)

    return {
      success: response.success,
      lowestPrice: response.lowest_price,
      volume: Number(response.volume.split(',').join('')),
      medianPrice: response.median_price
    }
  }

  public async priceHistoryQuery (appId: number, marketHashName: string): Promise<PriceHistoryResponse> {
    const response = await this.server.get('/pricehistory', {
      params: {
        appid: appId,
        currency: this.currency,
        market_hash_name: marketHashName
      },
      headers: {
        Referer: `https://steamcommunity.com/id/${this.vanityURL}/inventory?modal=1&market=1`,
        'If-Modified-Since': new Date().toUTCString(),
        'X-Prototype-Version': '1.7',
        'X-Requested-With': 'XMLHttpRequest'
      }
    })

    return response.data
  }

  public async priceHistory (appId: number, marketHashName: string): Promise<PriceHistory> {
    const response = await this.priceHistoryQuery(appId, marketHashName)

    return {
      success: response.success,
      pricePrefix: response.price_prefix,
      priceSuffix: response.price_suffix,
      prices: response.prices.map((price) => ({
        datetime: price[0],
        price: price[1],
        volume: Number(price[2])
      }))
    }
  }

  public async myListingsQuery (start?: number | null, count?: number | null): Promise<MyListingsResponse> {
    const response = await this.server.get('/mylistings', {
      params: {
        start: start ?? '0',
        count: count ?? '100',
        norender: '1'
      },
      headers: {
        Referer: 'https://steamcommunity.com/market',
        'X-Prototype-Version': '1.7',
        'X-Requested-With': 'XMLHttpRequest'
      }
    })

    return response.data
  }

  public async myListings (start?: number | null, count?: number | null): Promise<MyListings> {
    const response = await this.myListingsQuery(start, count)

    return {
      success: response.success,
      pageSize: response.pagesize,
      totalCount: response.total_count,
      assets: this.processAssets(response.assets),
      start: response.start,
      numActiveListings: response.num_active_listings,
      listings: response.listings.map((listing) => this.processListing(listing)),
      listingsOnHold: response.listings_on_hold.map((listing) => this.processListing(listing)),
      listingsToConfirm: response.listings_to_confirm.map((listing) => this.processListing(listing)),
      buyOrders: response.buy_orders.map((buyOrder) => ({
        appId: buyOrder.appid,
        hashName: buyOrder.hash_name,
        walletCurrency: buyOrder.wallet_currency,
        price: Number(buyOrder.price),
        quantity: Number(buyOrder.quantity),
        quantityRemaining: Number(buyOrder.quantity_remaining),
        buyOrderId: Number(buyOrder.buy_orderid),
        description: this.processAsset(buyOrder.description)
      }))
    }
  }

  public async myHistoryQuery (start?: number | null, count?: number | null): Promise<MyHistoryResponse> {
    const response = await this.server.get('/myhistory', {
      params: {
        start: start ?? '0',
        count: count ?? '100',
        norender: '1'
      },
      headers: {
        Referer: 'https://steamcommunity.com/market',
        'X-Prototype-Version': '1.7',
        'X-Requested-With': 'XMLHttpRequest'
      }
    })

    return response.data
  }

  public async myHistory (start?: number | null, count?: number | null): Promise<MyHistory> {
    const response = await this.myHistoryQuery(start, count)

    return {
      success: response.success,
      pageSize: response.pagesize,
      totalCount: response.total_count,
      start: response.start,
      assets: this.processAssets(response.assets),
      events: response.events.map((event) => ({
        listingId: Number(event.listingid),
        purchaseId: Number(event.purchaseid),
        eventType: event.event_type,
        timeEvent: event.time_event,
        timeEventFraction: event.time_event_fraction,
        steamIdActor: Number(event.steamid_actor),
        dateEvent: event.date_event
      })),
      purchases: Object.values(response.purchases).map((purchase) => ({
        listingId: Number(purchase.listingid),
        purchaseId: Number(purchase.purchaseid),
        timeSold: purchase.time_sold,
        steamIdPurchaser: Number(purchase.steamid_purchaser),
        needsRollback: purchase.needs_rollback,
        failed: purchase.failed,
        asset: this.processAsset(purchase.asset),
        paidAmount: purchase.paid_amount,
        paidFee: purchase.paid_fee,
        currencyId: Number(purchase.currencyid),
        steamFee: purchase.steam_fee,
        publisherFee: purchase.publisher_fee,
        publisherFeePercent: Number(purchase.publisher_fee_percent),
        publisherFeeApp: purchase.publisher_fee_app,
        receivedAmount: purchase.received_amount,
        receivedCurrencyId: Number(purchase.received_currencyid),
        fundsReturned: purchase.funds_returned,
        avatarActor: purchase.avatar_actor,
        personaActor: purchase.persona_actor,
        fundsHeld: purchase.funds_held,
        timeFundsHeldUntil: purchase.time_funds_held_until,
        fundsRevoked: purchase.funds_revoked
      })),
      listings: Object.values(response.listings).map((listing) => this.processListing(listing))
    }
  }

  public async createBuyOrderQuery (appId: number, options: CreateBuyOrderOptions): Promise<CreateBuyOrderResponse> {
    const { marketHashName, price, amount } = options

    const response = await this.server.post('/createbuyorder', {
      sessionid: this.sessionId,
      currency: this.currency,
      appid: appId,
      market_hash_name: marketHashName,
      price_total: Number((price * amount) / this.units).toFixed(this.digits),
      quantity: amount,
      billing_state: '',
      save_my_address: '0'
    }, {
      headers: {
        Referer: `https://steamcommunity.com/market/listings/${appId}/${marketHashName}`,
        Origin: 'https://steamcommunity.com',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    })

    return response.data
  }

  public async createBuyOrder (appId: number, options: CreateBuyOrderOptions): Promise<CreateBuyOrder> {
    const response = await this.createBuyOrderQuery(appId, options)

    return {
      success: Boolean(response.success),
      buyOrderId: Number(response.buy_orderid)
    }
  }

  public async createSellOrderQuery (appId: number, options: CreateSellOrderOptions): Promise<CreateSellOrderResponse> {
    const { assetId, contextId, price, amount } = options

    const response = await this.server.post('/sellitem', {
      sessionid: this.sessionId,
      appid: appId,
      contextid: contextId,
      assetid: assetId,
      amount,
      price: Number((price * this.units).toFixed(this.digits))
    }, {
      headers: {
        Referer: `https://steamcommunity.com/id/${this.vanityURL}/inventory?modal=1&market=1`,
        Origin: 'https://steamcommunity.com',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    })

    return response.data
  }

  public async createSellOrder (appId: number, options: CreateSellOrderOptions): Promise<CreateSellOrder> {
    const response = await this.createSellOrderQuery(appId, options)

    return {
      success: response.success,
      requiresConfirmation: Boolean(response.requires_confirmation),
      needsMobileConfirmation: response.needs_mobile_confirmation,
      needsEmailConfirmation: response.needs_email_confirmation,
      emailDomain: response.email_domain
    }
  }

  public async buyOrderStatusQuery (
    appId: number,
    marketHashName: string,
    buyOrderId: number
  ): Promise<BuyOrderStatusResponse> {
    const response = await this.server.get('/getbuyorderstatus', {
      params: {
        sessionid: this.sessionId,
        buy_orderid: buyOrderId
      },
      headers: {
        Referer: `https://steamcommunity.com/market/listings/${appId}/${marketHashName}`,
        'X-Requested-With': 'XMLHttpRequest'
      }
    })

    return response.data
  }

  public async buyOrderStatus (
    appId: number,
    marketHashName: string,
    buyOrderId: number
  ): Promise<BuyOrderStatus> {
    const response = await this.buyOrderStatusQuery(appId, marketHashName, buyOrderId)

    return {
      success: Boolean(response.success),
      active: Boolean(response.active),
      purchased: response.purchased,
      quantity: response.quantity,
      quantityRemaining: response.quantity_remaining,
      purchases: response.purchases
    }
  }

  public async cancelBuyOrderQuery (buyOrderId: number): Promise<null> {
    const response = await this.server.post('/cancelbuyorder', {
      sessionid: this.sessionId,
      buy_orderid: buyOrderId
    }, {
      headers: {
        Referer: 'https://steamcommunity.com/market',
        Origin: 'https://steamcommunity.com',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'X-Prototype-Version': '1.7',
        'X-Requested-With': 'XMLHttpRequest'
      }
    })

    return response.data
  }

  public async cancelBuyOrder (buyOrderId: number): Promise<null> {
    return await this.cancelBuyOrderQuery(buyOrderId)
  }

  public async cancelSellOrderQuery (listingId: number): Promise<[]> {
    const response = await this.server.post(`/removelisting/${listingId}`, {
      sessionid: this.sessionId
    }, {
      headers: {
        Referer: 'https://steamcommunity.com/market',
        Origin: 'https://steamcommunity.com',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'X-Prototype-Version': '1.7',
        'X-Requested-With': 'XMLHttpRequest'
      }
    })

    return response.data
  }

  public async cancelSellOrder (listingId: number): Promise<[]> {
    return await this.cancelSellOrderQuery(listingId)
  }
}

export default SteamMarket
